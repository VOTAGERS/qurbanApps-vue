<template>
  <div class="dashboard-home">
    <!-- [ breadcrumb ] start -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Dashboard</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Dashboard Overview</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ breadcrumb ] end -->

    <div class="row">
      <div class="col-sm-12">
        <div class="card welcome-card">
          <div class="card-body p-5 text-center">
            <div class="welcome-content py-5">
              <h1 class="fs-1 fw-bold mb-0">
                Selamat Datang <span class="text-burgundy">{{ userName }}</span> di Dashboard {{ appName }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const appName = import.meta.env.VITE_APP_NAME || 'QurbanHub'

const userName = computed(() => {
  if (authStore.user) {
    return `${authStore.user.first_name} ${authStore.user.last_name || ''}`.trim()
  }
  return 'User'
})
</script>

<style scoped>
.text-burgundy {
  color: #7A1B2E;
}

.welcome-card {
  border: none;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

.icon-box i {
  background: linear-gradient(45deg, #2d5a2d, #c9a227);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-content {
  max-width: 700px;
  margin: 0 auto;
}

.badge {
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
