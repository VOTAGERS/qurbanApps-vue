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
              <span class="pc-micon"><i class="ti ti-shopping-cart"></i></span>
              <span class="pc-mtext">Checkout Simulation</span>
            </router-link>
          </li>

          <li class="pc-item pc-caption">
            <label>Management</label>
            <i class="ti ti-apps"></i>
          </li>
          <li class="pc-item">
            <router-link to="/products-detail" class="pc-link">
              <span class="pc-micon"><i class="ti ti-box"></i></span>
              <span class="pc-mtext">Product Menu</span>
            </router-link>
          </li>
          <li class="pc-item">
            <router-link to="/orders" class="pc-link">
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
</script>
