<template>
  <div class="qh">
    <LockOverlay v-if="isLocked" :days-left="daysLeft" />
    <AppNav :is-scrolled="isScrolled" :active-section="activeSection" />
    <HeroSection />
    <AboutSection />
    <CategoriesSection
      :categories="categories"
      :loading="loading"
      :error="error"
      @retry="fetchCategories"
    />
    <!-- <WhySection /> -->
     <VideoSection/>
    <CtaSection />
    <AppFooter />
    <a href="#" class="gototop" @click.prevent="scrollTop">↑</a>
  </div>
</template>

<script setup>
import { onMounted }     from 'vue'
import { useScroll }     from '@/composables/useScroll.js'
import { useReveal }     from '@/composables/useReveal.js'
import { useCategories } from '@/composables/useCategories.js'
import { useLockStatus } from '@/composables/useLockStatus.js'
import AppNav            from '@/components/layoutlanding/AppNav.vue'
import HeroSection       from '@/components/layoutlanding/HeroSection.vue'
import AboutSection      from '@/components/layoutlanding/AboutSection.vue'
import CategoriesSection from '@/components/layoutlanding/CategoriesSection.vue'
import WhySection        from '@/components/layoutlanding/WhySection.vue'
import CtaSection        from '@/components/layoutlanding/CtaSection.vue'
import AppFooter         from '@/components/layoutlanding/AppFooter.vue'
import LockOverlay       from '@/components/LockOverlay.vue'
import VideoSection from '@/components/layoutlanding/VideoSection.vue'

const { isScrolled, activeSection, scrollTop } = useScroll()
const { observeNew }                           = useReveal()
const { categories, loading, error, fetchCategories } = useCategories()
const { isLocked, daysLeft }                   = useLockStatus('IL-QURBAN')

onMounted(() => {
  fetchCategories()
})
</script>