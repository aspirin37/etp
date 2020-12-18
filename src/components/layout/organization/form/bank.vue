<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Банковские реквизиты</v-expansion-panel-header>
    <v-expansion-panel-content>
      <template v-if="view">
        <v-row class="field-view">
          <v-col>Расчетный счет</v-col>
          <v-col>{{ getField(form, 'checking_account') }}</v-col>
        </v-row>
        <v-row class="field-view">
          <v-col>БИК</v-col>
          <v-col>{{ getField(form, 'bik') }}</v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.checking_account"
              label="Расчетный счет"
              outlined
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.bik"
              label="БИК"
              outlined
            />
          </v-col>
        </v-row>
      </template>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>Корреспондентский счет</v-col>
          <v-col>{{ getField(form, 'correspondent_account') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.correspondent_account"
            label="Корреспондентский счет"
            outlined
          />
        </template>
      </v-row>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>Адрес банка</v-col>
          <v-col>{{ getField(form, 'bank_address') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.bank_address"
            label="Адрес банка"
            outlined
          />
        </template>
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
