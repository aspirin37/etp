<template>
  <v-sheet :class="['side-sheet', 'docs-sheet', 'mt-3']">
    <p class="sheet-title">
      Шаблоны документов
    </p>
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
    <a
      v-if="files.length"
      class="download-all-link"
      href="@download-all-docs"
      @click.prevent
    >
      Скачать все
    </a>
    <p
      v-else
      class="empty-files"
    >
      Пусто
    </p>
  </v-sheet>
</template>

<script>
import DocFile from '@/components/common/DocFile.vue';

export default {
  components: {
    DocFile,
  },
  props: {
    files: Array,
    mode: String,
  },
};
</script>
