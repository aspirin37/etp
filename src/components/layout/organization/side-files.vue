<template>
  <v-sheet :class="['side-sheet', 'docs-sheet', 'mt-3', { 'editable': mode === 'edit' }]">
    <p class="sheet-title">
      Шаблоны документов
    </p>
    <div
      v-for="(file, key) in files"
      :key="key"
      class="doc-file-wrapper"
    >
      <v-row
        :key="key"
        class="doc-file"
        :href="file.link"
        tag="a"
        @click.prevent
      >
        <v-col>
          <svg-icon name="doc-file" />
        </v-col>
        <v-col>
          <p>{{ file.name }}</p>
          <p>{{ file.size }}</p>
        </v-col>
      </v-row>
      <a
        v-if="mode === 'edit'"
        class="delete-link"
        href="@delete-doc-file"
        @click.prevent="deleteFile"
      >
        <svg-icon name="trash-can" />
      </a>
      <v-divider
        v-if="key + 1 !== files.length"
        :key="`divider-${key}`"
      />
    </div>
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
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  components: {
    SvgIcon,
  },
  props: {
    files: Array,
    mode: String,
  },
  methods: {
    deleteFile() {
      console.warn('@deleteFile'); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="scss">
  .docs-sheet {
    &.editable {
      .doc-file-wrapper .doc-file {
        width: calc(100% - 15px);
      }
    }
    .doc-file-wrapper {
      position: relative;
      .delete-link {
        position: absolute;
        top: 15px;
        right: 0;
        svg {
          width: 13px;
          height: 14px;
        }
      }
    }
  }
</style>
