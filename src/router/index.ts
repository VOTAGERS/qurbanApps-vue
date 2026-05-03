import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import { dashboardRoutes } from './routes/dashboard'
import LandingPage from '@/views/LandingPage.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

    // {
    //   path: '/admin',
    //   component: AdminLayout,
    //   children: [
    //     ...dashboardRoutes
    //   ]
    // }
  ],
})

export default router
