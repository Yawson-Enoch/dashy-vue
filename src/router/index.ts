import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardView from '@/views/DashboardView.vue';
import DashboardTasksView from '@/views/DashboardTasksView.vue';
import NotFound from '../views/NotFound.vue';
import { useAuthStore } from '@/stores/auth';

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
      meta: { requiresAuth: true },
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

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      path: '/',
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
