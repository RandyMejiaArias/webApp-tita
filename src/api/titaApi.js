const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from 'axios';

const titaApi = axios.create({
  baseURL: BASE_URL + 'api'
});

titaApi.interceptors.request.use( (config) => {
  config.headers = {
    'x-access-token': localStorage.getItem('userToken')
  };

  return config;
});

export default titaApi;