<template>
  <v-container
    id="organization-view"
    class="page wizard"
  >
    <organization-header />
    <v-row
      class="page__body"
      align="start"
    >
      <v-col cols="9">
        <v-sheet class="body__content">
          <v-expansion-panels
            v-model="contentPanels"
            flat
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header>Основные данные</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>Полное наименование</v-col>
                  <v-col>ПАО «Нефтяная компания Лукойл»</v-col>
                </v-row>
                <v-row>
                  <v-col>Краткое наименование</v-col>
                  <v-col>Нефтяная компания "ЛУКОЙЛ", ПАО</v-col>
                </v-row>
                <v-row>
                  <v-col>ИНН</v-col>
                  <v-col>7708004767</v-col>
                </v-row>
                <v-row>
                  <v-col>КПП</v-col>
                  <v-col>770801001»</v-col>
                </v-row>
                <v-row>
                  <v-col>ОГРН</v-col>
                  <v-col>1027700035769</v-col>
                </v-row>
                <v-row>
                  <v-col>Юридический адрес</v-col>
                  <v-col>Москва, Сретенский бульвар, дом 1</v-col>
                </v-row>
                <v-row>
                  <v-col>Почтовый адрес</v-col>
                  <v-col>Сретенский бульвар, д.11, Москва, 101000</v-col>
                </v-row>
                <v-row>
                  <v-col>Адрес сайта</v-col>
                  <v-col>lukoil.ru</v-col>
                </v-row>
                <v-row>
                  <v-col>Официальная электронная почта</v-col>
                  <v-col>Ekaterina.Sotskova@lukoil.com</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Банковские реквизиты</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные о руководителе</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Контактное лицо</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные по лицевому счёту</v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn
            class="ml-2"
            color="primary"
            depressed
          >
            Редактировать
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <!-- <v-col> -->
        <v-sheet>
          Рейтинг
        </v-sheet>
        <!-- </v-col> -->
        <!-- <v-col> -->
        <v-sheet class="mt-3">
          Шаблоны документов
        </v-sheet>
        <!-- </v-col> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationHeader from '@/components/layout/organization/header.vue';

export default {
  name: 'Organization',
  components: {
    OrganizationHeader,
  },
  data: () => ({
    contentPanels: [0, 1, 2, 3, 4],
  }),
};
</script>

<style lang="scss">
  #organization-view {
    .body__content {
      min-height: calc(100vh - 400px - 6em);
    }
  }
</style>
