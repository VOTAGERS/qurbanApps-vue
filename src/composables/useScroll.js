import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const isScrolled = ref(false)
  const activeSection = ref('home')

  function onScroll() {
    isScrolled.value = window.scrollY > 60
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { isScrolled, activeSection, scrollTop }
}
