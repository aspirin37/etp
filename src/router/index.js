import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: '/create-price-request/:id?',
    name: 'CreatePriceRequest',
    component: () => import('@/views/CreatePriceRequest.vue'),
    props: true,
  },
  {
    path: '/user-positions',
    name: 'UserPositions',
    component: () => import('@/views/UserPositions.vue'),
  },
  {
    path: '/price-requests/:type',
    name: 'PriceRequests',
    component: () => import('@/views/PriceRequests.vue'),
    props: true,
  },
  {
    path: '/price-request/:id?',
    name: 'PriceRequest',
    component: () => import('@/views/PriceRequest.vue'),
    props: true,
  },
  {
    path: '/purchase-orders/:type',
    name: 'PurchaseOrders',
    component: () => import('@/views/PurchaseOrders.vue'),
    props: true,
  },
  {
    path: '/purchase-order/:id',
    name: 'PurchaseOrder',
    component: () => import('@/views/PurchaseOrder.vue'),
    props: true,
  },
  {
    path: '*',
    redirect: '/price-requests/outbox',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if ((!localStorage.jwt || !localStorage.user) && to.name !== 'Auth') {
    next('/auth');
    return;
  }

  next();
});

export default router;
