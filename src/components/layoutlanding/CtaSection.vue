<template>
  <section class="cta-section section" id="pemesanan">
    <div class="container">
      <div class="cta-inner">
        <div class="sec-label">From now on</div>
        <h2 class="sec-title">
          Perform the Qurban Worship<br /><em>with Peace & Trust</em>
        </h2>
        <p class="sec-desc">
          Order your sacrificial animal now before we run out. We are ready to serve you
          wholeheartedly and responsibly.
        </p>
        <div class="cta-btns">
          <a href="#hewan" class="btn-primary btn-lg">Order Now</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,700;1,700&family=Poppins:wght@400;500;600&display=swap');

.cta-section {
  padding: 100px 0;
  background: #ffffff;
  border-top: 1px solid #f0eaea;
  border-bottom: 1px solid #f0eaea;
}
.cta-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}
.cta-inner {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
}

/* Label */
.sec-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7a1b2e;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: rgba(122, 27, 46, 0.08);
  border: 1px solid rgba(122, 27, 46, 0.2);
  padding: 4px 16px;
  border-radius: 50px;
  margin-bottom: 1.2rem;
}

/* Heading — Rubik 700 */
.sec-title {
  font-family: 'Rubik', sans-serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  color: #111111;
  line-height: 1.2;
  margin: 0 0 1.2rem;
}
.sec-title em {
  color: #7a1b2e;
  font-style: italic;
}

/* Desc — Poppins 14px */
.sec-desc {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto 2.5rem;
}

/* Buttons */
.cta-btns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Primary button — burgundy, Poppins 15px 600 */
.btn-primary {
  background: #7a1b2e;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 50px;
  display: inline-block;
  transition: background 0.2s, transform 0.15s;
}
.btn-primary:hover {
  background: #5d1423;
  transform: translateY(-2px);
}
.btn-lg {
  padding: 0.9rem 2.6rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section { padding: 60px 0; }
  .cta-section .container { padding: 0 20px; }
  .sec-title { font-size: clamp(24px, 6vw, 36px); }
  .btn-primary { width: 100%; max-width: 280px; text-align: center; }
}
</style>