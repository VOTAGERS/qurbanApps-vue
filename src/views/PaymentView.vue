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
          <!-- Customer Information -->
          <div class="card mb-4">
            <div class="card-header">
              <h4 class="mb-0">Customer Information</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Billing Info -->
                <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column">
                  <h5 class="mb-3 text-primary">Billing Information</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1 text-break">
                    <template v-if="order.billing && order.billing.user">
                      <p class="mb-1"><strong>Name:</strong> {{ order.billing.user.first_name }} {{ order.billing.user.last_name }}</p>
                      <p class="mb-1"><strong>Email:</strong> {{ order.billing.user.email }}</p>
                      <p class="mb-1"><strong>Phone:</strong> {{ order.billing.user.phone }}</p>
                      <p class="mb-1"><strong>Address:</strong> {{ order.billing.user.address_1 }}</p>
                      <p class="mb-1" v-if="order.billing.user.address_2"><strong>Address 2:</strong> {{ order.billing.user.address_2 }}</p>
                      <p class="mb-1"><strong>City / State:</strong> {{ order.billing.user.city }}, {{ order.billing.user.state }}</p>
                      <p class="mb-0"><strong>Postcode / Country:</strong> {{ order.billing.user.postcode }}, {{ order.billing.user.country }}</p>
                    </template>
                    <p v-else class="text-muted mb-0">Billing details not fully loaded.</p>
                  </div>
                </div>
                <!-- Shipping Info -->
                <div class="col-md-6 d-flex flex-column">
                  <h5 class="mb-3 text-primary">Shipping Information</h5>
                  <div class="p-3 border rounded bg-light flex-grow-1 text-break">
                    <template v-if="order.shipping && order.shipping.user">
                      <p class="mb-1"><strong>Name:</strong> {{ order.shipping.user.first_name }} {{ order.shipping.user.last_name }}</p>
                      <p class="mb-1"><strong>Email:</strong> {{ order.shipping.user.email }}</p>
                      <p class="mb-1"><strong>Phone:</strong> {{ order.shipping.user.phone }}</p>
                      <p class="mb-1"><strong>Address:</strong> {{ order.shipping.user.address_1 }}</p>
                      <p class="mb-1" v-if="order.shipping.user.address_2"><strong>Address 2:</strong> {{ order.shipping.user.address_2 }}</p>
                      <p class="mb-1"><strong>City / State:</strong> {{ order.shipping.user.city }}, {{ order.shipping.user.state }}</p>
                      <p class="mb-0"><strong>Postcode / Country:</strong> {{ order.shipping.user.postcode }}, {{ order.shipping.user.country }}</p>
                    </template>
                    <p v-else class="text-muted mb-0">Shipping details not fully loaded.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Details -->
          <div class="card mb-4">
            <div class="card-header">
              <h4 class="mb-0">Order Details</h4>
            </div>
            <div class="card-body">
              
              <!-- Product Detail -->
              <h5 class="mb-3 text-primary">Product Details</h5>
              <div class="p-3 border rounded bg-light mb-4" v-if="order.product_woo">
                <p class="mb-1"><strong>Product Name:</strong> {{ order.product_woo.name }}</p>
                <p class="mb-0" v-if="order.product_woo.price"><strong>Price:</strong> {{ formatCurrency(order.product_woo.price) }}</p>
              </div>
              <p v-else class="text-muted mb-4">Product details not available.</p>

              <!-- Recipient(s) -->
              <h5 class="mb-3 text-primary">Recipient(s)</h5>
              <div v-for="(recipient, index) in order.participants" :key="index" class="recipient-item-card mb-3 p-3 border rounded bg-light">
                <p class="mb-1"><strong>Name:</strong> {{ recipient.qurban_name }}</p>
                <p v-if="recipient.email" class="mb-1"><strong>Email:</strong> {{ recipient.email }}</p>
                <p v-if="recipient.phone_number" class="mb-1"><strong>Phone:</strong> {{ recipient.phone_number }}</p>
                <p v-if="recipient.remarks" class="mb-0"><strong>Remarks:</strong> {{ recipient.remarks }}</p>
              </div>
              <p v-if="!order.participants || order.participants.length === 0" class="text-muted mb-4">No recipients found.</p>

              <!-- Order Summary -->
              <h5 class="mb-3 pt-3 border-top text-primary">Order Summary</h5>
              <div class="p-3 border rounded bg-light">
                <p class="mb-1"><strong>Order Code:</strong> {{ order.order_code }}</p>
                <p class="mb-1"><strong>Quantity:</strong> {{ order.quantity || order.participants?.length || 1 }}</p>
                <p class="mb-0 mt-2">
                  <strong>Total Order:</strong> 
                  <span class="text-success fw-bold ms-2" style="font-size: 1.1rem;">{{ formatCurrency(order.total_price) }}</span>
                </p>
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
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order-details/${orderCode}`);
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

const proceedToPayment = () => {
  // This is where you would implement the Stripe Checkout integration.
  // For now, we can just log that the action was triggered or navigate to a placeholder payment page.
  alert('Proceeding to payment process...');
  // Example: redirect to a Stripe checkout page or trigger Stripe.js
  // window.location.href = '/stripe-checkout?order_code=' + order.value.order_code; 
  // Or trigger Stripe.js elements directly
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
