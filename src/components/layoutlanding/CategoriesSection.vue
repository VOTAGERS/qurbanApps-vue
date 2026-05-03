<template>
  <section class="categories section" id="hewan">
    <div class="container">
      <div class="sec-head-center">
        <div class="sec-label">Pilihan Qurban</div>
        <h2 class="sec-title">Kategori Hewan Qurban</h2>
        <p class="sec-desc">Pilih dari sapi dan kambing premium, semua sehat dan sesuai syariah</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="cat-loading">
        <div v-for="n in 4" :key="n" class="cat-skeleton"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="cat-error">
        <p>⚠️ {{ error }}</p>
        <button class="retry-btn" @click="$emit('retry')">Coba Lagi</button>
      </div>

      <!-- Data -->
      <div v-else class="cat-grid">
        <div
          v-for="item in categories"
          :key="item.id"
          class="cat-card cat-card-anim"
          :class="{ featured: item.featured }"
        >
          <div v-if="item.featured" class="cat-ribbon">Populer</div>
          <div class="cat-img">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="cat-body">
            <h3>{{ item.title }}</h3>
            <div class="cat-for">{{ item.for }}</div>
            <div class="cat-price">{{ item.price }}<sup>{{ item.priceSup }}</sup></div>
            <p>{{ item.desc }}</p>
            <a
              href="#"
              class="cat-btn"
              :class="item.featured ? 'cat-btn-gold' : 'cat-btn-outline'"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: { type: Array,   default: () => [] },
  loading:    { type: Boolean, default: true },
  error:      { type: String,  default: null },
})
defineEmits(['retry'])
</script>
