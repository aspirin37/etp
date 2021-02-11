<template>
  <div>
    <confirmation-modal
      v-model="cloneConfirmModal"
      text="Ценовой запрос будет скопирован"
      width="400"
      @submit="cloneItem"
    />
    <confirmation-modal
      v-model="deletionConfirmModal"
      text="Ценовой запрос будет удален"
      width="500"
      @submit="removeItem"
    />
    <div class="main-table price-request-table">
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :footer-props="{
          itemsPerPageOptions: [20],
        }"
        :server-items-length="total"
        :hide-default-footer="!items.length"
        :loading="loading"
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
            @click="selectedItem = item.id; cloneConfirmModal = true"
          >
            mdi-content-copy
          </v-icon>
          <v-icon
            v-if="type === 'drafts'"
            size="20"
            @click="
              selectedItem = item.id; deletionConfirmModal = true"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import confirmationModal from '@/components/modals/ConfirmationModal.vue';

import {
  priceRequestTypes,
  priceRequestStatuses,
} from '@/utilities/enums';

import { mapState } from 'vuex';

export default ({
  name: 'PriceRequestListTable',
  components: {
    confirmationModal,
  },
  props: {
    type: String,
    url: String,
  },
  data() {
    return {
      items: [],
      total: 0,
      options: {
        _firstInit: true,
        page: 1,
        itemsPerPage: 20,
      },
      loading: false,
      priceRequestTypes,
      priceRequestStatuses,
      cloneConfirmModal: false,
      deletionConfirmModal: false,
      selectedItem: null,
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
      handler(v, _v) {
        if (_v._firstInit) {
          delete this.options._firstInit;
          return;
        }
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
    async cloneItem() {
      try {
        await this.$http.patch(`quote-requests/${this.selectedItem}/clone`);
        this.getItems();
        this.$toast.success('Ценовой запрос успешно скопирован');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removeItem() {
      try {
        await this.$http.delete(`quote-requests/${this.selectedItem}`);
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
