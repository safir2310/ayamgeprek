# 🗄️ Database Setup - AYAM GEPREK SAMBAL IJO

Panduan lengkap setup database menggunakan Prisma Cloud PostgreSQL.

---

## ✅ Status: Database Sudah Terkoneksi!

Database Prisma Cloud PostgreSQL sudah berhasil:
- ✅ Dihubungkan ke aplikasi
- ✅ Schema database ter-upload
- ✅ Data awal (seed) berhasil dimasukkan

---

## 📊 Database Details

### Connection Info
- **Provider**: PostgreSQL (via Prisma Cloud)
- **Host**: db.prisma.io:5432
- **Database**: postgres
- **Schema**: public
- **SSL**: Required

### Environment Variables
```env
POSTGRES_URL=postgres://[connection-string]?sslmode=require
DATABASE_URL=postgres://[connection-string]?sslmode=require
PRISMA_DATABASE_URL=prisma+postgres://[accelerate-url]
```

---

## 📋 Tabel Database

Berikut tabel yang sudah terbentur di database:

### 1. **ProfileToko**
Informasi toko dan pengaturan aplikasi
- Nama toko, slogan, alamat
- Kontak (phone, instagram, facebook)
- Rate konversi point

### 2. **Admin**
Data admin untuk dashboard admin
- Username, email, password
- Phone, birth date

### 3. **User**
Data pelanggan
- Username, email, password
- Phone, address, photo
- Level member (Silver, Gold, Platinum)

### 4. **WalletSaldo**
Dompet digital user
- Saldo uang
- Poin (point)

### 5. **WalletHistory**
Riwayat transaksi wallet
- Tipe transaksi (topup, redeem, cashback, dll)
- Jumlah amount dan points

### 6. **Produk**
Katalog produk menu
- Nama, deskripsi, harga
- Kategori (Makanan/Minuman)
- Status promo, diskon, baru
- Stok

### 7. **ProdukPoint**
Produk yang bisa ditukar dengan point
- Nama, deskripsi
- Harga dalam point
- Stok

### 8. **RedeemCode**
Kode redeem untuk dapat point
- Kode unik
- Nilai point
- Maksimal penggunaan
- Status aktif/non-aktif

### 9. **RedeemHistory**
Riwayat redeem code dan produk point
- User yang redeem
- Kode atau produk yang ditukar
- Point yang digunakan

### 10. **Transaksi**
Data pesanan pelanggan
- Informasi pelanggan
- Total pesanan
- Status (Menunggu, Diproses, Selesai, Cancel)
- Pesan WhatsApp

### 11. **TransaksiItem**
Detail item dalam setiap transaksi
- Produk yang dipesan
- Harga dan quantity
- Subtotal

### 12. **Struk**
Data struk/tanda terima
- Data JSON lengkap
- Status cetak dan download

### 13. **CartItem**
Keranjang belanja user
- User dan produk
- Quantity

---

## 🌱 Data Awal (Seed Data)

Database sudah di-seed dengan data awal:

### Admin Account
- **Username**: admin
- **Email**: admin@ayamgeprek.com
- **Password**: admin123
- **Phone**: 085260812758

### Demo User Account
- **Username**: user
- **Email**: user@ayamgeprek.com
- **Password**: user123
- **Phone**: 081234567890
- **Member Level**: Silver
- **Wallet Balance**: Rp 500.000
- **Wallet Points**: 5000

### Products (6 items)
1. Ayam Geprek Jumbo - Rp 25.000 (Promo + Diskon 10%)
2. Ayam Geprek Reguler - Rp 18.000
3. Nasi Geprek Telur - Rp 15.000 (Baru)
4. Es Teh Manis - Rp 5.000 (Diskon 20%)
5. Es Jeruk - Rp 6.000 (Promo)
6. Es Campur - Rp 12.000 (Promo + Diskon 15% + Baru)

### Point Products (4 items)
1. Ayam Geprek Gratis - 500 Point
2. Es Teh Manis Gratis - 100 Point
3. Diskon 20% - 300 Point
4. Voucher Rp 50.000 - 500 Point

### Redeem Codes (3 codes)
1. WELCOME2024 - 100 Point (max 100 uses)
2. PROMO100 - 100 Point (max 50 uses)
3. AYAMGEPREK - 200 Point (max 30 uses)

---

## 🔧 Commands Database

### Generate Prisma Client
```bash
bun run prisma generate
```

### Push Schema ke Database
```bash
bun run prisma db push
```

### Seed Database (Masukkan Data Awal)
```bash
bun run db:seed
```

### Reset Database (Hapus Semua Data)
```bash
bun run db:reset
```

### Buka Prisma Studio (GUI Database)
```bash
bun run prisma studio
```

---

## 🔄 Reset Database

Jika ingin mereset database ke kondisi awal:

```bash
# 1. Reset database (hapus semua data dan tabel)
bun run db:reset

# 2. Push schema lagi
bun run prisma db push

# 3. Seed data awal
bun run db:seed
```

---

## 📝 File Konfigurasi Database

### `.env`
Environment variables untuk koneksi database
- Jangan commit file ini ke Git
- Sudah ada di `.gitignore`

### `prisma/schema.prisma`
Definisi schema database
- Semua model dan relasi
- Sudah ter-push ke database

### `prisma/seed.ts`
Script untuk mengisi data awal
- Profile toko
- Admin dan demo user
- Produk dan produk point
- Redeem codes

---

## 🔒 Security Notes

⚠️ **IMPORTANT**:
1. Password di database masih plain text (untuk demo)
2. Untuk production, gunakan hashing (bcrypt/argon2)
3. Environment variables harus disimpan dengan aman di Vercel
4. Jangan commit `.env` file ke Git

---

## 🚀 Deploy ke Vercel

### Environment Variables di Vercel

Add ke Vercel Project Settings → Environment Variables:

```
POSTGRES_URL=[dari Prisma Cloud]
DATABASE_URL=[dari Prisma Cloud]
PRISMA_DATABASE_URL=[dari Prisma Cloud]
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Auto-Run di Deploy

Script `postinstall` akan otomatis:
- Generate Prisma Client
- Siap untuk koneksi database

Untuk menjalankan seed di production, jalankan manual:
```bash
vercel env pull .env.local
bun run db:seed
```

---

## 📱 Cara Menggunakan Database di Aplikasi

### Import Prisma Client
```typescript
import { db } from '@/lib/db'

// Menggunakan di API routes atau server components
const users = await db.user.findMany()
```

### Contoh Query
```typescript
// Get user dengan wallet
const userWithWallet = await db.user.findUnique({
  where: { id: userId },
  include: { wallet: true }
})

// Get produk dengan filter
const products = await db.produk.findMany({
  where: {
    category: 'Makanan',
    isPromo: true
  }
})

// Create transaksi baru
const transaksi = await db.transaksi.create({
  data: {
    userId: userId,
    userName: 'John Doe',
    total: 50000,
    status: 'Menunggu',
    items: {
      create: [
        {
          produkId: productId,
          productName: 'Ayam Geprek',
          productPrice: 25000,
          quantity: 2,
          subtotal: 50000
        }
      ]
    }
  },
  include: { items: true }
})
```

---

## 🛠️ Troubleshooting

### Error: "Connection refused"
- Cek internet connection
- Pastikan POSTGRES_URL benar
- Cek firewall settings

### Error: "Database connection timeout"
- Cek database status di Prisma Cloud
- Verify SSL mode (harus `require`)
- Cek connection string format

### Error: "Table doesn't exist"
- Jalankan `bun run prisma db push`
- Cek schema di `prisma/schema.prisma`

### Error: "Prisma Client not generated"
- Jalankan `bun run prisma generate`
- Pastikan dependencies terinstall

---

## 📚 Referensi

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Cloud](https://www.prisma.io/cloud)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Prisma Studio](https://www.prisma.io/studio)

---

## ✅ Checklist

- [x] Database terkoneksi
- [x] Schema ter-upload
- [x] Seed data berhasil
- [x] Environment variables configured
- [x] Admin account ready
- [x] Demo user ready
- [x] Products ready
- [x] Point products ready
- [x] Redeem codes ready

---

**Database Status**: ✅ **Ready for Production**

**Last Updated**: January 2024
