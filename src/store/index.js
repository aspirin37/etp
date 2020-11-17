import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '../api/axios-config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
      return Promise.resolve();
    },
    signOut: (state) => {
      state.user = null;

      localStorage.removeItem('authorization');
      localStorage.removeItem('jwt');

      delete axiosInstance.defaults.headers.jwtacc;
      return Promise.resolve();
    },
  },
});
