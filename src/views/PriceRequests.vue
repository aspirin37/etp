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
            v-model="searchNameValue"
            clearable
            label="Поиск по наименованию номеру, наименованию ЦЗ"
            outlined
            @keypress.enter="appendSearchName"
          />
            <!-- <span slot="append-inner">
              хуй!
            </span>
            <span slot="prepend">
              хуй!
            </span> -->
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
import clone from '@/utilities/clone';

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
    searchNameValue: null,
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
      const s = clone(this.extraSearch);
      const StringFields = ['name', 'customer', 'fio'];
      const DateFields = ['createDate', 'responseDate', 'reportDate', 'deliveryDate'];
      const opData = {};
      let apiUrl = 'quotes';
      function getOp(fieldName) {
        if (opData[fieldName]) {
          return opData[fieldName];
        }
        if (StringFields.includes(fieldName)) {
          return 'contains';
        // } else if (DateFields.includes(fieldName)) {
        //   return 'eq' // ?
        }

        return 'eq';
      }

      // eslint-disable-next-line default-case
      switch (this.type) {
        case 'drafts':
          apiUrl = 'quote-requests';
          s.status = 'draft';
          break;
        case 'outbox':
          apiUrl = 'quote-requests';
          s.status = 'draft';
          opData.status = 'neq';
          break;
        case 'inbox':
          apiUrl = 'quotes';
          break;
        case 'actual':
          apiUrl = 'quote-requests/actual';
          break;
      }
      // console.log(s);
      const notNullFilters = Object.keys(s)
        .filter((k) => s[k] !== null && s[k] !== false && k !== 'savedSearch')
        .reduce((acc, cur) => Object.assign(acc, { [cur]: s[cur] }), {});
      if (!Object.keys(notNullFilters).length) {
        return apiUrl;
      }

      // console.log(notNullFilters);
      const restFiltersObj = Object.keys(notNullFilters)
        .reduce((acc, cur) => {
          let value = notNullFilters[cur];
          if (DateFields.includes(cur) && value) {
            value = `${value}T00:00:00%2B00:00`;
          }

          return acc.concat({
            field: cur,
            op: getOp(cur, value),
            value,
          });
        }, []);
      // console.log(restFiltersObj);
      const restFilters = restFiltersObj.reduce((acc, cur, key) => {
        let filter = '';
        Object.keys(cur).forEach((v) => {
          if (filter) {
            filter += '&';
          }
          filter += `filters[${key}][${v}]=${cur[v]}`;
        });
        if (acc) {
          filter = `&${filter}`;
        }
        return acc + filter;
      }, '');
      return `${apiUrl}?${restFilters}`;
      // return `${apiUrl}?status=draft`; // not works, why?!
    },
  },
  watch: {
    url() {
      this.$nextTick(() => {
        this.$refs.PriceRequestListTable.getItems();
      });
    },
  },
  methods: {
    ...mapActions(['toggleExtraSearchSidebar']),
    appendSearchName() {
      console.warn('u sooqa!');
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
