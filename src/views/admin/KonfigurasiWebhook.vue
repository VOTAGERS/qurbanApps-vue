<template>
  <div>
    <!-- Breadcrumb -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item">Settings</li>
              <li class="breadcrumb-item" aria-current="page">Stripe Configuration</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <h2 class="mb-0">Stripe Configuration</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">API Configuration</h3>
            <span :class="isConfigured
              ? 'badge bg-light-success text-success'
              : 'badge bg-light-secondary text-secondary'">
              <i :class="isConfigured ? 'ti ti-check me-1' : 'ti ti-x me-1'"></i>
              {{ isConfigured ? 'Active' : 'Not Configured' }}
            </span>
          </div>
          <div class="card-body">
            <div class="alert alert-info mb-4">
              <h6 class="alert-heading fw-bold mb-2">
                <i class="ti ti-info-circle me-1"></i> How to get your API keys: (Beta Version)
              </h6>
              <ol class="mb-2 ps-3 small">
                <li>Login to your Stripe Dashboard</li>
                <li>On the home page, look for the <strong>API Keys</strong> section (right side)</li>
                <li>Copy your <strong>Publishable Key</strong> and <strong>Secret Key</strong></li>
                <li>Paste them below and click <strong>Save Configuration</strong></li>
              </ol>
              <a :href="stripeKeyUrl" target="_blank" class="btn btn-sm btn-info">
                <i class="ti ti-external-link me-1"></i> Open Stripe API Keys Page
              </a>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">Mode</label>
              <div class="d-flex gap-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" v-model="form.mode" value="test" id="modeTest">
                  <label class="form-check-label" for="modeTest">
                    <span class="badge bg-light-warning text-warning px-2 py-1">
                      <i class="ti ti-flask me-1"></i> Test / Sandbox
                    </span>
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" v-model="form.mode" value="live" id="modeLive">
                  <label class="form-check-label" for="modeLive">
                    <span class="badge bg-light-success text-success px-2 py-1">
                      <i class="ti ti-world me-1"></i> Live / Production
                    </span>
                  </label>
                </div>
              </div>
              <div v-if="form.mode === 'live'" class="alert alert-warning mt-2 py-2 small">
                <i class="ti ti-alert-triangle me-1"></i>
                <strong>Warning:</strong> Live mode will charge real money. Make sure your setup is correct.
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">
                Publishable Key
                <span class="text-muted small fw-normal ms-1">(starts with pk_test_ or pk_live_)</span>
              </label>
              <input
                type="text"
                class="form-control"
                v-model="form.public_key"
                :placeholder="form.mode === 'test' ? 'pk_test_...' : 'pk_live_...'"
              >
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Secret Key
                <span class="text-muted small fw-normal ms-1">(starts with sk_test_ or sk_live_)</span>
              </label>
              <div class="input-group">
                <input
                  :type="showSecret ? 'text' : 'password'"
                  class="form-control"
                  v-model="form.secret_key"
                  :placeholder="isConfigured
                    ? '(leave blank to keep existing key)'
                    : form.mode === 'test' ? 'sk_test_...' : 'sk_live_...'"
                >
                <button class="btn btn-outline-secondary" @click="showSecret = !showSecret" type="button">
                  <i :class="showSecret ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                </button>
              </div>
              <div class="form-text text-muted">
                Secret key akan dienkripsi sebelum disimpan ke database.
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Webhook Secret (Optional / Manual)
                <span class="text-muted small fw-normal ms-1">(starts with whsec_)</span>
              </label>
              <div class="input-group">
                <input
                  :type="showWebhookSecret ? 'text' : 'password'"
                  class="form-control"
                  v-model="form.webhook_secret"
                  :placeholder="isConfigured
                    ? '(leave blank to keep existing key)'
                    : 'whsec_...'"
                >
                <button class="btn btn-outline-secondary" @click="showWebhookSecret = !showWebhookSecret" type="button">
                  <i :class="showWebhookSecret ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                </button>
              </div>
              <div class="form-text text-muted">
                Diperlukan untuk testing lokal (misal: Stripe CLI `whsec_...` atau Ngrok manual).
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">
                Webhook URL
                <span class="badge bg-light-primary text-primary ms-1 small">Auto Registered</span>
              </label>
              <div class="input-group">
                <input type="text" class="form-control bg-light font-monospace small" :value="webhookUrl" readonly>
                <button class="btn btn-outline-secondary" @click="copyToClipboard(webhookUrl)" type="button">
                  <i class="ti ti-copy"></i>
                </button>
              </div>
              <div class="form-text">
                <i class="ti ti-info-circle me-1"></i>
                Webhook akan otomatis didaftarkan ke Stripe saat kamu klik Save.
              </div>
            </div>
            <div class="mb-4">
              <div v-if="config.has_webhook" class="alert alert-success py-2 d-flex align-items-center justify-content-between">
                <span><i class="ti ti-check me-1"></i> Webhook sudah terdaftar di Stripe</span>
                <button class="btn btn-sm btn-outline-danger" @click="confirmDeleteWebhook">
                  <i class="ti ti-trash me-1"></i> Remove
                </button>
              </div>
              <div v-else class="alert alert-warning py-2">
                <i class="ti ti-alert-circle me-1"></i>
                Webhook belum terdaftar. Klik Save untuk mendaftarkannya.
              </div>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              <button
                class="btn btn-outline-secondary"
                @click="testConnection"
                :disabled="isTesting || !isConfigured">
                <i class="ti ti-plug me-1"></i>
                {{ isTesting ? 'Testing...' : 'Test Connection' }}
              </button>
              <button class="btn btn-primary" @click="saveConfig" :disabled="isSaving">
                <i class="ti ti-device-floppy me-1"></i>
                {{ isSaving ? 'Saving...' : 'Save Configuration' }}
              </button>
            </div>

          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Current Config</h5>
          </div>
          <div class="card-body">
            <div v-if="isConfigured">
              <div class="mb-3">
                <div class="text-muted small mb-1">Status</div>
                <span class="badge bg-light-success text-success">
                  <i class="ti ti-check me-1"></i> Active
                </span>
              </div>
              <div class="mb-3">
                <div class="text-muted small mb-1">Mode</div>
                <span :class="config.mode === 'live'
                  ? 'badge bg-light-success text-success'
                  : 'badge bg-light-warning text-warning'">
                  {{ config.mode === 'live' ? 'Live' : 'Test / Sandbox' }}
                </span>
              </div>
              <div class="mb-3">
                <div class="text-muted small mb-1">Publishable Key</div>
                <code class="small text-break">{{ config.public_key }}</code>
              </div>
              <div class="mb-3">
                <div class="text-muted small mb-1">Secret Key</div>
                <code class="small text-break">{{ config.secret_key }}</code>
              </div>
              <div class="mb-3" v-if="config.webhook_secret">
                <div class="text-muted small mb-1">Webhook Secret</div>
                <code class="small text-break">{{ config.webhook_secret }}</code>
              </div>
              <div class="mb-3">
                <div class="text-muted small mb-1">Webhook URL</div>
                <code class="small text-break">{{ config.webhook_url }}</code>
              </div>
              <div>
                <div class="text-muted small mb-1">Webhook</div>
                <span v-if="config.has_webhook" class="badge bg-light-success text-success">
                  <i class="ti ti-check me-1"></i> Registered
                </span>
                <span v-else class="badge bg-light-danger text-danger">
                  <i class="ti ti-x me-1"></i> Not Registered
                </span>
              </div>
            </div>
            <div v-else class="text-center text-muted py-3">
              <i class="ti ti-settings-off" style="font-size: 2rem;"></i>
              <p class="mt-2 small">No configuration yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const API_URL   = import.meta.env.VITE_API_BASE_URL
const form = ref({
  public_key: '',
  secret_key: '',
  webhook_secret: '',
  mode: 'test'
})

const config     = ref<any>({})
const showSecret = ref(false)
const showWebhookSecret = ref(false)
const isSaving   = ref(false)
const isTesting  = ref(false)
const isEditing  = ref(false)
const isConfigured = computed(() =>
  config.value?.is_active === true || config.value?.is_active === 1
)

const webhookUrl = computed(() => `${API_URL}/api/stripe/webhook`)

const stripeKeyUrl = computed(() =>
  form.value.mode === 'live'
    ? 'https://dashboard.stripe.com/apikeys'
    : 'https://dashboard.stripe.com/test/apikeys'
)
const fetchConfig = async () => {
  try {
    const res    = await fetch(`${API_URL}/api/payment-config`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const result = await res.json()
    if (result.success && result.data) {
      config.value          = result.data
      console.log('config:', config.value) 
      console.log('is_active:', config.value.is_active) 
      form.value.public_key = result.data.public_key || ''
      form.value.secret_key = '' 
      form.value.webhook_secret = '' 
      form.value.mode       = result.data.mode || 'test'
      isEditing.value       = false
    }
  } catch (e) {
    console.error('Failed to fetch config:', e)
  }
}
const saveConfig = async () => {
  if (!form.value.public_key) {
    Swal.fire({ icon: 'warning', title: 'Incomplete!', text: 'Publishable key is required.' })
    return
  }
  if (!isConfigured.value && !form.value.secret_key) {
    Swal.fire({ icon: 'warning', title: 'Incomplete!', text: 'Secret key is required for first time setup.' })
    return
  }

  isSaving.value = true
  try {
    const payload: any = {
      public_key: form.value.public_key,
      mode:       form.value.mode,
    }
    if (form.value.secret_key && !form.value.secret_key.includes('*')) {
      payload.secret_key = form.value.secret_key
    }
    if (form.value.webhook_secret && !form.value.webhook_secret.includes('*')) {
      payload.webhook_secret = form.value.webhook_secret
    }
    const res    = await fetch(`${API_URL}/api/payment-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (result.success) {
      await fetchConfig()
      isEditing.value = false
      const webhookMsg = result.webhook?.status === 'created'
        ? 'Config saved & webhook registered to Stripe automatically!'
        : result.webhook?.status === 'already_exists'
          ? 'Config saved. Webhook already registered.'
          : `Config saved. Webhook: ${result.webhook?.reason ?? 'not registered (use Stripe CLI for local)'}`
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: webhookMsg,
        timer: 4000,
        showConfirmButton: false
      })
    } else {
      Swal.fire({ icon: 'error', title: 'Failed!', text: result.message })
    }
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to save configuration.' })
  } finally {
    isSaving.value = false
  }
}
const testConnection = async () => {
  isTesting.value = true
  try {
    const res    = await fetch(`${API_URL}/api/payment-config/test-connection`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const result = await res.json()
    Swal.fire({
      icon: result.success ? 'success' : 'error',
      title: result.success ? 'Connected!' : 'Failed!',
      text: result.message,
    })
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error!', text: 'Test connection failed.' })
  } finally {
    isTesting.value = false
  }
}
const confirmDeleteWebhook = async () => {
  const confirm = await Swal.fire({
    icon: 'warning',
    title: 'Remove Webhook?',
    text: 'This will unregister the webhook from Stripe. Payment notifications may stop working.',
    showCancelButton: true,
    confirmButtonText: 'Yes, Remove',
    confirmButtonColor: '#dc3545',
  })

  if (!confirm.isConfirmed) return

  try {
    const res    = await fetch(`${API_URL}/api/payment-config/webhook`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const result = await res.json()
    if (result.success) {
      await fetchConfig()
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: result.message,
        timer: 2000,
        showConfirmButton: false
      })
    } else {
      Swal.fire({ icon: 'error', title: 'Failed!', text: result.message })
    }
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to remove webhook.' })
  }
}
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  Swal.fire({
    icon: 'success',
    title: 'Copied!',
    timer: 1000,
    showConfirmButton: false
  })
}
onMounted(() => fetchConfig())
</script>