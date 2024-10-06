
import axios from 'axios'


export const http = axios.create({

  baseURL: '//localhost:8080/'

});



http.interceptors.request.use(function (config) {
  const token = "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";
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
