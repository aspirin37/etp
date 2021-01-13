<template>
  <div>
    <v-row>
      <v-col
        cols-lg="6"
        offset-lg="6"
      >
        <div class="d-flex">
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
            class="mr-2"
            color="accent"
            depressed
            :disbled="positionName !== '' || positionCode !== ''"
            @click="getPositions"
          >
            Искать
          </v-btn>
          <v-btn
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
      show-select
      disable-sort
      fixed-header
      class="elevation-0"
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
  data: () => ({
    jwt: localStorage.getItem('jwt'),
    http: axios.create({
      baseURL: 'https://apibus-test.etpgpb.ru',
    }),
    positionName: '',
    positionCode: '',
    items: [],
    selectedItems: [],
    positionsShown: false,
    headers: [{
      value: 'name',
      text: 'Наименование позиции контрагента',
    }, {
      value: 'okei',
      text: 'ЕИ',
      editable: true,
    }, {
      value: 'okpd2',
      text: 'ОКПД2',
      editable: true,
    }, {
      value: 'specifications',
      text: 'Характеристики',
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
  },
  created() {
    this.getPositions();
  },
  methods: {
    async getPositions() {
      const { data } = await this.http.get('dictionary/positions', {
        params: this.params,
      });
      this.items = data;
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

<style>

</style>
