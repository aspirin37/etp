<template>
  <div class="doc-file-wrapper">
    <v-row
      class="doc-file"
      :href="link"
      tag="a"
      @click.prevent="$emit('download')"
    >
      <v-col>
        <svg-icon name="doc-file" />
      </v-col>
      <v-col>
        <p>{{ name }}</p>
        <p>{{ size }}</p>
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
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'DocFile',
  components: {
    SvgIcon,
  },
  props: {
    name: String,
    link: String,
    size: [String, Number],
    mode: {
      type: String,
      default: 'view',
    },
  },
  methods: {
    deleteFile() {
      console.warn('@deleteFile'); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="sass">
</style>
