<template>
  <div class="error-page">
    <div class="bg-pattern"></div>
    <div class="error-container text-center">
      <div class="error-icon mb-4">
        <i :class="errorIcon"></i>
      </div>
      <h1 class="error-code mb-2">{{ statusCode }}</h1>
      <h2 class="error-title mb-4">{{ errorTitle }}</h2>
      <p class="error-message mb-5 text-muted">
        {{ errorMessage }}
      </p>
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary btn-lg px-5">
          <i class="ti ti-home me-2"></i> Back to Homepage
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const statusCode = computed(() => route.params.code || '404');

const errorIcon = computed(() => {
  switch (statusCode.value) {
    case '404': return 'ti ti-search-off';
    case '403': return 'ti ti-lock-off';
    case '500': return 'ti ti-settings-exclamation';
    case '503': return 'ti ti-server-off';
    default: return 'ti ti-alert-triangle';
  }
});

const errorTitle = computed(() => {
  switch (statusCode.value) {
    case '404': return 'Page Not Found';
    case '403': return 'Access Denied';
    case '500': return 'Internal Server Error';
    case '503': return 'Service Unavailable';
    default: return 'Oops! Something went wrong';
  }
});

const errorMessage = computed(() => {
  switch (statusCode.value) {
    case '404': return 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    case '403': return 'Sorry, you do not have permission to access this page. Please contact your administrator if you think this is a mistake.';
    case '500': return 'We are experiencing some technical difficulties on our end. Please try again later.';
    case '503': return 'Our servers are currently undergoing maintenance. We will be back shortly!';
    default: return 'An unexpected error has occurred. Please return to the homepage or try again later.';
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap');

.error-page {
  --g900: #58101E;
  --g800: #7A1B2E;
  --gold: #c9a227;
  --cream: #faf8f2;
  --white: #ffffff;
  
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(122, 27, 46, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(201, 162, 39, 0.03) 0%, transparent 40%);
  pointer-events: none;
}

.error-container {
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding: 2rem;
}

.error-icon {
  font-size: 6rem;
  color: var(--gold);
  line-height: 1;
  filter: drop-shadow(0 4px 10px rgba(201, 162, 39, 0.2));
}

.error-code {
  font-family: 'Playfair Display', serif;
  font-size: 8rem;
  font-weight: 700;
  color: var(--g900);
  line-height: 1;
  margin-bottom: 0;
  opacity: 0.1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: 100%;
}

.error-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--g900);
}

.error-message {
  font-size: 1.1rem;
  line-height: 1.6;
}

.btn-primary {
  background: var(--g800);
  border-color: var(--g800);
  padding: 0.8rem 2.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(122, 27, 46, 0.2);
}

.btn-primary:hover {
  background: var(--g900);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(122, 27, 46, 0.3);
}

@media (max-width: 768px) {
  .error-code { font-size: 5rem; }
  .error-title { font-size: 2rem; }
}
</style>
