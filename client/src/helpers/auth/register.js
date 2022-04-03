import axios from 'axios';
import { config } from './../../Constants.js';

export const register = (data) => {
  return axios.post(`${config.url.API_URL}/auth/register`, data, { headers: { 'Content-Type': 'application/json'}, withCredentials: true })
  .then(res => res)
  .catch(err => { throw err.response.data });
}
