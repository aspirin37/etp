import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/create-price-request',
    name: 'CreatePriceRequest',
    component: () => import('@/views/CreatePriceRequest.vue'),
  },
  {
    path: '/user-positions',
    name: 'UserPositions',
    component: () => import('@/views/UserPositions.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
