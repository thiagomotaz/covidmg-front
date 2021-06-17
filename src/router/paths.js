export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "home" */ '../components/dashboard/DashboardLayout.vue'),
    meta: {
      requiresAuth: true,
      breadCrumb: 'Dashboard',
    },
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
        path: 'reports',
        name: 'Reports',
        component: () => import(/* webpackChunkName: "reports" */ '../views/Reports.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Relatórios',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Meu perfil',
        },
      },
      {
        path: 'secure',
        name: 'Secure',
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
