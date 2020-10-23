<template>
  <div class="main-table main-table--full-height">
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
        {{ header.text }}
      </template>
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          mdi-cog
        </v-icon>
      </template>
      <template v-slot:[`item.okei`]="{ item }">
        {{ item.okei && item.okei.name }}
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
        {{ item.okpd2 && item.okpd2.name }}
      </template>
      <template v-slot:[`item.actions`]="">
        <v-icon
          size="20"
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default ({
  name: 'PriceRequestSupplierPositionTable',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
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
        value: 'actions',
        text: 'Действия',
        width: '100px',
        align: 'center',
      }],
    };
  },
});
</script>
