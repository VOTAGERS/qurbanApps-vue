<template>
  <section class="why section">
    <div class="container">
      <div class="vid-frame">
        <video
          class="why-video"
          src="@/assets/image/video_ilm.mp4"
          autoplay
          loop
          muted
          playsinline
        ></video>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.why {
  padding: 60px 0;
  background: #ffffff;
}
.why .container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 3rem;
}
.vid-frame {
  border-radius: 20px;
  overflow: hidden;
  height: 420px;
  box-shadow: 0 24px 60px rgba(43, 13, 13, 0.16);
}
.why-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .why { padding: 40px 0; }
  .why .container { padding: 0 20px; }
  .vid-frame {
    height: 260px;
    border-radius: 14px;
  }
}
</style>