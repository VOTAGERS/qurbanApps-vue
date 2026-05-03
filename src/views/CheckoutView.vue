<template>
  <div class="checkout-page">
    <div class="bg-pattern"></div>

    <header class="checkout-header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <span class="logo-qurban">Qurban</span><span class="logo-hub">Hub</span>
        </router-link>
        <div class="header-steps">
          <div class="step" :class="{ active: currentStep >= 1, done: currentStep > 1 }">
            <div class="step-num">{{ currentStep > 1 ? '✓' : '1' }}</div>
            <span>Data Pembeli</span>
          </div>
          <div class="step-line" :class="{ done: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep >= 2, done: currentStep > 2 }">
            <div class="step-num">{{ currentStep > 2 ? '✓' : '2' }}</div>
            <span>Penerima</span>
          </div>
          <div class="step-line" :class="{ done: currentStep > 2 }"></div>
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-num">3</div>
            <span>Pembayaran</span>
          </div>
        </div>
      </div>
    </header>

    <main class="checkout-main">
      <div class="checkout-grid">
        <div class="form-column">
          <transition name="slide-fade">
            <div v-if="currentStep === 1" class="form-card" key="step1">
              <div class="card-header">
                <div class="card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div>
                  <h2>Data Pembeli</h2>
                  <p>Informasi lengkap untuk keperluan administrasi</p>
                </div>
              </div>

              <div class="form-grid">
                <div class="field">
                  <label>Nama Depan <span class="req">*</span></label>
                  <input
                    v-model="buyer.firstName"
                    type="text"
                    placeholder="Masukkan nama depan"
                    :class="{ error: errors.firstName }"
                  />
                  <span class="err-msg" v-if="errors.firstName">{{ errors.firstName }}</span>
                </div>
                <div class="field">
                  <label>Nama Belakang <span class="req">*</span></label>
                  <input
                    v-model="buyer.lastName"
                    type="text"
                    placeholder="Masukkan nama belakang"
                    :class="{ error: errors.lastName }"
                  />
                  <span class="err-msg" v-if="errors.lastName">{{ errors.lastName }}</span>
                </div>
                <div class="field">
                  <label>Email <span class="req">*</span></label>
                  <input
                    v-model="buyer.email"
                    type="email"
                    placeholder="email@example.com"
                    :class="{ error: errors.email }"
                  />
                  <span class="err-msg" v-if="errors.email">{{ errors.email }}</span>
                </div>
                <div class="field">
                  <label>Nomor HP <span class="req">*</span></label>
                  <input
                    v-model="buyer.phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    :class="{ error: errors.phone }"
                  />
                  <span class="err-msg" v-if="errors.phone">{{ errors.phone }}</span>
                </div>
                <div class="field full">
                  <label>Alamat Lengkap <span class="req">*</span></label>
                  <input
                    v-model="buyer.address"
                    type="text"
                    placeholder="Jl. Nama Jalan No. XX"
                    :class="{ error: errors.address }"
                  />
                  <span class="err-msg" v-if="errors.address">{{ errors.address }}</span>
                </div>
                <div class="field">
                  <label>Kota <span class="req">*</span></label>
                  <input
                    v-model="buyer.city"
                    type="text"
                    placeholder="Jakarta"
                    :class="{ error: errors.city }"
                  />
                  <span class="err-msg" v-if="errors.city">{{ errors.city }}</span>
                </div>
                <div class="field">
                  <label>Provinsi <span class="req">*</span></label>
                  <input
                    v-model="buyer.province"
                    type="text"
                    placeholder="DKI Jakarta"
                    :class="{ error: errors.province }"
                  />
                  <span class="err-msg" v-if="errors.province">{{ errors.province }}</span>
                </div>
                <div class="field">
                  <label>Kode Pos <span class="req">*</span></label>
                  <input
                    v-model="buyer.postalCode"
                    type="text"
                    placeholder="10xxx"
                    :class="{ error: errors.postalCode }"
                  />
                  <span class="err-msg" v-if="errors.postalCode">{{ errors.postalCode }}</span>
                </div>
                <div class="field">
                  <label>Catatan <span class="opt">(opsional)</span></label>
                  <input v-model="buyer.notes" type="text" placeholder="Catatan tambahan..." />
                </div>
              </div>

              <button class="btn-next" @click="goToStep2">
                Lanjut ke Data Penerima
                <span class="arrow">&#8594;</span>
              </button>
            </div>
          </transition>
          <transition name="slide-fade">
            <div v-if="currentStep === 2" class="form-card" key="step2">
              <div class="card-header">
                <div class="card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h2>Data Penerima Qurban</h2>
                  <p>
                    Nama atas siapa qurban dilaksanakan
                    <span class="quota-badge">{{ maxShare }} penerima</span>
                  </p>
                </div>
              </div>

              <div v-for="(recipient, index) in recipients" :key="index" class="recipient-block">
                <div class="recipient-label">
                  <div class="recipient-num">{{ index + 1 }}</div>
                  <span>Penerima {{ index + 1 }}</span>
                </div>
                <div class="form-grid">
                  <div class="field full">
                    <label>Nama Lengkap <span class="req">*</span></label>
                    <input
                      v-model="recipient.name"
                      type="text"
                      :placeholder="`Nama penerima ${index + 1}`"
                      :class="{ error: recipientErrors[index]?.name }"
                    />
                    <span class="err-msg" v-if="recipientErrors[index]?.name">{{
                      recipientErrors[index].name
                    }}</span>
                  </div>
                  <div class="field">
                    <label>Email <span class="opt">(opsional)</span></label>
                    <input v-model="recipient.email" type="email" placeholder="email@example.com" />
                  </div>
                  <div class="field">
                    <label>No. HP <span class="opt">(opsional)</span></label>
                    <input v-model="recipient.phone" type="tel" placeholder="08xxxxxxxxxx" />
                  </div>
                </div>
              </div>

              <div class="btn-row">
                <button class="btn-back" @click="currentStep = 1">&#8592; Kembali</button>
                <button class="btn-next" @click="goToStep3">
                  Lanjut ke Pembayaran
                  <span class="arrow">&#8594;</span>
                </button>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div v-if="currentStep === 3" class="form-card" key="step3">
              <div class="card-header">
                <div class="card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h2>Metode Pembayaran</h2>
                  <p>Pilih metode pembayaran yang paling mudah</p>
                </div>
              </div>

              <div class="payment-methods">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="payment-option"
                  :class="{ selected: selectedPayment === method.id }"
                >
                  <input type="radio" v-model="selectedPayment" :value="method.id" hidden />
                  <div class="payment-icon-wrap">
                    <svg
                      v-if="method.id === 'transfer'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <svg
                      v-else-if="method.id === 'qris'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="3" height="3" />
                      <rect x="18" y="18" width="3" height="3" />
                      <rect x="14" y="18" width="3" height="3" style="display: none" />
                    </svg>
                    <svg
                      v-else-if="method.id === 'cc'"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                      <line x1="6" y1="15" x2="10" y2="15" />
                    </svg>
                    <svg
                      v-else
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div class="payment-info">
                    <strong>{{ method.name }}</strong>
                    <small>{{ method.desc }}</small>
                  </div>
                  <div class="payment-check" v-if="selectedPayment === method.id">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </label>
              </div>

              <div class="terms-box">
                <label class="terms-check">
                  <input type="checkbox" v-model="agreedToTerms" />
                  <span
                    >Saya menyetujui <a href="#" @click.prevent>Syarat &amp; Ketentuan</a> dan
                    <a href="#" @click.prevent>Kebijakan Privasi</a> QurbanHub</span
                  >
                </label>
              </div>

              <div class="btn-row">
                <button class="btn-back" @click="currentStep = 2">&#8592; Kembali</button>
                <button
                  class="btn-pay"
                  @click="handlePayment"
                  :disabled="!agreedToTerms || !selectedPayment || isProcessing"
                >
                  <span v-if="isProcessing" class="spinner"></span>
                  <span v-else>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="display: inline; vertical-align: middle; margin-right: 6px"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Bayar Sekarang &middot; {{ formatPrice(productPrice) }}
                  </span>
                </button>
              </div>
            </div>
          </transition>
        </div>
        <div class="summary-column">
          <div class="summary-card">
            <div class="summary-header">
              <span class="halal-badge">Halal &amp; Syariah</span>
              <h3>Ringkasan Pesanan</h3>
            </div>

            <div class="product-hero">
              <div class="animal-icon-wrap">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8c84a"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 17c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5v1H3v-1z" />
                  <ellipse cx="12" cy="9" rx="4" ry="3" />
                  <path d="M8 12c-1.5-1-3-1-4 0M16 12c1.5-1 3-1 4 0" />
                  <path d="M9 9c0-1.5-.5-3-2-3M15 9c0-1.5 .5-3 2-3" />
                </svg>
              </div>
              <div class="product-info">
                <div class="product-name">{{ productName }}</div>
                <div class="product-desc">{{ description }}</div>
                <div class="product-share">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8c84a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="flex-shrink: 0"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Maks. {{ maxShare }} orang
                </div>
              </div>
            </div>

            <div class="price-breakdown">
              <div class="price-row">
                <span>Harga hewan</span>
                <span>{{ formatPrice(productPrice) }}</span>
              </div>
              <div class="price-row">
                <span>Biaya administrasi</span>
                <span class="free">Gratis</span>
              </div>
              <div class="price-row">
                <span>Biaya distribusi</span>
                <span class="free">Gratis</span>
              </div>
              <div class="price-divider"></div>
              <div class="price-row total">
                <span>Total Pembayaran</span>
                <span class="total-amount">{{ formatPrice(productPrice) }}</span>
              </div>
            </div>

            <div class="trust-items">
              <div class="trust-item" v-for="t in trustList" :key="t">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6bcb77"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="flex-shrink: 0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{{ t }}</span>
              </div>
            </div>

            <div class="contact-help">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8c84a"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="flex-shrink: 0"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div>
                <strong>Butuh bantuan?</strong>
                <p>
                  WhatsApp:
                  <a href="https://wa.me/628123456789" target="_blank">+62 812 3456 789</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <transition name="modal-fade">
      <div v-if="showSuccess" class="modal-overlay" @click.self="showSuccess = false">
        <div class="modal-box">
          <div class="modal-icon-wrap">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2d5a2d"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3>Pesanan Berhasil!</h3>
          <p>
            Terima kasih telah memesan qurban melalui QurbanHub. Kami akan segera memproses pesanan
            Anda.
          </p>
          <div class="modal-order">
            <span>No. Pesanan:</span>
            <strong>#QH{{ orderNumber }}</strong>
          </div>
          <p class="modal-note">
            Konfirmasi dikirim ke <strong>{{ buyer.email }}</strong>
          </p>
          <router-link to="/" class="btn-home">Kembali ke Beranda</router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const SECRET_KEY = 'qurbanhub2026'

function xorCipher(str, key) {
  return str
    .split('')
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('')
}

function decodeParams(encoded) {
  try {
    const xored = atob(encoded)
    const jsonStr = xorCipher(xored, SECRET_KEY)
    return JSON.parse(jsonStr)
  } catch {
    return null
  }
}

const parsedParams = computed(() => {
  if (route.query.d) {
    const decoded = decodeParams(route.query.d)
    if (decoded) return decoded
  }
  return {
    id: Number(route.query.id) || 1,
    name: decodeURIComponent(route.query.name || 'Kambing Qurban'),
    price: Number(route.query.price) || 2800000,
    share: Number(route.query.share) || 1,
    desc: decodeURIComponent(route.query.desc || 'Untuk 1 orang · Sesuai syariah'),
  }
})

const productId = computed(() => parsedParams.value.id)
const productName = computed(() => parsedParams.value.name)
const productPrice = computed(() => parsedParams.value.price)
const maxShare = computed(() => parsedParams.value.share)
const description = computed(() => parsedParams.value.desc)

const currentStep = ref(1)
const buyer = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  notes: '',
})
const errors = ref({})

function validateBuyer() {
  const e = {}
  if (!buyer.value.firstName.trim()) e.firstName = 'Nama depan wajib diisi'
  if (!buyer.value.lastName.trim()) e.lastName = 'Nama belakang wajib diisi'
  if (!buyer.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.value.email))
    e.email = 'Email tidak valid'
  if (!buyer.value.phone.trim() || !/^08\d{8,12}$/.test(buyer.value.phone))
    e.phone = 'Nomor HP tidak valid (08xx)'
  if (!buyer.value.address.trim()) e.address = 'Alamat wajib diisi'
  if (!buyer.value.city.trim()) e.city = 'Kota wajib diisi'
  if (!buyer.value.province.trim()) e.province = 'Provinsi wajib diisi'
  if (!buyer.value.postalCode.trim()) e.postalCode = 'Kode pos wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

function goToStep2() {
  if (validateBuyer()) {
    currentStep.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const recipients = ref([])
const recipientErrors = ref([])

onMounted(() => {
  const count = maxShare.value || 1
  recipients.value = Array.from({ length: count }, () => ({ name: '', email: '', phone: '' }))
  recipientErrors.value = Array.from({ length: count }, () => ({}))
})

function validateRecipients() {
  let valid = true
  recipientErrors.value = recipients.value.map((r) => {
    const e = {}
    if (!r.name.trim()) {
      e.name = 'Nama penerima wajib diisi'
      valid = false
    }
    return e
  })
  return valid
}

function goToStep3() {
  if (validateRecipients()) {
    currentStep.value = 3
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const selectedPayment = ref('')
const agreedToTerms = ref(false)
const isProcessing = ref(false)
const showSuccess = ref(false)
const orderNumber = ref('')

const paymentMethods = [
  { id: 'transfer', name: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI' },
  { id: 'qris', name: 'QRIS', desc: 'GoPay, OVO, Dana, Shopee Pay' },
  { id: 'cc', name: 'Kartu Kredit', desc: 'Visa, Mastercard' },
  { id: 'va', name: 'Virtual Account', desc: 'Bayar lewat ATM atau m-Banking' },
]

const trustList = [
  'Hewan disertifikasi dokter hewan',
  'Pemotongan oleh juru sembelih terlatih',
  'Laporan distribusi dengan foto',
  '100% Sesuai syariah Islam',
]

async function handlePayment() {
  if (!agreedToTerms.value || !selectedPayment.value) return
  isProcessing.value = true
  await new Promise((r) => setTimeout(r, 2000))
  orderNumber.value = Math.floor(100000 + Math.random() * 900000).toString()
  isProcessing.value = false
  showSuccess.value = true
}

function formatPrice(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(val ?? 0))
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

.checkout-page {
  --g900: #1a2e1a;
  --g800: #1e3a1e;
  --g700: #234523;
  --g600: #2d5a2d;
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
  min-height: 100vh;
  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
}

.bg-pattern {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(29, 58, 29, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(201, 162, 39, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
.checkout-header {
  background: var(--g900);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 24px;
}
.logo {
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  flex-shrink: 0;
}
.logo-qurban {
  color: var(--white);
}
.logo-hub {
  color: var(--gold);
}

.header-steps {
  display: flex;
  align-items: center;
  gap: 8px;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.45;
  transition: opacity 0.3s;
}
.step.active {
  opacity: 1;
}
.step.done {
  opacity: 0.7;
}
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--white);
  transition: all 0.3s;
}
.step.active .step-num {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--g900);
}
.step.done .step-num {
  background: rgba(201, 162, 39, 0.3);
  border-color: var(--gold);
  color: var(--gold);
}
.step span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}
.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  transition: background 0.3s;
}
.step-line.done {
  background: rgba(201, 162, 39, 0.5);
}
.checkout-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  position: relative;
  z-index: 1;
}
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}
.form-card {
  background: var(--white);
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--gr200);
}
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--gr100);
}
.card-icon {
  width: 48px;
  height: 48px;
  background: var(--gold-p);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--g700);
}
.card-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--g800);
  margin: 0 0 4px;
}
.card-header p {
  font-size: 14px;
  color: var(--gr400);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.quota-badge {
  background: var(--gold-p);
  color: var(--gold);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field.full {
  grid-column: 1 / -1;
}
label {
  font-size: 13px;
  font-weight: 600;
  color: var(--g800);
  letter-spacing: 0.01em;
}
.req {
  color: var(--gold);
}
.opt {
  color: var(--gr400);
  font-weight: 400;
}
input[type='text'],
input[type='email'],
input[type='tel'] {
  height: 46px;
  padding: 0 14px;
  border: 1.5px solid var(--gr200);
  border-radius: 10px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
  background: var(--white);
  transition: all 0.2s;
  outline: none;
}
input::placeholder {
  color: var(--gr400);
}
input:focus {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.08);
}
input.error {
  border-color: var(--err);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06);
}
.err-msg {
  font-size: 12px;
  color: var(--err);
  font-weight: 500;
}
.recipient-block {
  border: 1.5px solid var(--gr200);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
  background: var(--gr100);
}
.recipient-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-weight: 600;
  color: var(--g800);
  font-size: 14px;
}
.recipient-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--g800);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.btn-next {
  margin-top: 28px;
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--g700), var(--g900));
  color: var(--gold-l);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}
.btn-next:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(29, 58, 29, 0.3);
}
.btn-next .arrow {
  font-size: 18px;
  transition: transform 0.2s;
}
.btn-next:hover .arrow {
  transform: translateX(4px);
}
.btn-row {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}
.btn-row .btn-next {
  flex: 1;
  margin-top: 0;
}
.btn-back {
  height: 52px;
  padding: 0 20px;
  background: transparent;
  border: 1.5px solid var(--gr200);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-back:hover {
  border-color: var(--g700);
  color: var(--g700);
  background: rgba(45, 90, 45, 0.04);
}
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.payment-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1.5px solid var(--gr200);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--white);
}
.payment-option:hover {
  border-color: var(--g600);
  background: rgba(45, 90, 45, 0.02);
}
.payment-option.selected {
  border-color: var(--g700);
  background: rgba(45, 90, 45, 0.04);
  box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.08);
}
.payment-icon-wrap {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g700);
  flex-shrink: 0;
}
.payment-info {
  flex: 1;
}
.payment-info strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--g800);
}
.payment-info small {
  font-size: 12px;
  color: var(--gr400);
}
.payment-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--g700);
  display: flex;
  align-items: center;
  justify-content: center;
}

.terms-box {
  padding: 16px;
  background: var(--gr100);
  border-radius: 10px;
  margin-bottom: 4px;
}
.terms-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--gr700);
  cursor: pointer;
}
.terms-check input {
  margin-top: 2px;
  width: 16px;
  height: 16px;
  accent-color: var(--g700);
  flex-shrink: 0;
}
.terms-check a {
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
}
.terms-check a:hover {
  text-decoration: underline;
}

.btn-pay {
  flex: 1;
  height: 52px;
  background: linear-gradient(135deg, var(--gold), #b8941f);
  color: var(--g900);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-pay:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.4);
}
.btn-pay:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(26, 46, 26, 0.2);
  border-top-color: var(--g900);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.summary-column {
  position: sticky;
  top: 88px;
}
.summary-card {
  background: var(--g900);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 40px rgba(26, 46, 26, 0.25);
}
.summary-header {
  margin-bottom: 24px;
}
.halal-badge {
  display: inline-block;
  background: rgba(201, 162, 39, 0.15);
  border: 1px solid rgba(201, 162, 39, 0.3);
  color: var(--gold-l);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}
.summary-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--white);
  margin: 0;
}

.product-hero {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.animal-icon-wrap {
  flex-shrink: 0;
}
.product-name {
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 4px;
}
.product-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}
.product-share {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--gold-l);
  font-weight: 500;
}

.price-breakdown {
  margin-bottom: 24px;
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.75);
}
.price-row span:last-child {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
.free {
  color: #6bcb77 !important;
  font-weight: 600 !important;
}
.price-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 8px 0;
}
.price-row.total {
  font-size: 16px;
  font-weight: 700;
  color: var(--white);
  margin-top: 4px;
}
.price-row.total span:first-child {
  color: rgba(255, 255, 255, 0.85);
}
.total-amount {
  color: var(--gold-l) !important;
  font-size: 18px;
  font-weight: 700 !important;
}

.trust-items {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.contact-help {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 12px;
}
.contact-help strong {
  display: block;
  font-size: 13px;
  color: var(--gold-l);
  margin-bottom: 2px;
}
.contact-help p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}
.contact-help a {
  color: var(--gold-l);
  text-decoration: none;
  font-weight: 600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  backdrop-filter: blur(4px);
}
.modal-box {
  background: var(--white);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
}
.modal-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.modal-box h3 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  color: var(--g800);
  margin: 0 0 12px;
}
.modal-box p {
  font-size: 14px;
  color: var(--gr400);
  line-height: 1.6;
  margin: 0 0 20px;
}
.modal-order {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  background: var(--gold-p);
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--gr700);
}
.modal-order strong {
  font-size: 18px;
  color: var(--g800);
  font-weight: 700;
}
.modal-note {
  font-size: 13px !important;
}
.btn-home {
  display: inline-block;
  margin-top: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--g700), var(--g900));
  color: var(--gold-l);
  border-radius: 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-home:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(29, 58, 29, 0.3);
}

.slide-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
  .summary-column {
    position: static;
    order: -1;
  }
  .header-steps .step span {
    display: none;
  }
  .step-line {
    width: 24px;
  }
}
@media (max-width: 600px) {
  .form-card {
    padding: 24px 18px;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .field.full {
    grid-column: auto;
  }
  .checkout-main {
    padding: 20px 16px 60px;
  }
  .header-inner {
    padding: 0 16px;
  }
  .summary-card {
    padding: 20px;
  }
}
</style>
