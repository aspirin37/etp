<template>
  <div
    class="page wizard"
    :class="{ 'with_sidebar': showExtraSearchSidebar }"
  >
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
      <v-row class="extra-search-bar">
        <v-col class="extra-search-input">
          <v-text-field
            :value="searchNameValue"
            label="Поиск по наименованию номеру, наименованию ЦЗ"
            disabled
            outlined="outlined"
          >
          </v-text-field>
        </v-col>
        <v-col class="extra-search-button">
          <v-btn
            color="primary"
            depressed
            @click="toggleExtraSearchSidebar"
          >
            {{ showExtraSearchSidebar ? 'Скрыть поиск' : 'Расширенный поиск' }}
          </v-btn>
        </v-col>
      </v-row>
      <price-request-list-table
        ref="PriceRequestListTable"
        :type="tabs[tab].value"
        :url="url"
      />
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    searchNameValue: '',
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
    ...mapState(['showExtraSearchSidebar']),
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
      return `${apiUrl}?${restFilters}`;
    },
  },
  methods: {
    ...mapActions(['toggleExtraSearchSidebar']),
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

<style lang="scss">
  .row.extra-search-bar {
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    .extra-search-input {
      min-width: calc(100% - 195px);
      max-width: 785px;
      fieldset {
        height: 56px;
      }
    }
    .extra-search-button {
      width: 195px;
      button {
        height: 50px;
      }
    }
  }
</style>
