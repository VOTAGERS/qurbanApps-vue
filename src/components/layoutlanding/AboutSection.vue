<template>
  <section class="why section" id="why-us">
    <div class="container">
      <div class="why-grid">
        <div class="why-img-wrap reveal">
          <div class="why-img-main floating-effect">
            <div class="image-inner">
              <img src="@/assets/image/ternak.jpeg" alt="Professional Qurban Service" />
            </div>

            <div class="why-float-card">
              <div class="wfc-icon">
                <i class="pi pi-shield"></i>
              </div>
              <div class="wfc-text">
                <strong>ILM Tours Pte. Ltd.</strong>
                <span>Trusted Qurban Partner</span>
              </div>
            </div>
          </div>
        </div>

        <div class="why-content reveal">
          <div class="sec-label">Why Us</div>
          <h2 class="sec-title">Trustworthy & Professional <em>Qurban Services</em></h2>

          <div class="sec-description-group">
            <p class="sec-desc">
              We are here to make your Qurban experience smooth and worry-free by providing
              carefully selected, healthy livestock that fulfil Islamic Shariah requirements,
              managed by an experienced and trusted partners around the world.
            </p>
            <p class="sec-desc">
              Every animal is sourced directly from reliable partners, examined to ensure its health
              and quality, and distributed transparently to eligible beneficiaries with proper
              documentation and updates throughout the process.
            </p>
          </div>

          <div class="why-checklist">
            <div class="check-item">
              <i class="pi pi-check-circle"></i>
              <span>Healthy livestock carefully selected</span>
            </div>
            <div class="check-item">
              <i class="pi pi-check-circle"></i>
              <span>Slaughter conducted by experienced personnel</span>
            </div>
            <div class="check-item">
              <i class="pi pi-check-circle"></i>
              <span>Full transparency with photo reports</span>
            </div>
            <div class="check-item">
              <i class="pi pi-check-circle"></i>
              <span>E-certificate provided upon completion of Qurban</span>
            </div>
            <div class="check-item">
              <i class="pi pi-check-circle"></i>
              <span>Managed in accordance with Islamic Shariah guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import 'primeicons/primeicons.css'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.15 },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,700&family=Poppins:wght@400;500;600;700&display=swap');

.why {
  padding: 120px 0;
  background: #ffffff;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.why-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 80px;
  align-items: center;
}
.why-img-wrap {
  position: relative;
  z-index: 10;
}

.why-img-main {
  position: relative;
  border-radius: 40px;
  padding: 15px;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  box-shadow:
    20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
}

.image-inner {
  border-radius: 30px;
  overflow: hidden;
  line-height: 0;
}

.image-inner img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}
.why-float-card {
  position: absolute;
  bottom: 30px;
  left: -30px; 
  background: #ffffff;
  padding: 20px 25px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 20px 40px rgba(122, 27, 46, 0.15);
  border-left: 5px solid #7a1b2e;
  z-index: 20;
}

.wfc-icon {
  width: 45px;
  height: 45px;
  background: rgba(122, 27, 46, 0.1);
  color: #7a1b2e;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 20px;
}

.wfc-text {
  display: flex;
  flex-direction: column;
}

.wfc-text strong {
  color: #111111;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
}

.wfc-text span {
  color: #7a1b2e;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.sec-label {
  display: inline-block;
  color: #7a1b2e;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: rgba(122, 27, 46, 0.05);
  padding: 8px 20px;
  border-radius: 50px;
  margin-bottom: 25px;
}

.sec-title {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(32px, 4vw, 45px);
  font-weight: 700;
  color: #111111;
  line-height: 1.1;
  margin-bottom: 30px;
}

.sec-title em {
  color: #7a1b2e;
  font-style: italic;
}

.sec-desc {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #444444; 
  line-height: 1.8;
  margin-bottom: 20px;
  font-weight: 400;
}

.why-checklist {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600; 
  color: #111111;
}

.check-item i {
  color: #7a1b2e;
  font-size: 20px;
}

.floating-effect {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 991px) {
  .why-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .why-img-wrap {
    max-width: 500px;
    margin: 0 auto;
  }

  .why-float-card {
    left: 10px;
    bottom: 10px;
  }

  .why-content {
    text-align: center;
    align-items: center;
  }

  .sec-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .why-checklist {
    align-items: flex-start;
    display: inline-flex;
  }
}
</style>
