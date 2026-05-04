<template>
  <section class="about section" id="tentang">
    <div class="container">
      <div class="about-grid">
        <div class="about-img-wrap reveal">
          <div class="about-img-main">
            <img src="@/assets/image/about_img.png" alt="Hewan Qurban Pilihan" />
          </div>
          <div class="about-badge">✦ &nbsp;Halal Certified</div>
        </div>
        <div class="about-text reveal">
          <div class="sec-label">About Us</div>
          <h2 class="sec-title">Qurban Service <em>Trustworthy</em> & Profesional</h2>
          <p>
            We are here to make your Qurbani ritual easier by providing selected, healthy livestock
            that meet Islamic sharia standards and are managed by a team of experienced
            professionals.
          </p>
          <p>
            Each animal is curated directly from trusted breeders, checked by a veterinarian, and
            distributed transparently to those entitled to receive it.
          </p>
          <div class="about-checks">
            <div v-for="item in aboutChecks" :key="item" class="check-item">
              <div class="check-ic">✓</div>
              <span>{{ item }}</span>
            </div>
          </div>
          <!-- <a href="#" class="btn-gold">Sejarah Kami</a> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.about {
  padding: 100px 0;
  background: linear-gradient(180deg, #0b2e13 0%, #0a2410 100%);
  overflow: hidden;
}

.about .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 80px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about-img-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-img-wrap::before {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.15);
  animation: rotateBorder 12s linear infinite;
}

.about-img-wrap::after {
  content: '';
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1px dashed rgba(212, 175, 55, 0.1);
  animation: rotateBorder 8s linear infinite reverse;
}

@keyframes rotateBorder {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.about-img-main {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(212, 175, 55, 0.4);
  box-shadow:
    0 0 40px rgba(212, 175, 55, 0.15),
    0 0 80px rgba(212, 175, 55, 0.08),
    0 20px 60px rgba(0, 0, 0, 0.5);
  animation: glowPulseAbout 3s ease-in-out infinite;
  z-index: 2;
  position: relative;
}

.about-img-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.15) saturate(1.2) brightness(1.05);
  transition: transform 0.6s ease;
}

.about-img-main:hover img {
  transform: scale(1.05);
}

@keyframes glowPulseAbout {
  0%,
  100% {
    box-shadow:
      0 0 30px rgba(212, 175, 55, 0.15),
      0 0 60px rgba(212, 175, 55, 0.08),
      0 20px 60px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow:
      0 0 50px rgba(212, 175, 55, 0.35),
      0 0 100px rgba(212, 175, 55, 0.15),
      0 20px 60px rgba(0, 0, 0, 0.5);
  }
}
.about-badge {
  position: absolute;
  bottom: 10px;
  right: 30px;
  background: linear-gradient(135deg, #d4af37, #f0d060);
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 30px;
  letter-spacing: 1px;
  z-index: 3;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
  animation: floatBadge 3s ease-in-out infinite;
}

@keyframes floatBadge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
.about-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sec-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #d4af37;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.sec-label::before {
  content: '';
  width: 30px;
  height: 2px;
  background: #d4af37;
  border-radius: 2px;
}

.sec-title {
  font-size: 40px;
  color: white;
  line-height: 1.2;
  margin: 0;
}

.sec-title em {
  color: #d4af37;
  font-style: italic;
}

.about-text p {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  margin: 0;
}
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
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 175, 55, 0.12);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  transition: all 0.3s ease;
}

.check-item:hover {
  background: rgba(212, 175, 55, 0.08);
  border-color: rgba(212, 175, 55, 0.35);
  transform: translateX(6px);
}

.check-ic {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #f0d060);
  color: #000;
  font-weight: 900;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
<script setup>
import { aboutChecks } from '@/data/staticData.js'
import { onMounted } from 'vue'
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>
