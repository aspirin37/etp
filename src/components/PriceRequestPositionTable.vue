<template>
  <div class="main-table main-table--full-height">
    <manual-wizard-position-modal
      v-model="manualModalVisible"
      :position-edited="positionEdited"
      @submit="onManualSubmit"
    />
    <user-position-modal
      v-model="userPositionModalVisible"
      :items="items"
      @submit="addPositions"
    />
    <div class="main-table__wrapper mb-3">
      <div class="row">
        <div class="col-auto pr-1">
          <dropdown
            :split="true"
            variant="warning"
            @click="userPositionModalVisible = true"
          >
            Добавить позицию
            <template v-slot:dropdown-content>
              <dropdown-item href="#">
                Создать из файла
              </dropdown-item>
              <dropdown-item @click.prevent.native="manualModalVisible = true">
                Создать вручную
              </dropdown-item>
            </template>
          </dropdown>
        </div>
        <div class="col d-flex align-self-end justify-content-end" />
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :item-class="validatePosition"
      :footer-props="{
        itemsPerPageOptions: [20],
      }"
      :server-items-length="total"
      show-select
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template
        v-for="(it, i) in headers.filter(it => it.editable)"
        v-slot:[`header.${it.value}`]="{ header }"
      >
        <div
          :key="i"
          class="d-flex"
        >
          {{ header.text }}
          <v-icon
            size="16"
            class="ml-auto"
          >
            mdi-pencil
          </v-icon>
        </div>
      </template>
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          mdi-cog
        </v-icon>
      </template>
      <template v-slot:[`item.okei`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.okei"
          save-text="Сохранить"
          cancel-text="Отмена"
          large
          @save="updatePosition(item)"
        >
          {{ item.okei && item.okei.name }}
          <template v-slot:input>
            <okei-autocomplete
              v-model="item.okei"
              hide-details
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.quantity`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.quantity"
          save-text="Сохранить"
          cancel-text="Отмена"
          large
          @save="updatePosition(item)"
        >
          {{ item.quantity }}
          <template v-slot:input>
            <v-text-field
              v-model.number="item.quantity"
              type="number"
              label="Количество"
              hide-details
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.okpd2`]="{ item }">
        <div
          class="cursor-pointer"
          @click="showOkpd2Modal(item)"
        >
          {{ item.okpd2 && item.okpd2.code }}
        </div>
      </template>
      <template v-slot:[`item.comment`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.comment"
          save-text="Сохранить"
          cancel-text="Отмена"
          large
          @save="updatePosition(item)"
        >
          {{ item.comment }}
          <template v-slot:input>
            <v-text-field
              v-model="item.comment"
              label="Комментарий"
              hide-details
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="20"
          class="mr-2"
          @click="showUpdateModal(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="20"
          @click="removePosition(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <okpd2-modal
      v-model="okpd2ModalVisible"
      @submit="positionEdited.okpd2 = $event; updatePosition(positionEdited)"
    />
  </div>
</template>

<script>

import Dropdown, { DropdownItem } from '@/components/common//Dropdown.vue';
import ManualWizardPositionModal from '@/components/modals/ManualWizardPositionModal.vue';
import OkeiAutocomplete from '@/components/OkeiAutocomplete.vue';
import UserPositionModal from '@/components/modals/UserPositionModal.vue';
import Okpd2Modal from '@/components/modals/Okpd2Modal.vue';

export default ({
  name: 'PriceRequestPositionTable',
  components: {
    Dropdown,
    DropdownItem,
    ManualWizardPositionModal,
    OkeiAutocomplete,
    UserPositionModal,
    Okpd2Modal,
  },
  props: {
    positions: Array,
    errors: Array,
    requestId: String,
  },
  data() {
    return {
      headers: [{
        value: 'name',
        text: 'Наименование позиции контрагента',
      }, {
        value: 'okei',
        text: 'ЕИ',
        editable: true,
      }, {
        value: 'quantity',
        text: 'Количество',
        width: '200px',
        editable: true,
      }, {
        value: 'okpd2',
        text: 'ОКПД2',
        editable: true,
      }, {
        value: 'comment',
        text: 'Комментарий',
        editable: true,
      }, {
        value: 'actions',
        text: 'Действия',
        width: '100px',
        align: 'center',
      }],
      items: [],
      total: 0,
      options: {
        page: 1,
        itemsPerPage: 20,
      },
      userPositionModalVisible: false,
      manualModalVisible: false,
      okpd2ModalVisible: false,
      positionEdited: undefined,
    };
  },
  watch: {
    options: {
      handler() {
        this.getPositions();
      },
      deep: true,
    },
    items: {
      handler(val) {
        this.$emit('update:positions', val);
        this.$emit('update:errors', val.filter((it) => it.quantity <= 0 && this.errors.includes(it.id)).map((it) => it.id));
      },
      deep: true,
    },
  },
  created() {
    this.getPositions();
  },
  methods: {
    showOkpd2Modal(position) {
      this.okpd2ModalVisible = true;
      this.positionEdited = position;
    },
    async onManualSubmit(data) {
      if (this.positionEdited) {
        await this.updatePosition(data);
      } else {
        await this.createPosition(data);
      }

      this.getPositions();
    },
    async getPositions() {
      const { data, headers } = await this.$http.get(`quote-requests/${this.requestId}/items`, {
        params: { page: this.options.page },
      });
      this.items = data;
      this.total = +headers['x-pagination-total-count'];

      return Promise.resolve();
    },
    async addPositions(positions) {
      const promises = positions.map((it) => this.createPosition(it));

      await Promise.all(promises);
      this.getPositions();
    },
    async createPosition(position) {
      const item = {
        ...position,
        okei: position.okei.code,
        okpd2: position.okpd2.code,
        specifications: '',
        quantity: position.quantity || null,
        positionId: position.id || null,
      };

      await this.$http.post(`quote-requests/${this.requestId}/items`, item);

      this.manualModalVisible = false;
      this.positionEdited = undefined;
      return Promise.resolve();
    },
    showUpdateModal(item) {
      this.positionEdited = JSON.parse(JSON.stringify(item));
      this.manualModalVisible = true;
    },
    async updatePosition(position) {
      const item = {
        ...position,
        okei: position.okei.code,
        okpd2: position.okpd2.code,
        specifications: '',
        quantity: position.quantity || null,
        positionId: position.id || null,
      };

      await this.$http.put(`quote-requests/${this.requestId}/items/${item.positionId || this.positionEdited.id}`, item);

      this.manualModalVisible = false;
      this.positionEdited = undefined;
      return Promise.resolve();
    },
    async removePosition(id) {
      await this.$http.delete(`quote-requests/${this.requestId}/items/${id}`);
      this.getPositions();
    },
    validatePosition({ id }) {
      return this.errors.find((it) => it === id) ? 'red lighten-5' : '';
    },
  },
});
</script>
