import axios from 'axios';
import { config } from './../../Constants.js';

export const editUser = (data) => {
  return axios.put(`${config.url.API_URL}/users`, data, { headers: { 'Content-Type': 'application/json'}, withCredentials: true })
  .then(res => res)
  .catch(err => { throw err.response.data });
}