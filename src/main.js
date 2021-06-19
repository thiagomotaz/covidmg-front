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

// Check permissions in components
Vue.directive('permissions', {
  bind(el, binding) {
    const requiredPermissions = binding.expression.replace(/'/g, '').split(',');
    if (!requiredPermissions.length) { return; }

    axios.get('permissions').then((actualPermissions) => {
      console.log(actualPermissions.data);
      if (!actualPermissions.data.every((i) => requiredPermissions.includes(i))) {
        // vnode.elm.style.display = 'none';
        // eslint-disable-next-line no-param-reassign
        el.innerText = 'Você não tem permissão para acessar esta página.';
      }
    });
  },
});

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
