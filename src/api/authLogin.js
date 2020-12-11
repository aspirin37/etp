import API from 'api';

export default function authLogin(credentials) {
  return API.post('auth/login', credentials);
}
