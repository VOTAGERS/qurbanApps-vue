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
              <li class="breadcrumb-item" aria-current="page">Paid Order for Certificate</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Certificate Management</h2>
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
            <h3>Paid Order for Certificate</h3>
            <button class="btn btn-primary" @click="fetchOrders">
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
                    <th>Customer Billing</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in orders" :key="order.id_order">
                    <td>{{ index + 1 }}</td>
                    <td><span class="fw-bold text-primary">{{ order.order_code }}</span></td>
                    <td>{{ order.product_woo?.name || '-' }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>
                      <div v-if="order.user">
                        <p class="mb-0 fw-bold">{{ order.user.first_name }} {{ order.user.last_name }}</p>
                        <small class="text-muted">{{ order.user.email }}</small>
                      </div>
                      <span v-else>-</span>
                    </td>
                    <td class="text-end">
                      <router-link :to="{ name: 'certificate-participants', params: { id: order.id_order } }" class="btn btn-sm btn-light-info" title="View Participants">
                        <i class="ti ti-eye"></i>
                      </router-link>
                    </td>
                  </tr>
                  <tr v-if="orders.length === 0">
                    <td colspan="6" class="text-center text-muted py-5">
                      <i class="ti ti-certificate fs-1 d-block mb-2"></i>
                      No orders found for certificate generation.
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
import axios from 'axios'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const orders = ref<any[]>([])

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${authStore.token}`
  }
}

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/certificates/orders`, axiosConfig)
    if (response.data.success) {
      orders.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
/* Certificate view specific styles */
</style>
