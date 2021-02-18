<template>
  <v-dialog
    v-model="visible"
    class="modal-primary"
    max-width="620px"
  >
    <v-form
      id="upload-crop-logo-form"
      autocomplete="off"
      class="modal-primary"
      @submit.prevent="$emit('submit')"
    >
      <div class="modal-primary__header">
        <span>Фото профиля</span>
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
          <p>
            Выберите область, которая будет отображаться на вашем фото профиля.
          </p>
          <template v-if="src">
            <vue-croppie
              ref="croppieRef"
              :boundary="{ width: 230, height: 230 }"
              :show-zoomer="false"
              :viewport="{ width: 230, height: 230, type: 'circle' }"
            />
          </template>
          <template v-else>
            <file-uploader-drop :file-types="['jpg', 'png']" />
          </template>
        </div>
        <v-row
          align="center"
          class="modal-primary__actions"
          no-gutters
        >
          <v-col cols="3">
            <v-btn
              class="ml-auto"
              depressed="depressed"
              @click="visible = false"
            >
              Отмена
            </v-btn>
          </v-col>
          <v-col
            class="text-center"
            cols="1"
          >
            <svg-icon
              class="min-image-icon"
              name="image"
            />
          </v-col>
          <v-col cols="4">
            <v-slider
              v-model="sliderVal"
              :min="minZoom"
              :max="maxZoom"
              @input="setZoom"
            />
          </v-col>
          <v-col
            class="text-center"
            cols="1"
          >
            <svg-icon name="image" />
          </v-col>
          <v-col
            class="text-right"
            cols="3"
          >
            <v-btn
              class="ml-2"
              depressed="depressed"
              color="primary"
              type="submit"
            >
              Сохранить
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import FileUploaderDrop from '@/components/common/FileUploaderDrop.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'UploadCropLogoModal',
  components: {
    FileUploaderDrop, SvgIcon,
  },
  props: {
    src: String,
    value: {
      type: Boolean,
    },
  },
  data: () => ({
    maxZoom: 1,
    minZoom: 100,
    sliderVal: 1,
  }),
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
  mounted() {
    if (this.value && this.src) {
      this.$refs.croppieRef.bind({
        // url: this.src,
        url: 'http://www.soulbounce.com/wp-content/uploads/2019/10/Tyler-The-Creator-I-Think-Still.jpg',
      });
      setTimeout(() => this.initZoom(), 1000);
    }
  },
  methods: {
    initZoom() {
      if (!this.$refs.croppieRef.croppie.elements) return;

      this.maxZoom = this.$refs.croppieRef.croppie.elements.zoomer.max * 100;
      this.minZoom = this.$refs.croppieRef.croppie.elements.zoomer.min * 100;
      this.sliderVal = this.$refs.croppieRef.croppie.elements.zoomer.value * 100;
    },
    setZoom(value) {
      this.$refs.croppieRef.setZoom(value / 100);
    },
  },
};
</script>

<style lang="scss">
  #upload-crop-logo-form {
    .modal-primary__content {
      font-weight: 300;
      font-size: 14px;
      line-height: 22px;
      min-height: 500px;
      text-align: center;
    }
    .min-image-icon {
      width: 16px;
      height: 32px;
    }
    .v-input__slider .v-messages {
      display: none;
    }
  }
</style>
