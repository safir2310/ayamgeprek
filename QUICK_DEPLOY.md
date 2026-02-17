# 🚀 Quick Start - Deploy ke Vercel

Cara cepat untuk mendeploy **AYAM GEPREK SAMBAL IJO** ke Vercel dengan database.

---

## 📋 Prerequisites

- Akun [Vercel](https://vercel.com)
- Akun [GitHub] dengan repository `safir2310/ayamgeprek`
- [Vercel CLI](https://vercel.com/cli): `npm install -g vercel`

---

## 🚀 5 Langkah Mudah Deploy

### 1️⃣ Import Project ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import `safir2310/ayamgeprek` dari GitHub
3. Vercel akan otomatis detect Next.js project
4. Klik **"Deploy"**

### 2️⃣ Buat Database

Di Vercel Dashboard:
1. Pilih project `ayamgeprek`
2. Klik tab **"Storage"**
3. Klik **"Create Database"**
4. Pilih **"Postgres"**
5. Beri nama: `ayamgeprek-db`
6. Region: pilih **Singapore** (terdekat Indonesia)
7. Klik **"Create"**

### 3️⃣ Setup Environment Variables

Setelah database dibuat:
1. Klik database yang baru dibuat
2. Klik tab **".env.local"**
3. Copy semua environment variables
4. Buka tab **"Settings"** → **"Environment Variables"**
5. Paste semua variables
6. Klik **"Save"**
7. Klik **"Redeploy"**

### 4️⃣ Deploy Production

```bash
vercel login
vercel --prod
```

Atau push ke GitHub, Vercel akan otomatis deploy:
```bash
git push origin main
```

### 5️⃣ Selesai! 🎉

Buka URL: `https://ayamgeprek.vercel.app` (atau custom domain Anda)

---

## ✅ Verifikasi

1. **Cek Deployment**: Buka Vercel Dashboard, status harus **"Ready"**
2. **Test App**: Buka URL deployment, test:
   - Homepage bisa diakses
   - Login/Register berfungsi
   - Data tersimpan di database

3. **Cek Database**: 
   - Buka **Storage** tab di Vercel
   - Klik database
   - Cek **Data** tab, pastikan tabel sudah terbentur

---

## 🔧 Troubleshooting

### "Database connection failed"
- Cek `DATABASE_URL` di Environment Variables
- Pastikan database sudah aktif
- Redeploy dari Vercel Dashboard

### "Build failed"
- Cek build logs di Vercel Dashboard
- Pastikan environment variables sudah benar

### "Migration not running"
- Vercel akan otomatis menjalankan `prisma generate` saat deploy
- Cek jika ada error di build logs

---

## 📚 Documentation Lengkap

Untuk panduan lengkap, baca: [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)

---

## 💡 Tips

1. **Preview Deployments**: Setiap PR akan membuat preview URL
2. **Auto Deploy**: Push ke main branch otomatis deploy
3. **Database Backups**: Vercel Postgres otomatis backup daily
4. **Monitoring**: Cek tab **Analytics** di Vercel Dashboard

---

**Need Help?**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with Vercel](https://vercel.com/guides/deploying-a-prisma-powered-api-with-vercel-and-postgres)

---

**Last Updated**: January 2024
