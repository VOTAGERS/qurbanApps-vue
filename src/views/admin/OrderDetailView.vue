<template>
  <div class="container-fluid">
    <div class="page-header mb-4">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/admin/my-orders">My Orders</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Order Details</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2 d-flex justify-content-between align-items-center">
            <div class="page-header-title">
              <h2 class="mb-0">Order Details</h2>
            </div>
            <router-link to="/admin/my-orders" class="btn btn-outline-secondary btn-sm">
              <i class="ti ti-arrow-left me-1"></i> Back to History
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading order details...</span>
      </div>
      <p class="mt-2 text-muted">Loading order details...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger shadow-sm">
      <div class="d-flex align-items-center">
        <i class="ti ti-alert-circle fs-2 me-2"></i>
        <div>{{ error }}</div>
      </div>
    </div>

    <div v-else-if="order">
      <div class="row mb-4">
        <div class="col-md-12">
          
          <!-- Section 1: Order & Product Details (Combined) -->
          <div class="card mb-4 border-0 shadow-sm overflow-hidden">
            <div class="card-header bg-primary py-3 d-flex justify-content-between align-items-center">
              <h4 class="mb-0 text-white">Order & Product Summary</h4>
              <span :class="getPaymentBadgeClass(order.payment_status)">
                {{ order.payment_status }}
              </span>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Product Detail Column -->
                <div class="col-md-6 d-flex flex-column mb-3 mb-md-0 border-end">
                  <h5 class="mb-3 text-primary d-flex align-items-center">
                    <i class="ti ti-box me-2"></i> Product Information
                  </h5>
                  <div class="p-3 bg-light rounded flex-grow-1" v-if="order.product_woo">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 40%">Product Name</th><td class="py-1">: {{ order.product_woo.name }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Base Price</th><td class="py-1">: {{ formatCurrency(order.product_woo.price) }}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Pricing Summary Column -->
                <div class="col-md-6 d-flex flex-column">
                  <h5 class="mb-3 text-primary d-flex align-items-center">
                    <i class="ti ti-receipt me-2"></i> Transaction Details
                  </h5>
                  <div class="p-3 bg-light rounded flex-grow-1">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 40%">Order Code</th><td class="py-1">: <code class="fw-bold text-dark">{{ order.order_code }}</code></td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Quantity</th><td class="py-1">: {{ order.quantity }}</td></tr>
                        <tr>
                          <th class="ps-0 py-1 fw-bold text-muted">Total Amount</th>
                          <td class="py-1">: <span class="text-success fw-bold fs-5">{{ formatCurrency(order.total_price) }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Customer Information -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#customerInfoCollapse">
              <h4 class="mb-0 text-dark">Customer Information</h4>
              <i class="ti ti-chevron-down fs-4"></i>
            </div>
            <div class="collapse show" id="customerInfoCollapse">
              <div class="card-body border-top">
                <div class="row">
                  <!-- Billing Info -->
                  <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column border-end">
                    <h5 class="mb-3 text-secondary d-flex align-items-center">
                      <i class="ti ti-file-description me-2"></i> Billing Address
                    </h5>
                    <div class="p-0 flex-grow-1 text-break">
                      <table v-if="order.billing && order.billing.user" class="table table-sm table-borderless mb-0">
                        <tbody>
                          <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 35%">Name</th><td class="py-1">: {{ order.billing.user.first_name }} {{ order.billing.user.last_name }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Email</th><td class="py-1">: {{ order.billing.user.email }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Phone</th><td class="py-1">: {{ order.billing.user.phone }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Address</th><td class="py-1">: {{ order.billing.user.address_1 }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">City / State</th><td class="py-1">: {{ order.billing.user.city }}, {{ order.billing.user.state }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Post / Country</th><td class="py-1">: {{ order.billing.user.postcode }}, {{ order.billing.user.country }}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- Shipping Info -->
                  <div class="col-md-6 d-flex flex-column">
                    <h5 class="mb-3 text-secondary d-flex align-items-center">
                      <i class="ti ti-truck me-2"></i> Shipping Address
                    </h5>
                    <div class="p-0 flex-grow-1 text-break">
                      <table v-if="order.shipping && order.shipping.user" class="table table-sm table-borderless mb-0">
                        <tbody>
                          <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 35%">Name</th><td class="py-1">: {{ order.shipping.user.first_name }} {{ order.shipping.user.last_name }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Email</th><td class="py-1">: {{ order.shipping.user.email }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Phone</th><td class="py-1">: {{ order.shipping.user.phone }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Address</th><td class="py-1">: {{ order.shipping.user.address_1 }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">City / State</th><td class="py-1">: {{ order.shipping.user.city }}, {{ order.shipping.user.state }}</td></tr>
                          <tr><th class="ps-0 py-1 fw-bold text-muted">Post / Country</th><td class="py-1">: {{ order.shipping.user.postcode }}, {{ order.shipping.user.country }}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: Recipient Information -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#recipientInfoCollapse">
              <h4 class="mb-0 text-dark">Recipient Information</h4>
              <i class="ti ti-chevron-down fs-4"></i>
            </div>
            <div class="collapse show" id="recipientInfoCollapse">
              <div class="card-body border-top">
                <div class="row">
                  <div v-for="(recipient, index) in order.participants" :key="index" class="col-md-6 mb-3">
                    <div class="recipient-item-card h-100 p-3 border rounded bg-light text-break">
                      <div class="d-flex align-items-center mb-2">
                        <span class="badge bg-primary me-2">{{ index + 1 }}</span>
                        <span class="fw-bold">Penerima {{ index + 1 }}</span>
                      </div>
                      <table class="table table-sm table-borderless mb-0">
                        <tbody>
                          <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 35%">Name</th><td class="py-1">: {{ recipient.qurban_name }}</td></tr>
                          <tr v-if="recipient.email"><th class="ps-0 py-1 fw-bold text-muted">Email</th><td class="py-1">: {{ recipient.email }}</td></tr>
                          <tr v-if="recipient.phone_number"><th class="ps-0 py-1 fw-bold text-muted">Phone</th><td class="py-1">: {{ recipient.phone_number }}</td></tr>
                          <tr v-if="recipient.remarks"><th class="ps-0 py-1 fw-bold text-muted">Remarks</th><td class="py-1">: {{ recipient.remarks }}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div v-if="!order.participants || order.participants.length === 0" class="text-center py-4 bg-light rounded">
                   <p class="text-muted mb-0">No recipients found for this order.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-5">
      <i class="ti ti-search fs-1 d-block mb-2 text-muted"></i>
      <p class="text-muted">No order data available.</p>
      <router-link to="/admin/my-orders" class="btn btn-primary mt-3">Back to My Orders</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const defaultCurrency = import.meta.env.VITE_DEFAULT_CURRENCY || 'IDR'
const locale = defaultCurrency === 'IDR' ? 'id-ID' : (defaultCurrency === 'SGD' ? 'en-SG' : (defaultCurrency === 'MYR' ? 'en-MY' : 'en-US'))

const formatCurrency = (value) => {
  if (!value) return defaultCurrency === 'IDR' ? 'Rp 0' : (defaultCurrency === 'SGD' ? 'S$ 0.00' : (defaultCurrency === 'MYR' ? 'RM 0.00' : '$0.00'))
  return new Intl.NumberFormat(locale, { style: 'currency', currency: defaultCurrency }).format(Number(value))
}

const route = useRoute();
const order = ref(null);
const loading = ref(true);
const error = ref(null);

const getPaymentBadgeClass = (status) => {
  switch (status) {
    case 'paid': return 'badge bg-success text-white text-capitalize'
    case 'failed': return 'badge bg-danger text-white text-capitalize'
    default: return 'badge bg-warning text-dark text-capitalize'
  }
}

const fetchOrderDetails = async () => {
  const orderCode = route.query.order_code;
  if (!orderCode) {
    error.value = 'Order code is missing from the URL.';
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order-details/${orderCode}`);
    order.value = response.data.data;
  } catch (err) {
    console.error('Error fetching order details:', err);
    error.value = err?.response?.data?.message || 'An unexpected error occurred while fetching order details.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrderDetails();
});
</script>

<style scoped>
.recipient-item-card {
  background-color: #f8f9fa;
  border: 1px solid #e2e6ea;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: transform 0.2s;
}
.recipient-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.card {
  border-radius: 0.75rem;
}
.card-header {
  border-bottom: none;
}
.breadcrumb-item a {
  text-decoration: none;
}
</style>
