<template>
  <!-- [ Sidebar Menu ] start -->
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header">
        <router-link to="/" class="b-brand text-primary">
          <!-- ========   Change your logo from here   ============ -->
          <img src="/assets/images/logo-dark.svg" alt="" class="logo logo-lg" />
        </router-link>
      </div>
      <div class="navbar-content">
        <ul class="pc-navbar">
          <li class="pc-item pc-caption">
            <label>Dashboard</label>
            <i class="ti ti-dashboard"></i>
          </li>
          <li class="pc-item">
            <router-link to="/" class="pc-link">
              <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
              <span class="pc-mtext">Default</span>
            </router-link>
          </li>

          <li class="pc-item pc-caption">
            <label>Management</label>
            <i class="ti ti-apps"></i>
          </li>
          <li class="pc-item">
            <router-link to="/packages" class="pc-link">
              <span class="pc-micon"><i class="ti ti-box"></i></span>
              <span class="pc-mtext">Setup Package</span>
            </router-link>
          </li>
          <li class="pc-item">
            <router-link to="/orders" class="pc-link">
              <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
              <span class="pc-mtext">Order List</span>
            </router-link>
          </li>
          <li class="pc-item">
            <router-link to="/deliveries" class="pc-link">
              <span class="pc-micon"><i class="ti ti-truck-delivery"></i></span>
              <span class="pc-mtext">Delivery List</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- [ Sidebar Menu ] end -->
</template>

<script setup lang="ts">
</script>
