<template>
  <div>
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
            <div class="row mb-3 align-items-center">
              <div class="col-sm-6 col-md-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="ti ti-search"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search order, product, customer..."
                    v-model="searchQuery"
                    @input="onSearch"
                  />
                  <button
                    v-if="searchQuery"
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="clearSearch"
                    title="Clear search"
                  >
                    <i class="ti ti-x"></i>
                  </button>
                </div>
              </div>
              <div
                class="col-sm-6 col-md-8 d-flex justify-content-end align-items-center gap-2 mt-2 mt-sm-0"
              >
                <label class="mb-0 text-muted small">Show</label>
                <select
                  class="form-select form-select-sm w-auto"
                  v-model="perPage"
                  @change="onPerPageChange"
                >
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                </select>
                <label class="mb-0 text-muted small">entries</label>
              </div>
            </div>
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
                  <tr v-for="(order, index) in paginatedOrders" :key="order.id_order">
                    <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                    <td>
                      <span class="fw-bold text-primary">{{ order.order_code }}</span>
                    </td>
                    <td>{{ order.product_woo?.name || '-' }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>
                      <div v-if="order.user">
                        <p class="mb-0 fw-bold">
                          {{ order.user.first_name }} {{ order.user.last_name }}
                        </p>
                        <small class="text-muted">{{ order.user.email }}</small>
                      </div>
                      <span v-else>-</span>
                    </td>
                    <td class="text-end">
                      <router-link
                        :to="{ name: 'certificate-participants', params: { id: order.id_order } }"
                        class="btn btn-sm btn-light-info"
                        title="View Participants"
                      >
                        <i class="ti ti-eye"></i>
                      </router-link>
                    </td>
                  </tr>
                  <tr v-if="paginatedOrders.length === 0">
                    <td colspan="6" class="text-center text-muted py-5">
                      <i class="ti ti-certificate fs-1 d-block mb-2"></i>
                      {{
                        searchQuery
                          ? 'No results match your search.'
                          : 'No orders found for certificate generation.'
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
              <div class="text-muted small">
                <template v-if="filteredOrders.length > 0">
                  Showing {{ (currentPage - 1) * perPage + 1 }}–{{
                    Math.min(currentPage * perPage, filteredOrders.length)
                  }}
                  of {{ filteredOrders.length }} entries
                  <span v-if="searchQuery" class="text-info"
                    >(filtered from {{ orders.length }} total)</span
                  >
                </template>
                <template v-else> No entries to show </template>
              </div>
              <nav v-if="totalPages > 1">
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="goToPage(1)" :disabled="currentPage === 1">
                      <i class="ti ti-chevrons-left"></i>
                    </button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button
                      class="page-link"
                      @click="goToPage(currentPage - 1)"
                      :disabled="currentPage === 1"
                    >
                      <i class="ti ti-chevron-left"></i>
                    </button>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in visiblePages"
                    :key="page"
                    :class="{ active: page === currentPage, disabled: page === '...' }"
                  >
                    <button class="page-link" @click="page !== '...' && goToPage(page)">
                      {{ page }}
                    </button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button
                      class="page-link"
                      @click="goToPage(currentPage + 1)"
                      :disabled="currentPage === totalPages"
                    >
                      <i class="ti ti-chevron-right"></i>
                    </button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button
                      class="page-link"
                      @click="goToPage(totalPages)"
                      :disabled="currentPage === totalPages"
                    >
                      <i class="ti ti-chevrons-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const orders = ref<any[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(10)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${authStore.token}`,
  },
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

const filteredOrders = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return orders.value
  return orders.value.filter((order) => {
    const orderCode = order.order_code?.toLowerCase() || ''
    const productName = order.product_woo?.name?.toLowerCase() || ''
    const firstName = order.user?.first_name?.toLowerCase() || ''
    const lastName = order.user?.last_name?.toLowerCase() || ''
    const email = order.user?.email?.toLowerCase() || ''
    return (
      orderCode.includes(q) ||
      productName.includes(q) ||
      firstName.includes(q) ||
      lastName.includes(q) ||
      email.includes(q)
    )
  })
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredOrders.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage.value))
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})

const goToPage = (page: number | string) => {
  const p = Number(page)
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p
  }
}

const onSearch = () => {
  currentPage.value = 1
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const onPerPageChange = () => {
  currentPage.value = 1
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.pagination .page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
