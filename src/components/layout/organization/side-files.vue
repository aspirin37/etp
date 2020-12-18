<template>
  <v-sheet class="side-sheet docs-sheet mt-3">
    <p class="sheet-title">
      Шаблоны документов
    </p>
    <template v-for="(file, key) in files">
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
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  components: {
    SvgIcon,
  },
  props: {
    files: Array,
  },
};
</script>

<style lang="sass">
</style>
