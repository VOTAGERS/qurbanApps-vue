<template>
  <section class="why section">
    <div class="container">
      <div class="why-grid">
        <div>
          <div class="sec-label">Why Us</div>
          <h2 class="sec-title">Why Choose  <em>QurbanHub?</em></h2>
          <p class="sec-desc">We are not just a provider of sacrificial animals — we are a worship partner who ensures that every process is carried out in a trustworthy and blessed manner.</p>
          <div class="why-list">
            <div v-for="item in whyItems" :key="item.num" class="why-item reveal">
              <div class="why-num">{{ item.num }}</div>
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="why-img-wrap reveal">
          <div class="why-img-main">
            <img src="@/assets/image/why_img.png"
              alt="Keunggulan QurbanHub"
            />
          </div>
          <div class="why-float-card">
            <div class="wfc-icon">☽</div>
            <div>
              <strong>100% Trustworthy</strong>
              <!-- <span>Terpercaya sejak 2009</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { whyItems } from '@/data/staticData.js'
</script>
