<template>
  <v-sheet :class="['side-sheet', 'docs-sheet', 'mt-3']">
    <p class="sheet-title">
      Шаблоны документов
    </p>
    <template v-if="files.length">
      <template v-for="(file, key) in files">
        <doc-file
          :key="key"
          v-bind="file"
          :mode="mode"
        />
        <v-divider
          v-if="key + 1 !== files.length"
          :key="`divider-${key}`"
        />
      </template>
    </template>
    <p
      v-else
      class="empty-files"
    >
      Пусто
    </p>
    <a
      v-if="files.length && mode === 'view'"
      class="download-all-link"
      href="@download-all-docs"
      @click.prevent
    >
      Скачать все
    </a>
    <a
      v-else-if="mode === 'edit'"
      class="download-all-link"
      href="@add-doc"
      @click.prevent="addDocTempModal = true"
    >
      Добавить шаблон
    </a>
    <add-doc-template-modal
      v-if="addDocTempModal"
      v-model="addDocTempModal"
      @submit="onAddDocTemplate"
    />
  </v-sheet>
</template>

<script>
import DocFile from '@/components/common/DocFile.vue';
import AddDocTemplateModal from '@/components/modals/AddDocTemplate.vue';

export default {
  components: {
    AddDocTemplateModal, DocFile,
  },
  props: {
    files: Array,
    mode: String,
  },
  data: () => ({
    addDocTempModal: false,
  }),
  methods: {
    onAddDocTemplate() {
      console.warn('@onAddDocTemplate'); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="scss">
.docs-sheet {
  // max-height: 426px;
  .download-all-link {
    font-size: 13px;
    line-height: 19px;
  }
  .empty-files {
    font-weight: 300;
    color: $gray;
    font-size: 20px;
    margin-bottom: 0;
  }
}
</style>
