// src/plugins/axios.js
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;