import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import { adminRoutes } from './routes/admin'
import LandingPage from '@/views/LandingPage.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Login' }
    },
    {
      path: '/',
      component: LandingPage,
      meta: { title: 'Home' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { title: 'Checkout' },
      props: (route) => ({
        productId: Number(route.query.id) || 1,
        productName: route.query.name || 'Kambing Qurban',
        productPrice: Number(route.query.price) || 2800000,
        maxShare: Number(route.query.share) || 1,
        description: route.query.desc || 'Untuk 1 orang · Sesuai syariah',
      }),
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        ...adminRoutes.map(route => ({
          ...route,
          meta: {
            ...route.meta, 
            requiresAuth: true,
            superAdminOnly: ['users', 'role-access', 'user-access','konfigurasi'].includes(route.name as string)
          }
        }))
      ]
    },
    {
      path: '/error/:code',
      name: 'error',
      component: () => import('@/views/ErrorView.vue'),
      meta: { title: 'Error' },
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/ErrorView.vue'),
      meta: { title: 'Page Not Found' },
      props: { code: '404' }
    }
  ],
})

// Navigation Guard
import { useAuthStore } from '../stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' })
    }
    if (to.meta.superAdminOnly && !authStore.isSuperAdmin) {
      return next({ name: 'error', params: { code: '403' } })
    }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return next({ name: 'dashboard-home' })
  }

  next()
})

const titleName = import.meta.env.VITE_APP_NAME || 'ILM Qurban'
router.afterEach((to) => {
  const pageTitle = to.meta?.title as string
  document.title = pageTitle ? `${pageTitle} | ${titleName}` : titleName
})

export default router