import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import paths from './paths';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths,
});

// Protect routes that require auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
