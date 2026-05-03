# QurbanHub Frontend Documentation

Dokumentasi ini merangkum perubahan signifikan pada struktur kode (refactor) yang dilakukan untuk standarisasi path, modularisasi rute, dan optimalisasi manajemen aset.

## 1. Standarisasi Path & Rekonsiliasi Stash
Dilakukan penyesuaian folder untuk konsistensi antara branch utama dan pembaruan fitur:
- **Folder Views**: Semua halaman dashboard dipindahkan ke `src/views/admin/`.
- **Integritas Data**: Mengembalikan aset foto user (`public/assets/images/user/`) yang sebelumnya sempat terhapus di stash agar profil tetap tampil.

## 2. Modularisasi Routing
Pemisahan konfigurasi rute untuk mencegah *merge conflict* dan mempermudah pengembangan tim:
- **`src/router/routes/admin.ts`**: File baru yang khusus menampung rute-rute area admin/dashboard.
- **`src/router/index.ts`**: Kini lebih bersih, hanya berfungsi sebagai entry point utama yang mengimpor modul rute admin dan publik.

## 3. Sistem Manajemen Aset Modular (Premium Refactor)
Ini adalah perubahan terbesar untuk mengatasi konflik tampilan antara template **Admin** dan **Landing Page**.

### A. Konfigurasi Aset (`src/router/config/assets.ts`)
Pusat pengaturan file CSS dan JS yang dikelompokkan per modul (`admin` & `public`).
- **CDN Integration**: Menggunakan CDN (jsdelivr, cdnjs, Google Fonts) untuk library populer guna meningkatkan kecepatan download dan caching.
- **Priority Loading**: Setiap script memiliki nilai `priority` untuk memastikan library dasar (seperti jQuery/Popper) dimuat sebelum plugin pendukungnya.

### B. Composable Loader (`src/composables/useAssetLoader.ts`)
Fungsi cerdas untuk mengelola siklus hidup aset:
- **Dynamic Injection**: Memasukkan tag `<link>` dan `<script>` ke DOM hanya saat modul tersebut aktif.
- **Automatic Cleanup**: Menghapus aset dari modul sebelumnya saat berpindah halaman untuk mencegah tabrakan style (style leakage).
- **Parallel Loading**: Mendownload aset dalam satu batch secara bersamaan untuk meminimalkan waktu tunggu.

### C. Layout-Based Assets
- **`AdminLayout.vue`**: Menggunakan `useAssetLoader('admin')` untuk memuat tema dashboard.
- **`PublicLayout.vue`**: Menggunakan `useAssetLoader('public')` untuk memuat tema Landing Page (Tasty Template).
- **Loading Overlay**: Menambahkan spinner transisi saat aset sedang dimuat untuk mencegah lonjakan tampilan yang tidak rapi (FOUC).

## 4. Pembersihan `index.html`
- File `index.html` telah dibersihkan dari semua script dan style template yang bersifat keras (*hardcoded*).
- Sekarang hanya berisi elemen dasar dan font Roboto, membuat proses inisialisasi aplikasi lebih ringan.

---
*Dibuat oleh: Antigravity AI Assistant*
*Terakhir Diperbarui: 3 Mei 2026*
