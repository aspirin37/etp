<template>
  <div>
    <v-row>
      <v-col
        cols-lg="6"
        offset-lg="6"
      >
        <div class="d-flex mt-lg-n15">
          <v-text-field
            v-model="positionName"
            label="Наименование позиции"
            class="ml-auto mr-2"
            outlined
            hide-details
            dense
          />
          <v-text-field
            v-model="positionCode"
            label="Код позиции"
            class="mr-2"
            outlined
            hide-details
            dense
          />
          <v-btn
            class="mr-2 height-auto"
            color="accent"
            depressed
            :disbled="positionName !== '' || positionCode !== ''"
            @click="getPositions"
          >
            Искать
          </v-btn>
          <v-btn
            class="height-auto"
            depressed
            @click="resetPositions"
          >
            Очистить поиск
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-data-table
      v-if="positionsShown"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      item-key="key"
      show-select
      disable-sort
      fixed-header
      class="nsi-table elevation-0"
    />
    <div
      v-else
      class="d-flex mt-12 grey-text"
    >
      <span class="mx-auto">
        Для поиска укажите наименование или код позиции
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NSIPositionTable',
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    jwt: localStorage.getItem('jwt'),
    http: axios.create({
      baseURL: 'https://apibus-test.etpgpb.ru',
    }),
    positionName: '',
    positionCode: '',
    items: [],
    positionsShown: false,
    headers: [{
      value: 'name',
      text: 'Наименование позиции контрагента',
    }, {
      value: 'okei.name',
      text: 'ЕИ',
      editable: true,
    }, {
      value: 'okpd2.code',
      text: 'ОКПД2',
      editable: true,
    }],
  }),
  computed: {
    params() {
      const params = {};
      if (this.positionName) {
        params.name = this.positionName;
      }
      if (this.positionCode) {
        params.etp_code = this.positionCode;
      }
      return params;
    },
    selectedItems: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('selection-changed', val);
      },
    },
  },
  methods: {
    async getPositions() {
      const { data } = await this.http.get('dictionary/positions', {
        params: this.params,
      });
      this.items = data.map((it) => ({
        key: it.id,
        name: it.name,
        okei: {
          code: it.okei_code,
          name: it.okei_name,
        },
        okpd2: {
          code: it.okpd2_code,
          name: it.okpd2_name,
        },
        specifications: '',
      }));

      this.positionsShown = true;
    },
    resetPositions() {
      this.positionName = '';
      this.positionCode = '';
      this.items = [];
      this.positionsShown = false;
    },
  },
};
</script>

<style lang="scss">
.nsi-table .v-data-table__wrapper{
  max-height: calc(100vh - 420px) !important;
  @include scrollbar;
}
</style>
