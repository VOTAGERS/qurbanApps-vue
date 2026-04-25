import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import HomeView from '../views/HomeView.vue'


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
          path: 'deliveries',
          name: 'deliveries',
          component: () => import('../views/DeliveryListView.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/OrderListView.vue'),
        }
      ]
    }
  ],
})

export default router
