<template>
  <footer id="kontak">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Qurban<span>Hub</span></div>
          <p>Your trusted, professional and Islamically-compliant qurban worship partner</p>
          <div class="footer-socials">
            <a v-for="s in socials" :key="s.label" :href="s.href" :title="s.label">{{ s.icon }}</a>
          </div>
        </div>
        <div class="footer-col footer-contact">
          <h5>Kontak</h5>
          <ul>
            <li>Jl. Qurban Berkah No. 99,<br />Jakarta Selatan 12560</li>
            <li><a href="tel:+6281234567890">+62 812 3456 7890</a></li>
            <li><a href="mailto:info@qurbanhub.my.id">info@qurbanhub.my.id</a></li>
            <li><a href="https://www.qurbanhub.my.id">www.qurbanhub.my.id</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 QurbanHub. Seluruh hak dilindungi.</p>
        <p>Dibuat dengan ♥ untuk umat Islam Indonesia</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { socials, footerCols } from '@/data/staticData.js'
</script>
