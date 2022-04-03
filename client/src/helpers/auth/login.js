import axios from 'axios';
import { config } from './../../Constants.js';

// ! IMPORTANT:
// ! The server set a cookie with httpOnly: true, so the client can't access the cookie.
// ! In order to make a request to a protected endpoint, the client must send the cookie with the request.
// ! Set withCredentials: true to send the cookie

export const login = (data) => {
  return axios.post(`${config.url.API_URL}/auth/login`, data, { headers: { 'Content-Type': 'application/json'}, withCredentials: true })
  .then(res => res)
  .catch(err => { throw err.response.data });
}
