import { createRouter, createWebHistory } from 'vue-router'

// Layout
import AdminLayout from '../layouts/AdminLayout.vue'

// Pages
import Landing from '../views/Landing.vue'
import { adminRoutes } from './routes/admin'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ✅ LANDING PAGE (tanpa admin layout)
    {
      path: '',
      name: 'landing',
      component: Landing,
    },

    // ✅ ADMIN AREA
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        ...adminRoutes
      ]
    }
  ],
})

export default router