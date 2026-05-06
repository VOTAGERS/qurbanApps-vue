<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <div class="page-header">
      <div class="page-block">
        <div class="row align-items-center">
          <div class="col-md-12">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/admin/certificates">Certificate Menu</router-link></li>
              <li class="breadcrumb-item" aria-current="page">Participant Detail</li>
            </ul>
          </div>
          <div class="col-md-12 mt-2">
            <div class="page-header-title">
              <h2 class="mb-0">Order Participants</h2>
              <p class="text-muted mb-0">Manage certificates for Order ID: {{ props.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ breadcrumb ] end -->

    <!-- [ Main Content ] start -->
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Participant List</h3>
            <div>
              <button class="btn btn-secondary me-2" @click="$router.back()">
                <i class="ti ti-arrow-left me-1"></i> Back
              </button>
              <button 
                class="btn btn-primary" 
                @click="generateBulk" 
                :disabled="isGenerating || participants.length === 0"
              >
                <span v-if="isGenerating" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <i v-else class="ti ti-certificate me-1"></i> 
                Generate All Certificates
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="alert alert-info d-flex align-items-center mb-4" role="alert">
              <i class="ti ti-info-circle me-2 fs-4"></i>
              <div>
                Silakan klik tombol <strong>Generate All Certificates</strong> untuk membuat sertifikat PDF secara massal bagi seluruh peserta di bawah ini.
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th class="text-center">Status</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(participant, index) in participants" :key="participant.id_participant">
                    <td>{{ index + 1 }}</td>
                    <td><span class="fw-bold">{{ participant.qurban_name }}</span></td>
                    <td>{{ participant.email }}</td>
                    <td>{{ participant.phone_number }}</td>
                    <td class="text-center">
                      <span v-if="participant.certificate" class="badge bg-light-success text-success">
                        <i class="ti ti-check me-1"></i> Generated
                      </span>
                      <span v-else class="badge bg-light-warning text-warning">Pending</span>
                    </td>
                    <td class="text-end">
                      <a v-if="participant.certificate" :href="`${apiBaseUrl}/api/certificates/download/${participant.certificate.id_certificate}`" class="btn btn-sm btn-light-primary" title="Download">
                        <i class="ti ti-download"></i>
                      </a>
                      <span v-else class="text-muted small">No File</span>
                    </td>
                  </tr>
                  <tr v-if="participants.length === 0">
                    <td colspan="6" class="text-center text-muted py-5">
                      No participants found for this order.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ Main Content ] end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()
const participants = ref<any[]>([])
const isGenerating = ref(false)

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${authStore.token}`
  }
}

const fetchParticipants = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/certificates/order/${props.id}/participants`, axiosConfig)
    if (response.data.success) {
      participants.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching participants:', error)
  }
}

const generateBulk = async () => {
  const result = await Swal.fire({
    title: 'Generate All?',
    text: `System akan membuat sertifikat untuk ${participants.value.length} peserta. Lanjutkan?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Generate!',
    confirmButtonColor: '#1a4d2e',
    cancelButtonText: 'Batal'
  })

  if (!result.isConfirmed) return

  isGenerating.value = true
  try {
    const response = await axios.post(`${apiBaseUrl}/api/certificates/order/${props.id}/generate-bulk`, {}, axiosConfig)
    if (response.data.success) {
      Swal.fire('Berhasil!', response.data.message, 'success')
      fetchParticipants() // Refresh list
    }
  } catch (error: any) {
    Swal.fire('Gagal', error.response?.data?.message || 'Gagal generate sertifikat', 'error')
  } finally {
    isGenerating.value = false
  }
}

onMounted(() => {
  fetchParticipants()
})
</script>

<style scoped>
/* Specific styles for participant view */
</style>
