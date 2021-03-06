import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

export const getExtraSearchDefault = () => ({
  createDate: null,
  customer: null,
  deliveryDate: null,
  fio: null,
  name: null,
  number: null,
  orderNumber: null,
  region: null,
  reportDate: null,
  responseDate: null,
  savedSearch: 0,
  showHidden: false,
  status: null,
  type: null,
});

export default new Vuex.Store({
  state: {
    dataView: JSON.parse(localStorage.getItem('dataView')) || 'list-small',
    // extraSearch: JSON.parse(localStorage.getItem('extraSearch')) || getExtraSearchDefault(),
    extraSearch: getExtraSearchDefault(),
    navigatorLock: JSON.parse(localStorage.getItem('navigatorLock')) || null,
    user: JSON.parse(localStorage.getItem('user')),
    showExtraSearchSidebar: false,
  },
  mutations: {
    setExtraSearch: (state, payload) => {
      state.extraSearch = payload;
      localStorage.setItem('extraSearch', JSON.stringify(payload));
      return Promise.resolve();
    },
    setNavigatorLock: (state, payload) => {
      state.navigatorLock = payload;
      localStorage.setItem('navigatorLock', JSON.stringify(payload));
    },
    setDataView: (state, payload) => {
      state.dataView = payload;
      localStorage.setItem('dataView', JSON.stringify(payload));
      return Promise.resolve();
    },
    setUser: (state, payload) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
      return Promise.resolve();
    },
    signOut: (state) => {
      state.user = null;

      localStorage.removeItem('jwt');
      localStorage.removeItem('user');

      delete API.defaults.headers.jwtacc;
      return Promise.resolve();
    },
    toggleExtraSearchSidebar: (state) => {
      state.showExtraSearchSidebar = !state.showExtraSearchSidebar;
    },
  },
  actions: {
    setDataView: ({ commit }, payload) => {
      commit('setDataView', payload);
    },
    setExtraSearch: ({ commit }, payload) => {
      commit('setExtraSearch', payload);
    },
    setNavigatorLock: ({ commit }, payload) => {
      commit('setNavigatorLock', payload);
    },
    toggleExtraSearchSidebar: ({ commit }) => {
      commit('toggleExtraSearchSidebar');
    },
  },
  getters: {
    dataView: ({ dataView }) => dataView,
    extraSearch: ({ extraSearch }) => extraSearch,
    navigatorLock: ({ navigatorLock }) => navigatorLock,
  },
});
