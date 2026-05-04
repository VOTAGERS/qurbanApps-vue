<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <a href="#" class="nav-logo">Qurban<span>Hub</span></a>
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
