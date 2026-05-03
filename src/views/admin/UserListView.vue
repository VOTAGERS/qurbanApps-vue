<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card table-card">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h5>User Management</h5>
          <div class="card-header-right">
            <button class="btn btn-primary btn-sm" @click="fetchUsers">
              <i class="ti ti-refresh"></i> Refresh
            </button>
          </div>
        </div>
        <div class="card-body pt-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Address</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="5" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="users.length === 0">
                  <td colspan="5" class="text-center py-4 text-muted">No users found.</td>
                </tr>
                <tr v-for="user in paginatedUsers" :key="user.id_user">
                  <td>
                    <div class="flex-grow-1">
                      <h6 class="mb-0">{{ (user.first_name + ' ' + (user.last_name || '')).trim() }}</h6>
                      <small class="text-muted">{{ user.email }}</small>
                    </div>
                  </td>
                  <td>
                    <div class="text-muted small">
                      <a v-if="user.phone" :href="`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="text-muted text-decoration-none">
                        <i class="fab fa-whatsapp text-success me-1"></i>{{ user.phone }}
                      </a>
                      <span v-else>-</span>
                    </div>
                  </td>
                  <td>{{ user.company || '-' }}</td>
                  <td>
                    <span class="text-muted small text-truncate d-inline-block" style="max-width: 200px;" :title="user.address_1">
                      {{ user.address_1 || '-' }}
                    </span>
                  </td>
                  <td class="text-end text-nowrap">
                    <button class="btn btn-sm btn-light-secondary me-1" title="View Detail" data-bs-toggle="modal" data-bs-target="#userModal" @click="selectedUser = user">
                      <i class="ti ti-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-light-primary me-1" title="Edit">
                      <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-light-danger" title="Delete">
                      <i class="ti ti-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div v-if="users.length > itemsPerPage" class="d-flex align-items-center justify-content-between p-3 border-top">
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
              <p class="fw-bold">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Email Address</label>
              <p class="fw-bold">{{ selectedUser.email }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Phone Number</label>
              <p class="fw-bold">{{ selectedUser.phone || '-' }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small mb-0">Company</label>
              <p class="fw-bold">{{ selectedUser.company || '-' }}</p>
            </div>
            <hr class="my-2" />
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label text-muted small mb-0">Address 1</label>
                <p class="fw-bold mb-2">{{ selectedUser.address_1 || '-' }}</p>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <a v-if="selectedUser?.phone" :href="`https://wa.me/${selectedUser.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-success">
             <i class="fab fa-whatsapp me-1"></i> Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const users = ref<any[]>([])
const loading = ref(true)
const selectedUser = ref<any>(null)

// Pagination State
const currentPage = ref(1)
const itemsPerPage = ref(10)

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/api/users`)
    const result = await response.json()
    
    if (Array.isArray(result)) {
      users.value = result
    } else if (result.success && Array.isArray(result.data)) {
      users.value = result.data
    } else {
      users.value = result.data || []
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

// Pagination Logic
const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage.value))
const startItem = computed(() => ((currentPage.value - 1) * itemsPerPage.value) + 1)
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
.btn-icon {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.modal-body p {
  margin-bottom: 0.5rem;
}
.page-link {
  cursor: pointer;
}
</style>
