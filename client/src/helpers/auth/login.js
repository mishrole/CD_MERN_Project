import axios from 'axios';
import { config } from './../../Constants.js';

export const login = (data) => {
  return axios.post(`${config.url.API_URL}/auth/login`, data)
  .then(res => res)
  .catch(err => { throw err.response.data });
}
