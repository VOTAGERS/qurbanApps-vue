<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <div class="pc-container">
      <div class="pc-content">
        <router-view />
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'

onMounted(() => {
  // Re-initialize feather icons if they exist
  if ((window as any).feather) {
    (window as any).feather.replace();
  }
})
</script>

<style scoped>
/* Scoped styles if needed */
</style>
