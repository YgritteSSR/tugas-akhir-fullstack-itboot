# tugas-akhir-fullstack-itboot
# tugas-akhir-fullstack-itboot
# Tugas Akhir Fullstack IT_BOOT

Aplikasi fullstack berbasis **React (frontend)** dan **ExpressJS + PostgreSQL (backend)**.  
Fitur utama: autentikasi user (login/register) dan CRUD item.

---

## 📂 Struktur Folder
- **backend/** → API server (ExpressJS)
  - `routes/` → definisi endpoint
  - `services/` → logika database
  - `index.js` → entry point server
- **frontend/** → aplikasi React
  - `src/components/` → komponen UI
  - `src/api/` → konfigurasi API
  - `App.js` → root aplikasi

---

## ⚙️ Fitur
- **Autentikasi**: Register, Login dengan JWT.
- **CRUD Items**: Tambah, edit, hapus, lihat item.
- **Protected Route**: Hanya user login yang bisa akses dashboard.
- **UI Modern**: React + TailwindCSS.

---

## 🚀 Cara Menjalankan

### 1. Backend
```bash
cd backend
npm install 

### buat file .env dengan isi:
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=12345
DB_NAME=pos_itcamp
DB_PORT=5432

# Server
PORT=3000

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=8107e88c663d0917fa20e892719711a108b4661f3a6d6456ef79feeecbaa3e54
JWT_EXPIRES=1h

###jalankan server
npm run dev #untuk frontend
node src/index.js #backend

###CRUD 
### Bisa diakses melalui akun admin yang sudah ada saat menjalankan server
Endpoint API (contoh)
POST /auth/register → Registrasi user baru

POST /auth/login → Login user, return JWT

GET /items → Ambil semua item (butuh token)

POST /items → Tambah item baru (butuh token)

PUT /items/:id → Edit item (butuh token)

DELETE /items/:id → Hapus item (butuh token)

###api login
POST /auth/login
Request:
{
  "email": "admin@example.com",
  "password": "12345"
}

Response:
{
  "token": "8107e88c663d0917fa20e892719711a108b4661f3a6d6456ef79feeecbaa3e54"
}


###Teknologi
Backend: Node.js, ExpressJS, PostgreSQL, JWT, Bcrypt

Frontend: React, Vite, TailwindCSS, Axios

Tools: VS Code, Git, Postman