<template>
  <section class="categories section" id="hewan">
    <div class="arabic-pattern-overlay"></div>

    <div class="container">
      <div class="sec-head-center reveal">
        <div class="sec-label">
          <i class="pi pi-star-fill gold-icon"></i>
          Sacrifice Choice
          <i class="pi pi-star-fill gold-icon"></i>
        </div>
        <h2 class="sec-title">Premium <em>Sacrificial</em> Animals</h2>
        <p class="sec-desc">
          Selected premium livestock, healthy and fully Shariah compliant for your holy sacrifice.
        </p>
      </div>

      <div v-if="loading" class="cat-loading">
        <div v-for="n in 4" :key="n" class="cat-skeleton"></div>
      </div>

      <div v-else-if="error" class="cat-error">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="$emit('retry')">Try Again</button>
      </div>

      <div v-else class="cat-grid">
        <div
          v-for="item in categories"
          :key="item.id"
          class="cat-card"
          :class="{ 'featured-blink': item.featured }"
        >
          <div v-if="item.featured" class="featured-badge">
            <span class="shine-effect"></span>
            Recommended
          </div>

          <div class="cat-img">
            <div class="img-frame-ornament"></div>
            <img :src="item.img" :alt="item.title" loading="lazy" />
          </div>

          <div class="cat-body">
            <div class="cat-header">
              <h3>{{ item.title }}</h3>
              <div class="cat-for-badge">MAKS. {{ item.for }}</div>
            </div>

            <div class="cat-price-box">
              <span class="currency">Starting from</span>
              <div class="cat-price">
                {{ item.price }}<sup class="gold-sup">{{ item.priceSup }}</sup>
              </div>
            </div>

            <p class="item-desc">{{ item.desc }}</p>

            <button
              class="cat-btn"
              :class="item.featured ? 'cat-btn-primary' : 'cat-btn-outline'"
              @click="pesanSekarang(item)"
            >
              Order Now
              <i class="pi pi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCheckout } from '@/composables/useCheckout'
import { onMounted } from 'vue'

defineProps({
  categories: { type: Array, default: () => [] },
  loading: { type: Boolean, default: true },
  error: { type: String, default: null },
})

defineEmits(['retry'])
const { pesanSekarang } = useCheckout()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

.categories {
  padding: 100px 0;
  background: #fffcf9;
  position: relative;
  overflow: hidden;
}

.arabic-pattern-overlay {
  position: absolute;
  inset: 0;
  background-image: url('https://www.transparenttextures.com/patterns/arabesque.png');
  opacity: 0.05;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.sec-head-center {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.sec-head-center.visible {
  opacity: 1;
  transform: translateY(0);
}

.sec-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #7a1b2e;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  background: white;
  padding: 6px 20px;
  border-radius: 50px;
  border: 1px solid #c8a355;
  margin-bottom: 15px;
}

.sec-title {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
}

.sec-title em {
  color: #7a1b2e;
  font-style: italic;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
}

.cat-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(200, 163, 85, 0.15);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.cat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(122, 27, 46, 0.1);
  border-color: #c8a355;
}

.featured-blink {
  border: 2px solid #c8a355;
  animation: goldenGlow 2s infinite alternate;
}

@keyframes goldenGlow {
  0% {
    box-shadow: 0 0 5px rgba(200, 163, 85, 0.2);
  }
  100% {
    box-shadow: 0 0 20px rgba(200, 163, 85, 0.4);
  }
}

.cat-img {
  width: 100%;
  aspect-ratio: 4/3; 
  overflow: hidden;
  position: relative;
}

.cat-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cat-body h3 {
  font-family: 'Rubik', sans-serif;
  font-size: 17px;
  color: #111;
  margin: 0;
}

.cat-for-badge {
  font-size: 9px;
  font-weight: 700;
  color: #7a1b2e;
  background: rgba(122, 27, 46, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.cat-price-box {
  margin-bottom: 15px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 10px;
}

.currency {
  font-size: 11px;
  color: #888;
  display: block;
}
.cat-price {
  font-family: 'Rubik', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #7a1b2e;
}
.gold-sup {
  color: #c8a355;
  margin-left: 2px;
}

.item-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}
.cat-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
}

.cat-btn-primary {
  background: #7a1b2e;
  color: #fff;
}
.cat-btn-primary:hover {
  background: #c8a355;
}
.cat-btn-outline {
  background: #f9f9f9;
  color: #111;
  border: 1px solid #eee;
}
.cat-btn-outline:hover {
  border-color: #c8a355;
  color: #c8a355;
}
@media (max-width: 1100px) {
  .cat-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 850px) {
  .cat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 550px) {
  .cat-grid {
    grid-template-columns: 1fr;
  }
  .cat-card {
    max-width: 360px;
    margin: 0 auto;
  }
}
</style>
