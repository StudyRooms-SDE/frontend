import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/sessions/:id',
      name: 'SessionView',
      component: () => import('../views/SessionView.vue'),
      props: true,
    },
    {
      path: '/create',
      name: 'CreateSessionView',
      component: () => import('../views/CreateSessionView.vue'),
    },
    {
      path: '/noAuth',
      name: 'NoAuthView',
      component: () => import('../views/NoAuthView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = useUserStore().getLoggedIn;
  if (isLoggedIn) {
    next();
  } else {
    if (to.name === 'LoginView' || to.name === 'RegisterView' || to.name === 'NoAuthView') {
      next();
    } else {
      next({ name: 'NoAuthView' });
    }
  }
});

export default router;
