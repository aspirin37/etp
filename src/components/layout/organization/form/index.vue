<template>
  <v-sheet>
    <v-form @submit.prevent="save">
      <v-expansion-panels
        v-model="contentPanels"
        flat
        multiple
      >
        <organization-form-basic
          :form="form"
          :mode="mode"
        />
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
              <v-col>
                <p
                  v-for="orderFile in form.order"
                  :key="orderFile.name"
                >
                  <a
                    :href="orderFile.link"
                    target="_blank"
                  >
                    {{ orderFile.name }}
                  </a>
                </p>
              </v-col>
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
                <a
                  :href="form.contact_email ? `mailto:${form.contact_email}` : null"
                  target="_blank"
                >
                  {{ getField('contact_email') }}
                </a>
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
              <v-col>
                <a
                  :href="`/fake-get-transactions/${getField('transaction_history')}`"
                  @click.prevent
                >
                  Смотреть историю транзакций
                </a>
              </v-col>
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
        @click="$emit('edit')"
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
            type="submit"
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
    </v-form>
    <delete-organization-modal
      v-if="deleteModal"
      v-model="deleteModal"
      @submit="onDelete"
    />
  </v-sheet>
</template>

<script>
import { get, isNil } from 'lodash-es';
import DeleteOrganizationModal from '@/components/modals/DeleteOrganization.vue';
import OrganizationFormBasic from './basic.vue';

export default {
  name: 'OrganizationForm',
  components: {
    DeleteOrganizationModal, OrganizationFormBasic,
  },
  model: {
    prop: 'form',
  },
  props: {
    form: Object,
    mode: String,
  },
  data: () => ({
    contentPanels: [0, 1, 2, 3, 4],
    deleteModal: false,
  }),
  methods: {
    getField(field, defaultValue = '—') {
      const value = get(this.form, field);
      if (isNil(value)) {
        return defaultValue;
      }
      return value;
    },
    onDelete() {
      console.warn('@delete API'); // eslint-disable-line no-console
    },
    toView() {
      this.$router.push({ name: 'Organization' });
    },
    remove() {
      this.deleteModal = true;
    },
    save() {
      console.warn('@save'); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="sass">
</style>
