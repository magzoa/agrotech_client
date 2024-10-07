
import axios from 'axios'


export const http = axios.create({

  baseURL: '//localhost:8080/'

});



http.interceptors.request.use(function (config) {
  const token = "";
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
