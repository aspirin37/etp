<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Контактное лицо</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>ФИО</v-col>
          <v-col>{{ getField(form, 'contact_fio') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.contact_fio"
            label="ФИО"
            outlined
          />
        </template>
      </v-row>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>Должность</v-col>
          <v-col>{{ getField(form, 'contact_post') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.contact_post"
            label="Должность"
            outlined
          />
        </template>
      </v-row>
      <template v-if="view">
        <v-row class="field-view">
          <v-col>Телефон</v-col>
          <v-col>{{ getField(form, 'contact_phone') }}</v-col>
        </v-row>
        <v-row class="field-view">
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
      </template>
      <template v-else>
        <v-row>
          <v-col
            class="pl-0"
            cols="6"
          >
            <v-text-field
              v-model="form.contact_phone"
              label="Телефон"
              outlined
            />
          </v-col>
          <v-col
            class="pr-0"
            cols="6"
          >
            <v-text-field
              v-model="form.contact_email"
              label="E-mail"
              outlined
            />
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import formMixin from './mixin';

export default {
  mixins: [formMixin],
};
</script>
