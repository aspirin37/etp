<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Данные о руководителе</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>ФИО</v-col>
          <v-col>{{ getField(form, 'ceo_fio') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.ceo_fio"
            label="ФИО"
            outlined
          />
        </template>
      </v-row>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>Должность</v-col>
          <v-col>{{ getField(form, 'ceo_post') }}</v-col>
        </template>
        <template v-else>
          <v-text-field
            v-model="form.ceo_post"
            label="Должность"
            outlined
          />
        </template>
      </v-row>
      <v-row :class="{'field-view': view}">
        <template v-if="view">
          <v-col>Срок действия основания</v-col>
          <v-col>{{ getField(form, 'date_foundation') }}</v-col>
        </template>
        <template v-else>
          <!-- ДЕЙСТВУЮЩЕЕ? Date picker?! Research it please -->
          <!-- <v-menu
            v-model="pickerDateFoundationOpened"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date_foundation"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.date_foundation"
              @input="pickerDateFoundationOpened = false"
            ></v-date-picker>
          </v-menu> -->
        </template>
      </v-row>
      <template v-if="view">
        <v-row class="field-view">
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
      </template>
      <template v-else>
        <file-uploader-drop
          class="file-uploader--order"
          file-description="основание (приказ, доверенность и т.п.)"
        />
        <doc-file
          v-for="(orderFile, key) in form.order"
          :key="key"
          v-bind="orderFile"
          mode="edit"
        />
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import DocFile from '@/components/common/DocFile.vue';
import FileUploaderDrop from '@/components/common/FileUploaderDrop.vue';
import formMixin from './mixin';

export default {
  components: {
    DocFile, FileUploaderDrop,
  },
  mixins: [formMixin],
  data: () => ({
    pickerDateFoundationOpened: false,
  }),
};
</script>
