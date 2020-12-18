<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Основные данные</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <template v-if="view">
          <v-col>Полное наименование</v-col>
          <v-col>{{ getField(form, 'full_name') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.full_name"
            label=">Полное наименование"
            outlined
            focused
          />
        </template>
      </v-row>
      <v-row>
        <template v-if="view">
          <v-col>Краткое наименование</v-col>
          <v-col>{{ getField(form, 'short_name') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.short_name"
            label="Краткое наименование"
            outlined
          />
        </template>
      </v-row>
      <template v-if="view">
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
      </template>
      <template v-else>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="form.inn"
              label="ИНН"
              outlined
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="form.kpp"
              label="КПП"
              outlined
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="form.ogrn"
              label="ОГРН"
              outlined
            />
          </v-col>
        </v-row>
      </template>
      <v-row>
        <template v-if="view">
          <v-col>Юридический адрес</v-col>
          <v-col>{{ getField(form, 'legal_address') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.legal_address"
            label="Юридический адрес"
            outlined
          />
        </template>
      </v-row>
      <v-row>
        <template v-if="view">
          <v-col>Почтовый адрес</v-col>
          <v-col>{{ getField(form, 'mailing_address') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.mailing_address"
            label="Почтовый адрес"
            outlined
          />
        </template>
      </v-row>
      <template v-if="view">
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
      </template>
      <template v-else>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.site"
              label="Адрес сайта"
              outlined
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.email"
              label="Официальная электронная почта"
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
