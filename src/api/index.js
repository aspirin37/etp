import axios from 'axios';
import app from '../main';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const jwt = localStorage.getItem('jwt');

if (jwt) {
  axiosInstance.defaults.headers.authorization = `Bearer ${jwt}`;
}

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    // редиректы на страницу авторизации
    if (error.response.status === 401 && app.$route.name !== 'Auth') {
      app.$router.push('/auth');
      store.commit('signOut');
      return error;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
