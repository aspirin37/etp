<template>
  <v-container
    id="organization-view"
    class="page wizard"
  >
    <organization-header
      v-model="headerForm"
      :mode="mode"
      @edit="toEdit"
    />
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
                  <v-col>{{ getField('full_name') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Краткое наименование</v-col>
                  <v-col>{{ getField('short_name') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>ИНН</v-col>
                  <v-col>{{ getField('inn') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>КПП</v-col>
                  <v-col>{{ getField('kpp') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>ОГРН</v-col>
                  <v-col>{{ getField('ogrn') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Юридический адрес</v-col>
                  <v-col>{{ getField('legal_address') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Почтовый адрес</v-col>
                  <v-col>{{ getField('mailing_address') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Адрес сайта</v-col>
                  <v-col>
                    <a :href="form.site ? `mailto:${form.site}` : null">{{ getField('site') }}</a>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>Официальная электронная почта</v-col>
                  <v-col>
                    <a :href="form.email ? `mailto:${form.email}`: null">{{ getField('email') }}</a>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Банковские реквизиты</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>Расчетный счет</v-col>
                  <v-col>{{ getField('checking_account') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>БИК</v-col>
                  <v-col>{{ getField('bik') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Корреспондентский счет</v-col>
                  <v-col>{{ getField('correspondent_account') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Адрес банка</v-col>
                  <v-col>{{ getField('bank_address') }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные о руководителе</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>ФИО</v-col>
                  <v-col>{{ getField('ceo_fio') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Должность</v-col>
                  <v-col>{{ getField('ceo_post') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Срок действия основания</v-col>
                  <v-col>{{ getField('date_foundation') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Основание (приказ, доверенность и т.п.)</v-col>
                  <v-col>{{ getField('order') }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Контактное лицо</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>ФИО</v-col>
                  <v-col>{{ getField('contact_fio') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Должность</v-col>
                  <v-col>{{ getField('contact_post') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Телефон</v-col>
                  <v-col>{{ getField('contact_phone') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>E-mail</v-col>
                  <v-col>
                    <a :href="form.contact_email ? `mailto:${form.contact_email}` : null">{{ getField('contact_email') }}</a>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Данные по лицевому счёту</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>Номер лицевого счета</v-col>
                  <v-col>{{ getField('account_number') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Остаток на лицевом счету</v-col>
                  <v-col>{{ getField('account_number_balance') }}</v-col>
                </v-row>
                <v-row>
                  <v-col>История транзакций</v-col>
                  <v-col>{{ getField('transaction_history') }}</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider />
          <v-btn
            v-if="mode === 'view'"
            class="ma-8"
            color="primary"
            depressed
            @click="toEdit"
          >
            Редактировать
          </v-btn>
          <div
            v-else-if="mode === 'edit'"
            class="d-flex justify-space-between"
          >
            <div class="d-inline-flex ma-8">
              <v-btn
                class=""
                depressed
                @click="toView"
              >
                Отмена
              </v-btn>
              <v-btn
                class="ml-2"
                color="primary"
                depressed
                @click="save"
              >
                Сохранить
              </v-btn>
            </div>
            <v-btn
              class="ma-8"
              depressed
              @click="remove"
            >
              Удалить профиль
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <v-sheet class="side-sheet rates-sheet">
          <div class="rating-round">
            <v-progress-circular
              :color="totalRate > 50 ? 'green' : (totalRate < 25 ? 'red' : 'orange')"
              rotate="-90"
              size="100"
              :value="totalRate"
              width="5"
            />
            <h1>{{ totalRate }}%</h1>
          </div>
          <v-container>
            <v-row
              v-for="rate in rates"
              :key="rate.name"
            >
              <span>{{ rate.name }}</span>
              <span>{{ rate.value }}%</span>
              <v-progress-linear
                :key="rate.name"
                background-opacity="1"
                :color="rate.value > 50 ? 'green' : (rate.value < 25 ? 'red' : 'orange')"
                :value="rate.value"
              />
            </v-row>
          </v-container>
        </v-sheet>
        <v-sheet class="side-sheet docs-sheet mt-3">
          <p class="sheet-title">
            Шаблоны документов
          </p>
          <template v-for="(file, key) in form.doc_files">
            <v-row
              :key="key"
              class="doc-file"
              :href="file.link"
              tag="a"
              @click.prevent
            >
              <v-col>
                <svg-icon name="doc-file" />
              </v-col>
              <v-col>
                <p>{{ file.name }}</p>
                <p>{{ file.size }}</p>
              </v-col>
            </v-row>
            <v-divider
              v-if="key + 1 !== form.doc_files.length"
              :key="`divider-${key}`"
            />
          </template>
          <a
            v-if="form.doc_files.length"
            class="download-all-link"
            href="@download-all-docs"
            @click.prevent
          >
            Скачать все
          </a>
          <p
            v-else
            class="empty-files"
          >
            Пусто
          </p>
        </v-sheet>
        <!-- </v-col> -->
      </v-col>
    </v-row>
    <delete-organization-modal
      v-if="deleteModal"
      v-model="deleteModal"
      @submit="onDelete"
    />
  </v-container>
</template>

<script>
import { get, isNil } from 'lodash-es';
import SvgIcon from '@/components/common/SvgIcon.vue';
import OrganizationHeader from '@/components/layout/organization/header.vue';
import DeleteOrganizationModal from '@/components/modals/DeleteOrganization.vue';
// import '@/assets/images/lukoil-example.jpg';

export default {
  name: 'Organization',
  components: {
    DeleteOrganizationModal, OrganizationHeader, SvgIcon,
  },
  data: () => ({
    contentPanels: [0, 1, 2, 3, 4],
    deleteModal: false,
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
      transaction_history: 'Смотреть историю транзакций',
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
    totalRate: ({ rates }) => Math.ceil(rates.reduce((acc, cur) => acc + cur.value, 0) / rates.length),
  },
  methods: {
    getField(field, defaultValue = '—') {
      const value = get(this.form, field);
      if (isNil(value)) {
        return defaultValue;
      }
      return value;
    },
    save() {
      console.warn('@save'); // eslint-disable-line no-console
    },
    remove() {
      this.deleteModal = true;
    },
    onDelete() {
      console.warn('@delete API'); // eslint-disable-line no-console
    },
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
