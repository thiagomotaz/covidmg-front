export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../components/dashboard/DashboardLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Home',
        },
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import(/* webpackChunkName: "reports" */ '../views/Reports.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Relatórios',
        },
      },
      {
        path: '/secure',
        name: 'secure',
        component: () => import(/* webpackChunkName: "secure" */ '../components/Secure.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Seguro',
        },
      },
    ],
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "login" */ '../views/PageNotFound.vue'),
  },
];
