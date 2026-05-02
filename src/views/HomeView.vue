<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // Import useRouter

const products = ref<any[]>([])
const selectedProduct = ref<any>(null) // Corrected position
const router = useRouter() // Initialize router

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products-woo`)
    products.value = response.data.data.map((p: any) => ({
      ...p,
      max_share: p.product_detail?.max_share || 1,
      price_formatted: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(p.price)
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(fetchProducts)

const buyer = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: ''
})

const shipping = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: ''
})

const sameAsBuyer = ref(false)

const recipients = ref<any[]>([])

const selectProduct = (product: any) => {
  selectedProduct.value = product
  recipients.value = Array.from({ length: product.max_share }, () => ({ name: '', email: '', phone: '' }))
}

const processPayment = async () => {
  try {
    const payload = {
      product_id: selectedProduct.value.id,
      quantity: 1, // Assuming 1 quantity based on UI
      total_price: selectedProduct.value.price, // Assuming price is available in product object
      billing: {
        first_name: buyer.firstName,
        last_name: buyer.lastName,
        email: buyer.email,
        company: buyer.company,
        address_1: buyer.address1,
        address_2: buyer.address2,
        city: buyer.city,
        state: buyer.state,
        postcode: buyer.postcode,
        country: buyer.country,
        phone: buyer.phone
      },
      shipping: {
        first_name: shipping.firstName,
        last_name: shipping.lastName,
        email: shipping.email,
        company: shipping.company,
        address_1: shipping.address1,
        address_2: shipping.address2,
        city: shipping.city,
        state: shipping.state,
        postcode: shipping.postcode,
        country: shipping.country,
        phone: shipping.phone
      },
      recipients: recipients.value.map(r => ({
        qurban_name: r.name,
        email: r.email,
        phone_number: r.phone
      }))
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/checkout`, payload)
    router.push({ name: 'payment', query: { order_code: response.data.order.order_code } })
    // alert('Checkout successful! Order Code: ' + response.data.order.order_code)
  } catch (error) {
    console.error('Checkout error:', error)
    alert('Checkout failed. Please check the console for details.')
  }
}

watch(sameAsBuyer, (val) => {
  if (val) {
    Object.assign(shipping, buyer)
  }
})

watch(buyer, (newBuyer) => {
  if (sameAsBuyer.value) {
    Object.assign(shipping, newBuyer)
  }
}, { deep: true })
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4 text-dark font-weight-bold">Checkout Simulation</h3>
          
          <!-- Product Selection -->
          <h6 class="mb-3">1. Select Product</h6>
          <div class="row mb-4">
            <div class="col-md-4" v-for="product in products" :key="product.id">
              <div 
                class="card border" 
                :class="{ 'border-primary shadow-sm': selectedProduct?.id === product.id }"
                @click="selectProduct(product)"
                style="cursor: pointer;"
              >
                <div class="card-body text-center">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <h6 class="text-primary mb-2">{{ product.price_formatted }}</h6>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedProduct">
            <div class="row">
              <!-- Left Column: Buyer & Shipping -->
              <div class="col-md-6">
                <!-- Buyer Information Card -->
                <div class="card mb-4 shadow-none border">
                  <div class="card-body py-3">
                    <h6 class="card-title text-muted mb-3">2. Buyer Information</h6>
                    <div class="row g-3">
                      <div class="col-sm-6">
                        <label class="form-label small">First Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.firstName">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Last Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.lastName">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Email</label>
                        <input type="email" class="form-control form-control-sm" v-model="buyer.email">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Phone Number</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.phone">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Company (Optional)</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.company">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Address 1</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.address1">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Address 2 (Optional)</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.address2">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">City</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.city">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">State</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.state">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Postcode</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.postcode">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Country</label>
                        <input type="text" class="form-control form-control-sm" v-model="buyer.country">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Shipping Information Card -->
                <div class="card mb-4 shadow-none border">
                  <div class="card-body py-3">
                    <h6 class="card-title text-muted mb-3 d-flex justify-content-between align-items-center">
                      <span>3. Shipping Information</span>
                      <div class="form-check form-switch mb-0">
                        <input class="form-check-input" type="checkbox" id="sameAsBuyer" v-model="sameAsBuyer">
                        <label class="form-check-label fw-normal small text-dark" for="sameAsBuyer">Same as Buyer</label>
                      </div>
                    </h6>
                    <div class="row g-3">
                      <div class="col-sm-6">
                        <label class="form-label small">First Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.firstName" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Last Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.lastName" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Email</label>
                        <input type="email" class="form-control form-control-sm" v-model="shipping.email" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Phone Number</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.phone" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Company (Optional)</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.company" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Address 1</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.address1" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-12">
                        <label class="form-label small">Address 2 (Optional)</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.address2" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">City</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.city" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">State</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.state" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Postcode</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.postcode" :disabled="sameAsBuyer">
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label small">Country</label>
                        <input type="text" class="form-control form-control-sm" v-model="shipping.country" :disabled="sameAsBuyer">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Recipient/Member -->
              <div class="col-md-6">
                <div class="card bg-light-primary border-0">
                  <div class="card-body">
                    <h6 class="mb-3">4. Recipient / Member Information</h6>
                    <div class="alert alert-primary py-2 small">
                      You selected <strong>{{ selectedProduct.name }}</strong>. Please provide information for {{ selectedProduct.max_share }} recipient(s).
                    </div>
                    <div class="recipient-scroll pe-2 mb-3" style="max-height: 750px; overflow-y: auto; overflow-x: hidden;">
                      <div class="card shadow-none border mb-3" v-for="(rec, index) in recipients" :key="index">
                        <div class="card-body py-3">
                          <h6 class="card-title text-muted mb-3">Recipient {{ index + 1 }}</h6>
                          <div class="mb-2">
                            <label class="form-label small">Name</label>
                            <input type="text" class="form-control form-control-sm" v-model="rec.name" placeholder="Full Name">
                          </div>
                          <div class="mb-2">
                            <label class="form-label small">Email</label>
                            <input type="email" class="form-control form-control-sm" v-model="rec.email" placeholder="Email Address">
                          </div>
                          <div class="mb-0">
                            <label class="form-label small">Phone Number</label>
                            <input type="text" class="form-control form-control-sm" v-model="rec.phone" placeholder="Phone Number">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-grid mt-3 mb-3">
                  <button class="btn btn-primary btn-lg py-3 shadow-sm" @click="processPayment">
                    <i class="ti ti-check me-2"></i> Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for Recipient List */
.recipient-scroll::-webkit-scrollbar {
  width: 6px;
}
.recipient-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.recipient-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
.recipient-scroll::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
