import axios from 'axios';
import Vue from 'vue';
import { EventBus } from '@/event-bus';

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.get.Accept = 'application/json';

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// before a request is made start the loading
axios.interceptors.request.use((config) => {
  EventBus.$emit('requests', 1);
  return config;
}, (error) => {
  EventBus.$emit('requests', -1);
  return Promise.reject(error);
});

// before a response is returned stop loading
axios.interceptors.response.use((response) => {
  EventBus.$emit('requests', -1);
  return response;
}, (error) => {
  EventBus.$emit('requests', -1);
  return Promise.reject(error);
});

export default axios;
