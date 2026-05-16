<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <a href="#" class="nav-logo">
      <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" class="nav-logo-img" />
    </a>
    
    <div class="nav-btn-wrap">
      <a href="#pemesanan" class="btn-gold center-btn">Order Qurban</a>
    </div>
    
    <div class="nav-info">
      <div class="info-link">
        <i class="ti ti-phone"></i>
        <span>(+65) 8802 0744</span>
      </div>
      <div class="info-link">
        <i class="ti ti-briefcase"></i>
        <span>UEN: 53439168X</span>
      </div>
      <div class="info-link">
        <i class="ti ti-mail"></i>
        <span>admin@shameemsultanah.com</span>
      </div>
    </div>
  </nav>

</template>

<script setup>
import { navLinks } from '@/data/staticData.js'
defineProps({
  isScrolled:    { type: Boolean, default: false },
  activeSection: { type: String,  default: 'home' },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background: transparent;
  border-bottom: none;
  box-shadow: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
}

.nav.scrolled {
  top: 15px;
  left: 30px;
  right: 30px;
  height: 90px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  color: #333333;
}

/* Logo image */
.nav-logo-img {
  height: 65px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
  transition: filter 0.4s;
}

.nav.scrolled .nav-logo-img {
  filter: none;
}

/* Nav links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 0.15rem;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: inherit;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.nav-links a:hover,
.nav-links a.active {
  color: #7a1b2e;
  background: rgba(122, 27, 46, 0.06);
}
.nav-btn-wrap {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}
.center-btn {
  position: absolute;
  /* left: 50%; */
  right: 45%;
  white-space: nowrap;
}
.nav-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}
.info-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: inherit;
  opacity: 0.9;
  font-weight: 500;
  line-height: 1.2;
}
.info-link i {
  color: #e8c84a;
  font-size: 13px;
}

.nav.scrolled .info-link i {
  color: #7a1b2e;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-info { display: none; }
}
@media (max-width: 768px) {
  .nav { 
    height: 70px;
    padding: 0 16px; 
  }
  .nav.scrolled {
    top: 8px;
    left: 12px;
    right: 12px;
    height: 60px;
    border-radius: 30px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
  .nav-logo-img { 
    height: 38px; 
  }
  .nav.scrolled .nav-logo-img {
    height: 32px;
  }
  .center-btn { 
    position: static; 
    transform: none; 
    font-size: 11px; 
    padding: 0.5rem 1rem; 
  }
}
</style>