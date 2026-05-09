import HomeView from '../../views/admin/HomeView.vue'
import DashboardHomeView from '../../views/admin/DashboardHomeView.vue'
import PaymentView from '../../views/admin/PaymentView.vue'

export const adminRoutes = [
  {
    path: '',
    name: 'dashboard-home',
    component: DashboardHomeView,
  },
  {
    path: 'checkout-simulation',
    name: 'checkout-simulation',
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
    path: 'users',
    name: 'users',
    component: () => import('../../views/admin/UserListView.vue'),
  },
  {
    path: 'payment',
    name: 'payment',
    component: PaymentView,
    props: (route: any) => ({
      order_code: route.query.order_code
    })
  },
  {
    path: 'role-access',
    name: 'role-access',
    component: () => import('../../views/admin/RoleAccessView.vue'),
  },
  {
    path: 'user-access',
    name: 'user-access',
    component: () => import('../../views/admin/UserAccessView.vue'),
  },
  {
    path: 'order-detail',
    name: 'order-detail',
    component: () => import('../../views/admin/OrderDetailView.vue'),
  },
  {
    path: 'certificates',
    name: 'certificates',
    component: () => import('../../views/admin/CertificateView.vue'),
  },
  {
    path: 'certificate-participants/:id',
    name: 'certificate-participants',
    component: () => import('../../views/admin/CertificateParticipantView.vue'),
    props: true
  }
]
