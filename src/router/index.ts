import { createRouter, createWebHistory } from 'vue-router';

import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { useAuthStore } from '@/stores/auth-store';
import DashboardTasksView from '@/views/DashboardTasksView.vue';
import DashboardView from '@/views/DashboardView.vue';

import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter(to) {
        const authStore = useAuthStore();

        if (!authStore.isLoggedIn) {
          return {
            path: '/',
            query: { redirect: to.fullPath },
          };
        }
      },
      children: [
        {
          path: '',
          component: DashboardView,
        },
        {
          path: 'tasks',
          component: DashboardTasksView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
});

export default router;
