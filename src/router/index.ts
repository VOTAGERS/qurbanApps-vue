import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import HomeView from '../views/HomeView.vue'
// Import the new payment view
import PaymentView from '../views/PaymentView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'products-detail',
          name: 'products-detail',
          component: () => import('../views/ProductDetailSetupView.vue'),
        },

        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/OrderListView.vue'),
        },
        // Add the new payment route
        {
          path: 'payment',
          name: 'payment',
          component: PaymentView,
          props: (route) => ({
            order_code: route.query.order_code
          })
        }
      ]
    }
  ],
})

export default router
