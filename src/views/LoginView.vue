<template>
  <div class="login-page">
    <div class="bg-pattern"></div>
    <div class="login-card">
      <h2 class="login-header text-center mb-4">
        <span class="logo-qurban">{{ appName }}</span> Portal
      </h2>
      
      <!-- Login Method Toggle -->
      <div v-if="step === 1" class="method-toggle mb-4">
        <button 
          type="button"
          class="toggle-btn" 
          :class="{ active: loginMethod === 'otp' }" 
          @click="loginMethod = 'otp'"
        >OTP</button>
        <button 
          type="button"
          class="toggle-btn" 
          :class="{ active: loginMethod === 'password' }" 
          @click="loginMethod = 'password'"
        >Password</button>
      </div>
      
      <!-- Styled Error Message -->
      <div v-if="errorMessage" class="alert-badge mb-4">
        <i class="ti ti-alert-circle me-2"></i>
        <span>{{ errorMessage }}</span>
        <button type="button" class="btn-close-alert" @click="errorMessage = ''">&times;</button>
      </div>

      <!-- Step 1: Login Form -->
      <form v-if="step === 1" @submit.prevent="loginMethod === 'otp' ? requestOtp() : loginWithPassword()" class="form-grid">
        <div class="field full">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" id="email" v-model="email" placeholder="admin@qurbanhub.com" required />
        </div>

        <div v-if="loginMethod === 'password'" class="field full">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-pay mt-3" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>{{ loginMethod === 'otp' ? 'Send OTP via Email' : 'Login' }}</span>
        </button>
      </form>

      <!-- Step 2: Verify OTP -->
      <form v-else @submit.prevent="verifyOtp" class="form-grid">
        <div class="field full">
          <label for="otp" class="form-label">Enter OTP Code</label>
          <input type="text" id="otp" v-model="otpCode" placeholder="Enter 6-digit OTP" required maxlength="6" style="text-align: center; letter-spacing: 0.5em; font-weight: bold; font-size: 1.2rem;" />
        </div>
        <button type="submit" class="btn-pay mt-3" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Verify & Login</span>
        </button>
        <div class="mt-4 text-center">
          <a href="#" @click.prevent="step = 1" class="back-link">
             &#8592; Back to Email
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const step = ref(1);
const loginMethod = ref('otp');
const email = ref('');
const password = ref('');
const otpCode = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const appName = import.meta.env.VITE_APP_NAME || 'QurbanHub';

const requestOtp = async () => {
  if (!email.value) return;
  isLoading.value = true;
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
      email: email.value,
    });
    if (response.data.success) {
      step.value = 2;
    }
  } catch (error: any) {
    console.error('Failed to send OTP:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to send OTP. Please check your email.';
  } finally {
    isLoading.value = false;
  }
};

const loginWithPassword = async () => {
  if (!email.value || !password.value) return;
  isLoading.value = true;
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login-password`, {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      const { token, user, roles } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('roles', JSON.stringify(roles));
      
      
      window.location.href = '/admin';
    }
  } catch (error: any) {
    console.error('Password login failed:', error);
    errorMessage.value = error.response?.data?.message || 'Invalid email or password.';
  } finally {
    isLoading.value = false;
  }
};

const verifyOtp = async () => {
  if (!otpCode.value) return;
  isLoading.value = true;
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
      email: email.value,
      otp_code: otpCode.value,
    });

    if (response.data.success) {
      const { token, user, roles } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('roles', JSON.stringify(roles));
      
      
      window.location.href = '/admin';
    }
  } catch (error: any) {
    console.error('OTP verification failed:', error);
    errorMessage.value = error.response?.data?.message || 'Invalid or expired OTP. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

.login-page {
  --g900: #58101E;
  --g800: #7A1B2E;
  --g700: #9A243A;
  --g600: #B02C45;
  --gold: #c9a227;
  --gold-l: #e8c84a;
  --gold-p: #fdf3d0;
  --cream: #faf8f2;
  --white: #ffffff;
  --gr100: #f4f4f0;
  --gr200: #e8e6df;
  --gr400: #a09e96;
  --gr700: #4a4843;
  --err: #dc2626;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(122, 27, 46, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(201, 162, 39, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  padding: 2.5rem;
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--gr100);
}

.login-header {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: var(--g900);
  margin-bottom: 2rem;
}

.logo-qurban {
  color: var(--g900);
  font-weight: 600;
}
.logo-hub {
  color: var(--gold);
  font-weight: 600;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.method-toggle {
  display: flex;
  background: var(--gr100);
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
}

.toggle-btn {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--gr400);
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: var(--white);
  color: var(--g900);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--g900);
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.5px solid var(--gr200);
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;
  background: var(--white);
  box-sizing: border-box;
}

input:focus {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.1);
}

.btn-pay {
  background: var(--g900);
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.btn-pay:hover:not(:disabled) {
  background: var(--g800);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(26, 46, 26, 0.2);
}

.btn-pay:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-link {
  color: var(--g600);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.back-link:hover {
  color: var(--gold);
}

.text-center { text-align: center; }
.mb-4 { margin-bottom: 1.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }

.alert-badge {
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  color: #991b1b;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  animation: slideIn 0.3s ease;
  z-index: 10;
}

.alert-badge i {
  font-size: 1.1rem;
}

.btn-close-alert {
  background: none;
  border: none;
  color: #991b1b;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  padding: 0;
  line-height: 1;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.btn-close-alert:hover {
  opacity: 1;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
