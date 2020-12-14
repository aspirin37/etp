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
            v-for="(it, i) in headers"
            :key="it.id"
            class="analysis__sticky-cell"
            :class="[
              {'bordered': it.isSupplier},
              i === headers.length - 1 ? 'text-left' : 'text-center',
            ]"
          >
            <a
              v-if="it.isSupplier"
              href="#"
              color="accent"
              @click.prevent="selectWinner(it.id, it.quoteId)"
            >
              {{ it.id === winner ? 'Выбрано' : 'Выбрать' }}
            </a>
            <a
              v-if="i === headers.length - 1"
              href="#"
              class="text-left"
              @click.prevent="resetWinner"
            >
              Сбросить выбор
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
            {{ toCurrency(it.prices[supplier.id]) }}
          </td>
          <td>
            <v-select
              v-model="winners"
              :items="supplierOptions"
              item-text="text"
              item-value="value"
              class="price-request-select"
              placeholder="Не выбрано"
              clearable
              hide-details
              outlined
              dense
            />
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
          <td :colspan="3">
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
          <td />
        </tr>
        <tr>
          <td :colspan="3">
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
          <td />
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
          <td :colspan="3">
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
          <td />
        </tr>
        <tr>
          <td :colspan="3">
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
          <td />
        </tr>
        <tr>
          <td
            v-for="(it, i) in headers"
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
            <v-btn
              v-if="i === headers.length - 1"
              color="error"
              :disabled="!winner"
              depressed
              @click="resetWinner"
            >
              Сбросить выбор
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
      }, {
        value: 'okeiName',
        text: 'ЕИ',
      }],
      winnerHeader: {
        text: 'Победитель',
      },
      supplierOptions: [],
      winners: [],
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

      this.supplierOptions = data.map((it) => ({
        text: it.supplier.name,
        value: it.supplier.id,
      }));

      this.headers = this.staticHeaders.concat(supplierHeaders);
      this.headers.push(this.winnerHeader);

      const positions = [];
      const map = new Map();

      data.forEach((supplier) => {
        Object.values(supplier.items).forEach((position) => {
          if (!map.has(position.id)) {
            map.set(position.id, true);
            positions.push({
              ...position,
              okeiName: position.okei.name,
              prices: {
                [supplier.id]: position.price,
              },
            });
            return;
          }
          // eslint-disable-next-line
          positions.find((it) => it.id === position.id).prices[supplier.id] = position.price;
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
    resetWinner() {
      this.winner = null;
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

  .price-request-select {
    width: 240px;
  }

  // .not-sticky th, td {
  //   position: relative !important;
  // }
</style>
