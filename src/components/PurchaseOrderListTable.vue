<template>
  <div class="main-table order-list-table">
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [20],
      }"
      :server-items-length="total"
      :loading="loading"
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:[`item.quoteRequest.name`]="{ item }">
        <router-link :to="`/purchase-order/${item.id}`">
          {{ item.quoteRequest.name }}
        </router-link>
      </template>
      <template v-slot:[`item.quoteRequest.type`]="{ item }">
        {{ priceRequestTypes[item.quoteRequest.type] }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ orderStatuses[item.status] }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { orderStatuses, priceRequestTypes } from '@/utilities/enums';

export default ({
  name: 'PriceRequestListTable',
  props: {
    type: String,
    url: String,
  },
  data() {
    return {
      orderStatuses,
      priceRequestTypes,
      headers: [{
        value: 'quoteRequest.name',
        text: 'Наименование ЦЗ',
      }, {
        value: 'quoteRequest.type',
        text: 'Тип ЦЗ',
      }, {
        value: 'customer.name',
        text: 'Заказчик',
      }, {
        value: 'supplier.name',
        text: 'Поставщик',
      }, {
        value: 'delivery.address',
        text: 'Адрес доставки',
      }, {
        value: 'delivery.date',
        text: 'Дата доставки',
      }, {
        value: 'total.sum',
        text: 'Сумма заказа без НДС',
      }, {
        value: 'total.withVat',
        text: 'Сумма заказа с НДС',
      }, {
        value: 'total.withDelivery',
        text: 'Сумма заказа с доставкой',
      }, {
        value: 'total.withDeliveryVat',
        text: 'Сумма с доставкой и НДС',
      }, {
        value: 'status',
        text: 'Статус',
      }],
      items: [],
      total: 0,
      options: {
        page: 1,
        itemsPerPage: 20,
      },
      loading: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    options: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
    type() {
      this.items = [];

      if (this.options.page !== 1) {
        this.options.page = 1;
        return;
      }
      this.getItems();
    },
  },
  methods: {
    async getItems() {
      this.loading = true;
      // eslint-disable-next-line
      let { data, headers } = await this.$http.get(this.url, {
        params: { page: this.options.page },
      });

      this.items = data.map((it) => ({
        ...it,
        delivery: {
          ...it.delivery,
          date: it.delivery.date ? this.$moment(it.delivery.date).format('DD.MM.YYYY') : '',
        },
        total: {
          sum: this.toCurrency(it.total.sum),
          withVat: this.toCurrency(it.total.withVat),
          withDelivery: this.toCurrency(it.total.withDelivery),
          withDeliveryVat: this.toCurrency(it.total.withDeliveryVat),
        },
      }));
      this.total = +headers['x-pagination-total-count'];
      this.loading = false;
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
.order-list-table .v-data-table__wrapper {
  max-height: calc(100vh - 260px);
  white-space: nowrap;
}
</style>
