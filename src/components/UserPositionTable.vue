<template>
  <div class="main-table pt-3">
    <manual-user-position-modal
      v-if="positionModal"
      v-model="positionModal"
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
            @click="positionModal = true"
          >
            Добавить позицию
            <template v-slot:dropdown-content>
              <dropdown-item href="#">
                Создать из файла
              </dropdown-item>
              <dropdown-item @click.prevent.native="positionModal = true">
                Создать вручную
              </dropdown-item>
            </template>
          </dropdown>
        </div>
      </div>
    </div>
    <v-data-table
      v-if="items.length"
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
        {{ item.okei && item.okei.fullName }}
      </template>
      <template v-slot:[`item.okpd2`]="{ item }">
        {{ item.okpd2 && item.okpd2.name }}
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
  </div>
</template>

<script>
import Dropdown, { DropdownItem } from '@/components/common//Dropdown.vue';
import ManualUserPositionModal from '@/components/modals/ManualUserPositionModal.vue';

export default {
  name: 'UserPositions',
  components: {
    Dropdown,
    DropdownItem,
    ManualUserPositionModal,
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
    positionEdited: undefined,
  }),
  computed: {
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
        value: 'description',
        text: 'Комментарий',
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
      const params = {
        ...data,
        okpd2: data.okpd2.id,
        okei: data.okei.id,
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
        await this.$http.post(`/positions/${id}/clone`);
        this.getPositions();
        this.$toast.success('Позиция успешно скопирована');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removePosition(id) {
      try {
        await this.$http.delete(`positions/${id}`);
        this.getPositions();
        this.$toast.success('Позиция успешно удалена');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
  },
};
</script>
