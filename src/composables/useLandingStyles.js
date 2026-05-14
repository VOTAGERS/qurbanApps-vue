import { onMounted, onUnmounted } from 'vue'

const CSS_FILES = [
 new URL('@/assets/styles/main.css', import.meta.url).href,
  new URL('@/assets/styles/responsive.css', import.meta.url).href,
]

export function useLandingStyles() {
  onMounted(() => {
    CSS_FILES.forEach((href) => {
      if (document.querySelector(`link[data-landing][href="${href}"]`)) return

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-landing', 'true') 
      document.head.appendChild(link)
    })
  })

  onUnmounted(() => {
    document.querySelectorAll('link[data-landing]').forEach((el) => el.remove())
  })
}