import { ref } from 'vue'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products-detail`

function formatPrice(value) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency', currency: 'SGD', minimumFractionDigits: 0,
  }).format(Number(value ?? 0))
}

function mapItem(item, index) {
  return {
    id:       item.id,
    featured: index === 0,
    title:    item.product_woo?.name ?? 'Produk Qurban',
    for:      `Maks. ${item.max_share} orang`,
    price:    formatPrice(item.product_woo?.price),
    priceSup: '/ekor',
    desc:     `${item.status === 'A' ? '✓ Tersedia' : '✗ Tidak Tersedia'} · Maks. ${item.max_share} orang`,
    img:      item.product_woo?.image ?? null,
    status:   item.status,
    rawPrice: Number(item.product_woo?.price ?? 0),
    maxShare: item.max_share,
  }
}

export function useCategories() {
  const categories = ref([])
  const loading    = ref(true)
  const error      = ref(null)

  async function fetchCategories() {
    try {
      const res  = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json.success && json.data) {
        categories.value = json.data.map(mapItem)
      } else {
        error.value = 'Data produk tidak ditemukan.'
      }
    } catch (e) {
      console.error('[useCategories]', e)
      error.value = 'Gagal memuat data produk.'
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, error, fetchCategories }
}