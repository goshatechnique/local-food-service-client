import axios from 'axios';
import { getWithExpiry } from '../helpers/helpers';

const axios_api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.VUE_APP_BASE_URL,
});

axios_api.interceptors.request.use(request => {
  const token = getWithExpiry('token');

  if (token) {
    request.headers.Authorization = 'Bearer ' + token;
  }
  console.log('<<send a request>> ', request);
  return request;
});

axios_api.interceptors.response.use(response => {
  console.log('<<got a response>> ', response);
  return response;
});

axios_api.interceptors.response.use(null, error => {
  console.error('api.js interceptors | Error: ', error);
  return error;
});

export default () => axios_api;
