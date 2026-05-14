<template>
  <section class="about section" id="tentang">
    <div class="container">
      <div class="about-grid">
        <div class="about-img-wrap reveal">
          <div class="about-img-main">
            <img src="@/assets/image/ternak.jpeg" alt="Hewan Qurban Pilihan" />
          </div>
        </div>
        <div class="about-text reveal">
          <div class="sec-label">Why Us</div>
          <h2 class="sec-title">Trustworthy & Professional <em>Qurban Services</em></h2>
          <p>
            We are here to make your Qurban experience smooth and worry-free by providing carefully
            selected, healthy livestock that fulfil Islamic Shariah requirements, managed by an
            experienced and trusted partners around the world.
          </p>
          <p>
            Every animal is sourced directly from reliable partners, examined to ensure its health and
            quality, and distributed transparently to eligible beneficiaries with proper
            documentation and updates throughout the process.
          </p>
          <div class="about-checks">
            <div v-for="item in aboutChecks" :key="item" class="check-item">
              <div class="check-ic">✓</div>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,700&family=Poppins:wght@400;500;600;700&display=swap');

/* ── Section ── */
.about {
  padding: 100px 0;
  background: #ffffff;
  overflow: hidden;
}
.about .container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 80px;
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ── Image wrap ── */
.about-img-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-img-wrap::before {
  content: '';
  position: absolute;
  width: 510px;
  height: 510px;
  border-radius: 50%;
  border: 1px solid rgba(220, 38, 38, 0.2);
  animation: rotateBorder 12s linear infinite;
}
.about-img-wrap::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  border: 1px dashed rgba(220, 38, 38, 0.12);
  animation: rotateBorder 8s linear infinite reverse;
}
@keyframes rotateBorder {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.about-img-main {
  width: 460px;
  height: 460px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(220, 38, 38, 0.4);
  box-shadow:
    0 0 40px rgba(220, 38, 38, 0.1),
    0 0 80px rgba(220, 38, 38, 0.05),
    0 20px 60px rgba(0, 0, 0, 0.08);
  animation: glowPulseAbout 3s ease-in-out infinite;
  z-index: 2;
  position: relative;
}
.about-img-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(1.15);
  transition: transform 0.6s ease;
}
.about-img-main:hover img {
  transform: scale(1.05);
}
@keyframes glowPulseAbout {
  0%, 100% {
    box-shadow:
      0 0 30px rgba(220, 38, 38, 0.08),
      0 0 60px rgba(220, 38, 38, 0.04),
      0 20px 60px rgba(0, 0, 0, 0.08);
  }
  50% {
    box-shadow:
      0 0 50px rgba(220, 38, 38, 0.22),
      0 0 100px rgba(220, 38, 38, 0.1),
      0 20px 60px rgba(0, 0, 0, 0.1);
  }
}
.about-badge {
  position: absolute;
  bottom: 10px;
  right: 30px;
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 30px;
  letter-spacing: 1px;
  z-index: 3;
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
  animation: floatBadge 3s ease-in-out infinite;
}
@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* ── Text ── */
.about-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sec-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #dc2626;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.sec-label::before {
  content: '';
  width: 30px;
  height: 2px;
  background: #dc2626;
  border-radius: 2px;
}

/* Heading — Rubik 40px 700 (scaled from 66px, 40px fits section better) */
.sec-title {
  font-family: 'Rubik', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  margin: 0;
}
.sec-title em {
  color: #dc2626;
  font-style: italic;
}

/* Paragraf — Poppins 14px 400 */
.about-text p {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 1.8;
  margin: 0;
}

/* ── Checks ── */
.about-checks {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: #f8f8f8;
  border: 1px solid rgba(220, 38, 38, 0.15);
  border-radius: 12px;
  color: #333333;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
}
.check-item:hover {
  background: rgba(220, 38, 38, 0.04);
  border-color: rgba(220, 38, 38, 0.35);
  transform: translateX(6px);
}
.check-ic {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: #fff;
  font-weight: 900;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Reveal ── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .about .container { padding: 0 40px; }
  .about-grid { gap: 48px; }
  .about-img-main { width: 300px; height: 300px; }
  .about-img-wrap::before { width: 340px; height: 340px; }
  .about-img-wrap::after  { width: 270px; height: 270px; }
  .sec-title { font-size: 32px; }
}

@media (max-width: 768px) {
  .about { padding: 60px 0; }
  .about .container { padding: 0 20px; }
  .about-grid { grid-template-columns: 1fr; gap: 48px; text-align: center; }
  .about-img-wrap { justify-content: center; }
  .about-img-main { width: 260px; height: 260px; }
  .about-img-wrap::before { width: 300px; height: 300px; }
  .about-img-wrap::after  { width: 240px; height: 240px; }
  .about-badge {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: -14px;
    white-space: nowrap;
    animation: floatBadgeMobile 3s ease-in-out infinite;
  }
  @keyframes floatBadgeMobile {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(-8px); }
  }
  .about-text { align-items: center; }
  .about-checks { width: 100%; text-align: left; }
  .sec-label { justify-content: center; }
  .sec-title { font-size: clamp(24px, 7vw, 36px); }
  .check-item:hover { transform: translateX(0) translateY(-2px); }
}

@media (max-width: 480px) {
  .about-img-main { width: 210px; height: 210px; }
  .about-img-wrap::before { width: 250px; height: 250px; }
  .about-img-wrap::after  { width: 195px; height: 195px; }
  .check-item { padding: 12px 14px; font-size: 13px; }
}
</style>

<script setup>
import { aboutChecks } from '@/data/staticData.js'
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) el.target.classList.add('visible')
      })
    },
    { threshold: 0.2 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>