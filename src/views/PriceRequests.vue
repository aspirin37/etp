<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Реестры ЦЗ
      </h1>
    </div>
    <v-tabs
      v-model="tabComputed"
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
      class="pa-0 pt-3"
      flat="flat"
    >
      <price-request-list-table />
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
    tab: 0,
    tabs: [{
      text: 'Черновики',
      value: 'drafts',
    }, {
      text: 'Исходящие ЦЗ',
      value: 'outbox',
    }, {
      text: 'Входящие ЦЗ',
      value: 'inbox',
    }, {
      text: 'Актуальные ЦЗ',
      value: 'actual',
    }],
  }),
  computed: {
    tabComputed: {
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
