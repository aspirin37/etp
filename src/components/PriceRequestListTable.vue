<template>
  <div class="main-table price-request-table">
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [20],
      }"
      :server-items-length="total"
      :loading="loading"
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
      <template v-slot:[`item.name`]="{ item }">
        <router-link
          :to="getPriceRequestRoute(item)"
        >
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:[`item.type`]="{ item }">
        {{ priceRequestTypes[item.type] }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ priceRequestStatuses[item.status] }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="16"
          class="mr-2"
          @click="cloneItem(item.id)"
        >
          mdi-content-copy
        </v-icon>
        <v-icon
          v-if="type === 'drafts'"
          size="20"
          @click="removeItem(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  priceRequestTypes,
  priceRequestStatuses,
} from '@/utilities/enums';

import { mapState } from 'vuex';

export default ({
  name: 'PriceRequestListTable',
  props: {
    type: String,
    url: String,
  },
  data() {
    return {
      items: [],
      total: 0,
      options: {
        page: 1,
        itemsPerPage: 20,
      },
      loading: false,
      priceRequestTypes,
      priceRequestStatuses,
    };
  },
  computed: {
    ...mapState(['user']),
    headers() {
      const headers = [
        {
          value: 'name',
          text: 'Наименование ЦЗ',
        }, {
          value: 'type',
          text: 'Тип ЦЗ',
        }, {
          value: 'customer.name',
          text: 'Заказчик',
        }, {
          value: 'responseDate',
          text: 'Дата предоставления ответа на ЦЗ',
          width: '140px',
        }, {
          value: 'delivery.address',
          text: 'Адрес поставки',
        }, {
          value: 'delivery.date',
          text: 'Предполагаемая дата выполнения работ',
          width: '140px',
        }, {
          value: 'status',
          text: 'Статус',
        },
      ];

      if (this.type !== 'inbox' && this.type !== 'actual') {
        headers.push({
          value: 'actions',
          text: 'Действия',
          width: '150px',
          align: 'center',
        });
      }

      return headers;
    },
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
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.loading = true;
      // eslint-disable-next-line
      let { data, headers } = await this.$http.get(this.url, {
        params: { page: this.options.page },
      });

      if (this.type === 'inbox') {
        data = data.map((it) => ({ ...it.quoteRequest, id: it.id }));
      }

      this.items = data.map((it) => ({
        ...it,
        created: it.created ? this.$moment(it.created).format('DD.MM.YYYY, hh:mm') : '',
        responseDate: it.responseDate ? this.$moment(it.responseDate).format('DD.MM.YYYY, hh:mm') : '',
        delivery: {
          ...it.delivery,
          date: it.delivery.date ? this.$moment(it.delivery.date).format('DD.MM.YYYY, hh:mm') : '',
        },
      }));

      this.total = +headers['x-pagination-total-count'];
      this.loading = false;
    },
    async cloneItem(id) {
      try {
        await this.$http.patch(`quote-requests/${id}/clone`);
        this.getItems();
        this.$toast.success('Ценовой запрос успешно скопирован');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removeItem(id) {
      try {
        await this.$http.delete(`quote-requests/${id}`);
        this.getItems();
        this.$toast.success('Ценовой запрос успешно удален');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    getPriceRequestRoute(priceRequest) {
      return {
        name: this.type === 'drafts' ? 'CreatePriceRequest' : 'PriceRequest',
        params: {
          id: priceRequest.id,
        },
        query: {
          analysis: priceRequest.status === 'review' && priceRequest.customer.id === this.user.tenant_id ? true : undefined,
          isQuote: this.type === 'inbox' ? true : undefined,
        },
      };
    },
  },
});
</script>

<style lang="scss">
.price-request-table .v-data-table__wrapper {
  max-height: calc(100vh - 360px);
}
</style>
