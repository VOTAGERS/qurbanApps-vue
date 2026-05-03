<template>
  <div class="container-fluid">
    <h3 class="text-start mb-4 text-dark font-weight-bold">Payment Details</h3>
    <div v-if="loading">
      <p>Loading order details...</p>
    </div>
    <div v-else-if="error">
      <p class="error">{{ error }}</p>
      <p><router-link to="/">Go to Homepage</router-link></p>
    </div>
    <div v-else-if="order">
      <div class="row mb-4">
        <!-- Left Column: Order Information -->
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#customerInfoCollapse">
              <h4 class="mb-0">Customer Information</h4>
              <i class="ti ti-chevron-down fs-4"></i>
            </div>
            <div class="collapse show" id="customerInfoCollapse">
              <div class="card-body">
              <div class="row">
                <!-- Billing Info -->
                <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column">
                  <h5 class="mb-3 text-primary">Billing Information</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1 text-break">
                    <table v-if="order.billing && order.billing.user" class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 35%">Name</th><td class="py-1">: {{ order.billing.user.first_name }} {{ order.billing.user.last_name }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Email</th><td class="py-1">: {{ order.billing.user.email }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Phone</th><td class="py-1">: {{ order.billing.user.phone }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Address</th><td class="py-1">: {{ order.billing.user.address_1 }}</td></tr>
                        <tr v-if="order.billing.user.address_2"><th class="ps-0 py-1 fw-bold text-muted">Address 2</th><td class="py-1">: {{ order.billing.user.address_2 }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">City / State</th><td class="py-1">: {{ order.billing.user.city }}, {{ order.billing.user.state }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Post / Country</th><td class="py-1">: {{ order.billing.user.postcode }}, {{ order.billing.user.country }}</td></tr>
                      </tbody>
                    </table>
                    <p v-else class="text-muted mb-0 text-center py-3">Billing details not fully loaded.</p>
                  </div>
                </div>
                <!-- Shipping Info -->
                <div class="col-md-6 d-flex flex-column">
                  <h5 class="mb-3 text-primary">Shipping Information</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1 text-break">
                    <table v-if="order.shipping && order.shipping.user" class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 35%">Name</th><td class="py-1">: {{ order.shipping.user.first_name }} {{ order.shipping.user.last_name }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Email</th><td class="py-1">: {{ order.shipping.user.email }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Phone</th><td class="py-1">: {{ order.shipping.user.phone }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Address</th><td class="py-1">: {{ order.shipping.user.address_1 }}</td></tr>
                        <tr v-if="order.shipping.user.address_2"><th class="ps-0 py-1 fw-bold text-muted">Address 2</th><td class="py-1">: {{ order.shipping.user.address_2 }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">City / State</th><td class="py-1">: {{ order.shipping.user.city }}, {{ order.shipping.user.state }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Post / Country</th><td class="py-1">: {{ order.shipping.user.postcode }}, {{ order.shipping.user.country }}</td></tr>
                      </tbody>
                    </table>
                    <p v-else class="text-muted mb-0 text-center py-3">Shipping details not fully loaded.</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#orderSummaryCollapse">
              <h4 class="mb-0">Order Summary</h4>
              <i class="ti ti-chevron-down fs-4"></i>
            </div>
            <div class="collapse show" id="orderSummaryCollapse">
              <div class="card-body">
              <div class="row mb-4">
                <!-- Product Detail Column -->
                <div class="col-md-6 d-flex flex-column mb-3 mb-md-0">
                  <h5 class="mb-3 text-primary">Product Details</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1" v-if="order.product_woo">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 40%">Product Name</th><td class="py-1">: {{ order.product_woo.name }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Price</th><td class="py-1">: {{ formatCurrency(order.product_woo.price) }}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p v-else class="text-muted mb-0 text-center py-3">Product details not available.</p>
                </div>

                <!-- Pricing Summary Column -->
                <div class="col-md-6 d-flex flex-column">
                  <h5 class="mb-3 text-primary">Pricing Details</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr><th class="ps-0 py-1 fw-bold text-muted" style="width: 40%">Order Code</th><td class="py-1">: {{ order.order_code }}</td></tr>
                        <tr><th class="ps-0 py-1 fw-bold text-muted">Quantity</th><td class="py-1">: {{ order.quantity || order.participants?.length || 1 }}</td></tr>
                        <tr>
                          <th class="ps-0 py-1 fw-bold text-muted">Total Order</th>
                          <td class="py-1">: <span class="text-success fw-bold fs-6">{{ formatCurrency(order.total_price) }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Recipient(s) -->
              <h5 class="mb-3 pt-3 border-top text-primary">Recipient Information</h5>
              <div class="row">
                <div v-for="(recipient, index) in order.participants" :key="index" class="col-md-6 mb-3">
                  <div class="recipient-item-card h-100 p-3 border rounded bg-light text-break">
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
              <p v-if="!order.participants || order.participants.length === 0" class="text-muted mb-4">No recipients found.</p>
            </div>
          </div>
        </div>
      </div>

        <!-- Right Column: Payment Method -->
        <div class="col-md-4">
          <div class="card sticky-top" style="top: 20px;">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0 text-white">Payment Method</h4>
            </div>
            <div class="card-body text-center py-5">
              <p class="text-muted mb-4">Complete your order by paying securely via Stripe.</p>
              <button @click="proceedToPayment" class="btn btn-primary btn-lg w-100 py-3 shadow-sm">
                <i class="ti ti-credit-card me-2"></i> Proceed to Stripe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No order data available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'; // Assuming axios is used for API calls

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

const fetchOrderDetails = async () => {
  const orderCode = route.query.order_code;
  if (!orderCode) {
    error.value = 'Order code is missing from the URL.';
    loading.value = false;
    return;
  }

  try {
    // Use environment variable for API base URL
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderCode}`);
    console.log('Full API Response:', response); // Log full response
    order.value = response.data.data;
    console.log('Order details fetched:', order.value);
  } catch (err) {
    console.error('Error fetching order details:', err);
    if (err.response && err.response.data && err.response.data.message) {
      error.value = `Failed to fetch order details: ${err.response.data.message}`;
    } else {
      error.value = 'An unexpected error occurred while fetching order details.';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrderDetails();
});
const proceedToPayment = async () => {
  if (!order.value || !order.value.order_code) {
    alert('Data order tidak ditemukan');
    return;
  }

  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        order_code: order.value.order_code
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Gagal membuat sesi pembayaran');
    }

    const data = await res.json();
    
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('URL pembayaran tidak ditemukan');
    }

  } catch (err) {
    console.error('Payment Error:', err);
    alert('Gagal ke payment: ' + err.message);
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

/* Removed .order-summary as it's replaced by main .card */

.section {
  margin-bottom: 20px;
  padding-bottom: 15px;
  /* Removed border-bottom as cards will handle separation */
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section h3 {
  color: #555;
  margin-bottom: 15px;
}

.recipient-item-card {
  /* Removed previous recipient-item styles as it's now a card content */
  background-color: #f8f9fa;
  border: 1px solid #e2e6ea;
  border-radius: 0.25rem;
  padding: 1rem;
}

.error {
  color: #d9534f;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Basic styling for placeholders if needed */
.placeholder-text {
  color: #888;
  font-style: italic;
}
</style>
