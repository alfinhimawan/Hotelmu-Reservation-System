# Frontend Admin - Hotelmu 🛎️

Folder ini berisi source code frontend untuk admin & resepsionis aplikasi Hotelmu.

## ✨ Fitur Utama
- Login admin & resepsionis
- Dashboard monitoring data hotel
- Manajemen data kamar, tipe kamar, user
- Monitoring & update status pemesanan
- Pagination, search, dan filter data

## 📁 Struktur Penting
- `src/pages/` : Halaman utama (Data Kamar, Data Tipe Kamar, Data User, Data Pemesanan, dsb)
- `src/components/` : Komponen UI modular (Table, Form, Navbar, Footer, dsb)
- `src/constants/` : Konstanta navigasi & dummy data
- `src/assets/` : Asset gambar & ikon

## ▶️ Cara Menjalankan
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## 📝 Catatan
- Pastikan backend sudah berjalan di port 5000
- Akses: http://localhost:5173 (default Vite)
- Hanya user dengan role admin/resepsionis yang dapat login ke dashboard ini.

---

## 📄 Lisensi
Project ini belum memiliki lisensi open source. Jika ingin menggunakan, silakan tambahkan file LICENSE sesuai kebutuhan (misal: MIT, GPL, dsb).
