<template>
  <div class="userProductsBuy pt-7">
    <PositionModal
      v-model="positionModalVisible"
      @submit="onSubmit"
    />
    <div class="userProductsBuy__control userProductsBuy__wrapper mb-3">
      <div class="row">
        <div class="col-auto pr-1">
          <Dropdown
            :split="true"
            variant="warning"
            @click="positionModalVisible = true"
          >
            Добавить позицию<template v-slot:dropdown-content>
              <DropdownItem href="#">
                Создать из файла
              </DropdownItem><DropdownItem href="#">
                Создать вручную
              </DropdownItem>
            </template>
          </Dropdown>
        </div>
        <div class="col d-flex align-self-end justify-content-end" />
      </div>
    </div>
    <Table
      class="userProductsBuy__table"
      :fields="renderedFields"
      :rows="items"
    >
      <template v-slot:head(control)>
        <v-popover>
          <ButtonIcon
            class="userProductsBuy__tableHeadButton"
            icon-name="search"
          /><ButtonIcon
            class="userProductsBuy__tableHeadButton"
            icon-name="settings"
          /><template slot="popover">
            <TableColumnSwitcher v-model="fields" />
          </template>
        </v-popover>
      </template><template v-slot:cell(select)="{ row }">
        <span class="d-flex align-items-center"><Checkbox
          class="mb-0"
          size="sm"
          @input="selectRow(row.id)"
        /></span>
      </template><template v-slot:cell(name)="{ row }">
        <span
          v-tooltip="{
            boundariesElement: 'body',
            content: row.name,
            placement: 'top'
          }"
        >{{ row.name }}</span>
      </template><template v-slot:cell(okpd2)="{ row }">
        {{ row.okpd2 && row.okpd2.name }}
      </template><template v-slot:cell(count)="{ row }">
        <v-text-field
          v-model.number="row.quantity"
          hide-details="hide-details"
          outlined="outlined"
          dense="dense"
        />
      </template>
      <template
        v-slot:cell(okei)="{ row }"
      >
        {{ row.okei && row.okei.fullName }}
      </template><template v-slot:cell(control)="{ row }">
        <span class="d-flex justify-content-center"><ButtonIcon
          class="mr-1"
          icon-name="edit"
          size="sm"
          @click.native="showUpdateModal(row)"
        /><ButtonIcon
          class="mr-1"
          icon-name="remove"
          size="sm"
          @click.native="removePosition(row.id)"
        /></span>
      </template>
    </Table>
    <div
      class="userProductsBuy__pagination userProductsBuy__wrapper"
    >
      <Pagination>
        <PaginationItem :to="'/'">
          1
        </PaginationItem>
      </Pagination>
    </div>
  </div>
</template>

<script>

import ButtonIcon from '@/components/common/ButtonIcon.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import Dropdown, { DropdownItem } from '@/components/common//Dropdown.vue';
import Pagination, { PaginationItem } from '@/components/common/Pagination.vue';
import Table from '@/components/common/Table.vue';
import TableColumnSwitcher from '@/components/common/TableColumnSwitcher.vue';

import PositionModal from '@/components/modals/PositionModal.vue';

export default ({
  name: 'UserProductsBuy',
  components: {
    ButtonIcon,
    Checkbox,
    Dropdown,
    DropdownItem,
    Pagination,
    PaginationItem,
    Table,
    TableColumnSwitcher,
    PositionModal,
  },
  data() {
    return {
      fields: [{
        key: 'name',
        label: 'Наименование позиции контрагента',
      }, {
        key: 'okei',
        label: 'ЕИ',
      }, {
        key: 'count',
        label: 'Количество',
      }, {
        _style: {
          textAlign: 'right',
        },
        key: 'okpd2',
        label: 'ОКПД2',
      }, {
        key: 'description',
        label: 'Комментарий',
      }],
      items: [],
      positionModalVisible: false,
      positionEdited: undefined,
    };
  },
  computed: {
    renderedFields() {
      const selectField = {
        _style: {
          padding: '15px 47px',
        },
        _sticky: {
          left: '0px',
        },
        key: 'select',
        label: 'Выбор',
      };

      const controlField = {
        _style: {
          padding: '0',
        },
        _sticky: {
          right: '0px',
        },
        key: 'control',
        label: 'Колонки',
      };

      const fields = JSON.parse(JSON.stringify(this.fields));
      fields.unshift(selectField);
      fields.push(controlField);

      return fields;
    },
  },
  watch: {
    items: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
    positionModalVisible(val) {
      if (!val) {
        this.positionEdited = undefined;
      }
    },
  },
  methods: {
    onSubmit(data) {
      if (this.positionEdited) {
        this.updatePosition(data);
        return;
      }

      this.createPosition(data);
    },
    selectRow(id) {
      const selectedRowIndex = this.items
        .map((item) => item.id)
        .indexOf(id);
      const selectedField = this.items[selectedRowIndex];

      this.items.splice(selectedRowIndex, 1, {
        ...selectedField,
        _active: !selectedField._active,
      });
    },
    createPosition(data) {
      const item = {
        ...data,
        id: this.items.length,
        comment: data.description,
        position: null,
        quantity: 0,
      };

      this.items.push(item);
      this.positionModalVisible = false;
    },
    showUpdateModal(row) {
      this.positionEdited = JSON.parse(JSON.stringify(row));
      this.positionModalVisible = true;
    },
    updatePosition(data) {
      const itemEdited = {
        ...data,
        comment: data.description,
        quantity: 0,
      };

      this.items = this.items.map((it) => (it.id === itemEdited.id ? itemEdited : it));
      this.positionModalVisible = false;
    },
    removePosition(id) {
      this.items = this.items.filter((it) => it.id !== id);
    },
  },
});
</script>

<style lang="scss" scoped>
.userProductsBuy {
  padding-bottom: 27px;
  padding-top: 30px;

  &__wrapper {
    padding: 0 30px;
  }

  &__search {
    margin-bottom: 20px;
  }

  &__control {
    margin-bottom: 27px;
  }

  &__tableHeadButton {
    height: 48px;
    width: 48px;

    &:not(:last-child) {
      border-right: 1px solid #DFE2E5;
    }
  }

  &__pagination {
    margin-top: 30px;
  }
}
</style>
