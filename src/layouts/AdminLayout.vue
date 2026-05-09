<template>
  <div class="admin-layout" :class="{ 
    'pc-sidebar-hide': isSidebarCollapsed, 
    'mob-sidebar-active': isMobileSidebarActive 
  }">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Header -->
    <Header 
      @toggle-sidebar="toggleSidebar" 
      @toggle-mobile-sidebar="toggleMobileSidebar" 
    />

    <!-- Main Content -->
    <div class="pc-container">
      <div class="pc-content">
        <router-view />
      </div>
    </div>

    <!-- Footer -->
    <Footer />
    
    <!-- Mobile Sidebar Backdrop -->
    <div v-if="isMobileSidebarActive" class="pc-menu-overlay" @click="isMobileSidebarActive = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'

const isSidebarCollapsed = ref(false)
const isMobileSidebarActive = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleMobileSidebar = () => {
  isMobileSidebarActive.value = !isMobileSidebarActive.value
}
</script>

<style scoped>
.pc-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1024;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
}

/* Desktop Hide Sidebar (Slide Push Effect) */
@media (min-width: 1025px) {
  :deep(.pc-sidebar) {
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  :deep(.pc-container), :deep(.pc-header) {
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  .admin-layout.pc-sidebar-hide :deep(.pc-sidebar) {
    margin-left: -280px !important;
  }
  
  .admin-layout.pc-sidebar-hide :deep(.pc-container) {
    margin-left: 0 !important;
  }
  
  .admin-layout.pc-sidebar-hide :deep(.pc-header) {
    left: 0 !important;
  }
}

/* Mobile & Tablet Show Sidebar (Drawer Slide Effect) */
@media (max-width: 1024px) {
  :deep(.pc-sidebar) {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    height: 100vh !important;
    margin-left: -280px !important;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    visibility: visible !important;
    z-index: 1030 !important;
    display: block !important;
    width: 280px !important;
    box-shadow: none !important;
  }
  
  .admin-layout.mob-sidebar-active :deep(.pc-sidebar) {
    margin-left: 0 !important;
    box-shadow: 10px 0 30px rgba(0,0,0,0.2) !important;
  }
}

:deep(.pc-container), :deep(.pc-header) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
</style>
