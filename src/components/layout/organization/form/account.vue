<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Данные по лицевому счёту</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>Номер лицевого счета</v-col>
        <v-col>{{ getField(form, 'account_number') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Остаток на лицевом счету</v-col>
        <v-col>{{ getField(form, 'account_number_balance') }}</v-col>
      </v-row>
      <v-row v-if="view">
        <v-col>История транзакций</v-col>
        <v-col>
          <a
            :href="`/fake-get-transactions/${getField(form, 'transaction_history')}`"
            @click.prevent
          >
            Смотреть историю транзакций
          </a>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import formMixin from './mixin';

export default {
  mixins: [formMixin],
};
</script>
