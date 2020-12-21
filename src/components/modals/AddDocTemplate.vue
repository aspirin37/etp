<template>
  <v-dialog
    v-model="visible"
    class="modal-primary"
    max-width="620px"
  >
    <v-form
      id="add-doc-template-form"
      autocomplete="off"
      class="modal-primary"
      @submit.prevent="$emit('submit')"
    >
      <div class="modal-primary__header">
        <span>Загрузить шаблон</span>
        <v-btn
          icon
          dark
          @click="visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <file-uploader-drop
            class="file-uploader--doc-template"
            :file-types="['xls', 'xlsx', 'doc', 'pfd', 'txt', 'jpg', 'png']"
          />
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="visible = false"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="submit"
          >
            Добавить
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import FileUploaderDrop from '@/components/common/FileUploaderDrop.vue';

export default {
  name: 'AddDocTemplate',
  components: {
    FileUploaderDrop,
  },
  props: {
    value: {
      type: Boolean,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss">
  #add-doc-template-form {
    .file-uploader--doc-template {
      min-height: 340px;
      padding: 65px 155px;
    }
  }
</style>
