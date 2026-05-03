<template>
  <!-- [ Header Topbar ] start -->
  <header class="pc-header">
    <div class="header-wrapper">
      <!-- [Mobile Media Block] start -->
      <div class="me-auto pc-mob-drp">
        <ul class="list-unstyled">
          <li class="pc-h-item header-mobile-collapse">
            <a href="#" class="pc-head-link head-link-secondary ms-0" id="sidebar-hide">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
          <li class="pc-h-item pc-sidebar-popup">
            <a href="#" class="pc-head-link head-link-secondary ms-0" id="mobile-collapse">
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
                  Good Morning,
                  <span class="small text-muted">Admin</span>
                </h4>
                <p class="text-muted">Project Admin</p>
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')

    

  await axios.post(
      '/api/admins/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (error) {
    console.error('Logout error:', error)
  }

  // hapus token
  localStorage.removeItem('token')

  // redirect ke login
  router.push('/login')
}
</script>
