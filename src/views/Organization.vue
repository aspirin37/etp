<template>
  <v-container
    id="organization-view"
    class="page wizard"
  >
    <organization-header
      v-model="headerForm"
      :mode="mode"
      @cancel="toView"
      @edit="toEdit"
    />
    <v-row
      class="page__body"
      align="start"
    >
      <v-col cols="9">
        <organization-form
          v-model="form"
          class="body__content"
          :mode="mode"
          @edit="toEdit"
        />
      </v-col>
      <v-col cols="3">
        <organization-side-rates :rates="rates" />
        <organization-side-files :files="form.doc_files" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationHeader from '@/components/layout/organization/header.vue';
import OrganizationForm from '@/components/layout/organization/form/index.vue';
import OrganizationSideFiles from '@/components/layout/organization/side-files.vue';
import OrganizationSideRates from '@/components/layout/organization/side-rates.vue';
// import '@/assets/images/lukoil-example.jpg';

export default {
  name: 'Organization',
  components: {
    OrganizationHeader, OrganizationForm, OrganizationSideFiles, OrganizationSideRates,
  },
  data: () => ({
    rates: [{
      name: 'Основные данные',
      value: 75,
    }, {
      name: 'Банковские реквизиты',
      value: 60,
    }, {
      name: 'Данные о руководителе',
      value: 25,
    }, {
      name: 'Контактное лицо',
      value: 55,
    }, {
      name: 'Шаблоны документов',
      value: 35,
    }, {
      name: 'Данные о лицевом счете',
      value: 5,
    }],
    form: {
      checked: true,
      logo: '@/assets/images/lukoil-example.jpg',
      full_name: 'ПАО «Нефтяная компания Лукойл»',
      short_name: 'Нефтяная компания "ЛУКОЙЛ", ПАО',
      inn: '7708004767',
      kpp: '770801001',
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
      order: [{
        name: 'Приказ от 12.09.99 «Нефтяная компания «ЛУКОЙЛ».doc',
        link: '/Приказ от 12.09.99 «Нефтяная компания «ЛУКОЙЛ».doc',
      }, {
        name: 'Основание и приказ публичного акционерное общество «Нефтяная компания «ЛУКОЙЛ».doc',
        link: '/Основание и приказ публичного акционерное общество «Нефтяная компания «ЛУКОЙЛ».doc',
      }],
      contact_fio: 'Михаил Клочков',
      contact_post: 'Секретарь',
      contact_phone: '8 (495) 627-44-44',
      contact_email: 'michael.klochkov@citi.com',
      account_number: '087106003296',
      account_number_balance: '360,00 ₽',
      transaction_history: '123456789',
      // doc_files: [],
      doc_files: [{
        name: 'A_Living_Russian_Grammar_Beginner.pdf',
        link: '/A_Living_Russian_Grammar_Beginner.pdf',
        size: '7.6 МБ',
      }, {
        name: 'Penguin_Russian_Course_A_Complete_Course.pdf',
        link: '/Penguin_Russian_Course_A_Complete_Course.pdf',
        size: '7.6 МБ',
      }, {
        name: 'Менеджмент.rar',
        link: '/Менеджмент.rar',
        size: '11.2 МБ',
      }],
    },
  }),
  computed: {
    headerForm: ({ form: { checked, full_name, logo, site } }) => ({ // eslint-disable-line camelcase, object-curly-newline
      checked,
      full_name,
      logo,
      site,
    }),
    mode: ({ $route }) => ($route.name === 'Organization-edit' ? 'edit' : 'view'),
  },
  methods: {
    toEdit() {
      this.$router.push({ name: 'Organization-edit' });
    },
    toView() {
      this.$router.push({ name: 'Organization' });
    },
  },
};
</script>

<style lang="scss">
  #organization-view {
    .body__content {
      min-height: calc(100vh - 400px - 6em);
    }
    .v-expansion-panel-header {
      font-weight: 500
    }
    .v-expansion-panel-content {
      .row {
        .col {
          padding: 8px 12px;
          &:first-child {
            font-size: 13px;
            line-height: 22px;
            color: $gray;
          }
          &:nth-child(2) {
            font-weight: 300;
            font-size: 13px;
            line-height: 22px;
            color: $fontBlack;
          }
        }
      }
    }
    .side-sheet {
      padding: 1.5em;
      .doc-file {
        svg {
          height: 32px;
          width: 32px;
        }
        .col {
          padding-top: 16px;
          padding-bottom: 0;
        }
        .col:first-child {
          width: 32px;
          max-width: 32px;
          margin-right: 1em;
        }
        .col:nth-child(2) {
          width: calc(100% - 32px);
        }
        p:first-child {
          font-size: 13px;
          line-height: 19px;
          word-break: break-all;
          margin-bottom: .5em
        }
        p:nth-child(2) {
          font-size: 13px;
          line-height: 21px;
          color: $gray;
        }
      }
    }
    .sheet-title {
      font-size: 14px;
      line-height: 22px;
    }
    .docs-sheet {
      max-height: 426px;
      .download-all-link {
        font-size: 13px;
        line-height: 19px;
      }
      .empty-files {
        font-weight: 300;
        color: $gray;
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    .rates-sheet {
      .v-progress-linear {
        border-radius: 10px;
        .v-progress-linear__background {
          background-color: $lightGray !important;
        }
        .v-progress-linear__determinate {
          &.green {
            background: linear-gradient(90deg, #2BB415 2.15%, #5AD946 97.85%);
          }
          &.orange {
            background: linear-gradient(90deg, #F69F39 2.15%, #F6C739 97.85%);
          }
          &.red {
            background: linear-gradient(90deg, #B41515 2.15%, #D94646 97.85%);
          }
        }
      }
      .rating-round {
        height: 100px;
        width: 100px;
        position: relative;
        margin: 1em auto;
        h1 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          font-weight: 300;
          font-size: 30px;
          line-height: 100px;
          text-align: center;
        }
      }
      .row {
        justify-content: space-between;
        font-size: 13px;
        line-height: 27px;
        color: $gray;
        margin-top: 1em;
      }
    }
    .v-btn .v-btn__content {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
