<template>
  <section class="why section">
    <div class="container">
      <div class="why-grid">
        <div>
          <div class="sec-label">Mengapa Kami</div>
          <h2 class="sec-title">Mengapa Pilih <em>QurbanHub?</em></h2>
          <p class="sec-desc">Kami bukan sekadar penyedia hewan qurban — kami adalah mitra ibadah yang memastikan setiap proses berjalan amanah dan berkah.</p>
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
            <img
              src="https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&q=80"
              alt="Keunggulan QurbanHub"
            />
          </div>
          <div class="why-float-card">
            <div class="wfc-icon">☽</div>
            <div>
              <strong>100% Amanah</strong>
              <span>Terpercaya sejak 2009</span>
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
