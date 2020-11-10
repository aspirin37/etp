import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const jwt = localStorage.getItem('jwt');

if (jwt) {
  axiosInstance.defaults.headers.authorization = `Bearer ${jwt}`;
}

export default axiosInstance;
