import HomeView from '../../views/admin/HomeView.vue'
import DashboardHomeView from '../../views/admin/DashboardHomeView.vue'
import PaymentView from '../../views/admin/PaymentView.vue'

export const adminRoutes = [
  {
    path: '',
    name: 'dashboard-home',
    component: DashboardHomeView,
    meta: { title: 'Dashboard' }
  },
  {
    path: 'checkout-simulation',
    name: 'checkout-simulation',
    component: HomeView,
    meta: { title: 'Checkout Simulation' }
  },
  {
    path: 'products-detail',
    name: 'products-detail',
    component: () => import('../../views/admin/ProductDetailSetupView.vue'),
    meta: { title: 'Product Detail Setup' }
  },
  {
    path: 'orders',
    name: 'orders',
    component: () => import('../../views/admin/OrderListView.vue'),
    meta: { title: 'Order List' }
  },
  {
    path: 'my-orders',
    name: 'my-orders',
    component: () => import('../../views/admin/MyOrderView.vue'),
    meta: { title: 'My Orders' }
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('../../views/admin/UserListView.vue'),
    meta: { title: 'User List' }
  },
  {
    path: 'payment',
    name: 'payment',
    component: PaymentView,
    meta: { title: 'Payment' },
    props: (route: any) => ({
      order_code: route.query.order_code
    })
  },
  {
    path: 'role-access',
    name: 'role-access',
    component: () => import('../../views/admin/RoleAccessView.vue'),
    meta: { title: 'Role Access' }
  },
  {
    path: 'user-access',
    name: 'user-access',
    component: () => import('../../views/admin/UserAccessView.vue'),
    meta: { title: 'User Access' }
  },
  {
    path: 'order-detail',
    name: 'order-detail',
    component: () => import('../../views/admin/OrderDetailView.vue'),
    meta: { title: 'Order Detail' }
  },
  {
    path: 'certificates',
    name: 'certificates',
    component: () => import('../../views/admin/CertificateView.vue'),
    meta: { title: 'Certificates' }
  },
  {
    path: 'certificate-participants/:id',
    name: 'certificate-participants',
    component: () => import('../../views/admin/CertificateParticipantView.vue'),
    meta: { title: 'Certificate Participants' },
    props: true
  }
]