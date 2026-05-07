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
              <li class="breadcrumb-item" aria-current="page">Setup Qurban Product</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Product Menu</h2>
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
            <h3>Product List</h3>
            <button class="btn btn-primary" @click="openModal()">
              <i class="ti ti-plus me-1"></i> Add Product
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="text-center">
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <!-- <th>Woo ID</th> -->
                    <th>Price</th>
                    <th>Country</th>
                    <th>Max Share</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(detail, index) in productDetails" :key="detail.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <strong>{{ detail.product_woo ? detail.product_woo.name : 'Unknown Product' }}</strong>
                    </td>
                    <!-- <td><span class="badge bg-light-primary text-primary">{{ detail.product_woo ? detail.product_woo.woo_id : '-' }}</span></td> -->
                    <td>{{ formatCurrency(detail.product_woo?.price || 0) }}</td>
                    <td>{{ detail.country }}</td>
                    <td>{{ detail.max_share }} Orang</td>
                    <td>
                      <span :class="['badge', detail.product_woo?.status === 'publish' ? 'bg-light-success text-success' : 'bg-light-warning text-warning']">
                        {{ detail.product_woo ? detail.product_woo.status : 'unknown' }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-light-secondary me-1" title="Edit" @click="openModal(detail)">
                        <i class="ti ti-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-light-danger" title="Hapus" @click="deleteDetail(detail.id)">
                        <i class="ti ti-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="productDetails.length === 0">
                    <td colspan="8" class="text-center text-muted py-4">No product data available.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Main Content ] end -->

    <!-- Modal Add/Edit (Bootstrap Modal) -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailModalLabel">{{ editMode ? 'Edit Product' : 'Add New Product' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="detailForm" @submit.prevent="saveDetail">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label class="form-label">Product Name (WooCommerce)</label>
                  <input type="text" class="form-control" v-model="form.name" placeholder="Example: Cow Qurban Type A" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Product Price</label>
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model="form.price" placeholder="2500000" required min="0">
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Status (WooCommerce)</label>
                  <select class="form-select" v-model="form.status_woo" required>
                    <option value="publish">Publish</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <hr class="my-4">
              <h6 class="mb-3 text-primary">Specific Qurban Details</h6>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Country</label>
                  <input type="text" class="form-control" v-model="form.country" placeholder="Example: Indonesia" required maxlength="100">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Max Share (People Count)</label>
                  <input type="number" class="form-control" v-model="form.max_share" placeholder="1" required min="1">
                  <small class="text-muted">Example: 7 for cow, 1 for sheep/goat.</small>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" form="detailForm" class="btn btn-primary">Save Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

const defaultCurrency = import.meta.env.VITE_DEFAULT_CURRENCY || 'IDR'
const currencySymbol = defaultCurrency === 'IDR' ? 'Rp' : (defaultCurrency === 'SGD' ? 'S$' : (defaultCurrency === 'MYR' ? 'RM' : '$'))
const locale = defaultCurrency === 'IDR' ? 'id-ID' : (defaultCurrency === 'SGD' ? 'en-SG' : (defaultCurrency === 'MYR' ? 'en-MY' : 'en-US'))

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: defaultCurrency }).format(Number(value))
}

interface WooProduct {
  id: number;
  woo_id: number;
  name: string;
  price: string;
  status: string;
}

interface ProductDetailData {
  id: number;
  idproduct_woo: number;
  country: string;
  max_share: number;
  status: string;
  product_woo?: WooProduct;
}

const productDetails = ref<ProductDetailData[]>([])
const editMode = ref(false)
const editId = ref<number | null>(null)

const form = ref({
  woo_id: '',
  name: '',
  price: '',
  status_woo: 'publish',
  country: '',
  max_share: 1,
})

let modalInstance: any = null

const fetchProductDetails = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products-detail`)
    const result = await response.json()
    if (result.success) {
      productDetails.value = result.data
    }
  } catch (error) {
    console.error('Failed to fetch details:', error)
  }
}

onMounted(() => {
  if ((window as any).bootstrap) {
    modalInstance = new (window as any).bootstrap.Modal(document.getElementById('detailModal'))
  }
  
  fetchProductDetails()
})

const openModal = (detail?: ProductDetailData) => {
  if (detail) {
    editMode.value = true
    editId.value = detail.id
    form.value = {
      woo_id: detail.product_woo?.woo_id?.toString() || '',
      name: detail.product_woo?.name || '',
      price: detail.product_woo?.price?.toString() || '',
      status_woo: detail.product_woo?.status || 'publish',
      country: detail.country,
      max_share: detail.max_share,
    }
  } else {
    editMode.value = false
    editId.value = null
    form.value = { 
      woo_id: '',
      name: '',
      price: '',
      status_woo: 'publish',
      country: '', 
      max_share: 1, 
    }
  }
  
  if (modalInstance) {
    modalInstance.show()
  }
}

const saveDetail = async () => {
  try {
    const url = editMode.value 
      ? `${import.meta.env.VITE_API_BASE_URL}/api/products-detail/${editId.value}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/products-detail`
      
    const method = editMode.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    const result = await response.json()
    
    if (response.ok && result.success) {
      await fetchProductDetails()
      if (modalInstance) {
        modalInstance.hide()
      }
      Swal.fire({
        title: 'Success!',
        text: `Product ${editMode.value ? 'updated' : 'created'} successfully!`,
        icon: 'success',
        confirmButtonColor: '#7A1B2E'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save: ' + (result.message || 'Check your data'),
        icon: 'error',
        confirmButtonColor: '#7A1B2E'
      });
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Failed to save product:', error)
    Swal.fire({
      title: 'Error!',
      text: 'Failed to connect to backend server',
      icon: 'error',
      confirmButtonColor: '#7A1B2E'
    });
  }
}

const deleteDetail = async (id: number) => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this product? (Soft Delete)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  });

  if (!confirmResult.isConfirmed) return;
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products-detail/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    const result = await response.json()
    if (response.ok && result.success) {
      Swal.fire({
        title: 'Deleted!',
        text: 'Product deleted successfully!',
        icon: 'success',
        confirmButtonColor: '#7A1B2E'
      });
      await fetchProductDetails()
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to delete product.',
        icon: 'error',
        confirmButtonColor: '#7A1B2E'
      });
    }
  } catch (error) {
    console.error('Failed to delete:', error)
    Swal.fire({
      title: 'Error!',
      text: 'Failed to connect to backend server',
      icon: 'error',
      confirmButtonColor: '#7A1B2E'
    });
  }
}
</script>
