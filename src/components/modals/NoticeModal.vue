<template>
  <v-dialog
    v-model="visible"
    max-width="400px"
  >
    <div class="noticeModal">
      <SvgIcon
        class="noticeModal__icon"
        :name="icon"
      />
      <div class="noticeModal__title">
        <slot name="title" />
      </div>
      <div class="noticeModal__text">
        <slot name="text" />
      </div>
      <div class="noticeModal__footer">
        <slot name="footer" />
      </div>
    </div>
  </v-dialog>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default ({
  name: 'NoticeModal',
  components: {
    SvgIcon,
  },
  props: {
    icon: {
      type: String,
      default: 'checkCircle',
    },
    value: {
      type: Boolean,
      default: false,
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
});
</script>

<style scoped lang="scss">
.noticeModal {
  color: $white;
  text-align: center;

  &__icon {
    max-height: 60px;
    max-width: 60px;
    height: auto;
    width: auto;
  }

  &__title {
    font: 300 24px/34px "Roboto";
    margin-top: 42px;
  }

  &__text {
    font: 400 14px/22px "Roboto";
    margin-top: 35px;
  }

  &__footer {
    margin-top: 34px;
  }
}
</style>
