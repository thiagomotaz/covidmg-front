import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';
import './plugins/axios';
import './directives/permissions';
import './base-components';
import './plugins/notification';

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
