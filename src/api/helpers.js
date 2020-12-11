/* eslint-disable */
import API from 'api'
import Router from '../router'
import Store from '../store';

export function redirectToAuth () {
  Router.push('/auth');
}
export async function loginAndRedirect (response) {
  const jwt = response.data.token;
  const userData = parseJwt(jwt);

  API.defaults.headers.authorization = `Bearer ${jwt}`;
  localStorage.setItem('jwt', jwt);
  await Store.commit('setUser', userData);

  Router.push('/price-requests/outbox');
}
export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}

export default {
  loginAndRedirect,
  parseJwt,
  redirectToAuth
}
