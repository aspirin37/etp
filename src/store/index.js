import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

export const getExtraSearchDefault = () => ({
  savedSearch: 0,
  number: null,
  fio: null,
  customer: null,
  type: null,
  region: null,
  createDate: null,
  reportDate: null,
  deliveryDate: null,
});

export default new Vuex.Store({
  state: {
    dataView: JSON.parse(localStorage.getItem('dataView')) || 'list-small',
    extraSearch: JSON.parse(localStorage.getItem('extraSearch')) || getExtraSearchDefault(),
    navigatorLock: JSON.parse(localStorage.getItem('navigatorLock')) || null,
    user: JSON.parse(localStorage.getItem('user')),
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
  },
  getters: {
    dataView: ({ dataView }) => dataView,
    extraSearch: ({ extraSearch }) => extraSearch,
    navigatorLock: ({ navigatorLock }) => navigatorLock,
  },
});
