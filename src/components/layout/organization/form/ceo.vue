<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Данные о руководителе</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>ФИО</v-col>
        <v-col>{{ getField(form, 'ceo_fio') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Должность</v-col>
        <v-col>{{ getField(form, 'ceo_post') }}</v-col>
      </v-row>
      <v-row>
        <v-col>Срок действия основания</v-col>
        <v-col>{{ getField(form, 'date_foundation') }}</v-col>
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
</template>

<script>
import formMixin from './mixin';

export default {
  mixins: [formMixin],
};
</script>
