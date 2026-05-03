<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><a href="javascript: void(0)">Dashboard</a></li>
              <li class="breadcrumb-item" aria-current="page">My Orders</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">My Qurban Orders</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ breadcrumb ] end -->

    <!-- [ Main Content ] start -->
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Order History</h3>
            <button class="btn btn-primary" @click="fetchMyOrders">
              <i class="ti ti-refresh me-1"></i> Refresh
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Order Code</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Qurban Status</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in orders" :key="order.id_order">
                    <td>{{ index + 1 }}</td>
                    <td><span class="fw-bold text-primary">{{ order.order_code }}</span></td>
                    <td>{{ order.product_woo?.name || 'N/A' }}</td>
                    <td>{{ order.quantity }}</td>
                    <td class="fw-bold">{{ formatCurrency(order.total_price) }}</td>
                    <td>
                      <span :class="getPaymentBadgeClass(order.payment_status)">
                        {{ order.payment_status }}
                      </span>
                    </td>
                    <td>
                      <span :class="getQurbanBadgeClass(order.qurban_status)">
                        {{ order.qurban_status }}
                      </span>
                    </td>
                    <td class="text-end">
                      <router-link :to="{ name: 'payment', query: { order_code: order.order_code } }" class="btn btn-sm btn-light-primary" title="Payment Details">
                        <i class="ti ti-credit-card"></i>
                      </router-link>
                    </td>
                  </tr>
                  <tr v-if="orders.length === 0">
                    <td colspan="8" class="text-center text-muted py-5">
                      <i class="ti ti-shopping-cart fs-1 d-block mb-2"></i>
                      You haven't made any orders yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Main Content ] end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const defaultCurrency = import.meta.env.VITE_DEFAULT_CURRENCY || 'IDR'
const locale = defaultCurrency === 'IDR' ? 'id-ID' : (defaultCurrency === 'SGD' ? 'en-SG' : (defaultCurrency === 'MYR' ? 'en-MY' : 'en-US'))

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: defaultCurrency }).format(Number(value))
}

const orders = ref<any[]>([])

const fetchMyOrders = async () => {
  try {
    // For now, we fetch all orders but label it "My Orders"
    // In a real app, you would fetch by user_id or with auth headers
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`)
    const result = await response.json()
    if (result.success) {
      orders.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

const getPaymentBadgeClass = (status: string) => {
  switch (status) {
    case 'paid': return 'badge bg-light-success text-success text-capitalize'
    case 'failed': return 'badge bg-light-danger text-danger text-capitalize'
    default: return 'badge bg-light-warning text-warning text-capitalize'
  }
}

const getQurbanBadgeClass = (status: string) => {
  switch (status) {
    case 'completed': return 'badge bg-light-success text-success text-capitalize'
    case 'scheduled': return 'badge bg-light-primary text-primary text-capitalize'
    default: return 'badge bg-light-warning text-warning text-capitalize'
  }
}

onMounted(() => {
  fetchMyOrders()
})
</script>
