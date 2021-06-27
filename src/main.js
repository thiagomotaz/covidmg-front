import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';
import axios from './plugins/axios';

Vue.config.productionTip = false;

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

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
