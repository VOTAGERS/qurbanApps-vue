<template>
  <section class="categories section" id="hewan">
    <div class="container">
      <div class="sec-head-center">
        <h2 class="sec-title">Qurban Animal Category</h2>
        <p class="sec-desc">Choose from carefully selected cattle, sheep and goats, that are healthy, well-maintained and fully compliant with Islamic Sharia requirements
        </p>
      </div>

      <div v-if="loading" class="cat-loading">
        <div v-for="n in 4" :key="n" class="cat-skeleton"></div>
      </div>

      <div v-else-if="error" class="cat-error">
        <p>{{ error }}</p>
        <button class="retry-btn" @click="$emit('retry')">Coba Lagi</button>
      </div>

      <div v-else class="cat-grid">
        <div
          v-for="item in categories"
          :key="item.id"
          class="cat-card cat-card-anim"
          :class="{ featured: item.featured }"
        >
          <div class="cat-img">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="cat-body">
            <h3>{{ item.title }}</h3>
            <div class="cat-for">{{ item.for }}</div>
            <div class="cat-price">
              {{ item.price }}<sup>{{ item.priceSup }}</sup>
            </div>
            <p>{{ item.desc }}</p>
            <button
              class="cat-btn"
              :class="item.featured ? 'cat-btn-primary' : 'cat-btn-outline'"
              @click="pesanSekarang(item)"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCheckout } from '@/composables/useCheckout'
defineProps({
  categories: { type: Array,   default: () => [] },
  loading:    { type: Boolean, default: true },
  error:      { type: String,  default: null },
})
defineEmits(['retry'])
const { pesanSekarang } = useCheckout()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@700&family=Poppins:wght@400;500;600&display=swap');

.categories {
  padding: 100px 0;
  background: #f9f7f7;
}
.categories .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* ── Section header ── */
.sec-head-center {
  text-align: center;
  margin-bottom: 3.5rem;
}
.sec-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7a1b2e;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: rgba(122, 27, 46, 0.08);
  border: 1px solid rgba(122, 27, 46, 0.2);
  padding: 4px 16px;
  border-radius: 50px;
  margin-bottom: 14px;
}
.sec-title {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  margin: 0 0 12px;
}
.sec-title em {
  color: #7a1b2e;
  font-style: italic;
}
.sec-desc {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 1.75;
  max-width: 520px;
  margin: 0 auto;
}

/* ── Grid ── */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* ── Card ── */
.cat-card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #e8e0e0;
  transition: transform 0.25s, box-shadow 0.25s;
  position: relative;
}
.cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(43, 13, 13, 0.12);
}
.cat-card.featured {
  border-color: #7a1b2e;
  border-width: 2px;
}

.cat-img {
  aspect-ratio: 4/3;
  overflow: hidden;
}
.cat-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.cat-card:hover .cat-img img {
  transform: scale(1.07);
}

.cat-body {
  padding: 1.3rem;
}
.cat-body h3 {
  font-family: 'Rubik', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 4px;
}
.cat-for {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #999999;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.cat-price {
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #7a1b2e;
  margin-bottom: 10px;
}
.cat-price sup {
  font-size: 0.68rem;
}
.cat-body p {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Button — burgundy, Poppins 14px 600 */
.cat-btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.65rem;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.cat-btn-primary {
  background: #7a1b2e;
  color: #ffffff;
}
.cat-btn-primary:hover {
  background: #5d1423;
}
.cat-btn-outline {
  background: transparent;
  border: 1.5px solid #7a1b2e;
  color: #7a1b2e;
}
.cat-btn-outline:hover {
  background: #7a1b2e;
  color: #ffffff;
}

/* ── Loading skeleton ── */
.cat-loading {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.cat-skeleton {
  height: 380px;
  border-radius: 18px;
  background: linear-gradient(90deg, #ede8e8 25%, #e0d5d5 50%, #ede8e8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.cat-error {
  text-align: center;
  padding: 3rem;
  color: #7a1b2e;
}
.retry-btn {
  margin-top: 1rem;
  background: #7a1b2e;
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.retry-btn:hover { background: #5d1423; }

/* Animation */
.cat-card-anim { animation: fadeUp 0.5s ease both; }
.cat-card-anim:nth-child(2) { animation-delay: 0.1s; }
.cat-card-anim:nth-child(3) { animation-delay: 0.2s; }
.cat-card-anim:nth-child(4) { animation-delay: 0.3s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .cat-grid, .cat-loading { grid-template-columns: repeat(2, 1fr); }
  .categories .container { padding: 0 2rem; }
}
@media (max-width: 768px) {
  .categories { padding: 60px 0; }
  .categories .container { padding: 0 20px; }
  .cat-grid, .cat-loading { grid-template-columns: 1fr 1fr; gap: 14px; }
}
@media (max-width: 480px) {
  .cat-grid, .cat-loading { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
}
</style>