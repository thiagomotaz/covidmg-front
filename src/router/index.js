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

router.beforeEach((to, from, next) => {
  // A Logged-in user can't go to login page again
  if (to.name === 'Login' && localStorage.getItem('token')) {
    router.push({
      name: 'Home',
    });
  }

  // Protect routes that require auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Verify if users is logged
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
