<template>
  <footer id="kontak" class="footer-luxury">
    <div class="arabic-pattern-overlay"></div>

    <div class="container">
      <div class="footer-grid">
        
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="@/assets/image/llmqurban.png" alt="ILM Qurban" />
            <!-- <span class="sub-brand">by Shameem Sultanah</span> -->
          </div>
          <p class="footer-tagline">
            Your trusted, professional and Islamically-compliant qurban partner.
          </p>
          <div class="footer-socials">
            <a v-for="s in socials" 
               :key="s.label" 
               :href="s.href" 
               :title="s.label"
               target="_blank">
               <i :class="s.icon"></i>
            </a>
          </div>
        </div>

        <div class="footer-col footer-address">
          <h5 class="footer-title">Address</h5>
          <ul class="address-list">
            <li class="emphasize">ILM Tours Pte. Ltd.</li>
            <li class="person">Shameem Sultanah</li>
            <li class="map-link">
              80 Changi Road Centropod@Changi #04-02<br />
              Singapore 419715
            </li>
            <li class="contact-link">
              <i class="pi pi-phone gold-text"></i>
              <a href="tel:+6588020744">(+65) 8802 0744</a>
            </li>
            <li class="contact-link">
              <i class="pi pi-envelope gold-text"></i>
              <a href="mailto:admin@shameemsultanah.com">admin@shameemsultanah.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 - ILM Tours Pte. Ltd. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { socials } from '@/data/staticData.js'
</script>

<style scoped>
/* ── Layout Dasar ── */
.footer-luxury {
  background: #1a060a; /* Deep Burgundy */
  color: #ffffff;
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.arabic-pattern-overlay {
  position: absolute;
  inset: 0;
  background-image: url('https://www.transparenttextures.com/patterns/arabesque.png');
  opacity: 0.05;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

/* ── Grid System Responsif ── */
.footer-grid {
  display: grid;
  /* Desktop: 2 Kolom (1.5 berbanding 1) */
  grid-template-columns: 1.5fr 1fr;
  gap: 50px;
  margin-bottom: 50px;
}

/* ── Brand & Logo ── */
.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.footer-logo img {
  max-width: 180px; /* Ukuran maksimal logo agar tidak kegedean */
  height: auto;
  filter: brightness(0) invert(1); /* Putihkan logo */
  margin-bottom: 8px;
}

.sub-brand {
  color: #c8a355; /* Gold */
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}

.footer-tagline {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 25px;
}

/* ── Ikon Media Sosial ── */
.footer-socials {
  display: flex;
  gap: 12px;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(200, 163, 85, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c8a355;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-socials a:hover {
  background: #c8a355;
  color: #1a060a;
  transform: translateY(-3px);
}

/* ── Address Column ── */
.footer-title {
  font-family: 'Rubik', sans-serif;
  font-size: 20px;
  color: #c8a355;
  margin-bottom: 25px;
}

.address-list {
  list-style: none;
  padding: 0;
}

.address-list li {
  margin-bottom: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.emphasize { font-weight: 700; color: #fff; font-size: 16px; }
.person { color: #c8a355; font-weight: 500; }

.gold-text { color: #c8a355; margin-right: 8px; }

.contact-link a {
  color: inherit;
  text-decoration: none;
}

.contact-link a:hover { color: #c8a355; }

/* ── Copyright ── */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 25px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

/* ── BREAKPOINTS (Kunci Responsif) ── */

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr; /* Jadi 1 kolom di Tablet ke bawah */
    gap: 40px;
    text-align: center; /* Teks jadi rata tengah */
  }

  .footer-logo, .footer-socials {
    align-items: center;
    justify-content: center;
  }

  .footer-tagline {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 480px) {
  .footer-luxury { padding: 60px 0 20px; }
  .footer-logo img { max-width: 150px; }
  .footer-title { margin-bottom: 15px; }
}
</style>