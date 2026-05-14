<template>
  <footer id="kontak">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" />
          </div>
          <p>Your trusted, professional and Islamically-compliant qurban worship partner</p>
          <div class="footer-socials">
            <a v-for="s in socials" :key="s.label" :href="s.href" :title="s.label">{{ s.icon }}</a>
          </div>
        </div>
        <div class="footer-col footer-contact">
          <h5>Kontak</h5>
          <ul>
            <li>ILM Tours Pte. Ltd.<br />Shameem Sultanah</li>
            <li>80 Changi Road Centropod@Changi #04-01 Singapore 419715</li>
            <li><a href="tel:+6281234567890">(+65) 8802 0744</a></li>
            <li><a href="mailto:admin@shameemsultanah.com">admin@shameemsultanah.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2026 - ILM Tours Pte. Ltd.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { socials, footerCols } from '@/data/staticData.js'
</script>

<style scoped>
.footer-logo {
  margin-bottom: 16px;
}

.footer-logo img {
  height: 150px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
</style>