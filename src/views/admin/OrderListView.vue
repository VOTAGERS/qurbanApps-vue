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
             <h3>Qurban Order List</h3>
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
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Order Code</th>
                    <th>Customer</th>
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
                    <td>{{ order.user ? (order.user.first_name + ' ' + (order.user.last_name || '')).trim() : 'Unknown User' }}</td>
                    <td>
                      <span v-if="order.product_woo">
                         {{ order.product_woo.name }} 
                      </span>
                      <span v-else class="text-muted">No Product</span>
                    </td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ formatCurrency(order.total_price) }}</td>
                    <td>
                      <div class="d-flex flex-column gap-1">
                        <span :class="getPaymentBadgeClass(order.payment_status)">
                          {{ order.payment_status }}
                        </span>
                        <span v-if="order.payment?.payment_method === 'stripe'" class="badge bg-light-primary text-primary" style="width: fit-content;">
                          <i class="ti ti-credit-card me-1"></i> Credit Card
                        </span>
                        <span v-else-if="order.payment?.payment_method === 'bank_transfer'" class="badge bg-light-primary text-primary" style="width: fit-content;">
                          <i class="ti ti-building-bank me-1"></i> Bank Transfer
                        </span>
                      </div>
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
                    <td colspan="9" class="text-center text-muted py-4">No order data available.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div v-if="orders.length > itemsPerPage" class="d-flex align-items-center justify-content-between p-3 border-top mt-3">
              <div class="text-muted small">
                Showing {{ startItem }} to {{ endItem }} of {{ orders.length }} entries
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

    <!-- [ Modal Update Payment ] start -->
    <div class="modal fade" id="modalUpdatePayment" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="ti ti-cash me-2"></i>Update Payment Status
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedOrder">
            <div class="bg-light rounded p-3 mb-3">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted small">Order Code</span>
                <strong class="small">{{ selectedOrder.order_code }}</strong>
              </div>
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted small">Customer</span>
                <strong class="small">{{ selectedOrder.user?.first_name }} {{ selectedOrder.user?.last_name }}</strong>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-muted small">Amount</span>
                <strong class="small">{{ formatCurrency(selectedOrder.payment?.amount) }}</strong>
              </div>
            </div>
            <label class="form-label fw-bold">Payment Status</label>
            <select class="form-select" v-model="updatePaymentForm.payment_status">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" @click="submitUpdatePayment" :disabled="isUpdatingPayment">
              <i class="ti ti-check me-1"></i>
              {{ isUpdatingPayment ? 'Updating...' : 'Update Status' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Modal Update Payment ] end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const API_URL = import.meta.env.VITE_API_BASE_URL
const defaultCurrency = import.meta.env.VITE_DEFAULT_CURRENCY || 'IDR'
const locale = defaultCurrency === 'IDR' ? 'id-ID' : (defaultCurrency === 'SGD' ? 'en-SG' : (defaultCurrency === 'MYR' ? 'en-MY' : 'en-US'))

// ============================================================
// INTERFACES
// ============================================================
interface PaymentData {
  id_payment: number
  hash_id: string
  payment_method: string
  payment_status: string
  amount: string
  paid_at: string | null
}

interface OrderData {
  id_order: number
  order_code: string
  id_user: number
  id_package: number
  quantity: number
  total_price: string
  payment_status: string
  qurban_status: string
  status: string
  created_at: string
  user?: {
    id_user: number
    first_name: string
    last_name: string
    email: string
  }
  product_woo?: {
    id: number
    woo_id: number
    name: string
    product_detail?: {
      country: string
      max_share: number
    }
  }
  payment?: PaymentData
}

// ============================================================
// FORMATTERS
// ============================================================
const formatCurrency = (value: string | number | undefined) => {
  if (value === undefined || value === null) return '-'
  return new Intl.NumberFormat(locale, { style: 'currency', currency: defaultCurrency }).format(Number(value))
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
  };
}

const isLoadingExport = ref(false)
const exportToExcel = async () => {
  isLoadingExport.value = true
  try {
    const response = await fetch(`${API_URL}/api/orders/export-excel`, {
      method: 'GET',
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      // },
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

// ============================================================
// ORDERS
// ============================================================
const orders = ref<OrderData[]>([])

const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders`)
    const result = await response.json()
    if (result.success) {
      orders.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

// Pagination Logic
const totalPages = computed(() => Math.ceil(orders.value.length / itemsPerPage.value))
const startItem = computed(() => ((currentPage.value - 1) * itemsPerPage.value) + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, orders.value.length))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return orders.value.slice(start, end)
})

// ============================================================
// EXPORT EXCEL
// ============================================================
const isLoadingExport = ref(false)
const exportToExcel = async () => {
  isLoadingExport.value = true
  try {
    const params = new URLSearchParams()
    if (filterConfig.value.startDate) params.append('start_date', filterConfig.value.startDate)
    if (filterConfig.value.endDate) params.append('end_date', filterConfig.value.endDate)

    const response = await fetch(`${API_URL}/api/orders/export-excel?${params.toString()}`, {
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
    link.setAttribute('download', `sales-report-${new Date().toISOString().slice(0, 10)}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export error:', error)
    alert('Gagal mendownload laporan Excel.')
  } finally {
    isLoadingExport.value = false
  }
}

// ============================================================
// VIEW DETAIL
// ============================================================
const viewDetail = (orderCode: string) => {
  router.push({ name: 'order-detail', query: { order_code: orderCode } })
}

// ============================================================
// UPDATE PAYMENT STATUS (BANK TRANSFER)
// ============================================================
const selectedOrder = ref<OrderData | null>(null)
const isUpdatingPayment = ref(false)
const updatePaymentForm = ref({ payment_status: 'pending' })
let modalInstance: any = null

const openUpdatePaymentModal = (order: OrderData) => {
  selectedOrder.value = order
  updatePaymentForm.value.payment_status = order.payment?.payment_status || 'pending'
  modalInstance = getModal('modalUpdatePayment')
  modalInstance.show()
}

const submitUpdatePayment = async () => {
  if (!selectedOrder.value?.payment?.hash_id) return
  isUpdatingPayment.value = true
  try {
    const res = await fetch(`${API_URL}/api/payments/${selectedOrder.value.payment.hash_id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ payment_status: updatePaymentForm.value.payment_status })
    })
    const result = await res.json()
    if (result.success) {
      modalInstance?.hide()
      await fetchOrders()
    } else {
      alert(result.message)
    }
  } catch (e) {
    alert('Gagal update status payment')
  } finally {
    isUpdatingPayment.value = false
  }
}

// ============================================================
// LIFECYCLE
// ============================================================
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.page-link {
  cursor: pointer;
}
</style>