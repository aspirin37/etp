<template>
  <div :class="['doc-file-wrapper', { editable: mode === 'edit' }]">
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

<style lang="scss">
  .doc-file-wrapper {
    position: relative;
    &.editable {
      .doc-file {
        width: calc(100% - 15px);
      }
    }
    .doc-file {
      svg {
        height: 32px;
        width: 32px;
      }
      .col {
        padding-top: 16px;
        padding-bottom: 0;
      }
      .col:first-child {
        width: 32px;
        max-width: 32px;
        margin-right: 1em;
      }
      .col:nth-child(2) {
        width: calc(100% - 32px);
      }
      p:first-child {
        font-size: 13px;
        line-height: 19px;
        word-break: break-all;
        margin-bottom: .5em
      }
      p:nth-child(2) {
        font-size: 13px;
        line-height: 21px;
        color: $gray;
      }
    }
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
</style>
