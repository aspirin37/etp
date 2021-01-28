<template>
  <div class="main-table pt-3">
    <manual-user-position-modal
      v-if="positionModal"
      v-model="positionModal"
      :position-edited="positionEdited"
      @submit="onSubmit"
    />
    <my-positions-modal
      v-if="myPositionsModal"
      v-model="myPositionsModal"
      :position-edited="positionEdited"
      @submit="onSubmit"
    />
    <div
      v-if="editable"
      class="main-table__wrapper mb-3"
    >
      <div class="row">
        <div class="col-auto pr-1">
          <v-btn
            depressed
            color="accent"
            to="/create-price-request"
          >
            Создать ЦЗ
          </v-btn>
        </div>
        <div class="col-auto pl-1">
          <dropdown
            :split="true"
            variant="warning"
            @click="myPositionsModal = true"
          >
            Добавить позицию
            <template v-slot:dropdown-content>
              <!-- <dropdown-item href="#">
                Создать из файла
              </dropdown-item> -->
              <dropdown-item @click.prevent.native="positionModal = true">
                Создать вручную
              </dropdown-item>
            </template>
          </dropdown>
        </div>
        <v-spacer />
        <div class="col-auto pl-1">
          <a
            class="view-setter"
            :class="{ active: dataView === 'grid' }"
            href="@shape-grid"
            @click.prevent="setView('grid')"
          >
            <SvgIcon
              name="shape-grid"
              original
            />
          </a>
          <a
            class="view-setter"
            :class="{ active: dataView === 'list-big' }"
            disabled
            href="@shape-list-big"
            @click.prevent="setView('list-big')"
          >
            <SvgIcon
              name="shape-list-big"
              original
            />
          </a>
          <a
            class="view-setter"
            :class="{ active: dataView === 'list-small' }"
            href="@shape-list-small"
            @click.prevent="setView('list-small')"
          >
            <SvgIcon
              name="shape-list-small"
              original
            />
          </a>
        </div>
      </div>
    </div>
    <v-data-table
      v-if="items.length && dataView === 'list-small'"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      show-select
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          mdi-cog
        </v-icon>
      </template>
      <template v-slot:[`item.okei`]="{ item }">
        {{ item.okei && item.okei.name }}
      </template>
      <template v-slot:[`item.okpd2`]="{ item }">
        {{ item.okpd2 && item.okpd2.code }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="20"
          class="mr-2"
          @click="showUpdateModal(item)"
        >
          mdi-pencil
        </v-icon>
        <v-menu
          offset-y
          left
        >
          <template v-slot:activator="{ on }">
            <v-icon
              size="20"
              v-on="on"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>
          <v-list>
            <v-list-item @click="clonePosition(item.id)">
              <v-icon
                size="20"
                class="mr-2"
              >
                mdi-content-copy
              </v-icon>
              Копировать
            </v-list-item>
            <v-list-item @click="removePosition(item.id)">
              <v-icon
                size="20"
                class="mr-2"
              >
                mdi-delete
              </v-icon>
              Удалить
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div v-else-if="dataView === 'list-big'">
      list-big
    </div>
    <div
      v-else-if="dataView === 'grid'"
      class="grid-table"
    >
      <div class="grid-table--header">
        <div class="favorite-all">
          ⭐️
        </div>
        <div class="checkbox-all">
          <input type="checkbox" />
          Выбрать все
        </div>
        <div class="checkbox-page">
          <input type="checkbox" />
          Выбрать все на странице
        </div>
        <div class="sort">
          Сортировать
          по наименованию
          <SvgIcon
            name="arrow-down"
          />
          по цене
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown, { DropdownItem } from '@/components/common//Dropdown.vue';
import ManualUserPositionModal from '@/components/modals/ManualUserPositionModal.vue';
import MyPositionsModal from '@/components/modals/MyPositionsModal.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserPositions',
  components: {
    Dropdown,
    DropdownItem,
    ManualUserPositionModal,
    MyPositionsModal,
    SvgIcon,
  },
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    items: [],
    positionModal: false,
    myPositionsModal: false,
    positionEdited: undefined,
  }),
  computed: {
    ...mapGetters(['dataView']),
    selectedItems: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('selection-changed', val);
      },
    },
    headers() {
      const headers = [{
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
      }];

      if (this.editable) {
        headers.push({
          value: 'actions',
          text: 'Действия',
          width: '100px',
          align: 'center',
        });
      }

      return headers;
    },
  },
  watch: {
    positionModal(value) {
      if (!value) {
        this.resetPositionEdited();
      }
    },
  },
  created() {
    this.getPositions();
  },
  methods: {
    ...mapActions(['setDataView']),
    setView(viewMode) {
      this.setDataView(viewMode);
    },
    async getPositions() {
      const { data } = await this.$http.get('positions');
      this.items = data;
    },
    resetPositionEdited() {
      this.positionEdited = undefined;
    },
    showUpdateModal(item) {
      this.positionEdited = JSON.parse(JSON.stringify(item));
      this.positionModal = true;
    },
    onSubmit(data) {
      if (Array.isArray(data)) {
        data.forEach((it) => {
          this.prepareRequest(it);
        });
        return;
      }

      this.prepareRequest(data);
    },
    prepareRequest(data) {
      const params = {
        ...data,
        okpd2: data.okpd2.code,
        okei: data.okei.code,
      };

      if (this.positionEdited) {
        this.updatePosition(params);
        return;
      }

      this.createPosition(params);
    },
    async createPosition(params) {
      try {
        await this.$http.post('positions', params);
        this.getPositions();
        this.$toast.success('Позиция успешно добавлена');

        this.positionModal = false;
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async updatePosition(params) {
      try {
        await this.$http.put(`/positions/${params.id}`, params);
        this.getPositions();
        this.$toast.success('Позиция успешно отредактирована');

        this.positionModal = false;
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async clonePosition(id) {
      try {
        await this.$http.patch(`/positions/${id}/clone`);
        this.getPositions();
        this.$toast.success('Позиция успешно скопирована');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removePosition(id) {
      try {
        await this.$http.patch(`positions/${id}/archive`);
        this.getPositions();
        this.$toast.success('Позиция успешно удалена');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss">
  .view-setter {
    svg path {
      fill: #AABDCD;
    }
    &[disabled] {
      cursor: not-allowed;
      svg path {
        fill: #999;
      }
    }
    &.active {
      svg path {
        fill: #316DA4;
      }
    }
    + .view-setter {
      margin-left: .75em;
    }
    svg.svg-icon {
      width: 20px;
      height: 20px;
    }
  }
  .grid-table {
    padding: 0 30px;
    .grid-table--header {
      border: 1px solid #DFE2E5;
      border-left: 0;
      border-right: 0;
    }
  }
</style>
