<template>
  <v-row class="file-uploader-drop flex-column">
    <v-col class="pt-8 pb-0">
      <svg-icon
        name="blank-file"
        style="height: 30px; width: 26px;"
      />
    </v-col>
    <v-col class="pt-0 pb-3">
      <p class="px-3">
        Перетащите файл
        <template v-if="fileDescription">
          - {{ fileDescription }}
        </template>
        сюда или
        <a
          href="@uploadLogo"
          @click.prevent
        >
          выберите файл вручную
        </a>
      </p>
      <p v-if="fileTypes" class="file-types">
        Допустимые форматы: {{ fileTypes.join(', ') }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'FileUploaderDrop',
  components: {
    SvgIcon,
  },
  props: {
    fileDescription: String,
    fileTypes: Array,
  },
};
</script>

<style lang="scss">
  .file-uploader-drop {
    min-height: 150px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    border: 1px dashed #A9BDCC;
    border-radius: 6px;
    color: $gray;
    .file-types {
      font-size: 13px;
      line-height: 21px;
    }
  }
</style>
