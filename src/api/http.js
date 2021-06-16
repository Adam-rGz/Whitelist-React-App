import axios from 'axios';

const instance = axios.create({
  baseURL: null,
  headers: {
    'content-type': 'application/json',
    // 'content-type': 'application/x-www-form-urlencoded',
    accept: 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': 'origin, x-requested-with',
    'Access-Control-Allow-Headers': 'x',
  },
  // responseType: 'json',
});


const http = { 
  // AJAX
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
  put(url, data) {
    return instance.put(url, data);
  },
  delete(url) {
    return instance.delete(url);
  },
};

export default http;