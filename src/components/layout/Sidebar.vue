<template>
  <!-- [ Sidebar Menu ] start -->
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header">
        <router-link to="/" class="b-brand text-primary d-flex align-items-center">
          <!-- ========   Change your logo from here   ============ -->
          <img src="/assets/images/logo-dark.svg" alt="" class="logo logo-lg me-2" />
          <span class="brand-name fw-bold fs-4 text-dark">{{ appName }}</span>
        </router-link>
      </div>
      <div class="navbar-content">
        <ul class="pc-navbar">
          <li class="pc-item pc-caption">
            <label>Dashboard</label>
            <i class="ti ti-dashboard"></i>
          </li>
          <li class="pc-item">
            <router-link to="/admin/checkout" class="pc-link">
              <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
              <span class="pc-mtext">Checkout Simulation</span>
            </router-link>
          </li>
          <li class="pc-item">
            <router-link to="/admin/my-orders" class="pc-link">
              <span class="pc-micon"><i class="ti ti-history"></i></span>
              <span class="pc-mtext">My Order</span>
            </router-link>
          </li>

          <li class="pc-item pc-caption">
            <label>Management</label>
            <i class="ti ti-apps"></i>
          </li>
          <li class="pc-item">
            <router-link to="/admin/products-detail" class="pc-link">
              <span class="pc-micon"><i class="ti ti-box"></i></span>
              <span class="pc-mtext">Product Menu</span>
            </router-link>
          </li>
          <li class="pc-item">
            <router-link to="/admin/orders" class="pc-link">
              <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
              <span class="pc-mtext">Order Menu</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- [ Sidebar Menu ] end -->
</template>

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME || 'QurbanHub'
</script>
