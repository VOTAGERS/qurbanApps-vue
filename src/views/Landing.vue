<template>
  <div class="qh">
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <a href="#" class="nav-logo">Qurban<span>Hub</span></a>
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" :class="{ active: activeSection === link.id }">{{ link.label }}</a>
        </li>
      </ul>
      <a href="#pemesanan" class="nav-cta">Order Qurban</a>
    </nav>

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
    <section class="about section" id="tentang">
      <div class="container">
        <div class="about-grid">
          <div class="about-img-wrap reveal">
            <div class="about-img-main">
              <img src="https://images.unsplash.com/photo-1567450121568-88db45a4aaa5?w=700&q=80" alt="Hewan Qurban Pilihan" />
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
    <section class="categories section" id="hewan">
      <div class="container">
        <div class="sec-head-center">
          <div class="sec-label">Pilihan Qurban</div>
          <h2 class="sec-title">Kategori Hewan Qurban</h2>
          <p class="sec-desc">Pilih dari sapi dan kambing premium, semua sehat dan sesuai syariah</p>
        </div>
        <div class="cat-grid">
          <div
            v-for="item in categories"
            :key="item.title"
            class="cat-card reveal"
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
              <a href="#" class="cat-btn" :class="item.featured ? 'cat-btn-gold' : 'cat-btn-outline'">Pesan Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="why section">
      <div class="container">
        <div class="why-grid">
          <div>
            <div class="sec-label">Mengapa Kami</div>
            <h2 class="sec-title">Mengapa Pilih <em>QurbanHub?</em></h2>
            <p class="sec-desc">Kami bukan sekadar penyedia hewan qurban — kami adalah mitra ibadah yang memastikan setiap proses berjalan amanah dan berkah.</p>
            <div class="why-list">
              <div v-for="item in whyItems" :key="item.num" class="why-item reveal">
                <div class="why-num">{{ item.num }}</div>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="why-img-wrap reveal">
            <div class="why-img-main">
              <img src="https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&q=80" alt="Keunggulan QurbanHub" />
            </div>
            <div class="why-float-card">
              <div class="wfc-icon">☽</div>
              <div>
                <strong>100% Amanah</strong>
                <span>Terpercaya sejak 2009</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimony section" id="testimoni">
      <div class="container">
        <div class="sec-head-center">
          <div class="sec-label sec-label-light">Testimoni</div>
          <h2 class="sec-title sec-title-light">Kata Mereka <em>Tentang Kami</em></h2>
        </div>
        <div class="testi-grid">
          <div
            v-for="t in testimonials"
            :key="t.name"
            class="testi-card reveal"
            :class="{ feat: t.featured }"
          >
            <div class="testi-stars">★★★★★</div>
            <blockquote>"{{ t.quote }}"</blockquote>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.initials }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.city }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="events section" id="galeri">
      <div class="container">
        <div class="sec-head-center">
          <div class="sec-label">Kegiatan</div>
          <h2 class="sec-title">Berita & Kegiatan</h2>
          <p class="sec-desc">Ikuti perkembangan terbaru dari QurbanHub dan kegiatan sosial kami</p>
        </div>
        <div class="events-grid">
          <div v-for="ev in events" :key="ev.title" class="event-card reveal">
            <div class="event-thumb">
              <img :src="ev.img" :alt="ev.title" />
            </div>
            <div class="event-body">
              <div class="event-date">{{ ev.date }}</div>
              <h3><a href="#">{{ ev.title }}</a></h3>
              <p>{{ ev.excerpt }}</p>
              <a href="#" class="event-read">Baca Selengkapnya →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section section" id="pemesanan">
      <div class="container">
        <div class="cta-inner">
          <div class="sec-label sec-label-light" style="display:inline-flex; margin-bottom:1rem;">Mulai Sekarang</div>
          <h2 class="sec-title sec-title-light">Tunaikan Ibadah Qurban<br /><em>dengan Tenang & Amanah</em></h2>
          <p class="sec-desc sec-desc-light">Pesan hewan qurban Anda sekarang sebelum kehabisan. Kami siap melayani dengan sepenuh hati dan penuh tanggung jawab.</p>
          <div class="cta-btns">
            <a href="#" class="btn-gold btn-lg">Pesan Sekarang</a>
            <a href="#kontak" class="btn-ghost btn-lg">Hubungi Kami</a>
          </div>
        </div>
      </div>
    </section>

    <footer id="kontak">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">Qurban<span>Hub</span></div>
            <p>Mitra ibadah qurban Anda yang amanah, profesional, dan sesuai syariah Islam sejak 2009.</p>
            <div class="footer-socials">
              <a v-for="s in socials" :key="s.label" :href="s.href" :title="s.label">{{ s.icon }}</a>
            </div>
          </div>
          <div v-for="col in footerCols" :key="col.title" class="footer-col">
            <h5>{{ col.title }}</h5>
            <ul>
              <li v-for="link in col.links" :key="link.label">
                <a :href="link.href">{{ link.label }}</a>
              </li>
            </ul>
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

    <a href="#" class="gototop" @click.prevent="scrollTop">↑</a>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
const activeSection = ref('home')

const navLinks = [
  { href: '#home',     id: 'home',     label: 'Home' },
  { href: '#hewan',    id: 'hewan',    label: 'Hewan' },
  { href: '#galeri',   id: 'galeri',   label: 'Galeri' },
  { href: '#pemesanan',id: 'pemesanan',label: 'Pemesanan' },
  { href: '#testimoni',id: 'testimoni',label: 'Testimoni' },
  { href: '#kontak',   id: 'kontak',   label: 'Kontak' },
]
const heroStats = [
  { value: '205K+', label: 'Pesanan' },
  { value: '100%',  label: 'Halal Syariah' },
  { value: '15+',   label: 'Tahun Amanah' },
]

const heroCards = [
  {
    featured: true,
    label: 'Pilihan Utama',
    title: 'Kambing Qurban',
    sub: 'Untuk 1–2 orang · Sesuai syariah',
    price: 'Rp 2.800.000',
    priceSup: '/ekor',
    emoji: '🐐',
  },
  {
    featured: false,
    label: 'Berbagi Berkah',
    title: 'Sapi Qurban',
    sub: '1/7 Bagian · Hingga 7 orang',
    price: 'Rp 3.500.000',
    priceSup: '/bagian',
    emoji: '🐄',
  },
]

const clientAvatars = [
  { initials: 'AF', color: '#ffd89b' },
  { initials: 'SR', color: '#c8e6c9' },
  { initials: 'BR', color: '#ffccbc' },
  { initials: 'DM', color: '#b3e5fc' },
]

const aboutChecks = [
  'Hewan sehat bersertifikat dokter hewan',
  'Pemotongan oleh juru sembelih terlatih',
  'Laporan distribusi transparan dengan foto',
]

const categories = [
  {
    featured: true,
    title: 'Kambing Qurban',
    for: 'Untuk 1–2 Orang',
    price: 'Rp 2.800.000', priceSup: '/ekor',
    desc: 'Kambing sehat pilihan, usia cukup, memenuhi syarat syariah lengkap.',
    img: 'https://images.unsplash.com/photo-1533680979959-59b5bb4cd2de?w=400&q=80',
  },
  {
    featured: false,
    title: 'Sapi Qurban',
    for: '1/7 Bagian · Hingga 7 Orang',
    price: 'Rp 3.500.000', priceSup: '/bagian',
    desc: 'Sapi premium dengan berat optimal, diperiksa dokter hewan.',
    img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&q=80',
  },
  {
    featured: false,
    title: 'Sapi Utuh',
    for: '1 Ekor Penuh',
    price: 'Rp 24.500.000', priceSup: '/ekor',
    desc: 'Sapi utuh untuk satu keluarga atau institusi besar.',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80',
  },
  {
    featured: false,
    title: 'Kambing Premium',
    for: 'Bobot Ekstra Besar',
    price: 'Rp 4.200.000', priceSup: '/ekor',
    desc: 'Kambing berbadan besar pilihan, ideal untuk keluarga yang menginginkan yang terbaik.',
    img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80',
  },
]
const whyItems = [
  { num: '01', title: 'Seleksi Ketat Hewan', desc: 'Setiap hewan diperiksa langsung oleh dokter hewan bersertifikat sebelum diterima.' },
  { num: '02', title: 'Pemotongan Sesuai Syariah', desc: 'Tim juru sembelih terlatih dan bersertifikat MUI memastikan proses yang benar.' },
  { num: '03', title: 'Laporan Transparan', desc: 'Anda menerima foto, video, dan laporan distribusi daging secara lengkap.' },
  { num: '04', title: 'Jangkauan Seluruh Indonesia', desc: 'Distribusi ke daerah pelosok dan penerima manfaat yang benar-benar membutuhkan.' },
]
const testimonials = [
  {
    featured: false,
    quote: 'Sudah 5 tahun qurban via QurbanHub, selalu amanah dan laporan lengkap. Tidak perlu khawatir soal prosesnya.',
    name: 'Ahmad Fauzi', city: 'Jakarta Selatan', initials: 'AF',
  },
  {
    featured: true,
    quote: 'Hewan sehat, pemotongan syar\'i, distribusi merata. QurbanHub memudahkan ibadah kami sekeluarga dari perantauan.',
    name: 'Siti Rahma', city: 'Surabaya', initials: 'SR',
  },
  {
    featured: false,
    quote: 'Pesan online mudah, harga transparan, dapat video pemotongan. Sangat recommended untuk qurban online terpercaya.',
    name: 'Budi Santoso', city: 'Bandung', initials: 'BS',
  },
]
const events = [
  {
    date: '15 Februari 2025',
    title: 'Distribusi Qurban ke 500 Keluarga di Pelosok NTT',
    excerpt: 'Tim kami berhasil mendistribusikan daging qurban kepada ratusan keluarga di daerah terpencil Nusa Tenggara Timur.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
  },
  {
    date: '10 Januari 2025',
    title: 'QurbanHub Raih Penghargaan Layanan Qurban Terbaik 2024',
    excerpt: 'Penghargaan bergengsi ini menjadi bukti komitmen kami dalam memberikan pelayanan qurban yang amanah dan profesional.',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80',
  },
  {
    date: '20 Desember 2024',
    title: 'Tips Memilih Hewan Qurban yang Baik & Sesuai Syariah',
    excerpt: 'Panduan lengkap dari tim ahli kami tentang cara memilih hewan qurban sesuai syarat syariah Islam.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80',
  },
]
const socials = [
  { label: 'YouTube',   href: 'https://youtube.com',   icon: '▶' },
  { label: 'Instagram', href: 'https://instagram.com', icon: '◎' },
  { label: 'Twitter',   href: 'https://x.com',         icon: '𝕏' },
  { label: 'Facebook',  href: 'https://facebook.com',  icon: 'f' },
]

const footerCols = [
  {
    title: 'Tautan',
    links: [
      { label: 'Beranda',     href: '#' },
      { label: 'Tentang Kami',href: '#tentang' },
      { label: 'Hewan Qurban',href: '#hewan' },
      { label: 'Galeri',      href: '#galeri' },
      { label: 'Kontak',      href: '#kontak' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Qurban Online',    href: '#' },
      { label: 'Qurban Institusi', href: '#' },
      { label: 'Distribusi',       href: '#' },
      { label: 'Konsultasi',       href: '#' },
      { label: 'Kebijakan Privasi',href: '#' },
    ],
  },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  isScrolled.value = window.scrollY > 60
}
let observer = null

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.qh {
  --g1: #0d2b17;
  --g2: #1a4a2e;
  --g3: #245c39;
  --g4: #2e7a4a;
  --g5: #3d9e60;
  --gold:  #c8a84b;
  --gold2: #e6c97e;
  --cream: #f8f5ef;
  --white: #ffffff;
  --text:  #1a2e1e;
  --text2: #3a5240;
  --text3: #6b8070;
  --border:#d5e8da;
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  background: var(--cream);
  overflow-x: hidden;
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  height: 70px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 3rem;
  background: rgba(13, 43, 23, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(200, 168, 75, 0.2);
  transition: background 0.3s;
}
.nav.scrolled { background: rgba(6, 15, 8, 0.98); }

.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 700;
  color: #fff; text-decoration: none;
}
.nav-logo span { color: var(--gold); }

.nav-links {
  display: flex; list-style: none; gap: 0.15rem;
  margin: 0; padding: 0;
}
.nav-links a {
  color: rgba(255,255,255,.8); text-decoration: none;
  font-size: 0.81rem; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 0.45rem 0.85rem; border-radius: 6px;
  transition: color .2s, background .2s;
}
.nav-links a:hover,
.nav-links a.active { color: var(--gold); background: rgba(200,168,75,.12); }

.nav-cta {
  background: var(--gold); color: var(--g1);
  padding: 0.55rem 1.4rem; border-radius: 50px;
  font-size: 0.81rem; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
  text-decoration: none;
  transition: background .2s, transform .15s;
}
.nav-cta:hover { background: var(--gold2); transform: translateY(-1px); }
.hero {
  min-height: 100vh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center;
  background: linear-gradient(120deg, #081a0e 0%, #0d2b17 45%, #153c22 100%);
  position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 70% 30%, rgba(200,168,75,.07) 0%, transparent 45%),
    radial-gradient(circle at 10% 80%, rgba(61,158,96,.08) 0%, transparent 40%);
}
.hero-geo {
  position: absolute; right: 0; top: 0; bottom: 0;
  width: 55%;
  background: rgba(255,255,255,.025);
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
}
.hero-badge-float {
  position: absolute; top: 1.8rem; right: 5rem; z-index: 4;
  display: flex; align-items: center; gap: 0.75rem;
  background: var(--g1);
  border: 1px solid rgba(200,168,75,.45);
  border-radius: 14px; padding: 0.85rem 1.3rem;
  box-shadow: 0 12px 40px rgba(0,0,0,.4);
}
.badge-icon { font-size: 1.6rem; }
.hero-badge-float strong { display: block; font-size: .88rem; color: var(--gold); }
.hero-badge-float span  { font-size: .72rem; color: rgba(255,255,255,.55); }
.hero-left {
  position: relative; z-index: 2;
  padding: 140px 3rem 6rem 5rem;
  animation: fadeUp .7s ease both;
}
.hero-tag {
  display: inline-flex; align-items: center; gap: .5rem;
  background: rgba(200,168,75,.15); border: 1px solid rgba(200,168,75,.4);
  color: var(--gold2); font-size: .72rem;
  letter-spacing: .15em; text-transform: uppercase;
  padding: .35rem 1rem; border-radius: 50px; margin-bottom: 1.5rem;
}
.tag-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; }

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  font-weight: 700; color: #fff; line-height: 1.18;
  margin-bottom: .4rem;
}
.hero h1 em {
  display: block; font-style: italic; color: var(--gold);
}
.hero-sub {
  font-size: 1rem; color: rgba(255,255,255,.65);
  line-height: 1.75; max-width: 440px; margin: 1.2rem 0 2rem;
}
.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3.5rem; }

.hero-stats {
  display: flex; align-items: center; gap: 0;
  padding-top: 2rem; border-top: 1px solid rgba(255,255,255,.1);
}
.hero-stats-item { display: flex; align-items: center; }
.stat-sep { width: 1px; height: 44px; background: rgba(255,255,255,.15); margin: 0 2rem; }
.stat strong {
  font-family: 'Playfair Display', serif;
  font-size: 1.9rem; color: var(--gold); display: block;
}
.stat span {
  font-size: .72rem; color: rgba(255,255,255,.5);
  text-transform: uppercase; letter-spacing: .1em;
}
.hero-right {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; gap: 1.4rem;
  padding: 110px 4rem 4rem 2rem;
  animation: fadeUp .7s .2s ease both;
}
.hero-card {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px; padding: 1.8rem;
  position: relative; overflow: hidden; cursor: pointer;
  transition: background .2s;
}
.hero-card:hover { background: rgba(255,255,255,.1); }
.hero-card.gold-card {
  background: rgba(200,168,75,.12);
  border-color: rgba(200,168,75,.4);
}
.card-label {
  font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255,255,255,.5); margin-bottom: .4rem;
}
.hero-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem; color: #fff; font-weight: 600; margin-bottom: .25rem;
}
.card-sub { font-size: .82rem; color: rgba(255,255,255,.6); margin-bottom: 1rem; }
.card-price {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; color: var(--gold); font-weight: 600;
}
.card-price sup { font-size: .72rem; }
.card-btn {
  display: inline-block; margin-top: 1rem;
  background: var(--gold); color: var(--g1);
  padding: .5rem 1.3rem; border-radius: 50px;
  font-size: .78rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: .05em; text-decoration: none;
  transition: background .2s;
}
.hero-card.gold-card .card-btn { background: #fff; color: var(--g2); }
.card-btn:hover { background: var(--gold2); }
.card-animal {
  position: absolute; right: -8px; bottom: -8px;
  font-size: 4.5rem; opacity: .12; pointer-events: none;
}
.hero-clients {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: .8rem;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50px; padding: .55rem 1.4rem;
  white-space: nowrap; z-index: 3;
  animation: fadeUp .7s .5s ease both;
}
.client-avatars { display: flex; }
.client-avatars span {
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid var(--g1); margin-left: -8px;
  display: flex; align-items: center; justify-content: center;
  font-size: .62rem; font-weight: 700; color: var(--g1);
}
.client-avatars span:first-child { margin-left: 0; }
.hero-clients p { font-size: .78rem; color: rgba(255,255,255,.75); margin: 0; }
.hero-clients p strong { color: var(--gold2); }
.section { padding: 6rem 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }

.sec-label {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
  color: var(--g4); background: rgba(46,122,74,.1);
  border: 1px solid rgba(46,122,74,.25);
  padding: .3rem 1rem; border-radius: 50px; margin-bottom: .9rem;
}
.sec-label-light {
  color: var(--gold2); background: rgba(200,168,75,.15);
  border-color: rgba(200,168,75,.35);
}
.sec-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  font-weight: 700; color: var(--text); line-height: 1.25; margin-bottom: 1rem;
}
.sec-title em { color: var(--g3); font-style: italic; }
.sec-title-light { color: #fff; }
.sec-title-light em { color: var(--gold); }
.sec-desc { font-size: .97rem; color: var(--text3); line-height: 1.75; max-width: 520px; }
.sec-desc-light { color: rgba(255,255,255,.6); }
.sec-head-center { text-align: center; margin-bottom: 3.5rem; }
.sec-head-center .sec-title { text-align: center; }
.sec-head-center .sec-desc { margin: 0 auto; }
.about { background: var(--white); }
.about-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: center;
}
.about-img-wrap { position: relative; }
.about-img-main {
  border-radius: 24px; overflow: hidden; aspect-ratio: 4/5;
  box-shadow: 0 32px 80px rgba(13,43,23,.18);
}
.about-img-main img { width: 100%; height: 100%; object-fit: cover; }
.about-badge {
  position: absolute; bottom: -1.5rem; right: -1.5rem;
  background: var(--g1); color: var(--gold);
  padding: 1rem 1.5rem; border-radius: 16px;
  font-size: .87rem; font-weight: 600;
  border: 1px solid rgba(200,168,75,.4);
  box-shadow: 0 10px 30px rgba(0,0,0,.3);
}
.about-text p { color: var(--text3); line-height: 1.8; margin-bottom: 1rem; font-size: .96rem; }
.about-checks { display: flex; flex-direction: column; gap: .65rem; margin: 1.5rem 0 2rem; }
.check-item { display: flex; align-items: center; gap: .75rem; font-size: .9rem; color: var(--text2); }
.check-ic {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--g4); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: .65rem; font-weight: 700; flex-shrink: 0;
}
.categories { background: var(--cream); }
.cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.cat-card {
  background: var(--white); border-radius: 18px; overflow: hidden;
  border: 1.5px solid var(--border);
  transition: transform .25s, box-shadow .25s;
  position: relative;
}
.cat-card:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(13,43,23,.13); }
.cat-card.featured { border-color: var(--gold); border-width: 2px; }
.cat-ribbon {
  position: absolute; top: 1rem; right: 1rem; z-index: 1;
  background: var(--gold); color: var(--g1);
  font-size: .67rem; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; padding: .25rem .75rem; border-radius: 50px;
}
.cat-img { aspect-ratio: 4/3; overflow: hidden; }
.cat-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.cat-card:hover .cat-img img { transform: scale(1.07); }
.cat-body { padding: 1.3rem; }
.cat-body h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem; font-weight: 600; color: var(--text); margin-bottom: .2rem;
}
.cat-for { font-size: .74rem; color: var(--text3); letter-spacing: .07em; text-transform: uppercase; margin-bottom: .7rem; }
.cat-price {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem; color: var(--g4); font-weight: 600; margin-bottom: .7rem;
}
.cat-price sup { font-size: .68rem; }
.cat-body p { font-size: .83rem; color: var(--text3); line-height: 1.6; margin-bottom: 1rem; }
.cat-btn {
  display: block; text-align: center;
  padding: .65rem; border-radius: 50px;
  font-size: .8rem; font-weight: 600; letter-spacing: .05em;
  text-transform: uppercase; text-decoration: none; transition: all .2s;
}
.cat-btn-gold { background: var(--gold); color: var(--g1); }
.cat-btn-gold:hover { background: var(--gold2); }
.cat-btn-outline { border: 1.5px solid var(--g4); color: var(--g4); }
.cat-btn-outline:hover { background: var(--g4); color: #fff; }

.why { background: var(--white); }
.why-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 5rem; align-items: center; }
.why-list { display: flex; flex-direction: column; gap: 1.6rem; margin-top: 2rem; }
.why-item { display: flex; gap: 1.2rem; align-items: flex-start; }
.why-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem; color: var(--border); font-weight: 700;
  line-height: 1; min-width: 52px;
}
.why-item h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 600; color: var(--text); margin-bottom: .3rem;
}
.why-item p { font-size: .87rem; color: var(--text3); line-height: 1.65; margin: 0; }
.why-img-wrap { position: relative; }
.why-img-main {
  border-radius: 24px; overflow: hidden; aspect-ratio: 3/4;
  box-shadow: 0 32px 80px rgba(13,43,23,.18);
}
.why-img-main img { width: 100%; height: 100%; object-fit: cover; }
.why-float-card {
  position: absolute; bottom: 2.5rem; left: -2.5rem;
  background: var(--white); border: 1px solid var(--border);
  border-radius: 14px; padding: 1rem 1.3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.09);
  display: flex; align-items: center; gap: .9rem;
}
.wfc-icon { font-size: 2rem; }
.why-float-card strong { display: block; font-family: 'Playfair Display', serif; font-size: .95rem; color: var(--text); }
.why-float-card span { font-size: .75rem; color: var(--text3); }

.testimony {
  background: linear-gradient(140deg, #081a0e 0%, #0d2b17 60%, #0a2213 100%);
  padding: 6rem 0;
}
.testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.testi-card {
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 18px; padding: 2rem; transition: background .2s;
}
.testi-card:hover { background: rgba(255,255,255,.08); }
.testi-card.feat { background: rgba(200,168,75,.1); border-color: rgba(200,168,75,.3); }
.testi-stars { color: var(--gold); font-size: .85rem; letter-spacing: .08em; margin-bottom: 1rem; }
.testi-card blockquote {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: .93rem;
  color: rgba(255,255,255,.82); line-height: 1.8; margin-bottom: 1.5rem;
}
.testi-author { display: flex; align-items: center; gap: .75rem; }
.testi-avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--g3); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 600; font-size: .83rem;
  border: 2px solid rgba(200,168,75,.35); flex-shrink: 0;
}
.testi-author strong { display: block; font-size: .88rem; color: #fff; }
.testi-author span   { font-size: .75rem; color: rgba(255,255,255,.45); }

.events { background: var(--cream); }
.events-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.event-card {
  background: var(--white); border-radius: 18px; overflow: hidden;
  border: 1px solid var(--border);
  transition: transform .25s, box-shadow .25s;
}
.event-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(13,43,23,.1); }
.event-thumb { height: 200px; overflow: hidden; }
.event-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.event-card:hover .event-thumb img { transform: scale(1.07); }
.event-body { padding: 1.5rem; }
.event-date { font-size: .73rem; color: var(--g4); text-transform: uppercase; letter-spacing: .1em; font-weight: 600; }
.event-body h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; font-weight: 600; color: var(--text);
  line-height: 1.4; margin: .5rem 0 .75rem;
}
.event-body h3 a { color: inherit; text-decoration: none; transition: color .2s; }
.event-body h3 a:hover { color: var(--g4); }
.event-body p { font-size: .85rem; color: var(--text3); line-height: 1.65; margin-bottom: 1rem; }
.event-read { font-size: .83rem; color: var(--g4); font-weight: 600; text-decoration: none; transition: color .2s; }
.event-read:hover { color: var(--gold); }

.cta-section {
  padding: 8rem 0; text-align: center;
  background: linear-gradient(135deg, #081a0e, #1a4a2e 55%, #0d2b17);
  position: relative; overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 25% 50%, rgba(200,168,75,.07) 0%, transparent 50%),
    radial-gradient(circle at 75% 50%, rgba(61,158,96,.06) 0%, transparent 50%);
}
.cta-inner { position: relative; z-index: 2; max-width: 660px; margin: 0 auto; }
.cta-inner .sec-title { margin-bottom: 1.25rem; }
.cta-inner .sec-desc { max-width: 500px; margin: 0 auto 2.5rem; }
.cta-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

.btn-gold {
  background: var(--gold); color: var(--g1);
  text-decoration: none; padding: .85rem 2rem; border-radius: 50px;
  font-size: .88rem; font-weight: 600; letter-spacing: .05em;
  text-transform: uppercase; display: inline-block;
  transition: background .2s, transform .15s;
}
.btn-gold:hover { background: var(--gold2); transform: translateY(-2px); }
.btn-ghost {
  background: transparent; color: rgba(255,255,255,.85);
  text-decoration: none; padding: .85rem 2rem; border-radius: 50px;
  border: 1px solid rgba(255,255,255,.35);
  font-size: .88rem; font-weight: 500; letter-spacing: .05em;
  text-transform: uppercase; display: inline-block; transition: all .2s;
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(200,168,75,.08); }
.btn-lg { padding: 1rem 2.4rem; font-size: .95rem; }

footer { background: #060f08; padding: 5rem 0 2rem; }
.footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem; margin-bottom: 3rem;
}
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem;
}
.footer-logo span { color: var(--gold); }
.footer-brand p { font-size: .87rem; color: rgba(255,255,255,.5); line-height: 1.75; margin-bottom: 1.5rem; }
.footer-socials { display: flex; gap: .6rem; }
.footer-socials a {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.6); text-decoration: none;
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; transition: all .2s;
}
.footer-socials a:hover { background: var(--gold); color: var(--g1); border-color: var(--gold); }
.footer-col h5 {
  font-size: .72rem; font-weight: 700; color: #fff;
  text-transform: uppercase; letter-spacing: .14em; margin-bottom: 1.2rem;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col li { margin-bottom: .55rem; }
.footer-col a { font-size: .87rem; color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
.footer-col a:hover { color: var(--gold); }
.footer-contact li { font-size: .87rem; color: rgba(255,255,255,.5); line-height: 1.6; margin-bottom: .55rem; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.08); padding-top: 2rem;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem;
  font-size: .8rem; color: rgba(255,255,255,.3);
}

.gototop {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 100;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--g2); border: 1px solid rgba(200,168,75,.4);
  color: var(--gold); text-decoration: none;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; box-shadow: 0 4px 16px rgba(0,0,0,.3);
  transition: all .2s;
}
.gototop:hover { background: var(--gold); color: var(--g1); transform: translateY(-2px); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
  .hero-right { display: none; }
  .hero-left { padding: 130px 2rem 5rem; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid, .why-grid { grid-template-columns: 1fr; gap: 3rem; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .testi-grid, .events-grid { grid-template-columns: 1fr; }
  .cat-grid { grid-template-columns: 1fr; }
  .hero-badge-float, .why-float-card { display: none; }
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>