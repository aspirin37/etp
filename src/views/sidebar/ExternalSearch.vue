<template>
  <div class="external-search">
    <v-btn
      class="external-search__closer"
      icon
      @click="close"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="title">
      Расширенный поиск
    </div>
    <div>
      <v-expansion-panels
        v-model="panelsOpened"
        class="external-search--panels"
        accordion
        multiple
        flat
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            Сохранённые поиски
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-radio-group v-model="filters.savedSearch">
              <v-radio
                v-for="(v,k) in savedSearches"
                :key="k"
                :label="v"
                :value="k"
              />
            </v-radio-group>
            <v-btn
              class="ml-auto mb-3"
              depressed
            >
              Сохранить активный поиск
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Номер ЦЗ
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="filters.number"
              clearable
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="type !== 'drafts'">
          <v-expansion-panel-header>
            Номер Заказа
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="filters.orderNumber"
              clearable
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="type !== 'drafts'">
          <v-expansion-panel-header>
            Статус
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              v-model="filters.status"
              class="mb-4"
              clearable
              dense
              :items="priceRequestStatuses"
              hide-details
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="type === 'drafts' || type === 'outbox'">
          <v-expansion-panel-header>
            ФИО создавшего пользователя
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="filters.fio"
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Заказчик
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="filters.customer"
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Тип ЦЗ
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              v-model="filters.type"
              class="mb-4"
              clearable
              dense
              :items="priceRequestTypes"
              hide-details
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Регион поставки
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              v-model="filters.region"
              :items="['г. Москва']"
              placeholder="Город"
              value="г. Москва"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="type === 'drafts' || type === 'outbox'">
          <v-expansion-panel-header>
            Дата создания ЦЗ
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <date-picker
              v-model="filters.createDate"
              label="Период"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="type === 'outbox'">
          <v-expansion-panel-header>
            Дата отправки ЦЗ
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <date-picker
              v-model="filters.responseDate"
              label="Период"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Дата предоставления ответа
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <date-picker
              v-model="filters.reportDate"
              label="Период"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Предполагаемая дата поставки
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <date-picker
              v-model="filters.deliveryDate"
              label="Период"
            />
            <!-- 15.08.2020 – 15.09.2020 -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-checkbox
        v-if="type !== 'drafts'"
        v-model="filters.showHidden"
        class="mx-5"
        label="Показать скрытые ЦЗ"
      />
    </div>
    <div class="wizard__actions external-search--actions justify-md-space-around">
      <v-btn
        depressed
        color="primary"
        @click="apply"
      >
        Применить
      </v-btn>
      <v-btn
        depressed
        @click="reset"
      >
        Сбросить
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getExtraSearchDefault } from '@/store';
import datePicker from '@/components/common/DatePicker.vue';
import clone from '@/utilities/clone';
import { priceRequestTypes, priceRequestStatuses } from '@/utilities/enums';

export default {
  name: 'ExternalSearch',
  components: { datePicker },
  props: {
    type: String,
  },
  data: () => ({
    filters: getExtraSearchDefault(),
    panelsOpened: [0, 1, 2, 3, 4, 5],
    priceRequestTypes: Object.keys(priceRequestTypes).map((status) => ({ text: priceRequestTypes[status], value: status })),
    priceRequestStatuses: Object.keys(priceRequestStatuses).map((status) => ({ text: priceRequestStatuses[status], value: status })),
    savedSearches: ['Не выбрано', 'Новые позиции', 'Выгодное предложение от …', 'Актуальные позиции'],
  }),
  computed: {
    ...mapGetters(['extraSearch']),
  },
  mounted() {
    this.filters = clone(this.extraSearch);
  },
  methods: {
    ...mapActions(['setExtraSearch', 'toggleExtraSearchSidebar']),
    apply() {
      this.setExtraSearch(clone(this.filters));
    },
    close() {
      this.toggleExtraSearchSidebar();
    },
    reset() {
      this.filters = getExtraSearchDefault();
      this.apply();
    },
  },
};
</script>

<style lang="scss">
  .external-search {
    .external-search__closer {
      position: absolute;
      top: 5px;
      right: 5px;
    }
    .title {
      padding: 16px 24px;
    }
    .v-date-picker-table {
      height: 200px;
    }
    .v-expansion-panel {
      .v-expansion-panel-header {
        min-height: 36px;
        padding-bottom: 8px;
        padding-top: 8px;
      }
      .v-expansion-panel-content__wrap {
        padding-bottom: 0;
      }
    }
    .external-search--actions {
      padding: 16px 24px;
    }
  }
</style>
