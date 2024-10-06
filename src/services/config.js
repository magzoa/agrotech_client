
import axios from 'axios'


export const http = axios.create({

  baseURL: '//localhost:8080/'

});



http.interceptors.request.use(function (config) {
  const token = "sk-svcacct-yFo5tsewu4jGG2QifLPKUVQoojhRx79pmlHZyNPjasfAA5cb-oxnGzYj8zp4BwKT3BlbkFJxsR03EBLjUCxSN8-iSemrsicqMaS8CI8alxUpyUkR4w54UOs8eRzmPqrTFOJdAA";
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
