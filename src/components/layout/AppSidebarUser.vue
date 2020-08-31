<template lang="pug">
  .app-sidebar-user
    v-avatar.app-sidebar-user__avatar(:class="{'app-sidebar-user__avatar--mini': mini}", color='teal', size='40')
      | В
    transition(name='fade')
      .app-sidebar-user__wrapper(v-if='!mini')
        v-expansion-panels(flat='', accordion='')
          v-expansion-panel
            v-expansion-panel-header
              .d-flex.flex-column
                .app-sidebar-user__name
                  | Иван Иванов
                .app-sidebar-user__organization
                  | МГУ им. Ломоносова
            v-expansion-panel-content
              router-link.app-sidebar__link.app-sidebar__link--sub(to='/organization')
                | Организация
              router-link.app-sidebar__link.app-sidebar__link--sub(to='/finance')
                | Финансы
              span.app-sidebar__link.app-sidebar__link--sub(@click.prevent='')
                | Выход
    v-divider.mt-auto
</template>

<script>
export default {
  name: 'AppSidebarUser',
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.v-application .app-sidebar-user {
  display: flex;
  flex-direction: column;
  min-height: 160px;

  &__avatar {
    color: white;
    font-size: 16px;
    margin-top: 20px;
    margin-left: 30px;
    transition: all 0.3s ease;

    &--mini {
      margin-left: 20px;
      transition: 0.3s all 0.3s ease;
    }
  }

  &__wrapper {
    padding: 30px;
    padding-top: 20px;
  }

  &__name {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__organization {
    color: $gray;
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
