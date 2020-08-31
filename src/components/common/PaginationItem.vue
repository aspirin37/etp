<template>
  <router-link
    class="paginationItem"
    :exact="true"
    :to="to"
    active-class="paginationItem--active"
  >
    <slot />
  </router-link>
</template>

<script>

export default ({
  name: 'PaginationItem',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.paginationItem {
  border: 1px solid #DFE2E5;
  border-right-width: 0;
  color: #AABDCD;
  display: inline-block;
  font: 500 14px/34px "Roboto";
  height: 36px;
  padding: 0 13.5px;
  transition: color 0.3s ease;

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
    border-right-width: 1px;
  }

  &--active,
  &:hover {
    color: #2E2E2E;
  }
}
</style>
