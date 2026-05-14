<template>
  <header class="hero" id="home">
    <div class="hero-overlay"></div>
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

    <div class="hero-clients">
      <div class="client-avatars">
        <span v-for="c in clientAvatars" :key="c.initials" :style="{ background: c.color }">{{
          c.initials
        }}</span>
      </div>
      <p><strong>205.000+</strong> satisfied customers from all over the world</p>
    </div>
  </header>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700;900&family=Poppins:wght@400;500;600&display=swap');

/* ── Hero wrapper ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 120px 80px 80px;
  overflow: hidden;

  /* Background image sapi */
  background-image: url('@/assets/image/bg_qurban.png');
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
}

/* Overlay hitam 60% */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  z-index: 0;
}

/* Semua child di atas overlay */
.hero > *:not(.hero-overlay) {
  position: relative;
  z-index: 1;
}

/* ── Geo background decoration ── */
.hero-geo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 30% 40% at 20% 80%, rgba(220, 38, 38, 0.05) 0%, transparent 60%);
  pointer-events: none;
}

/* ── Badge float ── */
.hero-badge-float {
  position: absolute;
  top: 120px;
  right: 80px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
  padding: 10px 18px;
  z-index: 2;
}
.hero-badge-float .badge-icon {
  font-size: 20px;
  color: #dc2626;
}
.hero-badge-float strong {
  display: block;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
}
.hero-badge-float span {
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
}

/* ── Left content ── */
.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 580px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.8);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.7; }
}

/* Heading — Rubik 66px 700 */
.hero h1 {
  font-family: 'Rubik', sans-serif;
  font-size: 66px;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -1px;
}
.hero h1 em {
  display: block;
  color: #dc2626;
  font-style: italic;
}

/* Paragraph — Poppins 14px 400 */
.hero-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0;
  max-width: 460px;
}

/* ── Buttons ── */
.hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
}

/* ── Stats ── */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 12px;
}
.hero-stats-item {
  display: flex;
  align-items: center;
}
.stat {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}
.stat:first-child {
  padding-left: 0;
}
.stat strong {
  font-family: 'Rubik', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.stat span {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
.stat-sep {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
}

/* ── Hero card (hewan image, hidden on mobile via responsive.css) ── */
.hero-card {
  flex-shrink: 0;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
}
.gold-card {
  border: 1px solid rgba(220, 38, 38, 0.4);
  animation:
    slideIn 0.9s ease forwards,
    glowPulse 3s ease-in-out infinite;
  animation-delay: 0s, 0.9s;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes glowPulse {
  0%, 100% {
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
.hero-card img {
  width: 90%;
  height: auto;
  object-fit: contain;
  filter: contrast(1.15) saturate(1.2) brightness(1.05);
  image-rendering: crisp-edges;
}

/* ── Clients ── */
.hero-clients {
  position: absolute;
  bottom: 48px;
  left: 80px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 2;
}
.client-avatars {
  display: flex;
}
.client-avatars span {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  margin-left: -10px;
}
.client-avatars span:first-child {
  margin-left: 0;
}
.hero-clients p {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}
.hero-clients p strong {
  color: #fff;
  font-weight: 600;
  margin-right: 4px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .hero { padding: 100px 40px 80px; gap: 40px; }
  .hero h1 { font-size: 52px; }
  .hero-card { width: 340px; height: 340px; }
  .hero-badge-float { right: 40px; }
  .hero-clients { left: 40px; }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    justify-content: center;
    padding: 100px 24px 100px;
    text-align: center;
    gap: 32px;
    min-height: 100svh;
    background-position: center center;
  }
  .hero-left {
    align-items: center;
    max-width: 100%;
  }
  .hero h1 { font-size: clamp(36px, 9vw, 56px); }
  .hero-sub { text-align: center; }
  .hero-btns { justify-content: center; }
  .hero-stats { justify-content: center; flex-wrap: wrap; }
  .stat { padding: 0 16px; }
  .hero-badge-float { top: 72px; right: 16px; padding: 8px 12px; }
  .hero-card { display: none; }
  .hero-clients {
    position: relative;
    bottom: auto;
    left: auto;
    justify-content: center;
    margin-top: 8px;
  }
}

@media (max-width: 480px) {
  .hero { padding: 90px 20px 80px; }
  .hero h1 { font-size: 34px; }
  .hero-badge-float { display: none; }
}
</style>

<script setup>
import { heroStats, clientAvatars } from '@/data/staticData.js'
</script>