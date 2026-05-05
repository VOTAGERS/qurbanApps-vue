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
              <li class="breadcrumb-item" aria-current="page">User Access</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">User Access Management</h2>
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
            <h3>User Roles Assignment</h3>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userAccessModal" @click="resetForm">
              <i class="ti ti-plus me-1"></i> Assign New User
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User Information</th>
                    <th>Assigned Roles</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="4" class="text-center py-5">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="groupedUserRoles.length === 0">
                    <td colspan="4" class="text-center py-5 text-muted">No user assignments found.</td>
                  </tr>
                  <tr v-for="(group, index) in groupedUserRoles" :key="group.id_user">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <h6 class="mb-0">{{ group.user?.first_name }} {{ group.user?.last_name }}</h6>
                      <span class="text-muted small">{{ group.user?.email }}</span>
                    </td>
                    <td>
                      <div class="d-flex flex-wrap gap-1">
                        <span v-for="ur in group.roles" :key="ur.id_user_role" class="badge bg-light-primary text-primary">
                          {{ ur.role?.role_name }}
                        </span>
                      </div>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-light-primary me-1" title="Edit Roles" data-bs-toggle="modal" data-bs-target="#userAccessModal" @click="editUserRoles(group)">
                        <i class="ti ti-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-light-danger" title="Remove All Access" @click="removeAllAccess(group.id_user)">
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

    <!-- User Access Modal -->
    <div class="modal fade" id="userAccessModal" tabindex="-1" aria-labelledby="userAccessModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userAccessModalLabel">{{ isEdit ? 'Manage User Roles' : 'Assign Roles to User' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAssignment">
              <div class="mb-4">
                <label class="form-label fw-bold">Select User</label>
                <select class="form-select" v-model="form.id_user" :disabled="isEdit" required>
                  <option value="">-- Choose User --</option>
                  <option v-for="user in availableUsers" :key="user.id_user" :value="user.id_user">
                    {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
                  </option>
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold">Select Roles</label>
                <div class="role-checkbox-list border rounded p-3 bg-light">
                  <div v-for="role in availableRoles" :key="role.role_code" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :id="'role_' + role.role_code" :value="role.role_code" v-model="form.role_codes">
                    <label class="form-check-label" :for="'role_' + role.role_code">
                      {{ role.role_name }} <span class="text-muted small">({{ role.role_code }})</span>
                    </label>
                  </div>
                </div>
                <div class="form-text mt-2">You can select one or more roles.</div>
              </div>

              <div class="text-end mt-4">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal" id="closeAccessModal">Cancel</button>
                <button type="submit" class="btn btn-primary px-4" :disabled="isSaving">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm me-1" role="status"></span>
                  {{ isEdit ? 'Update Roles' : 'Assign Roles' }}
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
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

const userRolesRaw = ref<any[]>([])
const availableUsers = ref<any[]>([])
const availableRoles = ref<any[]>([])
const loading = ref(true)
const isSaving = ref(false)
const isEdit = ref(false)

interface UserRoleGroup {
  id_user: any;
  user: any;
  roles: any[];
}

const form = ref({
  id_user: '',
  role_codes: [] as string[]
})

const API_URL = import.meta.env.VITE_API_BASE_URL

// Group userRoles by id_user
const groupedUserRoles = computed<UserRoleGroup[]>(() => {
  const groups: Record<string, UserRoleGroup> = {}
  userRolesRaw.value.forEach(ur => {
    const userId = String(ur.id_user);
    if (!groups[userId]) {
      groups[userId] = {
        id_user: ur.id_user,
        user: ur.user,
        roles: []
      }
    }
    const group = groups[userId];
    if (group) {
      group.roles.push(ur);
    }
  })
  return Object.values(groups)
})

const fetchData = async () => {
  loading.value = true
  try {
    const [urRes, userRes, roleRes] = await Promise.all([
      fetch(`${API_URL}/api/user-access`),
      fetch(`${API_URL}/api/users`),
      fetch(`${API_URL}/api/role-access`)
    ])

    const urResult = await urRes.json()
    const userResult = await userRes.json()
    const roleResult = await roleRes.json()

    if (urResult.success) userRolesRaw.value = urResult.data
    
    if (Array.isArray(userResult)) {
        availableUsers.value = userResult
    } else {
        availableUsers.value = userResult.data || []
    }

    if (roleResult.success) availableRoles.value = roleResult.data
    
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  isEdit.value = false
  form.value = {
    id_user: '',
    role_codes: []
  }
}

const editUserRoles = (group: any) => {
  isEdit.value = true
  form.value = {
    id_user: group.id_user,
    role_codes: group.roles.map((r: any) => r.role_code)
  }
}

const saveAssignment = async () => {
  isSaving.value = true
  try {
    const response = await fetch(`${API_URL}/api/user-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      Swal.fire({
        title: 'Success',
        text: result.message || 'Roles updated successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      document.getElementById('closeAccessModal')?.click()
      fetchData()
    } else {
      Swal.fire('Error', result.message || 'Failed to update roles', 'error')
    }
  } catch (error) {
    Swal.fire('Error', 'An error occurred while saving', 'error')
  } finally {
    isSaving.value = false
  }
}

const removeAllAccess = async (userId: number) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "All roles for this user will be removed!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, remove all!'
  })

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/api/user-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user: userId,
          role_codes: []
        })
      })
      
      if (response.ok) {
        Swal.fire('Removed!', 'All roles have been removed.', 'success')
        fetchData()
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to remove user access', 'error')
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.badge {
  font-weight: 500;
}
.table td {
  vertical-align: middle;
}
.role-checkbox-list {
  max-height: 250px;
  overflow-y: auto;
}
</style>
