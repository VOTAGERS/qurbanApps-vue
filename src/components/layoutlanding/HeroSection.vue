<template>
  <header class="hero" id="home" :style="{ '--scroll': scrollY + 'px' }">
    <div class="hero-overlay"></div>
    <div class="hero-glow-1 parallax-glow"></div>
    <div class="hero-glow-2"></div>

    <div class="container hero-container">
      <div class="hero-left parallax-left">
        <div class="logo-wrapper animate-pop">
          <img
            src="@/assets/image/llmqurban.png"
            alt="Logo ILM Qurban"
            class="logo-render floating"
          />
        </div>

        <div class="contact-list animate-fade-up">
          <div class="contact-item">
            <div class="icon-box">
              <i class="pi pi-phone"></i>
            </div>
            <span class="contact-text">(+65) 8802 0744</span>
          </div>

          <div class="contact-item">
            <div class="icon-box">
              <i class="pi pi-briefcase"></i>
            </div>
            <span class="contact-text">UEN: 53439168X</span>
          </div>

          <div class="contact-item">
            <div class="icon-box">
              <i class="pi pi-envelope"></i>
            </div>
            <span class="contact-text">admin@shameemsultanah.com</span>
          </div>
        </div>
      </div>

      <div class="hero-right animate-float-in parallax-right">
        <div class="profile-frame">
          <div class="frame-decoration"></div>
          <img
            src="@/assets/image/saheem.jpeg"
            alt="Ustazah Shameem Sultanah"
            class="profile-img"
          />

          <div class="floating-badge parallax-badge">
            <div class="badge-icon">
              <i class="pi pi-verified"></i>
            </div>
            <div class="badge-content">
              <span class="badge-name">ILM TOURS PTE. LTD.</span>
              <span class="badge-status">Certified Sharia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import 'primeicons/primeicons.css'
const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
.hero {
  position: relative;
  min-height: 100vh;
  background: #080808;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 50%, rgba(122, 27, 46, 0.25) 0%, transparent 60%);
  z-index: 1;
}

.hero-glow-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: rgba(200, 117, 75, 0.15);
  filter: blur(120px);
  border-radius: 50%;
  z-index: 1;
}

.hero-glow-2 {
  position: absolute;
  bottom: 10%;
  left: 30%;
  width: 300px;
  height: 300px;
  background: rgba(122, 27, 46, 0.1);
  filter: blur(100px);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 50px;
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo-render {
  height: 200px;
  filter: brightness(0) invert(1) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.7));
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 420px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 25px;
  background: rgba(15, 15, 15, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  cursor: pointer;
}

.contact-item:hover {
  background: rgba(122, 27, 46, 0.25);
  border-color: rgba(122, 27, 46, 0.6);
  transform: translateX(10px) scale(1.02);
}

.icon-box {
  width: 42px;
  height: 42px;
  background: #7a1b2e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.1rem;
}

.contact-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-right {
  display: flex;
  justify-content: flex-end;
}

.profile-frame {
  position: relative;
  width: fit-content;
}

.frame-decoration {
  position: absolute;
  inset: -12px;
  border: 2px solid #c8754b;
  border-radius: 30px;
  opacity: 0.25;
  transform: rotate(-3deg);
  z-index: -1;
}

.profile-img {
  width: 100%;
  max-width: 460px;
  border-radius: 25px;
  display: block;
  filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.floating-badge {
  position: absolute;
  bottom: 30px;
  left: -40px;
  background: rgba(255, 255, 255, 0.98);
  padding: 12px 22px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.badge-name {
  color: #1a1a1a;
  font-weight: 800;
  font-size: 13px;
}
.badge-status {
  color: #7a1b2e;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
}

.parallax-left,
.parallax-right,
.parallax-badge,
.parallax-glow {
  will-change: transform;
  transition: transform 0.15s ease-out;
}

.parallax-left {
  transform: translateY(calc(var(--scroll) * -0.15));
}
.parallax-right {
  transform: translateY(calc(var(--scroll) * 0.08));
}
.parallax-badge {
  transform: translateY(calc(var(--scroll) * -0.25));
}
.parallax-glow {
  transform: translate(calc(var(--scroll) * 0.05), calc(var(--scroll) * -0.05));
}

.floating {
  animation: floatingAnim 5s ease-in-out infinite;
}
@keyframes floatingAnim {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-pop {
  animation: popIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s 0.4s forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }
  .hero-left {
    align-items: center;
    transform: none !important;
  }
  .hero-right {
    justify-content: center;
    transform: none !important;
  }
  .profile-frame {
    margin: 0 auto;
  }
  .floating-badge {
    left: 50%;
    transform: translateX(-50%) !important;
    bottom: -20px;
  }
}
</style>
