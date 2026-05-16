<template>
  <nav class="nav-wrapper" :class="{ scrolled: isScrolled || isMobileMenuOpen }">
    <div class="nav-container">
      
      <div class="nav-left">
        <div class="logo-wrapper">
          <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" class="logo-render" />
          <div class="logo-text">
            <span class="brand-name">ILM TOURS</span>
            <span class="brand-sub">PTE. LTD.</span>
          </div>
        </div>
      </div>

      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" :class="{ active: activeSection === link.id }">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="nav-right">
        <div class="contact-card desktop-only">
          <div class="info-text">
            <span class="line">(+65) 8802 0744</span>
            <span class="line">UEN: 53439168X</span>
            <span class="line email">admin@shameemsultanah.com</span>
          </div>
        </div>

        <button class="hamburger-btn" @click="toggleMobileMenu" :class="{ 'is-active': isMobileMenuOpen }" aria-label="Menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-drawer">
        <ul class="mobile-nav-links">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href" @click="closeMobileMenu">
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="contact-card mobile-only">
          <div class="info-text">
            <span class="line"><i class="pi pi-phone"></i> (+65) 8802 0744</span>
            <span class="line">UEN: 53439168X</span>
            <span class="line email"><i class="pi pi-envelope"></i> admin@shameemsultanah.com</span>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#hewan', id: 'hewan', label: 'Packages' },
  { href: '#kontak', id: 'kontak', label: 'Contact Us' }, 
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

.nav-wrapper {
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-container {
  width: 92%;
  max-width: 1350px;
  height: 85px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  transition: all 0.5s ease;
  z-index: 1001;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-render {
  height: 65px; 
  filter: brightness(0) invert(1);
  transition: 0.4s ease;
}

.brand-name {
  color: white;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.5px;
}
.brand-sub {
  color: white;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.9;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
}
.nav-links a {
  color: white !important;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 50px;
  transition: 0.4s;
}

.nav-links a:hover, .nav-links a.active {
  background: rgba(255, 255, 255, 0.1);
}

.contact-card {
  background: #7a1b2e;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
}

.info-text {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.line {
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

.line.email {
  font-size: 10px;
  opacity: 0.9;
}

.scrolled.nav-wrapper {
  padding: 12px 0;
}

.scrolled .nav-container {
  background: #ffffff;
  max-width: 1150px;
  height: 72px;
  border-radius: 100px;
  padding: 0 10px 0 35px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.scrolled .logo-render {
  filter: none;
  height: 48px;
}
.scrolled .brand-name,
.scrolled .brand-sub {
  color: #7a1b2e !important;
}
.scrolled .nav-links a {
  color: #333333 !important;
}
.scrolled .nav-links a:hover, .scrolled .nav-links a.active {
  background: rgba(122, 27, 46, 0.05);
  color: #7a1b2e !important;
}
.scrolled .contact-card {
  border-radius: 100px;
  transform: scale(0.96);
}

.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
}

.hamburger-btn .bar {
  width: 100%;
  height: 2.5px;
  background-color: white;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.scrolled .hamburger-btn .bar {
  background-color: #7a1b2e; 
}

.hamburger-btn.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger-btn.is-active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger-btn.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu-drawer {
  position: absolute;
  top: 100%;
  left: 4%;
  right: 4%;
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid rgba(122, 27, 46, 0.08);
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-links a {
  display: block;
  color: #333333 !important;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 12px;
  transition: 0.3s;
}

.mobile-nav-links a:hover {
  background: rgba(122, 27, 46, 0.05);
  color: #7a1b2e !important;
}

.mobile-only {
  display: none;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}

@media (max-width: 1024px) {
  .nav-links, .desktop-only {
    display: none;
  }
  
  .hamburger-btn, .mobile-only {
    display: flex;
  }

  .nav-container {
    padding: 0 24px;
    height: 75px;
  }

  .nav-wrapper.scrolled .nav-container {
    padding: 0 10px 0 24px;
  }
}

@media (max-width: 480px) {
  .brand-sub {
    display: none; 
  }
  .logo-render {
    height: 50px;
  }
  .contact-card.mobile-only {
    padding: 15px;
  }
}
</style>