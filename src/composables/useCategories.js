import { ref } from 'vue'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products-detail`

function formatPrice(value) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency', currency: 'SGD', minimumFractionDigits: 0,
  }).format(Number(value ?? 0))
}

function mapItem(item, index) {
  return {
    id: item.idproduct_woo,
    featured: false,
    title: item.product_woo?.name ?? 'Qurbani Products',
    for: `Maks. ${item.max_share} people`,
    price: formatPrice(item.product_woo?.price),
    priceSup: '/ekor',
    desc: `Maks. ${item.max_share} people`,
    img: (() => {
      const url = item.product_woo?.file_upload?.url ?? item.product_woo?.image ?? null;
      return (url && !url.startsWith('http')) ? `${import.meta.env.VITE_API_BASE_URL}${url}` : url;
    })(),
    status: item.status,
    rawPrice: Number(item.product_woo?.price ?? 0),
    maxShare: item.max_share,
  }
}

export function useCategories() {
  const categories = ref([])
  const loading = ref(true)
  const error = ref(null)

  async function fetchCategories() {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json.success && json.data) {
        categories.value = json.data.map(mapItem)
      } else {
        error.value = 'Product data not found.'
      }
    } catch (e) {
      console.error('[useCategories]', e)
      error.value = 'Failed to load product data.'
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, error, fetchCategories }
}