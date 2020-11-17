<template>
  <div class="main-table main-table--full-height">
    <v-data-table
      :headers="headers"
      :items="positionsComputed"
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
      <template v-slot:[`item.price`]="{ item }">
        <v-text-field
          v-model="item.price"
          v-currency
          hide-details
          outlined
          dense
          @change="updatePosition(item)"
        />
      </template>
      <template v-slot:[`item.vat`]="{ item }">
        <v-select
          v-model="item.vat"
          :items="[20, 10, 0]"
          item-text="text"
          item-value="value"
          hide-details
          outlined
          dense
          @change="updatePosition(item)"
        />
      </template>
      <template v-slot:[`item.deliverable`]="{ item }">
        <v-select
          v-model="item.deliverable"
          :items="deliverableOptions"
          item-text="text"
          item-value="value"
          hide-details
          outlined
          dense
          @change="updatePosition(item)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default ({
  name: 'PriceRequestSupplierPositionTable',
  props: {
    id: String,
    quoteId: [String, Object],
    isQuote: {
      type: Boolean,
      default: false,
    },
    quotePositions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      positions: [],
      deliverableOptions: [{
        text: 'Да',
        value: true,
      }, {
        text: 'Нет',
        value: false,
      }],
      vatOptions: [{
        text: '20',
        value: 20,
      }, {
        text: '10',
        value: 10,
      }, {
        text: '0',
        value: 0,
      }, {
        text: 'Без НДС',
        value: null,
      }],
    };
  },
  computed: {
    headers() {
      const headers = [{
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
      }];

      const quoteHeaders = [{
        value: 'price',
        text: 'Цена',
        width: '200px',
      }, {
        value: 'vat',
        text: 'НДС',
        width: '200px',
      }, {
        value: 'deliverable',
        text: 'Могу поставить',
        width: '100px',
      }];

      if (this.isQuote) {
        return headers.concat(quoteHeaders);
      }

      return headers;
    },
    positionsComputed() {
      return this.isQuote ? this.quotePositions : this.positions;
    },
  },
  created() {
    this.getPositions();
  },
  methods: {
    async getPositions() {
      const { data } = await this.$http.get(`quote-requests/${this.id}/items`);
      this.positions = data;
    },
    async updatePosition(position) {
      await this.$http.put(`quotes/${this.quoteId}/items/${position.id}`, {
        price: this.$ci.parse(position.price),
        vat: position.vat,
        deliverable: position.deliverable,
      });
    },
  },
});
</script>
