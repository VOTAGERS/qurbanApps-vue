import HomeView from '../../views/admin/HomeView.vue'
import PaymentView from '../../views/admin/PaymentView.vue'

export const adminRoutes = [
  {
    path: 'checkout',
    name: 'home',
    component: HomeView,
  },
  {
    path: 'products-detail',
    name: 'products-detail',
    component: () => import('../../views/admin/ProductDetailSetupView.vue'),
  },
  {
    path: 'orders',
    name: 'orders',
    component: () => import('../../views/admin/OrderListView.vue'),
  },
  {
    path: 'my-orders',
    name: 'my-orders',
    component: () => import('../../views/admin/MyOrderView.vue'),
  },
  {
    path: 'payment',
    name: 'payment',
    component: PaymentView,
    props: (route: any) => ({
      order_code: route.query.order_code
    })
  }
]
