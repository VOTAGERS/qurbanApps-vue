import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer = null

  function initObserver() {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  }

  function observeNew(selector = '.reveal:not(.revealed)') {
    document.querySelectorAll(selector).forEach((el) => observer?.observe(el))
  }

  onMounted(() => initObserver())
  onUnmounted(() => observer?.disconnect())

  return { observeNew }
}
