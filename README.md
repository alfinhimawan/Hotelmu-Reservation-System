# Hotelmu 🌟

Hotelmu adalah aplikasi manajemen dan pemesanan hotel berbasis web yang terdiri dari backend (API), frontend admin, dan frontend customer. Project ini dirancang untuk memudahkan proses reservasi kamar hotel, pengelolaan data hotel, serta monitoring aktivitas pemesanan secara efisien.

## 🏗️ Struktur Project

- **backend/**: API berbasis Node.js, Express, dan Sequelize untuk mengelola data hotel, kamar, tipe kamar, user, customer, pemesanan, dan detail pemesanan.
- **frontend-admin/**: Frontend React untuk admin & resepsionis hotel, menyediakan fitur manajemen data dan monitoring pemesanan.
- **frontend-customer/**: Frontend React untuk customer, menyediakan fitur pencarian, pemesanan kamar, dan riwayat pemesanan.

## ✨ Fitur Utama

### Backend
- REST API untuk seluruh kebutuhan data hotel
- Autentikasi & otorisasi (JWT)
- Manajemen user (admin & resepsionis)
- Manajemen kamar, tipe kamar, customer, pemesanan, detail pemesanan
- Filter ketersediaan kamar berdasarkan tanggal

### Frontend Admin
- Login admin & resepsionis
- Dashboard monitoring data
- Manajemen data kamar, tipe kamar, user
- Monitoring & update status pemesanan

### Frontend Customer
- Registrasi & login customer
- Pencarian & filter kamar
- Pemesanan kamar online
- Riwayat & detail pemesanan

## ▶️ Cara Menjalankan

### 1. Clone repository
```bash
git clone <repository-url>
cd SembadaRooms
```

### 2. Setup Backend
```bash
cd backend
npm install

# Copy config example dan sesuaikan dengan database Anda
cp config/config.example.json config/config.json
# Edit config.json dengan kredensial MySQL Anda

# Jalankan migrasi database
npx sequelize-cli db:migrate

# Jalankan server
npm start
```

### 3. Setup Frontend Admin
```bash
cd frontend-admin
npm install
npm run dev
```

### 4. Setup Frontend Customer
```bash
cd frontend-customer
npm install
npm run dev
```

## 🛠️ Teknologi
- Node.js, Express, Sequelize, MySQL
- React, Vite, Tailwind CSS

## 📝 Catatan
- **PENTING**: Copy `backend/config/config.example.json` ke `backend/config/config.json` dan sesuaikan dengan database MySQL Anda
- Port default backend: 8081
- Frontend admin: http://localhost:5173
- Frontend customer: http://localhost:5174
- Folder `backend/image/` akan otomatis menyimpan upload gambar user

---

## 📄 Lisensi
Project ini belum memiliki lisensi open source. Jika ingin menggunakan, silakan tambahkan file LICENSE sesuai kebutuhan (misal: MIT, GPL, dsb).

---

**Hotelmu** dikembangkan untuk kebutuhan digitalisasi hotel modern, dengan fitur lengkap dan mudah digunakan baik untuk admin maupun customer.
