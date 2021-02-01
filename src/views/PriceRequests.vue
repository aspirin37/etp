<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Реестры ЦЗ
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
      height="100%"
    >
      <price-request-list-table
        :type="tabs[tab].value"
        :url="tabs[tab].url"
      />
    </v-card>
  </div>
</template>

<script>
import PriceRequestListTable from '@/components/PriceRequestListTable.vue';

export default {
  name: 'PriceRequests',
  components: {
    PriceRequestListTable,
  },
  props: {
    type: {
      type: String,
      default: 'drafts',
    },
  },
  data: () => ({
    tabs: [{
      text: 'Черновики',
      value: 'drafts',
      url: 'quote-requests?status=draft',
    }, {
      text: 'Исходящие ЦЗ',
      value: 'outbox',
      url: 'quote-requests?status=!draft',
    }, {
      text: 'Входящие ЦЗ',
      value: 'inbox',
      url: 'quotes',
    }, {
      text: 'Актуальные ЦЗ',
      value: 'actual',
      url: 'quote-requests/actual',
    }],
  }),
  computed: {
    tab: {
      get() {
        return this.tabs.findIndex((it) => it.value === this.type);
      },
      set(index) {
        this.$router.replace({ name: 'PriceRequests', params: { type: this.tabs[index].value } });
      },
    },
  },
};
</script>
