<template>
  <div class="pagination">
    <PaginationItem :to="'/'">
      <SvgIcon
        class="pagination__arrow"
        name="left-arrow"
      />
    </PaginationItem>
    <slot />
    <PaginationItem :to="'/'">
      <SvgIcon
        class="pagination__arrow"
        name="right-arrow"
      />
    </PaginationItem>
  </div>
</template>

<script>
import PaginationItem from '@/components/common/PaginationItem.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';

export default ({
  name: 'Pagination',
  components: {
    PaginationItem,
    SvgIcon,
  },
});

export { PaginationItem };
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;

  &__arrow {
    height: 11px;
    width: 7px;
  }
}
</style>
