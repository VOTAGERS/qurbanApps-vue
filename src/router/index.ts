import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import HomeView from '../views/HomeView.vue'
import PackageSetupView from '../views/PackageSetupView.vue'

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
          path: 'packages',
          name: 'packages',
          component: PackageSetupView,
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
