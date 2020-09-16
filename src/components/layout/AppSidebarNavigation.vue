<template>
  <v-expansion-panels
    v-model="panelsOpened"
    class="app-sidebar-navigation"
    :class="{'app-sidebar-navigation--mini': mini}"
    accordion
    multiple
    flat
  >
    <div class="app-sidebar-navigation__item pt-4">
      <div class="app-sidebar-navigation__icon-wrapper">
        <i class="app-sidebar-navigation__badge">1</i>
        <svg-icon
          name="notification"
          class="ma-auto"
        />
      </div>

      <transition name="fade">
        <div
          v-if="!mini"
          class="app-sidebar__link d-flex align-center mb-0"
          @click="notifications = !notifications"
        >
          Уведомления
        </div>
      </transition>
    </div>
    <div
      v-for="(item, i) in navigation"
      :key="i"
      class="app-sidebar-navigation__item"
    >
      <transition name="fade">
        <div
          class="app-sidebar-navigation__item-wrapper"
        >
          <v-expansion-panel v-if="item.children">
            <v-expansion-panel-header class="align-center">
              <div class="app-sidebar-navigation__icon-wrapper">
                <svg-icon
                  :name="item.icon"
                  class="ma-auto"
                />
              </div>
              <transition name="fade">
                <span v-if="!mini">{{ item.label }}</span>
              </transition>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="app-sidebar-navigation__sub">
              <router-link
                v-for="(child, j) in item.children"
                :key="j"
                :to="child.link"
                class="app-sidebar__link app-sidebar__link--sub grey--text"
              >
                {{ child.label }}
              </router-link>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <router-link
            v-else
            :key="i"
            :to="item.link"
            class="app-sidebar__link d-flex align-center mb-0"
          >
            <div class="app-sidebar-navigation__icon-wrapper">
              <svg-icon
                :name="item.icon"
                class="ma-auto"
              />
            </div>
            <transition name="fade">
              <span v-if="!mini">{{ item.label }}</span>
            </transition>
          </router-link>
        </div>
      </transition>
    </div>
  </v-expansion-panels>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  name: 'AppSidebarNavigation',
  components: {
    SvgIcon,
  },
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    notifications: false,
    panelsOpened: [],
    navigation: [{
      label: 'Создать ценовой запрос',
      link: '/create-price-request',
      icon: 'create-price-request',
    }, {
      label: 'Ценовые запросы',
      icon: 'price-request-list',
      children: [{
        label: 'Черновики',
        link: '/price-request/draft',
      }, {
        label: 'Исходящие ЦЗ',
        link: '/price-request/outbox',
      }, {
        label: 'Входящие ЦЗ',
        link: '/price-request/inbox',
      }, {
        label: 'Актуальные ЦЗ',
        link: '/price-request/actual',
      }],
    }, {
      label: 'Заказы',
      icon: 'orders-list',
      children: [{
        label: 'Исходящие заказы',
        link: '/orders/outbox',
      }, {
        label: 'Входящие заказы',
        link: '/orders/inbox',
      }],
    }, {
      label: 'Мои позиции',
      link: '/user-positions',
      icon: 'user-products',
    }],
  }),
  watch: {
    mini(val) {
      if (val) {
        this.panelsOpened = [];
      }
    },
  },
};
</script>

<style lang="scss">
.app-sidebar-navigation {
  display: flex;
  flex-direction: column;
  padding-top: 14px !important;

   .v-expansion-panel-header__icon i {
     opacity: 1;
     transition: all 0.3s ease, 0.3s opacity 0.3s ease;
   }

  &--mini .v-expansion-panel-header__icon i{
    opacity: 0;
    transition: all 0.3s;
  }

  .v-expansion-panel {
    flex: 1 !important;
    margin-top: 8px !important;

    &::before,
    &::after {
      display: none;
    }
  }

  .v-expansion-panel-content__wrap {
    padding-left: 0 !important;
  }

  &__item {
    display: flex;
    margin-bottom: 19px;
    padding-right: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer !important;
  }

  &__item-wrapper {
    display: flex;
    flex-grow: 1;
  }

  &__icon-wrapper {
    position: relative;
    display: flex;
    width: 80px;
    height: 30px;
    flex: 0 0 auto !important;

    svg {
      margin: auto;
    }
  }

  &__badge {
    background-color: $orange;
    border-radius: 6px;
    color: $white;
    font: 500 12px/18px "Roboto";
    padding: 0 5px;
    position: absolute;
    top: -6px;
    right: 24px;
    text-align: center;
    height: 18px;
    white-space: nowrap;
    z-index: 5;
  }

  &__sub {
    padding-left: 80px;
  }
}
</style>
