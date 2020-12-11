import API from './index';

export default function authLogin(credentials) {
  return API.post('auth/login', credentials);
}
