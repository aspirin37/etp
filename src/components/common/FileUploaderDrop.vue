<template>
  <v-row
    ref="dropWindow"
    :class="['file-uploader-drop', 'flex-column', { '--dragging': dragging }]"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <input
      ref="inputFile"
      :accept="fileTypes ? fileTypes.map(f => `.${f}`).join(',') : null"
      class="d-none"
      type="file"
      @change="onDropChangeFile"
    >
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
          @click.prevent="$refs.inputFile.click()"
        >
          выберите файл вручную
        </a>
      </p>
      <p
        v-if="fileTypes"
        class="file-types"
      >
        Допустимые форматы: {{ fileTypes.join(', ') }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import byteSize from 'byte-size';
import FileType from 'file-type/browser';
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'FileUploaderDrop',
  components: {
    SvgIcon,
  },
  props: {
    fileDescription: String,
    fileTypes: Array,
    maxSize: {
      type: [String, Number],
      default: 5000000, // bytes
    },
  },
  data: () => ({
    dragging: false,
    file: null,
  }),
  mounted() {
    document.addEventListener('drop', this.onDropChangeFile);
    window.addEventListener('dragover', (event) => {
      event.preventDefault();
    }, false);
    window.addEventListener('drop', (event) => {
      event.preventDefault();
    }, false);
  },
  methods: {
    clear() {
      this.file = null;
    },
    onDropChangeFile(e) {
      e.preventDefault();
      const files = e.target.files || e.dataTransfer.files;
      // console.warn('@drop', files);

      if (!files.length) {
        this.dragging = false;
        this.$toast.danger('Не файл!');
        return;
      }

      for (const file of files) {
        // console.log(file);
        this.createFile(file);
      }
    },
    async createFile(file) {
      // console.warn(file);
      // console.warn(FileType);
      if (this.fileTypes) {
        const { ext } = await FileType.fromBlob(file);
        // console.warn(ext, this.fileTypes.includes(ext));
        if (!this.fileTypes.includes(ext)) {
          this.$toast.danger('Неправильный формат');
          this.dragging = false;
          return;
        }
      }

      if (file.size > parseFloat(this.maxSize)) {
        this.$toast.danger(`Файл больше чем ${byteSize(this.maxSize)}`);
        this.dragging = false;
        return;
      }

      if (Array.isArray(this.file)) {
        this.file.push(file);
      } else if (this.file) {
        this.file = [this.file, file];
      } else {
        this.file = file;
      }
      this.$toast.info('Загружаем...');
      this.dragging = false;

      // function callbackDelete() {
      //   if (Array.isArray(this.file)) {
      //     const fileId = this.file.findId((f) => f === file);
      //     if (fileId > -1) {
      //       this.file.splice(fileId, 1);
      //     } else {
      //       console.warn('callbackDelete: finded file to delete not finded!'); // eslint-disable-line no-console
      //     }
      //   } else if (file === this.file) {
      //     this.clear();
      //   }
      // }
      // console.log(callbackDelete);

      // this.$emit('upload', file, callbackDelete);
      this.$emit('upload', file);
    },
    onDragEnter() {
      // console.warn('@dragenter', e);
      this.dragging = true;
    },
    onDragLeave(e) {
      // console.warn('@dragleave', e);
      if (this.$refs.dropWindow.contains(e.fromElement || e.relatedTarget)) {
        return;
      }
      this.dragging = false;
    },
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
    &.--dragging {
      color: $blue;
      border-color: $blue;
    }
    .file-types {
      font-size: 13px;
      line-height: 21px;
    }
  }
</style>
