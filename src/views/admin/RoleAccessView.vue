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
              <li class="breadcrumb-item" aria-current="page">Role Access</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Role Access Management</h2>
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
            <h3>Roles List</h3>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#roleModal" @click="resetForm">
              <i class="ti ti-plus me-1"></i> Add New Role
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Role Name</th>
                    <th>Role Code</th>
                    <th>Status</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="5" class="text-center py-5">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="roles.length === 0">
                    <td colspan="5" class="text-center py-5 text-muted">No roles found.</td>
                  </tr>
                  <tr v-for="(role, index) in roles" :key="role.id_role_access">
                    <td>{{ index + 1 }}</td>
                    <td><h6 class="mb-0">{{ role.role_name }}</h6></td>
                    <td><code>{{ role.role_code }}</code></td>
                    <td>
                      <span :class="role.status === 'active' ? 'badge bg-light-success text-success text-capitalize' : 'badge bg-light-danger text-danger text-capitalize'">
                        {{ role.status }}
                      </span>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-light-primary me-1" title="Edit" data-bs-toggle="modal" data-bs-target="#roleModal" @click="editRole(role)">
                        <i class="ti ti-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-light-danger" title="Delete" @click="deleteRole(role.id_role_access)">
                        <i class="ti ti-trash"></i>
                      </button>
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

    <!-- Role Modal -->
    <div class="modal fade" id="roleModal" tabindex="-1" aria-labelledby="roleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="roleModalLabel">{{ isEdit ? 'Edit Role' : 'Add New Role' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveRole">
              <div class="mb-3">
                <label class="form-label">Role Name</label>
                <input type="text" class="form-control" v-model="form.role_name" placeholder="e.g. Administrator" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Role Code</label>
                <input type="text" class="form-control" v-model="form.role_code" placeholder="e.g. ADMIN" :disabled="isEdit" required />
                <div class="form-text">Unique code for role identification.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="form.status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="text-end mt-4">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal" id="closeRoleModal">Cancel</button>
                <button type="submit" class="btn btn-primary px-4" :disabled="isSaving">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
                  {{ isEdit ? 'Update Role' : 'Create Role' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const roles = ref<any[]>([])
const loading = ref(true)
const isSaving = ref(false)
const isEdit = ref(false)
const editingId = ref<number | null>(null)

const form = ref({
  role_name: '',
  role_code: '',
  status: 'active'
})

const API_URL = import.meta.env.VITE_API_BASE_URL

const fetchRoles = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/api/role-access`)
    const result = await response.json()
    if (result.success) {
      roles.value = result.data.filter((r: any) => r.status !== 'deleted')
    }
  } catch (error) {
    console.error('Error fetching roles:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  isEdit.value = false
  editingId.value = null
  form.value = {
    role_name: '',
    role_code: '',
    status: 'active'
  }
}

const editRole = (role: any) => {
  isEdit.value = true
  editingId.value = role.id_role_access
  form.value = {
    role_name: role.role_name,
    role_code: role.role_code,
    status: role.status
  }
}

const saveRole = async () => {
  isSaving.value = true
  try {
    const url = isEdit.value 
      ? `${API_URL}/api/role-access/${editingId.value}`
      : `${API_URL}/api/role-access`
    
    const method = isEdit.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      Swal.fire({
        title: 'Success',
        text: result.message || 'Role saved successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      document.getElementById('closeRoleModal')?.click()
      fetchRoles()
    } else {
      Swal.fire('Error', result.role_name || result.role_code || 'Failed to save role', 'error')
    }
  } catch (error) {
    Swal.fire('Error', 'An error occurred while saving', 'error')
  } finally {
    isSaving.value = false
  }
}

const deleteRole = async (id: number) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This role will be set to deleted status!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/api/role-access/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        Swal.fire('Deleted!', 'Role has been deleted.', 'success')
        fetchRoles()
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete role', 'error')
    }
  }
}

onMounted(() => {
  fetchRoles()
})
</script>

<style scoped>
.badge {
  font-weight: 500;
}
.table td {
  vertical-align: middle;
}
</style>
