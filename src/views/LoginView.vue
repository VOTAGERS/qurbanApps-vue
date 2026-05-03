<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="text-center mb-4">Q-Hub Admin</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admins/login`, {
      email: email.value,
      password: password.value,
    });

    // Simpan token ke localStorage
    localStorage.setItem('token', response.data.token);

    // Redirect ke halaman admin
    router.push('/admin');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>