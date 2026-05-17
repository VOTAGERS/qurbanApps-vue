import { ref, onMounted } from 'vue'

export function useLockStatus(slug: string) {
  const isLocked  = ref(false)
  const daysLeft  = ref(3)
  const isLoading = ref(true)

  onMounted(async () => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/lock/status/${slug}`)
      const data = await res.json()
      isLocked.value = data.locked
      daysLeft.value = data.days_left
    } catch (e) {
      console.error('Gagal cek status lock:', e)
    } finally {
      isLoading.value = false
    }
  })

  return { isLocked, daysLeft, isLoading }
}
