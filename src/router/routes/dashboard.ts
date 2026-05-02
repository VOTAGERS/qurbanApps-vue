import HomeView from '../../views/dashboard/HomeView.vue'
import PaymentView from '../../views/dashboard/PaymentView.vue'

export const dashboardRoutes = [
  {
    path: '',
    name: 'home',
    component: HomeView,
  },
  {
    path: 'products-detail',
    name: 'products-detail',
    component: () => import('../../views/dashboard/ProductDetailSetupView.vue'),
  },
  {
    path: 'orders',
    name: 'orders',
    component: () => import('../../views/dashboard/OrderListView.vue'),
  },
  {
    path: 'my-orders',
    name: 'my-orders',
    component: () => import('../../views/dashboard/MyOrderView.vue'),
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
