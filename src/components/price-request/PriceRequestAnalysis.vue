<template>
  <div class="main-table main-table--full-height analysis">
    <v-data-table
      :headers="headers"
      :items="positions"
      hide-default-footer
      disable-pagination
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:body="props">
        <tr class="position-relative">
          <td
            v-for="it in headers"
            :key="it.id"
            class="analysis__sticky-cell text-center"
            :class="{'bordered': it.isSupplier}"
          >
            <a
              v-if="it.isSupplier"
              href="#"
              color="accent"
              @click.prevent="selectWinner(it.id, it.quoteId)"
            >
              {{ it.id === winner ? 'Выбрано' : 'Выбрать' }}
            </a>
          </td>
        </tr>
        <tr
          v-for="(it, i) in props.items"
          :key="i"
        >
          <td
            v-for="header in staticHeaders"
            :key="it[header.value]"
          >
            {{ it[header.value] }}
          </td>
          <td
            v-for="supplier in suppliers"
            :key="supplier.id"
            class="text-center"
            :class="{
              'lowest-price': getLowestPrice(it.prices, supplier.id),
              'font-weight-bold': supplier.supplier.id === winner,
            }"
          >
            {{ it.prices[supplier.id] }}
          </td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            :colspan="headers.length"
          >
            Стоимость
          </td>
        </tr>
        <tr>
          <td :colspan="2">
            Итого без НДС
          </td>
          <td
            v-for="it in suppliers"
            :key="it.id"
            class="text-center"
            :class="{'font-weight-bold': it.supplier.id === winner}"
          >
            {{ toCurrency(it.totalVat) }}
          </td>
        </tr>
        <tr>
          <td :colspan="2">
            Итого с НДС
          </td>
          <td
            v-for="it in suppliers"
            :key="it.id"
            class="text-center"
            :class="{'font-weight-bold': it.supplier.id === winner}"
          >
            {{ toCurrency(it.totalSum) }}
          </td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            :colspan="headers.length"
          >
            Доставка
          </td>
        </tr>
        <tr>
          <td :colspan="2">
            Дата доставки
          </td>
          <td
            v-for="it in suppliers"
            :key="it.id"
            class="text-center"
            :class="{'font-weight-bold': it.supplier.id === winner}"
          >
            {{ it.delivery.date | moment('DD.MM.YYYY') }}
          </td>
        </tr>
        <tr>
          <td :colspan="2">
            Стоимость доставки
          </td>
          <td
            v-for="it in suppliers"
            :key="it.id"
            class="text-center"
            :class="{'font-weight-bold': it.supplier.id === winner}"
          >
            {{ toCurrency(it.delivery.price) }}
          </td>
        </tr>
        <tr>
          <td
            v-for="it in headers"
            :key="it.id"
            class="text-center"
          >
            <v-btn
              v-if="it.isSupplier"
              color="accent"
              :disabled="it.id === winner"
              depressed
              @click="selectWinner(it.id, it.quoteId)"
            >
              {{ it.id === winner ? 'Выбрано' : 'Выбрать' }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default ({
  name: 'PriceRequestAnalysis',
  props: {
    id: String,
  },
  data() {
    return {
      staticHeaders: [{
        value: 'name',
        text: 'Наименование позиции контрагента',
      }, {
        value: 'quantity',
        text: 'Количество',
      }],
      headers: [],
      positions: [],
      suppliers: [],
      winner: null,
    };
  },
  created() {
    this.getAnalysis();
  },
  methods: {
    async getAnalysis() {
      const { data } = await this.$http.get(`quote-requests/${this.id}/analysis`);

      this.suppliers = data;

      const supplierHeaders = data.map((it, i) => ({
        value: `supplier-${i}`,
        text: it.supplier.name,
        id: it.supplier.id,
        isSupplier: true,
        quoteId: it.id,
      }));

      this.headers = this.staticHeaders.concat(supplierHeaders);

      const positions = [];
      const map = new Map();

      data.forEach((supplier) => {
        Object.values(supplier.items).forEach((position) => {
          if (!map.has(position.id)) {
            map.set(position.id, true);
            positions.push({
              ...position,
              prices: {
                [supplier.id]: this.toCurrency(position.price),
              },
            });
            return;
          }
          // eslint-disable-next-line
          positions.find((it) => it.id === position.id).prices[supplier.id] = this.toCurrency(position.price);
        });
      });

      this.positions = positions;
    },
    getLowestPrice(prices, supplierId) {
      return Array.from(Object.entries(prices))
        .map(([key, value]) => ({
          supplierId: key,
          price: value,
        }))
        .filter((it) => it.price !== null)
        .sort((a, b) => a.price - b.price)[0].supplierId === supplierId;
    },
    async selectWinner(supplierId, quoteId) {
      this.winner = supplierId;
      await this.$http.patch(`quote-requests/${this.id}/winner`, { quoteId });
      this.$emit('winner-selected', this.winner);
    },
    toCurrency(value) {
      if (typeof value !== 'number') {
        return value;
      }

      return value.toLocaleString('ru-RU', { minimumFractionDigits: 2 });
    },
  },
});
</script>

<style lang="scss">
  .lowest-price {
    background-color: #cffdd2 !important;
  }

  td.bordered {
    box-shadow: inset 0 -1px #DFE2E5, inset 0 0px #DFE2E5, inset 1px 0 #DFE2E5 !important;
  }

  // .not-sticky th, td {
  //   position: relative !important;
  // }
</style>
