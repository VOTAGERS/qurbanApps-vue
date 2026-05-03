import { createRouter, createWebHistory } from 'vue-router'

// Layout
import AdminLayout from '../layouts/AdminLayout.vue'
import PublicLayout from '../layouts/PublicLayout.vue'

// Pages
import { adminRoutes } from './routes/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ✅ PUBLIC AREA (Landing, etc.)
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'landing',
          component: () => import('../views/Landing.vue'),
        }
      ]
    },

    // ✅ ADMIN AREA
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          redirect: '/admin/checkout'
        },
        ...adminRoutes
      ]
    }
  ],
})

export default router