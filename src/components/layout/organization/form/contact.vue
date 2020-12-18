<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Контактное лицо</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>ФИО</v-col>
        <v-col>{{ getField(form, 'contact_fio') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Должность</v-col>
        <v-col>{{ getField(form, 'contact_post') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Телефон</v-col>
        <v-col>{{ getField(form, 'contact_phone') }}</v-col>
      </v-row>
      <v-row>
        <v-col>E-mail</v-col>
        <v-col>
          <a
            :href="form.contact_email ? `mailto:${form.contact_email}` : null"
            target="_blank"
          >
            {{ getField(form, 'contact_email') }}
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
