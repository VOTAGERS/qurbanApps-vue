// ─── Navigasi ────────────────────────────────────────────────────────────────
export const navLinks = [
  { href: '#home',      id: 'home',      label: 'Home' },
  { href: '#hewan',     id: 'hewan',     label: 'Hewan' },
  { href: '#pemesanan', id: 'pemesanan', label: 'Pemesanan' },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const heroStats = [
  { value: '205K+', label: 'Pesanan' },
  { value: '100%',  label: 'Halal Syariah' },
  { value: '15+',   label: 'Tahun Amanah' },
]

export const heroCards = [
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

export const clientAvatars = [
  { initials: 'AF', color: '#ffd89b' },
  { initials: 'SR', color: '#c8e6c9' },
  { initials: 'BR', color: '#ffccbc' },
  { initials: 'DM', color: '#b3e5fc' },
]

// ─── About ────────────────────────────────────────────────────────────────────
export const aboutChecks = [
  'Hewan sehat bersertifikat dokter hewan',
  'Pemotongan oleh juru sembelih terlatih',
  'Laporan distribusi transparan dengan foto',
]

// ─── Why ──────────────────────────────────────────────────────────────────────
export const whyItems = [
  { num: '01', title: 'Seleksi Ketat Hewan',       desc: 'Setiap hewan diperiksa langsung oleh dokter hewan bersertifikat sebelum diterima.' },
  { num: '02', title: 'Pemotongan Sesuai Syariah',  desc: 'Tim juru sembelih terlatih dan bersertifikat MUI memastikan proses yang benar.' },
  { num: '03', title: 'Laporan Transparan',          desc: 'Anda menerima foto, video, dan laporan distribusi daging secara lengkap.' },
  { num: '04', title: 'Jangkauan Seluruh Indonesia', desc: 'Distribusi ke daerah pelosok dan penerima manfaat yang benar-benar membutuhkan.' },
]

// ─── Footer ───────────────────────────────────────────────────────────────────
export const socials = [
  { label: 'YouTube',   href: 'https://youtube.com',   icon: '▶' },
  { label: 'Instagram', href: 'https://instagram.com', icon: '◎' },
  { label: 'Twitter',   href: 'https://x.com',         icon: '𝕏' },
  { label: 'Facebook',  href: 'https://facebook.com',  icon: 'f' },
]

export const footerCols = [
  {
    title: 'Tautan',
    links: [
      { label: 'Beranda',      href: '#' },
      { label: 'Tentang Kami', href: '#tentang' },
      { label: 'Hewan Qurban', href: '#hewan' },
      { label: 'Galeri',       href: '#galeri' },
      { label: 'Kontak',       href: '#kontak' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Qurban Online',     href: '#' },
      { label: 'Qurban Institusi',  href: '#' },
      { label: 'Distribusi',        href: '#' },
      { label: 'Konsultasi',        href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
    ],
  },
]
