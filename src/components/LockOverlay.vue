<template>
  <div class="lock-overlay">
    <div class="lock-box">
      <div class="lock-icon">PERINGATAN</div>
      <h2>Site Sedang Dikunci</h2>
      <p>
        Masa preview <strong>3 hari</strong> telah berakhir.<br>
        Silakan lakukan pelunasan untuk mengaktifkan kembali.
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  daysLeft: { type: Number, default: 0 }
})
</script>

<style scoped>
.lock-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lock-box {
  background: #fff;
  border-radius: 16px;
  padding: 40px 32px;
  max-width: 360px;
  width: 90%;
  text-align: center;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
}
.lock-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
h2 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #111;
}
p {
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 0;
}
a {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #25D366;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
}
a:hover {
  background: #1ebe5d;
}
</style>