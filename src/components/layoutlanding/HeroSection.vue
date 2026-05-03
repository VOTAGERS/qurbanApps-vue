<template>
  <header class="hero" id="home">
    <div class="hero-geo"></div>

    <div class="hero-badge-float">
      <div class="badge-icon">☽</div>
      <div>
        <strong>Halal Certified</strong>
        <span>Halal & Syariah</span>
      </div>
    </div>

    <div class="hero-left">
      <div class="hero-tag">
        <span class="tag-dot"></span>
        Shameem Sultanah
      </div>
      <h1>Qurban Premium<em>Sharia compliant</em></h1>
      <p class="hero-sub">
        We provide healthy, carefully selected cows and goats with transparent pricing and seamless distribution.
      </p>
      <div class="hero-btns">
        <a href="#pemesanan" class="btn-gold">Pesan Qurban</a>
        <a href="#hewan" class="btn-ghost">Lihat Hewan</a>
      </div>
      <div class="hero-stats">
        <div v-for="(stat, i) in heroStats" :key="i" class="hero-stats-item">
          <div v-if="i > 0" class="stat-sep"></div>
          <div class="stat">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <div
        v-for="(card, i) in heroCards"
        :key="i"
        class="hero-card"
        :class="{ 'gold-card': card.featured }"
      >
        <div class="card-label">{{ card.label }}</div>
        <h3>{{ card.title }}</h3>
        <div class="card-sub">{{ card.sub }}</div>
        <div class="card-price">{{ card.price }}<sup>{{ card.priceSup }}</sup></div>
        <a href="#pemesanan" class="card-btn">Pesan Sekarang</a>
        <div class="card-animal">{{ card.emoji }}</div>
      </div>
    </div>

    <div class="hero-clients">
      <div class="client-avatars">
        <span v-for="c in clientAvatars" :key="c.initials" :style="{ background: c.color }">{{ c.initials }}</span>
      </div>
      <p><strong>205.000+</strong> pelanggan puas dari seluruh Indonesia</p>
    </div>
  </header>
</template>

<script setup>
import { heroStats, heroCards, clientAvatars } from '@/data/staticData.js'
</script>
