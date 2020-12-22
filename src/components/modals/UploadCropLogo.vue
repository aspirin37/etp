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
            <v-slider />
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
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'UploadCropLogoModal',
  components: {
    SvgIcon,
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
