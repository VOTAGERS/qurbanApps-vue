<template>
  <div class="qh">

    <AppNav :is-scrolled="isScrolled" :active-section="activeSection" />

    <HeroSection />

    <AboutSection />

    <CategoriesSection
      :categories="categories"
      :loading="loading"
      :error="error"
      @retry="fetchCategories"
    />

    <WhySection />

    <CtaSection />

    <AppFooter />

    <a href="#" class="gototop" @click.prevent="scrollTop">↑</a>

  </div>
</template>

<script setup>
import { useScroll }     from '@/composables/useScroll.js'
import { useReveal }     from '@/composables/useReveal.js'
import { useCategories } from '@/composables/useCategories.js'

import AppNav            from '@/components/layoutlanding/AppNav.vue'
import HeroSection       from '@/components/layoutlanding/HeroSection.vue'
import AboutSection      from '@/components/layoutlanding/AboutSection.vue'
import CategoriesSection from '@/components/layoutlanding/CategoriesSection.vue'
import WhySection        from '@/components/layoutlanding/WhySection.vue'
import CtaSection        from '@/components/layoutlanding/CtaSection.vue'
import AppFooter         from '@/components/layoutlanding/AppFooter.vue'

import { onMounted } from 'vue'
const { isScrolled, activeSection, scrollTop } = useScroll()
const { observeNew }                           = useReveal()
const { categories, loading, error, fetchCategories } = useCategories()
onMounted(() => {
  fetchCategories()
})
</script>
