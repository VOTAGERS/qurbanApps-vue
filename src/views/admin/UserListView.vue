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
              <li class="breadcrumb-item" aria-current="page">User Management</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">User Management</h2>
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
            <h3>Users List</h3>
            <div class="d-flex gap-2">
              <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">
                <i class="ti ti-plus me-1"></i> Add User
              </button>
              <button class="btn btn-primary" @click="fetchUsers">
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
                    <th>User Information</th>
                    <th>Contact</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="6" class="text-center py-5">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="users.length === 0">
                    <td colspan="6" class="text-center py-5 text-muted">No users found.</td>
                  </tr>
                  <tr v-for="(user, index) in paginatedUsers" :key="user.id_user">
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>
                      <div class="flex-grow-1">
                        <h6 class="mb-0">{{ (user.first_name + ' ' + (user.last_name || '')).trim() }}</h6>
                        <span class="text-muted small">{{ user.email }}</span>
                      </div>
                    </td>
                    <td>
                      <div v-if="user.phone">
                        <a :href="`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="text-decoration-none">
                          <i class="fab fa-whatsapp text-success me-1"></i>{{ user.phone }}
                        </a>
                      </div>
                      <span v-else class="text-muted">-</span>
                    </td>
                    <td>{{ user.company || '-' }}</td>
                    <td>
                      <span class="text-truncate d-inline-block" style="max-width: 200px;" :title="user.address_1">
                        {{ user.address_1 || '-' }}
                      </span>
                    </td>
                    <td class="text-end text-nowrap">
                      <button class="btn btn-sm btn-light-secondary me-1" title="View Detail" data-bs-toggle="modal" data-bs-target="#userModal" @click="selectedUser = user">
                        <i class="ti ti-eye"></i>
                      </button>
                      <button class="btn btn-sm btn-light-primary me-1" title="Edit" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="startEdit(user)">
                        <i class="ti ti-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-light-danger" title="Delete" @click="confirmDelete(user)">
                        <i class="ti ti-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div v-if="users.length > itemsPerPage" class="d-flex align-items-center justify-content-between p-3 border-top mt-3">
              <div class="text-muted small">
                Showing {{ startItem }} to {{ endItem }} of {{ users.length }} entries
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

  <!-- User Detail Modal -->
  <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userModalLabel">User Detail Information</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="selectedUser">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Full Name</label>
              <p class="fw-bold fs-5 mb-0">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Email Address</label>
              <p class="fw-bold fs-5 mb-0">{{ selectedUser.email }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Phone Number</label>
              <p class="fw-bold fs-5 mb-0">{{ selectedUser.phone || '-' }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Company</label>
              <p class="fw-bold fs-5 mb-0">{{ selectedUser.company || '-' }}</p>
            </div>
            <hr class="my-2" />
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label text-muted small mb-0">Address 1</label>
                <p class="fw-bold mb-0">{{ selectedUser.address_1 || '-' }}</p>
              </div>
              <div class="mb-0">
                <label class="form-label text-muted small mb-0">Address 2</label>
                <p class="fw-bold mb-0">{{ selectedUser.address_2 || '-' }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-2">
                <label class="form-label text-muted small mb-0">City</label>
                <p class="fw-bold mb-0">{{ selectedUser.city || '-' }}</p>
              </div>
              <div class="mb-2">
                <label class="form-label text-muted small mb-0">Postcode</label>
                <p class="fw-bold mb-0">{{ selectedUser.postcode || '-' }}</p>
              </div>
              <div class="mb-0">
                <label class="form-label text-muted small mb-0">Country</label>
                <p class="fw-bold mb-0">{{ selectedUser.country || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer text-start">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <a v-if="selectedUser?.phone" :href="`https://wa.me/${selectedUser.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-success px-4">
             <i class="fab fa-whatsapp me-1"></i> Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit User Modal -->
  <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editUserModalLabel">Edit User Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="editingUser">
          <form @submit.prevent="saveUser">
            <div class="accordion" id="editUserAccordion">
              <!-- Card 1: Basic Information -->
              <div class="card mb-2 shadow-none border">
                <div class="card-header p-0" id="editHeadingBasic">
                  <button class="btn btn-link w-100 text-start text-decoration-none p-3 fw-bold d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#editCollapseBasic" aria-expanded="true" aria-controls="editCollapseBasic">
                    <span><i class="ti ti-user me-2"></i>Basic Information</span>
                    <i class="ti ti-chevron-down"></i>
                  </button>
                </div>
                <div id="editCollapseBasic" class="collapse show" aria-labelledby="editHeadingBasic" data-bs-parent="#editUserAccordion">
                  <div class="card-body pt-0">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">First Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.first_name" required />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Last Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.last_name" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control form-control-sm" v-model="editingUser.email" required />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Phone Number <span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.phone" required />
                      </div>
                      <div class="col-12">
                        <label class="form-label small fw-bold">Company</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.company" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card 2: Address Information -->
              <div class="card mb-0 shadow-none border">
                <div class="card-header p-0" id="editHeadingAddress">
                  <button class="btn btn-link w-100 text-start text-decoration-none p-3 fw-bold d-flex justify-content-between align-items-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#editCollapseAddress" aria-expanded="false" aria-controls="editCollapseAddress">
                    <span><i class="ti ti-map-pin me-2"></i>Address Information</span>
                    <i class="ti ti-chevron-down"></i>
                  </button>
                </div>
                <div id="editCollapseAddress" class="collapse" aria-labelledby="editHeadingAddress" data-bs-parent="#editUserAccordion">
                  <div class="card-body pt-0">
                    <div class="row g-3">
                      <div class="col-12">
                        <label class="form-label small fw-bold">Address 1</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.address_1" />
                      </div>
                      <div class="col-12">
                        <label class="form-label small fw-bold">Address 2</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.address_2" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">City</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.city" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">State</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.state" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">Postcode</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.postcode" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Country</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.country" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Country Code</label>
                        <input type="text" class="form-control form-control-sm" v-model="editingUser.country_code" maxlength="2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-end mt-4">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary px-4" :disabled="isSaving">
                <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Add User Modal -->
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addUserModalLabel">Create New User (Complete)</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addUser">
            <div class="accordion" id="addUserAccordion">
              <!-- Card 1: Basic Information -->
              <div class="card mb-2 shadow-none border">
                <div class="card-header p-0" id="headingBasic">
                  <button class="btn btn-link w-100 text-start text-decoration-none p-3 fw-bold d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBasic" aria-expanded="true" aria-controls="collapseBasic">
                    <span><i class="ti ti-user me-2"></i>Basic Information</span>
                    <i class="ti ti-chevron-down"></i>
                  </button>
                </div>
                <div id="collapseBasic" class="collapse show" aria-labelledby="headingBasic" data-bs-parent="#addUserAccordion">
                  <div class="card-body pt-0">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">First Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.first_name" required placeholder="Required" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Last Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.last_name" placeholder="Optional" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control form-control-sm" v-model="newUser.email" required placeholder="Required" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Password <span class="text-danger">*</span></label>
                        <input type="password" class="form-control form-control-sm" v-model="newUser.password" required placeholder="Min 6 characters" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Phone Number <span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.phone" required placeholder="Required" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Company</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.company" placeholder="Optional" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card 2: Address Information -->
              <div class="card mb-0 shadow-none border">
                <div class="card-header p-0" id="headingAddress">
                  <button class="btn btn-link w-100 text-start text-decoration-none p-3 fw-bold d-flex justify-content-between align-items-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddress" aria-expanded="false" aria-controls="collapseAddress">
                    <span><i class="ti ti-map-pin me-2"></i>Address Information</span>
                    <i class="ti ti-chevron-down"></i>
                  </button>
                </div>
                <div id="collapseAddress" class="collapse" aria-labelledby="headingAddress" data-bs-parent="#addUserAccordion">
                  <div class="card-body pt-0">
                    <div class="row g-3">
                      <div class="col-12">
                        <label class="form-label small fw-bold">Address 1</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.address_1" />
                      </div>
                      <div class="col-12">
                        <label class="form-label small fw-bold">Address 2</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.address_2" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">City</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.city" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">State</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.state" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">Postcode</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.postcode" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Country</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.country" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small fw-bold">Country Code</label>
                        <input type="text" class="form-control form-control-sm" v-model="newUser.country_code" maxlength="2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-end mt-4">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary px-4" :disabled="isSaving">
                <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import Swal from 'sweetalert2'

const users = ref<any[]>([])
const loading = ref(true)
const selectedUser = ref<any>(null)
const editingUser = ref<any>(null)
const isSaving = ref(false)

// Add User State - Match Model Fillable
const newUser = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  country_code: 'ID'
})

// Pagination State
const currentPage = ref(1)
const itemsPerPage = ref(10)

const API_URL = import.meta.env.VITE_API_BASE_URL

const authStore = useAuthStore()

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    const result = await response.json()
    
    if (result.success && Array.isArray(result.data)) {
      users.value = result.data
    } else {
      users.value = Array.isArray(result) ? result : []
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const addUser = async () => {
  isSaving.value = true
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(newUser.value)
    })
    const result = await response.json()
    
    if (result.success) {
      alert('User created successfully')
      // Reset form
      newUser.value = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        country_code: 'ID'
      }
      // Close modal
      const closeBtn = document.querySelector('#addUserModal .btn-close') as HTMLElement
      closeBtn?.click()
      // Refresh list
      fetchUsers()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message || 'Failed to create user'
      })
    }
  } catch (error) {
    console.error('Error creating user:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while creating user'
    })
  } finally {
    isSaving.value = false
  }
}

const confirmDelete = (user: any) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete user: ${user.first_name}. This action cannot be undone!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7A1B2E',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/api/users/${user.id_user}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        const data = await response.json()
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been deleted.',
            timer: 2000,
            showConfirmButton: false
          })
          fetchUsers()
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to delete user', 'error')
      }
    }
  })
}

const startEdit = (user: any) => {
  // Clone object agar tidak merubah data asli di tabel sebelum di-save
  editingUser.value = JSON.parse(JSON.stringify(user))
}

const saveUser = async () => {
  isSaving.value = true
  try {
    const response = await fetch(`${API_URL}/api/users/${editingUser.value.id_user}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(editingUser.value)
    })
    const result = await response.json()
    
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'User updated successfully',
        timer: 2000,
        showConfirmButton: false
      })
      // Close modal
      const closeBtn = document.querySelector('#editUserModal .btn-close') as HTMLElement
      closeBtn?.click()
      // Refresh list
      fetchUsers()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: result.message || 'Failed to update user'
      })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while updating user'
    })
  } finally {
    isSaving.value = false
  }
}

// Pagination Logic
const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage.value))
const startItem = computed(() => users.value.length ? ((currentPage.value - 1) * itemsPerPage.value) + 1 : 0)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, users.value.length))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return users.value.slice(start, end)
})

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.page-link {
  cursor: pointer;
}
.modal-body p {
  margin-bottom: 0.5rem;
  color: #212529;
}
.table td {
    vertical-align: middle;
}
</style>
