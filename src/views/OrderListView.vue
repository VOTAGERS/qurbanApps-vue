<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><a href="javascript: void(0)">Management</a></li>
              <li class="breadcrumb-item" aria-current="page">Order List</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Order List</h2>
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
            <h5>Daftar Pesanan Qurban</h5>
            <button class="btn btn-primary" @click="fetchOrders">
              <i class="ti ti-refresh me-1"></i> Refresh Data
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Kode Order</th>
                    <th>Customer</th>
                    <th>Paket Qurban</th>
                    <th>Qty</th>
                    <th>Total Harga</th>
                    <th>Payment</th>
                    <th>Qurban Status</th>
                    <th class="text-end">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in orders" :key="order.id_order">
                    <td>{{ index + 1 }}</td>
                    <td><strong>{{ order.order_code }}</strong></td>
                    <td>{{ order.user ? order.user.name : 'Unknown User' }}</td>
                    <td>
                      <span v-if="order.package">
                         {{ order.package.animal_type }} - {{ order.package.country }}
                      </span>
                      <span v-else class="text-muted">No Package</span>
                    </td>
                    <td>{{ order.quantity }}</td>
                    <td>Rp {{ Number(order.total_price).toLocaleString('id-ID') }}</td>
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
                      <button class="btn btn-sm btn-light-secondary me-1" title="Detail">
                        <i class="ti ti-eye"></i>
                      </button>
                      <button class="btn btn-sm btn-light-primary" title="Edit">
                        <i class="ti ti-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="orders.length === 0">
                    <td colspan="9" class="text-center text-muted py-4">Belum ada data pesanan.</td>
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

interface OrderData {
  id_order: number;
  order_code: string;
  id_user: number;
  id_package: number;
  quantity: number;
  total_price: string;
  payment_status: string;
  qurban_status: string;
  status: string;
  user?: {
    id_user: number;
    name: string;
    email: string;
  };
  package?: {
    id_package: number;
    animal_type: string;
    country: string;
  };
}

const orders = ref<OrderData[]>([])

const fetchOrders = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/orders')
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
    case 'pending': default: return 'badge bg-light-warning text-warning text-capitalize'
  }
}

const getQurbanBadgeClass = (status: string) => {
  switch (status) {
    case 'completed': return 'badge bg-light-success text-success text-capitalize'
    case 'scheduled': return 'badge bg-light-primary text-primary text-capitalize'
    case 'pending': default: return 'badge bg-light-warning text-warning text-capitalize'
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
