<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Банковские реквизиты</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>Расчетный счет</v-col>
        <v-col>{{ getField(form, 'checking_account') }}</v-col>
      </v-row>
      <v-row>
        <v-col>БИК</v-col>
        <v-col>{{ getField(form, 'bik') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Корреспондентский счет</v-col>
        <v-col>{{ getField(form, 'correspondent_account') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Адрес банка</v-col>
        <v-col>{{ getField(form, 'bank_address') }}</v-col>
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
