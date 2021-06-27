export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard/DashboardLayout.vue'),
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
        path: 'users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "reports" */ '../views/Users.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Usuários',
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
        path: 'qea',
        name: 'Qea',
        component: () => import(/* webpackChunkName: "qea" */ '../views/Qea.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'FAQ',
        },
      },
      {
        path: 'non-autorized',
        name: 'NotAutorized',
        component: () => import(/* webpackChunkName: "qea" */ '../views/PageNotAuthorized.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'Não autorizado',
        },
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "secure" */ '../views/test.vue'),
        meta: {
          requiresAuth: true,
          breadCrumb: 'test',
        },
      },
    ],
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "login" */ '../views/PageNotFound.vue'),
  },
];
