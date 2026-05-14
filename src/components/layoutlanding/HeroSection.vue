<template>
  <header class="hero" id="home">
    <div class="hero-geo"></div>

    <div class="hero-badge-float">
      <div class="badge-icon">☽</div>
      <div>
        <strong>Halal Certified</strong>
        <span>Halal & Syariah</span>
      </div>
    </div>

    <div class="hero-left">
      <div class="hero-tag">
        <span class="tag-dot"></span>
        Shameem Sultanah
      </div>
      <h1>Qurban Premium<em>Sharia compliant</em></h1>
      <p class="hero-sub">
        We provide healthy, carefully selected cows and goats with transparent pricing and seamless
        distribution.
      </p>
      <div class="hero-btns">
        <a href="#pemesanan" class="btn-gold">Order Qurban</a>
        <a href="#hewan" class="btn-ghost">See Animals</a>
      </div>
      <div class="hero-stats">
        <div v-for="(stat, i) in heroStats" :key="i" class="hero-stats-item">
          <div v-if="i > 0" class="stat-sep"></div>
          <div class="stat">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-card gold-card">
      <img src="@/assets/image/bg_qurban.png" alt="Qurban" />
    </div>
    <!-- <div class="hero-card-label">
      <span class="label-dot"></span>
      Hewan Pilihan Terbaik · Bersertifikat Halal
      <span class="label-dot"></span>
    </div> -->

    <div class="hero-clients">
      <div class="client-avatars">
        <span v-for="c in clientAvatars" :key="c.initials" :style="{ background: c.color }">{{
          c.initials
        }}</span>
      </div>
      <p><strong>205.000+</strong>satisfied customers from all over the world</p>
    </div>
  </header>
</template>

<style>
.gold-card {
  border: 1px solid rgba(220, 38, 38, 0.4);
  animation:
    slideIn 0.9s ease forwards,
    glowPulse 3s ease-in-out infinite;
  animation-delay: 0s, 0.9s;
}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(220, 38, 38, 0.2),
      0 0 40px rgba(220, 38, 38, 0.1);
  }
  50% {
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(220, 38, 38, 0.6),
      0 0 80px rgba(220, 38, 38, 0.3),
      0 0 120px rgba(220, 38, 38, 0.15);
  }
}

.hero-card-label {
  position: absolute;
  bottom: 2.5rem;
  left: 5rem;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 1.2s;
}

.label-dot {
  width: 5px;
  height: 5px;
  background: #dc2626;
  border-radius: 50%;
  animation: glowDot 2s ease-in-out infinite;
}

@keyframes glowDot {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.hero-card img {
  width: 90%;
  height: auto;
  object-fit: contain;
  filter: contrast(1.15) saturate(1.2) brightness(1.05);
  image-rendering: crisp-edges;
}
</style>

<script setup>
import { heroStats, clientAvatars } from '@/data/staticData.js'
</script>
