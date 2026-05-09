<template>
  <!-- [ Header Topbar ] start -->
  <header class="pc-header">
    <div class="header-wrapper">
      <!-- [Mobile Media Block] start -->
      <div class="me-auto pc-mob-drp">
        <ul class="list-unstyled">
          <li class="pc-h-item header-mobile-collapse">
            <a href="#" class="pc-head-link head-link-secondary ms-0" @click.prevent="$emit('toggle-sidebar')">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
          <li class="pc-h-item pc-sidebar-popup">
            <a href="#" class="pc-head-link head-link-secondary ms-0" @click.prevent="$emit('toggle-mobile-sidebar')">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
        </ul>
      </div>
      <!-- [Mobile Media Block end] -->
      <div class="ms-auto">
        <ul class="list-unstyled">
          <li class="dropdown pc-h-item header-user-profile">
            <a
              class="pc-head-link head-link-primary dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i class="ti ti-user fs-2"></i>
            </a>
            <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
              <div class="dropdown-header">
                <h4>
                  Welcome,
                  <span class="small text-muted">{{ userName }}</span>
                </h4>
                <p class="text-muted">{{ userRole }}</p>
                <hr />
                <a href="#" class="dropdown-item" @click.prevent="handleLogout">
                  <i class="ti ti-logout"></i>
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <!-- [ Header ] end -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const emit = defineEmits(['toggle-sidebar', 'toggle-mobile-sidebar']);

const user = JSON.parse(localStorage.getItem('user') || '{}');
const roles = JSON.parse(localStorage.getItem('roles') || '[]');
console.log('Current User Roles:', roles);
const appName = import.meta.env.VITE_APP_NAME || 'QurbanHub';

const userName = computed(() => {
  if (user.first_name) return `${user.first_name} ${user.last_name || ''}`;
  return 'User';
});

const userRole = computed(() => {
  if (roles.length > 0) {
    // Prioritaskan tampilan role SuperAdmin jika ada
    const superAdmin = roles.find((r: any) => r.role_code === 'eQurban-SuperAdmin');
    if (superAdmin) return superAdmin.role_name;
    
    return roles[0].role_name;
  }
  return 'Customer';
});

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout',
    text: 'Apakah Anda yakin ingin keluar?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#7A1B2E',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      window.location.href = '/login';
    }
  }
};
</script>
