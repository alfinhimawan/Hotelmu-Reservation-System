# Hotelmu 🌟

Hotelmu adalah aplikasi manajemen dan pemesanan hotel berbasis web yang terdiri dari backend (API), frontend admin, dan frontend customer. Project ini dirancang untuk memudahkan proses reservasi kamar hotel, pengelolaan data hotel, serta monitoring aktivitas pemesanan secara efisien.

## 🛠️ Teknologi
- Node.js, Express, Sequelize, MySQL
- React, Vite, Tailwind CSS
- SweetAlert2 untuk modern alerts
- Axios untuk HTTP requests
- JWT untuk autentikasi

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

## � API Configuration

Semua file frontend sudah dikonfigurasi untuk menggunakan **centralized API configuration** melalui environment variables. Ini memudahkan perubahan API URL untuk berbagai environment (dev, staging, production).

### Setup Environment Variables

Setiap frontend memiliki file `.env` dengan default:
```env
VITE_API_BASE_URL=http://localhost:5000
```

**Untuk environment berbeda, edit file `.env`:**

```bash
# Development
VITE_API_BASE_URL=http://localhost:5000

# Staging
VITE_API_BASE_URL=https://staging-api.example.com

# Production
VITE_API_BASE_URL=https://api.example.com
```

### Struktur API Configuration

Semua API endpoints dipusat di file `src/constants/api.js`:

**Frontend Admin - API Endpoints:**
```javascript
API_ENDPOINTS.AUTH
API_ENDPOINTS.USER
API_ENDPOINTS.KAMAR
API_ENDPOINTS.TIPE_KAMAR
API_ENDPOINTS.PEMESANAN
API_ENDPOINTS.DETAIL_PEMESANAN
API_ENDPOINTS.IMAGE_TIPE_KAMAR
API_ENDPOINTS.IMAGE_USER
API_ENDPOINTS.IMAGE_CUSTOMER
```

**Frontend Customer - API Endpoints:**
```javascript
API_ENDPOINTS.AUTH
API_ENDPOINTS.CUSTOMER
API_ENDPOINTS.TIPE_KAMAR
API_ENDPOINTS.PEMESANAN
API_ENDPOINTS.FILTER_KAMAR
API_ENDPOINTS.IMAGE_TIPE_KAMAR
```

### Cara Menggunakan API Endpoints

**Dengan API_ENDPOINTS (DIREKOMENDASIKAN):**
```jsx
import { API_ENDPOINTS } from '../../constants/api';

axios.post(API_ENDPOINTS.AUTH, data)

axios.get(`${API_ENDPOINTS.USER}/${id}`)
axios.put(`${API_ENDPOINTS.KAMAR}/${id}`, data)
```

### Environment Variable Priority

1. **System Environment Variable** - Jika di-set saat startup
   ```bash
   VITE_API_BASE_URL=https://api.com npm run dev
   ```

2. **File `.env`** - Default fallback

3. **Hardcoded Default** - `http://localhost:5000` (jika tidak ada di `.env`)

### Keuntungan Setup Ini

✅ **Centralized** - Semua API URL di satu file  
✅ **Easy Deployment** - Mudah switch environment tanpa edit code  
✅ **Secure** - Tidak expose URL ke version control  
✅ **Maintainable** - Update URL di satu file untuk seluruh aplikasi  
✅ **Production Ready** - Sesuai industry best practices  

## 📨 Response Message Structure

Semua API response menggunakan struktur pesan yang konsisten untuk keperluan notifikasi di frontend:

### Success Response
```json
{
  "message": "Selesai Menambahkan Data Baru",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Nama pengguna sudah ada",
  "error": "..."
}
```

### Frontend Implementation
Frontend menggunakan `response.data.message` dari backend untuk menampilkan pesan SweetAlert2:

```jsx
.then((response) => {
  if (response.status === 200 || response.status === 201) {
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: response.data.message || "Operasi berhasil",
      confirmButtonColor: "#3085d6",
    });
  }
})
.catch((error) => {
  Swal.fire({
    icon: "error",
    title: "Gagal!",
    text: error.response?.data?.message || "Terjadi kesalahan",
    confirmButtonColor: "#3085d6",
  });
});
```

## 📝 Catatan
- **PENTING**: Copy `backend/config/config.example.json` ke `backend/config/config.json` dan sesuaikan dengan database MySQL Anda
- Port default backend: 5000
- Frontend admin: http://localhost:5173
- Frontend customer: http://localhost:5174
- Folder `backend/image/` akan otomatis menyimpan upload gambar user

---

## 📄 Lisensi
Project ini belum memiliki lisensi open source. Jika ingin menggunakan, silakan tambahkan file LICENSE sesuai kebutuhan (misal: MIT, GPL, dsb).

---

**Hotelmu** dikembangkan untuk kebutuhan digitalisasi hotel modern, dengan fitur lengkap dan mudah digunakan baik untuk admin maupun customer.
