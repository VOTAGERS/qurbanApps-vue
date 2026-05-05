# Authentication & Role Management Documentation (Frontend)

Dokumentasi ini menjelaskan implementasi sisi klien untuk manajemen role dan akses menu.

## 1. State Management (Pinia)
File: `src/stores/auth.ts`

Store ini mengelola status autentikasi dan role pengguna.
*   **State**: `user`, `roles`, `token`.
*   **Getters**:
    *   `isAuthenticated`: Cek apakah token tersedia.
    *   `isCustomer`: Cek apakah user memiliki role `eQurban-Customer`.
    *   `isAdmin`: Cek apakah user memiliki role `eQurban-Admin`.
*   **Actions**:
    *   `setAuthData()`: Menyimpan data login ke state dan localStorage.
    *   `clearAuth()`: Menghapus data login (Logout).

---

## 2. Sidebar Menu Visibility
File: `src/components/layout/Sidebar.vue`

Menu dikelompokkan menggunakan tag `<template v-if="...">` berdasarkan role yang ada di `authStore`.

*   **Group Dashboard**: Memerlukan role `eQurban-Customer`.
*   **Group Management**: Memerlukan role `eQurban-Admin`.

*Catatan: Saat ini logika v-if dikomentari sementara selama masa pengembangan.*

---

## 3. Management Views

### Role Access View (`/admin/role-access`)
Digunakan untuk mengelola daftar role sistem (Master Data).
*   Fitur: CRUD Role (Name, Code, Status).
*   Catatan: `Role Code` tidak dapat diubah setelah dibuat karena digunakan sebagai referensi di tabel mapping.

### User Access View (`/admin/user-access`)
Digunakan untuk menghubungkan User dengan satu atau beberapa Role.
*   **Grouped View**: Menampilkan satu baris per user dengan deretan badge role yang dimiliki.
*   **Multi-Select**: Menggunakan checkbox list untuk memilih banyak role sekaligus dalam satu modal.
*   **Sync Operation**: Saat menyimpan, frontend mengirimkan seluruh role yang terpilih ke backend untuk disinkronisasi.

---

## 4. Dependencies
*   **SweetAlert2**: Digunakan untuk notifikasi sukses/gagal dan konfirmasi penghapusan data.
*   **Pinia**: Digunakan untuk manajemen state global (Auth).
