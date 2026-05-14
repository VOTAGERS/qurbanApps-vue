<template>
  <section class="why section">
    <div class="container">
      <div class="why-grid">
        <div class="why-content reveal">
          <div class="sec-label">Why Us</div>
          <h2 class="sec-title">Why Choose <em>ILM Qurban?</em></h2>
          <p class="sec-desc">
            We are not just a provider of sacrificial animals — we are a worship partner who ensures
            that every process is carried out in a trustworthy and blessed manner.
          </p>
          <div class="why-list">
            <div v-for="item in whyItems" :key="item.num" class="why-item">
              <div class="why-num">{{ item.num }}</div>
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="why-img-wrap reveal">
          <div class="why-img-main">
            <img src="@/assets/image/why_img.png" alt="Keunggulan ILM Qurban" />
          </div>
          <div class="why-float-card">
            <div class="wfc-icon">☽</div>
            <div>
              <strong>100% Trustworthy</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { whyItems } from '@/data/staticData.js'
import { onMounted } from 'vue'
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((el) => { if (el.isIntersecting) el.target.classList.add('visible') }),
    { threshold: 0.15 },
  )
  document.querySelectorAll('.why .reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,700&family=Poppins:wght@400;500;600&display=swap');

.why {
  padding: 100px 0;
  background: #ffffff;
}
.why .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}

.why-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 5rem;
  align-items: center;
}

/* ── Labels & Title ── */
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
  max-width: 480px;
  margin-bottom: 0;
}

/* ── Why list ── */
.why-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2rem;
}
.why-item {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}
.why-num {
  font-family: 'Rubik', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: rgba(122, 27, 46, 0.15);
  line-height: 1;
  min-width: 52px;
}
.why-item h4 {
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 4px;
}
.why-item p {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 1.7;
  margin: 0;
}

/* ── Image ── */
.why-img-wrap {
  position: relative;
}
.why-img-main {
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 3/4;
  box-shadow: 0 32px 80px rgba(43, 13, 13, 0.14);
}
.why-img-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Float card */
.why-float-card {
  position: absolute;
  bottom: 2.5rem;
  left: -2.5rem;
  background: #ffffff;
  border: 1px solid #e8e0e0;
  border-radius: 14px;
  padding: 1rem 1.3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.09);
  display: flex;
  align-items: center;
  gap: 0.9rem;
}
.wfc-icon { font-size: 2rem; }
.why-float-card strong {
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #111111;
}

/* ── Reveal ── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .why .container { padding: 0 2rem; }
  .why-grid { gap: 3rem; }
}
@media (max-width: 768px) {
  .why { padding: 60px 0; }
  .why .container { padding: 0 20px; }
  .why-grid { grid-template-columns: 1fr; gap: 40px; }
  .why-img-wrap { order: -1; }
  .why-float-card { display: none; }
  .sec-title { text-align: center; }
  .sec-label { display: flex; justify-content: center; }
  .sec-desc { text-align: center; }
}
</style>