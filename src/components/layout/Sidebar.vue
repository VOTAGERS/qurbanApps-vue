<template>
  <!-- [ Sidebar Menu ] start -->
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header" style="background: #ffffff; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <router-link to="/admin" class="b-brand d-flex align-items-center text-decoration-none">
          <img src="/assets/images/logos/ILM-Logo-white.jpeg?v=1.0" alt="logo" class="logo logo-lg me-2 rounded-circle" style="width: 45px; height: 45px; object-fit: cover; border: 1px solid rgba(0,0,0,0.1);" />
          <span class="fw-bold fs-3" style="color: #7A1B2E; font-family: 'Playfair Display', serif;">{{ appName }}</span>
        </router-link>
      </div>
      <div class="navbar-content">
        <ul class="pc-navbar">
          <li class="pc-item" :class="{ active: isActive('/admin') }">
            <router-link to="/admin" class="pc-link">
              <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
              <span class="pc-mtext">Dashboard</span>
            </router-link>
          </li>

          <!-- [ Customer & SuperAdmin Only Menus ] -->
          <template v-if="authStore.isCustomer || authStore.isSuperAdmin">
            <li class="pc-item pc-caption">
              <label>Dashboard</label>
              <i class="ti ti-dashboard"></i>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/my-orders') }">
              <router-link to="/admin/my-orders" class="pc-link">
                <span class="pc-micon"><i class="ti ti-history"></i></span>
                <span class="pc-mtext">My Order</span>
              </router-link>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/certificates') }">
              <router-link to="/admin/certificates" class="pc-link">
                <span class="pc-micon"><i class="ti ti-certificate"></i></span>
                <span class="pc-mtext">Certificate Menu</span>
              </router-link>
            </li>
          </template>

          <!-- [ Common Admin/SuperAdmin Menus ] -->
          <template v-if="authStore.isAdmin || authStore.isSuperAdmin">
            <li class="pc-item pc-caption">
              <label>Management</label>
              <i class="ti ti-apps"></i>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/products-detail') }">
              <router-link to="/admin/products-detail" class="pc-link">
                <span class="pc-micon"><i class="ti ti-box"></i></span>
                <span class="pc-mtext">Product Menu</span>
              </router-link>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/orders') }">
              <router-link to="/admin/orders" class="pc-link">
                <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
                <span class="pc-mtext">Order Menu</span>
              </router-link>
            </li>
          </template>

          <!-- [ SuperAdmin Only Menus ] -->
          <template v-if="authStore.isSuperAdmin">
            <li class="pc-item" :class="{ active: isActive('/admin/users') }">
              <router-link to="/admin/users" class="pc-link">
                <span class="pc-micon"><i class="ti ti-users"></i></span>
                <span class="pc-mtext">User Menu</span>
              </router-link>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/role-access') }">
              <router-link to="/admin/role-access" class="pc-link">
                <span class="pc-micon"><i class="ti ti-lock"></i></span>
                <span class="pc-mtext">Role Access Menu</span>
              </router-link>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/user-access') }">
              <router-link to="/admin/user-access" class="pc-link">
                <span class="pc-micon"><i class="ti ti-shield-lock"></i></span>
                <span class="pc-mtext">User Access Menu</span>
              </router-link>
            </li>
            <li class="pc-item" :class="{ active: isActive('/admin/checkout-simulation') }">
              <router-link to="/admin/checkout-simulation" class="pc-link">
                <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
                <span class="pc-mtext">Checkout Simulation</span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const appName = import.meta.env.VITE_APP_NAME || 'QurbanHub'

const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.pc-sidebar .pc-navbar > .pc-item.active > .pc-link {
  color: #7A1B2E !important;
  background: rgba(122, 27, 46, 0.05) !important;
}

.pc-sidebar .pc-navbar > .pc-item.active > .pc-link .pc-micon {
  color: #7A1B2E !important;
}

.pc-sidebar .pc-navbar > .pc-item.active:after {
  background: #7A1B2E !important;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
}
</style>
