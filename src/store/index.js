import Vue from 'vue';
import Vuex from 'vuex';
import API from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataView: JSON.parse(localStorage.getItem('dataView')) || 'list-small',
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
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
  },
  getters: {
    dataView: ({ dataView }) => dataView,
  },
});
