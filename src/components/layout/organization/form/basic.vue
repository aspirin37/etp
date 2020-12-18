<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Основные данные</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>Полное наименование</v-col>
        <v-col>{{ getField(form, 'full_name') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Краткое наименование</v-col>
        <v-col>{{ getField(form, 'short_name') }}</v-col>
      </v-row>
      <v-row>
        <v-col>ИНН</v-col>
        <v-col>{{ getField(form, 'inn') }}</v-col>
      </v-row>
      <v-row>
        <v-col>КПП</v-col>
        <v-col>{{ getField(form, 'kpp') }}</v-col>
      </v-row>
      <v-row>
        <v-col>ОГРН</v-col>
        <v-col>{{ getField(form, 'ogrn') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Юридический адрес</v-col>
        <v-col>{{ getField(form, 'legal_address') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Почтовый адрес</v-col>
        <v-col>{{ getField(form, 'mailing_address') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Адрес сайта</v-col>
        <v-col>
          <a
            :href="form.site || null"
            target="_blank"
          >
            {{ getField(form, 'site') }}
          </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col>Официальная электронная почта</v-col>
        <v-col>
          <a :href="form.email ? `mailto:${form.email}`: null">{{ getField(form, 'email') }}</a>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { getField } from '@/utilities/form';

export default {
  props: {
    form: Object,
    mode: String,
  },
  methods: {
    getField,
  },
};
</script>

<style lang="sass">
</style>
