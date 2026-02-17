# 🚀 Deploy ke Vercel dengan Database

Panduan lengkap untuk mendeploy aplikasi **AYAM GEPREK SAMBAL IJO** ke Vercel dengan PostgreSQL database.

---

## 📋 Prerequisites

Sebelum memulai, pastikan Anda sudah memiliki:

- ✅ Akun [Vercel](https://vercel.com)
- ✅ Akun [GitHub](https://github.com) dengan repository `safir2310/ayamgeprek`
- ✅ [Bun](https://bun.sh) terinstall
- ✅ [Vercel CLI](https://vercel.com/cli) terinstall:
  ```bash
  npm install -g vercel
  ```

---

## 🔧 Langkah 1: Setup Lokal

### 1.1 Clone Repository (jika belum)

```bash
git clone https://github.com/safir2310/ayamgeprek.git
cd ayamgeprek
```

### 1.2 Install Dependencies

```bash
bun install
```

### 1.3 Setup Environment Variables Lokal

Buat file `.env` di root project:

```bash
cp .env.example .env
```

Untuk development lokal, Anda bisa menggunakan PostgreSQL lokal:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ayamgeprek"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 1.4 Generate Prisma Client

```bash
bun run prisma generate
```

### 1.5 Push Database Schema

```bash
bun run prisma db push
```

### 1.6 Jalankan Development Server

```bash
bun run dev
```

Buka http://localhost:3000

---

## 🌐 Langkah 2: Deploy ke Vercel

### 2.1 Login ke Vercel

```bash
vercel login
```

Ikuti instruksi untuk login menggunakan browser.

### 2.2 Import Project dari GitHub

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New"** → **"Project"**
3. Import repository `safir2310/ayamgeprek` dari GitHub
4. Vercel akan otomatis mendeteksi ini sebagai Next.js project

### 2.3 Konfigurasi Project

#### Framework Preset:
- **Framework**: Next.js
- **Build Command**: `bun run build`
- **Output Directory**: `.next`
- **Install Command**: `bun install`

#### Environment Variables:

Tambahkan environment variables di Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | (dari Vercel Postgres) | Koneksi database PostgreSQL |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | URL aplikasi |

**Cara menambahkan:**

1. Di project settings, klik **"Environment Variables"**
2. Tambahkan variable di atas
3. Klik **"Save"**

---

## 📦 Langkah 3: Setup Database di Vercel

### 3.1 Buat PostgreSQL Database

Ada 2 cara untuk membuat database di Vercel:

#### Opsi A: Menggunakan Vercel CLI (Recommended)

```bash
vercel postgres create
```

Anda akan diminta:
- Database name (misal: `ayamgeprek-db`)
- Region (pilih yang terdekat dengan users, biasanya `Singapore` untuk Indonesia)

Setelah selesai, **copy** `DATABASE_URL` yang ditampilkan.

#### Opsi B: Menggunakan Vercel Dashboard

1. Buka Vercel Dashboard
2. Pilih project `ayamgeprek`
3. Klik **"Storage"** tab
4. Klik **"Create Database"**
5. Pilih **"Postgres"**
6. Beri nama database
7. Pilih region (Singapore)
8. Klik **"Create"**

### 3.2 Add DATABASE_URL ke Environment Variables

Setelah database dibuat:

1. Klik database yang baru dibuat
2. Klik **".env"** tab
3. Copy semua environment variables
4. Paste ke project settings di **"Environment Variables"**
5. Pastikan variabel `DATABASE_URL` sudah ada
6. Klik **"Save"** dan **"Redeploy"**

### 3.3 Jalankan Database Migration

Vercel akan otomatis menjalankan migration saat deploy pertama karena kita menggunakan Prisma. Pastikan script di `package.json` sudah benar:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "db:push": "prisma db push"
  }
}
```

---

## 🚀 Langkah 4: Deploy Pertama

### 4.1 Deploy melalui Vercel CLI

```bash
vercel
```

Ikuti instruksi:
1. Link ke project yang sudah ada di Vercel
2. Vercel akan mendeploy secara otomatis

### 4.2 Deploy Production

```bash
vercel --prod
```

Atau push ke GitHub dan Vercel akan otomatis deploy:
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

---

## ✅ Langkah 5: Verifikasi Deployment

### 5.1 Cek Status Deploy

1. Buka Vercel Dashboard
2. Pilih project `ayamgeprek`
3. Cek tab **"Deployments"**
4. Pastikan statusnya **"Ready"** (hijau)

### 5.2 Test Aplikasi

1. Klik URL deployment (misal: `https://ayamgeprek.vercel.app`)
2. Test:
   - ✅ Homepage bisa diakses
   - ✅ Halaman login bisa diakses
   - ✅ Registrasi user bisa dilakukan
   - ✅ Data tersimpan di database

### 5.3 Cek Database Connection

Di Vercel Dashboard:
1. Buka tab **"Storage"**
2. Pilih database
3. Klik **"Data"** tab
4. Pastikan tabel sudah terbentur (User, Admin, Produk, dll)

---

## 🔄 Langkah 6: Setup CI/CD (Opsional tapi Recommended)

### 6.1 Enable Automatic Deployments

Vercel sudah otomatis setup CI/CD dengan GitHub:
- Setiap push ke `main` branch akan auto-deploy
- Pull request akan membuat preview deployment

### 6.2 Environment Variables untuk Production

Pastikan semua environment variables ada di:
- ✅ Production Environment
- ✅ Preview Environment
- ✅ Development Environment

---

## 🐛 Troubleshooting

### Error: "Database connection failed"

**Solution:**
1. Cek `DATABASE_URL` di environment variables
2. Pastikan database sudah aktif di Vercel
3. Redeploy project

### Error: "Prisma Client not generated"

**Solution:**
1. Pastikan script `postinstall` ada di `package.json`
2. Trigger redeploy dari Vercel Dashboard

### Error: "Build failed"

**Solution:**
1. Cek build logs di Vercel Dashboard
2. Pastikan `bun` terdeteksi (Vercel support Bun)
3. Cek dependency di `package.json`

### Migration tidak jalan

**Solution:**
1. Jalankan manual via Vercel CLI:
   ```bash
   vercel env pull .env.local
   bun run prisma db push
   ```

2. Atau gunakan Vercel Postgres Dashboard untuk execute SQL manually

---

## 📊 Monitoring

### Vercel Analytics

Vercel menyediakan analytics gratis:
- Page views
- Web Vitals
- Core Web Vitals
- Real User Monitoring

### Database Monitoring

Di Vercel Postgres:
- Query performance
- Connection pool
- Storage usage
- Backup status

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Jangan commit `.env` ke Git
- ✅ Gunakan `.env.example` sebagai template
- ✅ Add `.env` ke `.gitignore`

### 2. Database Security
- ✅ Gunakan Vercel Postgres (managed database)
- ✅ Enable connection pooling
- ✅ Regular backups (otomatis dari Vercel)
- ✅ Monitor query performance

### 3. API Routes
- ✅ Validasi semua input
- ✅ Gunakan rate limiting
- ✅ Implement authentication & authorization

---

## 📝 Environment Variables Reference

### Required Variables:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Authentication (Optional - untuk NextAuth)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
```

### Cara Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

---

## 🎯 Next Steps

Setelah deployment berhasil:

1. **Custom Domain** (Opsional)
   - Setup custom domain di Vercel
   - Configure DNS settings

2. **Analytics**
   - Setup Google Analytics
   - Integrate Vercel Analytics

3. **Monitoring**
   - Setup error tracking (Sentry)
   - Monitor uptime

4. **Performance**
   - Optimize images
   - Enable caching
   - Setup CDN

---

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with Vercel](https://vercel.com/guides/deploying-a-prisma-powered-api-with-vercel-and-postgres)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 💡 Tips

1. **Use Preview Deployments**: Setiap PR akan membuat preview URL
2. **Environment Branching**: Gunakan environment variables berbeda untuk staging
3. **Database Branching**: Vercel Postgres support database branching untuk testing
4. **Automated Backups**: Vercel Postgres otomatis backup daily

---

**Last Updated**: January 2024
**Framework**: Next.js 16 + Prisma + Vercel Postgres
