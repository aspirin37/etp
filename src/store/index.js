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
    extraSearch: JSON.parse(localStorage.getItem('extraSearch')) || getExtraSearchDefault(),
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
    setExtraSearch: (state, payload) => {
      state.extraSearch = payload;
      localStorage.setItem('extraSearch', JSON.stringify(payload));
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
  getters: {
    extraSearch: (state) => state.extraSearch,
  },
  actions: {
    setExtraSearch(state, newSearch) {
      state.commit('setExtraSearch', newSearch);
    },
  },
});
