# 🍗 AYAM GEPREK SAMBAL IJO

> Sistem pemesanan online dengan fitur lengkap untuk restoran Ayam Geprek Sambal Ijo

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748)

---

## ✨ Fitur Utama

### 🛒 E-Commerce
- **Katalog Produk** - Tampil produk dengan kategori dan fitur pencarian
- **Keranjang Belanja** - Sistem cart dengan quantity adjustment
- **Checkout WhatsApp** - Kirim pesanan langsung ke WhatsApp
- **Promo & Diskon** - Produk dengan status promo dan diskon

### 👥 Sistem Akun
- **Authentication** - Login/Register untuk User dan Admin
- **Role-Based Access** - Akses berbeda untuk user dan admin
- **Keamanan** - Rate limiting, account locking, token expiration

### 👤 User Dashboard
- **Profile Management** - Edit profil, foto, alamat
- **Wallet System** - Dompet digital dengan saldo dan points
- **Point System** - Tukar points dengan produk atau diskon
- **Redeem Codes** - Masukkan kode untuk dapat points
- **Order History** - Riwayat pesanan dan transaksi
- **Member Levels** - Silver, Gold, Platinum dengan benefits berbeda

### 📊 Admin Dashboard
- **Dashboard Overview** - Statistik pesanan, user, pendapatan
- **Product Management** - Kelola produk menu
- **Point Products** - Kelola produk poin
- **User Management** - Kelola data pelanggan
- **Redeem Codes** - Buat dan kelola kode redeem
- **Transaction Management** - Kelola pesanan masuk
- **Settings** - Pengaturan wallet dan toko

### 📱 Mobile-Friendly
- **Responsive Design** - Tampil optimal di semua perangkat
- **Touch Targets** - Minimum 44px untuk semua tombol
- **Mobile Navigation** - Menu dan navigasi yang mudah di mobile
- **Performance** - Fast load times dan smooth animations

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Radix UI based)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Prisma Cloud)
- **ORM**: Prisma
- **Authentication**: Client-side auth (NextAuth ready)

### Deployment
- **Platform**: Vercel
- **Database**: Prisma Cloud PostgreSQL

---

## 📦 Installation

### Prerequisites
- Node.js 18+ atau Bun
- PostgreSQL database (Prisma Cloud recommended)

### Setup Lokal

```bash
# Clone repository
git clone https://github.com/safir2310/ayamgeprek.git
cd ayamgeprek

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env dengan database credentials Anda

# Generate Prisma Client
bun run prisma generate

# Push schema ke database
bun run prisma db push

# Seed database (data awal)
bun run db:seed

# Jalankan development server
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database

### Setup Database

Lihat panduan lengkap di [DATABASE_SETUP.md](./DATABASE_SETUP.md)

### Environment Variables

```env
# Database
POSTGRES_URL=postgres://[connection-string]?sslmode=require
DATABASE_URL=postgres://[connection-string]?sslmode=require
PRISMA_DATABASE_URL=prisma+postgres://[accelerate-url]

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Models

- **ProfileToko** - Informasi toko
- **Admin** - Data admin
- **User** - Data pelanggan
- **WalletSaldo** - Dompet digital
- **WalletHistory** - Riwayat transaksi
- **Produk** - Katalog menu
- **ProdukPoint** - Produk poin
- **RedeemCode** - Kode redeem
- **RedeemHistory** - Riwayat redeem
- **Transaksi** - Data pesanan
- **TransaksiItem** - Detail pesanan
- **Struk** - Data struk
- **CartItem** - Keranjang belanja

---

## 📱 Pages

### Public Pages
- **/** - Homepage dengan katalog produk
- **/login** - Login page untuk user dan admin
- **/register** - Registrasi user
- **/register-admin** - Registrasi admin
- **/checkout** - Checkout dengan WhatsApp integration

### User Pages
- **/dashboard-user** - Dashboard lengkap untuk user
  - Overview
  - Profile
  - Wallet
  - Redeem
  - History
  - Settings

### Admin Pages
- **/dashboard-admin** - Dashboard lengkap untuk admin
  - Dashboard Overview
  - Products Management
  - Point Products Management
  - Users Management
  - Redeem Codes Management
  - Transactions Management

---

## 🔐 Demo Credentials

### Admin
- **Username**: admin
- **Password**: admin123

### User
- **Username**: user
- **Password**: user123

---

## 🚀 Deploy ke Vercel

Lihat panduan lengkap di [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) atau [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)

### Quick Start

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

### Environment Variables di Vercel

Add di Project Settings → Environment Variables:
- `POSTGRES_URL` - Dari Prisma Cloud
- `DATABASE_URL` - Dari Prisma Cloud
- `PRISMA_DATABASE_URL` - Dari Prisma Cloud
- `NEXT_PUBLIC_APP_URL` - URL deployment

---

## 📚 Documentation

- [MOBILE_FRIENDLY.md](./MOBILE_FRIENDLY.md) - Mobile optimization details
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database setup guide
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick deployment guide
- [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md) - Complete Vercel deployment guide

---

## 🛠️ Available Scripts

```bash
# Development
bun run dev          # Start development server

# Build & Deploy
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:push      # Push schema to database
bun run db:seed      # Seed database with initial data
bun run db:reset     # Reset database
bun run prisma studio # Open Prisma Studio GUI

# Code Quality
bun run lint         # Run ESLint
```

---

## 🎨 Features Detail

### 1. Product Catalog
- Filter by category (Makanan, Minuman, Promo, Diskon, Terbaru)
- Search products
- Show promo badges
- Show discount percentage
- Show new product badges
- Add to cart with animation

### 2. Shopping Cart
- Real-time cart updates
- Quantity adjustment
- Remove items
- Calculate subtotal and total
- Persistent cart (localStorage)

### 3. Checkout
- Redirect to login if not authenticated
- Order summary
- Use wallet balance
- WhatsApp integration
- Order confirmation

### 4. User Authentication
- Login with username/password
- Registration for users and admins
- Rate limiting (5 attempts)
- Account locking (60 seconds)
- Token-based session (24 hours)
- Role-based redirect

### 5. Wallet System
- Balance management
- Point system (1 Point = Rp 100)
- Transaction history
- Top up functionality
- Redeem products
- Redeem codes

### 6. Admin Features
- View statistics
- Manage products
- Manage users
- Create redeem codes
- Process orders
- Generate struk

---

## 📱 Responsive Design

Aplikasi ini dirancang dengan **mobile-first** approach:

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Touch-friendly buttons (44px+)
- Horizontal scrollable categories
- Stacked layouts on mobile
- Optimized spacing and typography
- Smooth animations (60fps)

---

## 🔒 Security Features

- Rate limiting pada login
- Account locking setelah 5 percobaan gagal
- Token expiration (24 hours)
- Role-based access control
- Input validation
- SQL injection prevention (Prisma)
- XSS prevention (React)

---

## 🎯 Roadmap

### Phase 1 ✅ (Done)
- [x] Basic product catalog
- [x] User authentication
- [x] Admin authentication
- [x] Shopping cart
- [x] WhatsApp checkout
- [x] User dashboard
- [x] Admin dashboard
- [x] Wallet system
- [x] Point system
- [x] Database setup

### Phase 2 (Future)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Order tracking
- [ ] Rating & review system
- [ ] Multiple payment methods
- [ ] Delivery tracking
- [ ] Real-time order updates (WebSocket)
- [ ] Admin mobile app

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is private for Ayam Geprek Sambal Ijo.

---

## 👥 Contact

- **Store**: AYAM GEPREK SAMBAL IJO
- **Address**: Jl. Medan - Banda Aceh, Simpang Camat, Gampong Tijue, Kec. Pidie, Kab. Pidie, 24151
- **Phone**: 085260812758
- **GitHub**: https://github.com/safir2310/ayamgeprek

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- Prisma for the amazing ORM
- Vercel for the deployment platform

---

**Built with ❤️ using Next.js, Prisma, and Vercel**

🔥 **Pedasnya Bikin Nagih!** 🔥
