// src/axiosConfig.js
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
axios.interceptors.request.use(
  async config => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
