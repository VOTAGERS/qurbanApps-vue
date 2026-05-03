import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import { dashboardRoutes } from './routes/dashboard'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path: '/',
       component:LandingPage
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        ...dashboardRoutes
      ]
    }
  ],
})

export default router
