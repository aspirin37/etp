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
          <v-expansion-panel-content class="app-sidebar-navigation__sub">
            <v-radio-group v-model="radioGroup">
              <v-radio
                label="Не выбрано"
                :value="null"
              />
              <v-radio
                label="Новые позиции"
                :value="1"
              />
              <v-radio
                label="Выгодное предложение от …"
                :value="2"
              />
              <v-radio
                label="Актуальные позиции"
                :value="3"
              />
            </v-radio-group>
            <v-btn
              class="ml-auto"
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
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="filters.createDate"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filters.createDate"
                  label="Период"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="filters.createDate"
                no-title
                range
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="filters.createDate = null"
                >
                  Отмена
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Дата предоставления ответа
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            15.08.2020 – 15.09.2020
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Предполагаемая дата поставки
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            15.08.2020 – 15.09.2020
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="wizard__actions">
      <v-btn
        class="ml-auto"
        depressed
        color="primary"
      >
        Применить
      </v-btn>
      <v-btn
        class="ml-auto"
        depressed
      >
        Сбросить
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExternalSearch',
  data: () => ({
    filters: {
      createDate: null,
    },
    panelsOpened: [0],
  }),
};
</script>

<style lang="scss">
  .external-search {
    .v-date-picker-table {
      height: 200px;
    }
  }
</style>
