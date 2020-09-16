<template>
  <div class="position-table pt-3">
    <manual-wizard-position-modal
      v-model="manualModalVisible"
      :position-edited="positionEdited"
      @submit="onManualSubmit"
    />
    <user-position-modal
      v-model="userPositionModalVisible"
      :items.sync="items"
      @submit="addPositions"
    />
    <div class="position-table__wrapper mb-3">
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
            create
          </v-icon>
        </div>
      </template>
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          settings
        </v-icon>
      </template>
      <template v-slot:[`item.okei`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.okei"
          save-text="Сохранить"
          cancel-text="Отмена"
          large
        >
          {{ item.okei && item.okei.fullName }}
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
          @click="okpd2ModalVisible = true"
        >
          {{ item.okpd2 && item.okpd2.name }}
        </div>
        <okpd2-modal
          v-model="okpd2ModalVisible"
          @submit="item.okpd2 = $event"
        />
      </template>
      <template v-slot:[`item.description`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.description"
          save-text="Сохранить"
          cancel-text="Отмена"
          large
        >
          {{ item.description }}
          <template v-slot:input>
            <v-text-field
              v-model="item.description"
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
          color="primary"
          @click="showUpdateModal(item)"
        >
          create
        </v-icon>
        <v-icon
          size="20"
          color="primary"
          @click="removePosition(item.id)"
        >
          delete_outlined
        </v-icon>
      </template>
    </v-data-table>
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
        value: 'description',
        text: 'Комментарий',
        editable: true,
      }, {
        value: 'actions',
        text: 'Действия',
        width: '100px',
        align: 'center',
      }],
      items: [],
      userPositionModalVisible: false,
      manualModalVisible: false,
      okpd2ModalVisible: false,
      positionEdited: undefined,
    };
  },
  watch: {
    items: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    onManualSubmit(data) {
      if (this.positionEdited) {
        this.updatePosition(data);
        return;
      }

      this.createPosition(data);
    },
    addPositions(data) {
      const items = data.map((it) => ({
        ...it,
        position: it.id,
        comment: it.description,
        editing: false,
      }));

      this.items = this.items.filter((it) => !it.position).concat(items);
    },
    createPosition(data) {
      const item = {
        ...data,
        id: this.items.length,
        comment: data.description,
        position: null,
        editing: false,
      };

      this.items.push(item);
      this.manualModalVisible = false;
      this.positionEdited = undefined;
    },
    showUpdateModal(item) {
      this.positionEdited = JSON.parse(JSON.stringify(item));
      this.manualModalVisible = true;
    },
    updatePosition(data) {
      const itemEdited = {
        ...data,
        comment: data.description,
      };

      this.items = this.items.map((it) => (it.id === itemEdited.id ? itemEdited : it));
      this.manualModalVisible = false;
      this.positionEdited = undefined;
    },
    removePosition(id) {
      this.items = this.items.filter((it) => it.id !== id);
    },
  },
});
</script>
