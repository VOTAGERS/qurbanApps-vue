<template>
  <section class="about section" id="tentang">
    <div class="container">
      <div class="about-grid">
        <div class="about-img-wrap reveal">
          <div class="about-img-main">
            <img
              src="https://images.unsplash.com/photo-1567450121568-88db45a4aaa5?w=700&q=80"
              alt="Hewan Qurban Pilihan"
            />
          </div>
          <div class="about-badge">✦ &nbsp;Bersertifikat MUI & Halal</div>
        </div>
        <div class="about-text reveal">
          <div class="sec-label">Tentang Kami</div>
          <h2 class="sec-title">Layanan Qurban <em>Amanah</em> & Profesional</h2>
          <p>Kami hadir untuk memudahkan ibadah qurban Anda dengan menyediakan hewan ternak pilihan yang sehat, sesuai standar syariah Islam, dan dikelola oleh tim profesional berpengalaman.</p>
          <p>Setiap hewan dikurasi langsung dari peternak terpercaya, diperiksa dokter hewan, dan didistribusikan secara transparan kepada yang berhak menerimanya.</p>
          <div class="about-checks">
            <div v-for="item in aboutChecks" :key="item" class="check-item">
              <div class="check-ic">✓</div>
              <span>{{ item }}</span>
            </div>
          </div>
          <a href="#" class="btn-gold">Sejarah Kami</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { aboutChecks } from '@/data/staticData.js'
</script>
