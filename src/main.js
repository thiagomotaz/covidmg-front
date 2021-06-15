import Vue from 'vue';
import axios from 'axios';
import { sync } from 'vuex-router-sync';
import router from './router';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.get.Accept = 'application/json';

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
