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
                  <v-col>{{ form.full_name }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Краткое наименование</v-col>
                  <v-col>{{ form.short_name }}</v-col>
                </v-row>
                <v-row>
                  <v-col>ИНН</v-col>
                  <v-col>{{ form.inn }}</v-col>
                </v-row>
                <v-row>
                  <v-col>КПП</v-col>
                  <v-col>{{ form.kpp }}</v-col>
                </v-row>
                <v-row>
                  <v-col>ОГРН</v-col>
                  <v-col>{{ form.ogrn }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Юридический адрес</v-col>
                  <v-col>{{ form.legal_address }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Почтовый адрес</v-col>
                  <v-col>{{ form.mailing_address }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Адрес сайта</v-col>
                  <v-col>{{ form.site }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Официальная электронная почта</v-col>
                  <v-col>{{ form.email }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Банковские реквизиты</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>Расчетный счет</v-col>
                  <v-col>{{ form.checking_account }}</v-col>
                </v-row>
                <v-row>
                  <v-col>БИК</v-col>
                  <v-col>{{ form.bik }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Корреспондентский счет</v-col>
                  <v-col>{{ form.correspondent_account }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Адрес банка</v-col>
                  <v-col>{{ form.bank_address }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные о руководителе</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>ФИО</v-col>
                  <v-col>{{ form.ceo_fio }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Должность</v-col>
                  <v-col>{{ form.ceo_post }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Срок действия основания</v-col>
                  <v-col>{{ form.date_foundation }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Основание (приказ, доверенность и т.п.)</v-col>
                  <v-col>{{ form.order }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Контактное лицо</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>ФИО</v-col>
                  <v-col>{{ form.contact_fio }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Должность</v-col>
                  <v-col>{{ form.contact_post }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Телефон</v-col>
                  <v-col>{{ form.contact_phone }}</v-col>
                </v-row>
                <v-row>
                  <v-col>E-mail</v-col>
                  <v-col>{{ form.contact_email }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные по лицевому счёту</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>Номер лицевого счета</v-col>
                  <v-col>{{ form.account_number }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Остаток на лицевом счету</v-col>
                  <v-col>{{ form.account_number_balance }}</v-col>
                </v-row>
                <v-row>
                  <v-col>История транзакций</v-col>
                  <v-col>{{ form.transaction_history }}</v-col>
                </v-row>
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
    form: {
      full_name: 'ПАО «Нефтяная компания Лукойл»',
      short_name: 'Нефтяная компания "ЛУКОЙЛ", ПАО',
      inn: '7708004767',
      kpp: '770801001»',
      ogrn: '1027700035769',
      legal_address: 'Москва, Сретенский бульвар, дом 1',
      mailing_address: 'Сретенский бульвар, д.11, Москва, 101000',
      site: 'lukoil.ru',
      email: 'Ekaterina.Sotskova@lukoil.com',
      checking_account: '45378000000',
      bik: '770800476700',
      correspondent_account: '770801001000',
      bank_address: 'Москва, Сретенский бульвар, дом 1',
      ceo_fio: 'Алекперов Вагит Юсуфович',
      ceo_post: 'Президент',
      date_foundation: 'Действующее',
      order: `Приказ от 12.09.99 «Нефтяная компания «ЛУКОЙЛ».doc
        Основание и приказ публичного акционерное общество «Нефтяная компания «ЛУКОЙЛ».doc`,
      contact_fio: 'Михаил Клочков',
      contact_post: 'Секретарь',
      contact_phone: '8 (495) 627-44-44',
      contact_email: 'michael.klochkov@citi.com',
      account_number: '087106003296',
      account_number_balance: '360,00 ₽',
      transaction_history: 'Смотреть историю транзакций',
    },
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
