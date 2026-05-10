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
    },
    {
      path: '/',
      component: LandingPage,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      // Data produk dikirim via query params atau state
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
            requiresAuth: true,
            // Menandai rute khusus SuperAdmin berdasarkan nama/path
            superAdminOnly: ['users', 'role-access', 'user-access'].includes(route.name as string)
          }
        }))
      ]
    },
    // Error Routes
    {
      path: '/error/:code',
      name: 'error',
      component: () => import('@/views/ErrorView.vue'),
      props: true
    },
    // Catch-all route for 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/ErrorView.vue'),
      props: { code: '404' }
    }
  ],
})

// Navigation Guard (Security Middleware)
import { useAuthStore } from '../stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Cek apakah rute memerlukan autentikasi
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      // Jika tidak login, tendang ke login
      return next({ name: 'login' })
    }

    // 2. Cek Role (Authorization)
    // Jika rute hanya untuk SuperAdmin
    if (to.meta.superAdminOnly && !authStore.isSuperAdmin) {
      // Jika bukan SuperAdmin, tendang ke Error 403 (Forbidden)
      return next({ name: 'error', params: { code: '403' } })
    }
  }

  // 3. Jika sudah login tapi mencoba akses halaman login lagi
  if (to.name === 'login' && authStore.isAuthenticated) {
    return next({ name: 'dashboard-home' })
  }

  next()
})

export default router
