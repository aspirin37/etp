<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Заказы
      </h1>
    </div>
    <v-tabs
      v-model="tab"
      class="tabs-primary"
    >
      <v-tab
        v-for="(it, i) in tabs"
        :key="i"
        :ripple="false"
      >
        {{ it.text }}
      </v-tab>
    </v-tabs>
    <v-card
      class="pa-0"
      flat="flat"
    >
      <purchase-order-list-table
        :type="tabs[tab].value"
        :url="tabs[tab].url"
      />
    </v-card>
  </div>
</template>
<script>
import PurchaseOrderListTable from '@/components/PurchaseOrderListTable.vue';

export default {
  name: 'PriceRequests',
  components: {
    PurchaseOrderListTable,
  },
  props: {
    type: {
      type: String,
      default: 'drafts',
    },
  },
  data: () => ({
    tabs: [{
      text: 'Исходящие заказы',
      value: 'outbox',
      url: 'purchase-orders',
    }, {
      text: 'Входящие заказы',
      value: 'inbox',
      url: 'purchase-orders/inbox',
    }],
  }),
  computed: {
    tab: {
      get() {
        return this.tabs.findIndex((it) => it.value === this.type);
      },
      set(index) {
        this.$router.replace({ name: 'PurchaseOrders', params: { type: this.tabs[index].value } });
      },
    },
  },
};
</script>
