<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <a href="#" class="nav-logo">
      <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" class="nav-logo-img" />
    </a>
    
    <div class="hero-btns">
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
  padding: 0 3rem;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav.scrolled {
  top: 15px;
  left: 30px;
  right: 30px;
  height: 100px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 56, 56, 0.3);
  border-radius: 100px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

/* Logo image */
.nav-logo-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  display: block;
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
  color: #333333;
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
  color: #555;
  font-weight: 500;
  line-height: 1.2;
}
.info-link i {
  color: #7a1b2e;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-info { display: none; }
}
@media (max-width: 768px) {
  .nav { padding: 0 20px; }
  .nav-logo-img { height: 45px; }
  .center-btn { 
    position: static; 
    transform: none; 
    font-size: 12px; 
    padding: 0.6rem 1.2rem; 
  }
}
</style>