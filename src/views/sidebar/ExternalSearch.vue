<template>
  <div class="external-search">
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
            <v-radio-group v-model="savedSearch">
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
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            ФИО создавшего пользователя
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
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
              placeholder="Все"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Тип ЦЗ
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
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
              :items="['г. Москва']"
              placeholder="Город"
              value="г. Москва"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
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
    </div>
    <div class="wizard__actions external-search--actions justify-md-space-around">
      <v-btn
        depressed
        color="primary"
      >
        Применить
      </v-btn>
      <v-btn
        depressed
      >
        Сбросить
      </v-btn>
    </div>
  </div>
</template>

<script>
import datePicker from '@/components/common/DatePicker.vue';

const defaultFilters = () => ({
  createDate: null,
});

export default {
  name: 'ExternalSearch',
  components: { datePicker },
  data: () => ({
    filters: defaultFilters(),
    panelsOpened: [0, 1, 2, 3, 4, 5],
    savedSearch: 0,
    savedSearches: ['Не выбрано', 'Новые позиции', 'Выгодное предложение от …', 'Актуальные позиции'],
  }),
  methods: {
    reset() {
      this.filters = this.defaultFilters();
    },
  },
};
</script>

<style lang="scss">
  .external-search {
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
