# Backend - Hotelmu 🚀

Folder ini berisi source code backend (REST API) untuk aplikasi Hotelmu.

## ✨ Fitur Utama
- API manajemen user (admin, resepsionis)
- API manajemen kamar & tipe kamar
- API manajemen customer
- API pemesanan & detail pemesanan kamar
- Autentikasi JWT
- Filter ketersediaan kamar berdasarkan tanggal

## 📁 Struktur Penting
- `models/` : Model Sequelize untuk seluruh entitas
- `routes/` : Routing API (user, kamar, tipe kamar, pemesanan, dsb)
- `migrations/` : File migrasi database
- `config/config.json` : Konfigurasi database
- `image/` : Penyimpanan gambar user, customer, tipe kamar

## ▶️ Cara Menjalankan
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan migrasi database:
   ```bash
   npx sequelize-cli db:migrate
   ```
3. Jalankan server:
   ```bash
   npm start
   ```

## 📝 Catatan
- Pastikan database MySQL sudah berjalan dan konfigurasi sudah benar.
- Port default: 5000
- Semua endpoint membutuhkan autentikasi kecuali endpoint login/register.

---

## 📄 Lisensi
Project ini belum memiliki lisensi open source. Jika ingin menggunakan, silakan tambahkan file LICENSE sesuai kebutuhan (misal: MIT, GPL, dsb).
