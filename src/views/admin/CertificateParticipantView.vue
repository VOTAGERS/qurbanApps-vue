<template>
  <div>
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
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Participant List</h3>
            <div class="d-flex gap-2">
              <button class="btn btn-secondary" @click="$router.back()">
                <i class="ti ti-arrow-left me-1"></i> Back
              </button>
              <button
                v-if="participantsWithCert.length > 0"
                class="btn btn-success"
                :disabled="isBlasting || selectedIds.length === 0"
                @click="blastSelectedWA"
              >
                <span v-if="isBlasting" class="spinner-border spinner-border-sm me-1" role="status"></span>
                <i v-else class="ti ti-brand-whatsapp me-1"></i>
                Blast WA
                <span v-if="selectedIds.length > 0" class="badge bg-white text-success ms-1">{{ selectedIds.length }}</span>
              </button>

              <button
                class="btn btn-primary"
                :disabled="isGenerating || participants.length === 0"
                @click="generateBulk"
              >
                <span v-if="isGenerating" class="spinner-border spinner-border-sm me-1" role="status"></span>
                <i v-else class="ti ti-certificate me-1"></i>
                Generate All Certificates
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="alert alert-info d-flex align-items-center mb-4" role="alert">
              <i class="ti ti-info-circle me-2 fs-4"></i>
              <div>
                Klik <strong>Generate All Certificates</strong> untuk membuat sertifikat PDF massal.
                Setelah tersedia, pilih peserta lalu klik <strong>Blast WA</strong>.
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th style="width: 40px">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="isAllSelected"
                        :indeterminate.prop="isIndeterminate"
                        :disabled="participantsWithCert.length === 0"
                        @change="toggleSelectAll"
                      />
                    </th>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th class="text-center">Status</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(participant, index) in participants"
                    :key="participant.id_participant"
                    :class="{ 'table-active': selectedIds.includes(participant.id_participant) }"
                  >
                    <td>
                      <input
                        v-if="participant.certificate"
                        type="checkbox"
                        class="form-check-input"
                        :value="participant.id_participant"
                        v-model="selectedIds"
                      />
                    </td>
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
                        <button
                          v-if="participant.certificate && participant.phone_number"
                          class="btn btn-sm btn-light-success me-1"
                          title="Send WhatsApp"
                          :disabled="isBlasting"
                          @click="blastSingleWA(participant)"
                        >
                          <i class="ti ti-brand-whatsapp"></i>
                        </button>
                          <!-- Corrected Code -->
                          <a
                            v-if="participant.certificate"
                            :href="`${apiBaseUrl}/api/certificates/download/${participant.certificate.id_certificate}`"
                            target="_blank"
                            class="btn btn-sm btn-light-primary"
                            title="Download"
                          >
                            <i class="ti ti-download"></i>
                          </a>
                          <span v-else class="text-muted small">No File</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="participants.length === 0">
                    <td colspan="7" class="text-center text-muted py-5">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  id: { type: String, required: true }
})

const authStore  = useAuthStore()
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const axiosConfig = {
  headers: { Authorization: `Bearer ${authStore.token}` }
}

const participants = ref<any[]>([])
const selectedIds  = ref<number[]>([])
const isGenerating = ref(false)
const isBlasting   = ref(false)


const participantsWithCert = computed(() =>
  participants.value.filter(p => p.certificate)
)

const isAllSelected = computed(() =>
  participantsWithCert.value.length > 0 &&
  selectedIds.value.length === participantsWithCert.value.length
)

const isIndeterminate = computed(() =>
  selectedIds.value.length > 0 &&
  selectedIds.value.length < participantsWithCert.value.length
)

const fetchParticipants = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/api/certificates/order/${props.id}/participants`,
      axiosConfig
    )
    if (response.data.success) {
      participants.value = response.data.data
      selectedIds.value  = []
    }
  } catch (error) {
    console.error('Error fetching participants:', error)
  }
}

const toggleSelectAll = () => {
  selectedIds.value = isAllSelected.value
    ? []
    : participantsWithCert.value.map(p => p.id_participant)
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
    const response = await axios.post(
      `${apiBaseUrl}/api/certificates/order/${props.id}/generate-bulk`,
      {},
      axiosConfig
    )
    if (response.data.success) {
      await Swal.fire('Berhasil!', response.data.message, 'success')
      fetchParticipants()
    }
  } catch (error: any) {
    Swal.fire('Gagal', error.response?.data?.message || 'Gagal generate sertifikat', 'error')
  } finally {
    isGenerating.value = false
  }
}

const callBlastAPI = async (participantIds: number[]) => {
  const response = await axios.post(
    `${apiBaseUrl}/api/certificates/order/${props.id}/blast-wa`,
    { participant_ids: participantIds },
    axiosConfig
  )
  return response.data
}

const blastSingleWA = async (participant: any) => {
  isBlasting.value = true
  try {
    await callBlastAPI([participant.id_participant])
    Swal.fire({
      title: 'Terkirim!',
      text: `WA berhasil dikirim ke ${participant.qurban_name}.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })
  } catch (error: any) {
    Swal.fire('Gagal', error.response?.data?.message || 'Gagal kirim WA', 'error')
  } finally {
    isBlasting.value = false
  }
}

const blastSelectedWA = async () => {
  if (selectedIds.value.length === 0) return

  const result = await Swal.fire({
    title: 'Blast WhatsApp?',
    text: `Mengirim sertifikat ke ${selectedIds.value.length} peserta via WhatsApp.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Kirim!',
    cancelButtonText: 'Batal'
  })

  if (!result.isConfirmed) return

  isBlasting.value = true
  try {
    const data = await callBlastAPI(selectedIds.value)

    let msg = data.message
    if (data.failed?.length > 0) {
      const failedNames = data.failed.map((f: any) => `• ${f.name} (${f.reason})`).join('\n')
      msg += `\n\nGagal:\n${failedNames}`
    }

    await Swal.fire('Selesai!', msg, data.failed?.length > 0 ? 'warning' : 'success')
    selectedIds.value = []
  } catch (error: any) {
    Swal.fire('Gagal', error.response?.data?.message || 'Gagal blast WA', 'error')
  } finally {
    isBlasting.value = false
  }
}
onMounted(() => fetchParticipants())
</script>

<style scoped>
.table tbody tr.table-active {
  background-color: rgba(26, 77, 46, 0.06);
}
</style>