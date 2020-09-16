<template>
  <div class="logo">
    <transition
      name="fade-group"
      mode="out-in"
    >
      <svg-icon
        v-if="mini"
        key="logo--mini"
        name="logo-mini"
        class="logo__icon logo__icon--mini"
      />
      <svg-icon
        v-else
        key="logo"
        name="logo"
        class="logo__icon"
      />
    </transition>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'AppSidebarLogo',
  components: {
    SvgIcon,
  },
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  align-items: center;
  background-color: $blue;
  color: $white;
  display: flex;
  height: 122px;

  &__icon {
    margin: auto 0;
    margin-left: 30px;
    height: 57px;
    width: 173px;

    &--mini {
      margin: auto;
      height: 42px;
      width: 40px;
    }
  }
}
</style>
