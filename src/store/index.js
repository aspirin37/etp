import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataView: JSON.parse(localStorage.getItem('dataView')) || 'list-small',
    navigatorLock: JSON.parse(localStorage.getItem('navigatorLock')) || false,
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
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
    setNavigatorLock: ({ commit }, payload) => {
      commit('setNavigatorLock', payload);
    },
  },
  getters: {
    dataView: ({ dataView }) => dataView,
    navigatorLock: (state) => state.navigatorLock,
  },
});
