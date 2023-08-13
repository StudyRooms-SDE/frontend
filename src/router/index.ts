import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
});

export default router;
