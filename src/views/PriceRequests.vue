<template>
  <div class="page wizard with_sidebar">
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
        ref="PriceRequestListTable"
        :type="tabs[tab].value"
        :url="url"
      />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      // url: 'quotes?status=draft',
    }, {
      text: 'Исходящие ЦЗ',
      value: 'outbox',
      // url: 'quotes?status=!draft',
    }, {
      text: 'Входящие ЦЗ',
      value: 'inbox',
      // url: 'quotes',
    }, {
      text: 'Актуальные ЦЗ',
      value: 'actual',
      // url: 'quote-requests/actual',
    }],
  }),
  computed: {
    ...mapGetters(['extraSearch']),
    tab: {
      get() {
        return this.tabs.findIndex((it) => it.value === this.type);
      },
      set(index) {
        this.$router.replace({ name: 'PriceRequests', params: { type: this.tabs[index].value } });
      },
    },
    url() {
      const s = this.extraSearch;
      const apiUrl = 'quotes';
      const notNullFilters = Object.keys(s)
        .filter((k) => s[k] !== null && s[k] !== false && k !== 'savedSearch')
        .reduce((acc, cur) => Object.assign(acc, { [cur]: s[cur] }), {});
      if (!Object.keys(notNullFilters).length) {
        return apiUrl;
      }

      const restFiltersObj = Object.keys(notNullFilters)
        .reduce((acc, cur) => acc.concat({
          field: cur,
          op: 'eq',
          value: notNullFilters[cur],
        }), []);
      const restFilters = restFiltersObj.reduce((acc, cur, key) => {
        let filter = '';
        Object.keys(cur).forEach((v) => {
          if (filter) {
            filter += '&';
          }
          filter += `filter[${key}][${v}]=${cur[v]}`;
        });
        if (acc) {
          filter = `&${filter}`;
        }
        return acc + filter;
      }, '');
      console.warn(restFilters);
      return `${apiUrl}?${restFilters}`;
    },
  },
  watch: {
    url() {
      this.$nextTick(() => {
        this.$refs.PriceRequestListTable.getItems();
      });
    },
  },
};
</script>
