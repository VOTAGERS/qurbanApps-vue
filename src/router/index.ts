import { createRouter, createWebHistory } from 'vue-router'

// Layout
import AdminLayout from '../layouts/AdminLayout.vue'

// Pages
import Landing from '../views/Landing.vue'
import HomeView from '../views/admin/HomeView.vue'
import PaymentView from '../views/admin/PaymentView.vue'



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
        {
          path: 'checkout',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'products-detail',
          name: 'products-detail',
          component: () => import('../views/admin/ProductDetailSetupView.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/admin/OrderListView.vue'),
        },
        {
          path: 'my-orders',
          name: 'my-orders',
          component: () => import('../views/admin/MyOrderView.vue'),
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

  // routes: [
  //   {
  //     path: '/',
  //     component: AdminLayout,
  //     children: [
  //       {
  //         path: '',
  //         name: 'home',
  //         component: HomeView,
  //       },
  //       {
  //         path: 'products-detail',
  //         name: 'products-detail',
  //         component: () => import('../views/ProductDetailSetupView.vue'),
  //       },

  //       {
  //         path: 'orders',
  //         name: 'orders',
  //         component: () => import('../views/OrderListView.vue'),
  //       },
  //       // Add the new payment route
  //       {
  //         path: 'payment',
  //         name: 'payment',
  //         component: PaymentView,
  //         props: (route) => ({
  //           order_code: route.query.order_code
  //         })
  //       }
  //     ]
  //   }
  // ],
})

export default router