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
              <!-- Bagian Header (Baris 31) -->
                <button class="btn btn-secondary me-2" @click="$router.back()">
                  <i class="ti ti-arrow-left me-1"></i> Back
                </button>
                <!-- TOMBOL BARU: Broadcast WA -->
                <button 
                  class="btn btn-success me-2" 
                  @click="broadcastWA" 
                  :disabled="participants.length === 0"
                >
                  <i class="ti ti-brand-whatsapp me-1"></i> Broadcast WA
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
                      <div class="btn-group">
                        <!-- TOMBOL BARU: WA Individu -->
                        <button 
                          v-if="participant.phone_number"
                          class="btn btn-sm btn-light-success me-1" 
                          title="Send WhatsApp"
                          @click="sendSingleWA(participant)"
                        >
                          <i class="ti ti-brand-whatsapp"></i>
                        </button>
                        
                        <a v-if="participant.certificate" :href="`${apiBaseUrl}/api/certificates/download/${participant.certificate.id_certificate}`" class="btn btn-sm btn-light-primary" title="Download">
                          <i class="ti ti-download"></i>
                        </a>
                        <span v-else class="text-muted small">No File</span>
                      </div>
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


// Fungsi untuk memformat pesan WA
const generateWAMessage = (participant: any) => {
  const downloadLink = `${apiBaseUrl}/api/certificates/public/download/${participant.id_participant}`
  
  return `Terima Kasih Pejuang Qurban! \u{1F402}\u{2728}

Halo Bapak/Ibu *${participant.qurban_name}*, laporan qurban Anda sudah selesai. Amanah telah kami salurkan kepada yang berhak menerima.

Yuk, cek dan unduh sertifikat qurban Anda di sini:
🔗 ${downloadLink}

Semoga berkah dan menjadi pahala jariyah. Sampai jumpa di tahun depan!

Salam hangat,
*QurbanHub*`
}

const sendSingleWA = (participant: any) => {
  if (!participant.phone_number) return
  
  let phone = participant.phone_number.replace(/\D/g, '')
  
  if (phone.startsWith('0')) {
    phone = '62' + phone.substring(1)
  }

  const message = encodeURIComponent(generateWAMessage(participant))
  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
  
  window.open(waUrl, '_blank')
}

const broadcastWA = async () => {
  const hasCertificates = participants.value.filter(p => p.certificate)
  
  if (hasCertificates.length === 0) {
    Swal.fire('Info', 'Belum ada sertifikat yang di-generate.', 'info')
    return
  }

  const result = await Swal.fire({
    title: 'Kirim Semua WA?',
    text: `Akan membuka ${hasCertificates.length} tab WhatsApp. Pastikan browser Anda mengizinkan 'Pop-ups'.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Kirim!',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    hasCertificates.forEach((p, index) => {
      setTimeout(() => {
        sendSingleWA(p)
      }, index * 2000) 
    })
  }
}

</script>

<style scoped>
/* Specific styles for participant view */
</style>
