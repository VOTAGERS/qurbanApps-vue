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
              <div>
                <h3 class="mb-0">Qurban Order List</h3>
                <div class="mt-1">
                  <span class="text-muted small me-2">Total Orders: <strong>{{ orders.length }}</strong></span>
                  <span v-if="filteredOrders.length !== orders.length" class="badge bg-light-info text-info py-1 px-2" style="font-size: 0.75rem;">
                    Showing <strong>{{ filteredOrders.length }}</strong> filtered results
                  </span>
                </div>
              </div>
             <div class="d-flex gap-2">
               <button class="btn btn-success" @click="exportToExcel" :disabled="isLoadingExport">
                 <i class="ti ti-file-spreadsheet me-1"></i> 
                 {{ isLoadingExport ? 'Exporting...' : 'Export Excel' }}
               </button>
               <button class="btn btn-primary" @click="fetchOrders">
                 <i class="ti ti-refresh me-1"></i> Refresh Data
               </button>
             </div>
           </div>
           <div class="card-body border-bottom">
             <div class="row g-3 align-items-end">
               <div class="col-md-3">
                 <label class="form-label small fw-bold">Filter By Category</label>
                 <select class="form-select" v-model="filterConfig.category" @change="filterConfig.value = ''">
                   <option value="">All Categories</option>
                   <option value="customer">Customer</option>
                   <option value="country">Country</option>
                   <option value="product">Product</option>
                   <option value="payment_status">Payment Status</option>
                 </select>
               </div>
               <div class="col-md-3">
                 <label class="form-label small fw-bold">Select Value</label>
                 <select class="form-select" v-model="filterConfig.value" :disabled="!filterConfig.category">
                   <option value="">All Values</option>
                   <option v-for="val in dynamicFilterOptions" :key="val" :value="val">{{ val }}</option>
                 </select>
               </div>
               <div class="col-md-6">
                 <label class="form-label small fw-bold">Search</label>
                 <div class="input-group">
                   <span class="input-group-text bg-transparent border-end-0"><i class="ti ti-search"></i></span>
                   <input type="text" class="form-control border-start-0" v-model="filterConfig.search" placeholder="Search Order Code, Customer, or Product...">
                 </div>
               </div>
             </div>
           </div>
           <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Order Code</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Country</th>
                    <th>Qurban Product</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                    <th>Payment</th>
                    <th>Qurban Status</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in paginatedOrders" :key="order.id_order">
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td><strong>{{ order.order_code }}</strong></td>
                    <td class="small">{{ formatDate(order.created_at) }}</td>
                    <td>{{ order.user ? (order.user.first_name + ' ' + (order.user.last_name || '')).trim() : 'Unknown User' }}</td>
                    <td>
                      <span v-if="order.product_woo?.product_detail">
                        {{ order.product_woo.product_detail.country }}
                      </span>
                      <span v-else class="text-muted">-</span>
                    </td>
                    <td>
                      <span v-if="order.product_woo">
                        {{ order.product_woo.name }}
                      </span>
                      <span v-else class="text-muted">No Product</span>
                    </td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ formatCurrency(order.total_price) }}</td>
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
                        <button 
                          class="btn btn-sm btn-light-secondary me-1" 
                          title="Detail"
                          @click="viewDetail(order.order_code)">
                          <i class="ti ti-eye"></i>
                        </button>
                      <button class="btn btn-sm btn-light-primary" title="Edit">
                        <i class="ti ti-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="orders.length === 0">
                    <td colspan="10" class="text-center text-muted py-4">No order data available.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div v-if="orders.length > itemsPerPage" class="d-flex align-items-center justify-content-between p-3 border-top mt-3">
              <div class="text-muted small">
                Showing {{ startItem }} to {{ endItem }} of {{ filteredOrders.length }} entries
              </div>
              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage--">Previous</button>
                  </li>
                  <li class="page-item" :class="{ active: currentPage === page }" v-for="page in totalPages" :key="page">
                    <button class="page-link" @click="currentPage = page">{{ page }}</button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="currentPage++">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Main Content ] end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'

import { useRouter } from 'vue-router'
const router = useRouter()

const viewDetail = (orderCode: string) => {
  router.push({ name: 'order-detail', query: { order_code: orderCode } })
}

const API_URL = import.meta.env.VITE_API_BASE_URL
const defaultCurrency = import.meta.env.VITE_DEFAULT_CURRENCY || 'IDR'
const locale = defaultCurrency === 'IDR' ? 'id-ID' : (defaultCurrency === 'SGD' ? 'en-SG' : (defaultCurrency === 'MYR' ? 'en-MY' : 'en-US'))

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: defaultCurrency }).format(Number(value))
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

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
  created_at: string;
  user?: {
    id_user: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  product_woo?: {
    id: number;
    woo_id: number;
    name: string;
    product_detail?: {
      country: string;
      max_share: number;
    };
  };
}

const filterConfig = ref({
  category: '',
  value: '',
  search: '',
})

// Dynamic Options for the second dropdown
const dynamicFilterOptions = computed(() => {
  if (!filterConfig.value.category) return []
  
  let values: any[] = []
  switch (filterConfig.value.category) {
    case 'customer':
      values = orders.value.map(o => o.user ? (o.user.first_name + ' ' + (o.user.last_name || '')).trim() : 'Unknown User')
      break
    case 'country':
      values = orders.value.map(o => o.product_woo?.product_detail?.country).filter(Boolean)
      break
    case 'product':
      values = orders.value.map(o => o.product_woo?.name).filter(Boolean)
      break
    case 'payment_status':
      values = ['paid', 'pending', 'failed']
      break
  }
  return [...new Set(values)].sort()
})

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    // 1. Category Filter
    let categoryMatch = true
    if (filterConfig.value.category && filterConfig.value.value) {
      const customerName = order.user ? (order.user.first_name + ' ' + (order.user.last_name || '')).trim() : 'Unknown User'
      const country = order.product_woo?.product_detail?.country || ''
      const productName = order.product_woo?.name || ''
      const paymentStatus = order.payment_status || ''

      switch (filterConfig.value.category) {
        case 'customer': categoryMatch = customerName === filterConfig.value.value; break
        case 'country': categoryMatch = country === filterConfig.value.value; break
        case 'product': categoryMatch = productName === filterConfig.value.value; break
        case 'payment_status': categoryMatch = paymentStatus === filterConfig.value.value; break
      }
    }

    // 2. Search Filter (Universal)
    let searchMatch = true
    if (filterConfig.value.search) {
      const q = filterConfig.value.search.toLowerCase()
      const customerName = order.user ? (order.user.first_name + ' ' + (order.user.last_name || '')).toLowerCase() : ''
      const productName = (order.product_woo?.name || '').toLowerCase()
      const orderCode = (order.order_code || '').toLowerCase()
      const country = (order.product_woo?.product_detail?.country || '').toLowerCase()
      
      searchMatch = orderCode.includes(q) || customerName.includes(q) || productName.includes(q) || country.includes(q)
    }

    return categoryMatch && searchMatch
  })
})

// Reset page when filters change
watch(filterConfig, () => {
  currentPage.value = 1
}, { deep: true })

const isLoadingExport = ref(false)
const exportToExcel = async () => {
  isLoadingExport.value = true
  try {
    const response = await fetch(`${API_URL}/api/orders/export-excel`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`, 
      },
    })

    if (!response.ok) throw new Error('Export failed')

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `sales-report-${new Date().toISOString().slice(0,10)}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export error:', error)
    alert('Gagal mendownload laporan Excel. Pastikan endpoint di backend sudah tersedia.')
  } finally {
    isLoadingExport.value = false
  }
}

const orders = ref<OrderData[]>([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

const authStore = useAuthStore()
const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    const result = await response.json()
    if (result.success) {
      orders.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))
const startItem = computed(() => filteredOrders.value.length === 0 ? 0 : ((currentPage.value - 1) * itemsPerPage.value) + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredOrders.value.length))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

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

<style scoped>
.page-link {
  cursor: pointer;
}
</style>
