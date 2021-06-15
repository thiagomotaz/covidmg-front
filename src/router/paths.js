export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import(/* webpackChunkName: "login" */ '../components/dashboard/CasesTable.vue'),
  },
  {
    path: '/secure',
    name: 'secure',
    component: () => import(/* webpackChunkName: "secure" */ '../components/Secure.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
