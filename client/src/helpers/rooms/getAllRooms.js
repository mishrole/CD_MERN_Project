import axios from 'axios';
import { config } from './../../Constants.js';

export const getAllRooms = () => {
  return axios.get(`${config.url.API_URL}/rooms`, { headers: { 'Content-Type': 'application/json'}, withCredentials: true })
  .then(res => res.data)
  .catch(err => { throw err.response.data });
}