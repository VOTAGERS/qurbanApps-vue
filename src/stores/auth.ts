import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State: ambil data dari localStorage jika ada
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const roles = ref<any[]>(JSON.parse(localStorage.getItem('roles') || '[]'))
  const token = ref(localStorage.getItem('token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  
  const hasRole = (roleName: string) => {
    return roles.value.some((r: any) => {
      const code = typeof r === 'string' ? r : r.role_code;
      return code === roleName;
    })
  }

  const isCustomer = computed(() => hasRole('eQurban-Customer'))
  const isAdmin = computed(() => hasRole('eQurban-Admin'))
  const isSuperAdmin = computed(() => hasRole('eQurban-SuperAdmin'))

  // Actions
  function setAuthData(userData: any, userRoles: string[], userToken: string) {
    user.value = userData
    roles.value = userRoles
    token.value = userToken

    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('roles', JSON.stringify(userRoles))
    localStorage.setItem('token', userToken)
  }

  function clearAuth() {
    user.value = null
    roles.value = []
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    localStorage.removeItem('token')
  }

  return {
    user,
    roles,
    token,
    isAuthenticated,
    isCustomer,
    isAdmin,
    isSuperAdmin,
    hasRole,
    setAuthData,
    clearAuth
  }
})
