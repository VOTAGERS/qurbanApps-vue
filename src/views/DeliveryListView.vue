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
              <li class="breadcrumb-item" aria-current="page">Delivery List</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Delivery List</h2>
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
            <h5>Daftar Pengiriman (Delivery)</h5>
            <button class="btn btn-primary" @click="fetchDeliveries">
              <i class="ti ti-refresh me-1"></i> Refresh Data
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID Order</th>
                    <th>Dikirim Via</th>
                    <th>Status Pengiriman</th>
                    <th>Waktu Kirim</th>
                    <th>Status Record</th>
                    <th class="text-end">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(delivery, index) in deliveries" :key="delivery.id_delivery">
                    <td>{{ index + 1 }}</td>
                    <td><span class="badge bg-light-primary text-primary">ORD-{{ delivery.id_order }}</span></td>
                    <td>
                      <span class="text-capitalize">
                        <i :class="['ti me-1', delivery.sent_via === 'whatsapp' ? 'ti-brand-whatsapp text-success' : 'ti-mail text-danger']"></i>
                        {{ delivery.sent_via }}
                      </span>
                    </td>
                    <td>
                      <span :class="['badge', delivery.delivery_status === 'sent' ? 'bg-light-success text-success' : 'bg-light-warning text-warning']">
                        {{ delivery.delivery_status === 'sent' ? 'Terkirim' : 'Pending' }}
                      </span>
                    </td>
                    <td>{{ delivery.sent_at ? new Date(delivery.sent_at).toLocaleString('id-ID') : '-' }}</td>
                    <td>
                      <span :class="['badge', delivery.status === 'A' ? 'bg-light-success text-success' : 'bg-light-danger text-danger']">
                        {{ delivery.status === 'A' ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-light-secondary me-1" title="Detail">
                        <i class="ti ti-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="deliveries.length === 0">
                    <td colspan="7" class="text-center text-muted py-4">Belum ada data pengiriman.</td>
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

interface DeliveryData {
  id_delivery: number;
  id_order: number;
  sent_via: string;
  delivery_status: string;
  sent_at: string | null;
  status: string;
}

const deliveries = ref<DeliveryData[]>([])

const fetchDeliveries = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/deliveries')
    const result = await response.json()
    if (result.success) {
      deliveries.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch deliveries:', error)
  }
}

onMounted(() => {
  fetchDeliveries()
})
</script>
