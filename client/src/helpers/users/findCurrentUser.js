import axios from 'axios';
import { config } from '../../Constants.js';

export const findCurrentUser = () => {
  return axios.get(`${config.url.API_URL}/users/profile`, { headers: { 'Content-Type': 'application/json'}, withCredentials: true })
  .then(res => res)
  .catch(err => { throw err.response.data });
}