<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <a href="#" class="nav-logo">
      <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" class="nav-logo-img" />
    </a>
    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link.href">
        <a :href="link.href" :class="{ active: activeSection === link.id }">{{ link.label }}</a>
      </li>
    </ul>
    <a href="#hewan" class="nav-cta">Order Qurban</a>
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
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
}

.nav.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Logo image */
.nav-logo-img {
  height: 38px;
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
.nav-cta {
  background: #7a1b2e;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 0.55rem 1.4rem;
  border-radius: 50px;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.15s;
}
.nav-cta:hover {
  background: #5d1423;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav { padding: 0 20px; }
  .nav-links { display: none; }
  .nav-cta { font-size: 13px; padding: 0.5rem 1.1rem; }
  .nav-logo-img { height: 32px; }
}
</style>