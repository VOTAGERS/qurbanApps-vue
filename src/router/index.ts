import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import { adminRoutes } from './routes/admin'
import LandingPage from '@/views/LandingPage.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios'

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
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        ...adminRoutes
      ]
    }
  ],
})

// Tambahkan guard untuk rute admin
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  if (to.path.startsWith('/admin')) {
    if (!token) {
      // Jika tidak ada token, redirect ke halaman login
      next({ name: 'login' });
    } else {
      try {
        // Validasi token dengan backend
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admins/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        next();
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token'); // Hapus token yang tidak valid
        next({ name: 'login' }); // Redirect ke halaman login
      }
    }
  } else {
    next(); // Untuk rute lain, lanjutkan tanpa validasi
  }
});

export default router
