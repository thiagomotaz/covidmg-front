import Vue from 'vue';
import axios from 'axios';
import { sync } from 'vuex-router-sync';
import { EventBus } from '@/event-bus';
import router from './router';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.get.Accept = 'application/json';

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Check permissions in components
Vue.directive('permissions', {
  bind(el, binding) {
    const requiredPermissions = binding.expression.replace(/'/g, '').split(',');
    if (!requiredPermissions.length) { return; }

    axios.get('permissions').then((actualPermissions) => {
      if (actualPermissions.data.is_admin === false
        && !actualPermissions.data.permissions.every((i) => requiredPermissions.includes(i))) {
        // vnode.elm.style.display = 'none';
        // eslint-disable-next-line no-param-reassign
        el.innerText = 'Você não tem permissão para acessar esta página.';
      }
    });
  },
});

// before a request is made start the loading
axios.interceptors.request.use((config) => {
  EventBus.$emit('requests', 1);
  return config;
});

// before a response is returned stop loading
axios.interceptors.response.use((response) => {
  EventBus.$emit('requests', -1);
  return response;
});

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
