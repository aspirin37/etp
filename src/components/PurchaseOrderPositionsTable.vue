<template>
  <div class="main-table main-table--full-height">
    <v-data-table
      :headers="headers"
      :items="positions"
      :hide-default-footer="!positions.length"
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:[`item.okei`]="{ item }">
        {{ item.okei && item.okei.name }}
      </template>
      <template v-slot:[`item.okpd2`]="{ item }">
        {{ item.okpd2 && item.okpd2.code }}
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default ({
  name: 'PurchaseOrderPositionsTable',
  props: {
    id: String,
  },
  data() {
    return {
      headers: [{
        value: 'name',
        text: 'Наименование позиции контрагента',
      }, {
        value: 'quantity',
        text: 'Количество',
      }, {
        value: 'okei',
        text: 'ЕИ',
      }, {
        value: 'okpd2',
        text: 'ОКПД2',
      }, {
        value: 'price',
        text: 'Цена',
        width: '200px',
      }, {
        value: 'vat',
        text: 'НДС',
        width: '200px',
      }],
      positions: [],
    };
  },
  created() {
    this.getPositions();
  },
  methods: {
    async getPositions() {
      const { data } = await this.$http.get(`purchase-orders/${this.id}/items`);
      this.positions = data;
    },
  },
});
</script>
