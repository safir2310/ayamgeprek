import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create Profile Toko
  const profileToko = await prisma.profileToko.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'AYAM GEPREK SAMBAL IJO',
      slogan: 'Pedasnya Bikin Nagih 🔥🔥',
      address: 'Jl. Medan - Banda Aceh, Simpang Camat, Gampong Tijue, Kec. Pidie, Kab. Pidie, 24151',
      phone: '085260812758',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      pointRate: 100
    }
  })
  console.log('✅ Profile Toko created:', profileToko.name)

  // 2. Create Admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ayamgeprek.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@ayamgeprek.com',
      password: 'admin123', // In production, hash this!
      phone: '085260812758'
    }
  })
  console.log('✅ Admin created:', admin.username)

  // 3. Create Demo User
  const user = await prisma.user.upsert({
    where: { email: 'user@ayamgeprek.com' },
    update: {},
    create: {
      username: 'user',
      email: 'user@ayamgeprek.com',
      password: 'user123', // In production, hash this!
      phone: '081234567890',
      address: 'Jl. Contoh No. 123, Kota',
      memberLevel: 'Silver'
    }
  })
  console.log('✅ Demo User created:', user.username)

  // 4. Create Wallet for Demo User
  const wallet = await prisma.walletSaldo.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      balance: 500000,
      points: 5000
    }
  })
  console.log('✅ Wallet created for user:', { balance: wallet.balance, points: wallet.points })

  // 5. Create Sample Products
  const products = [
    {
      name: 'Ayam Geprek Jumbo',
      description: 'Ayam geprek ukuran jumbo dengan sambal ijo pedas',
      price: 25000,
      category: 'Makanan',
      isPromo: true,
      isDiscount: true,
      discount: 10,
      isNew: false,
      stock: 50
    },
    {
      name: 'Ayam Geprek Reguler',
      description: 'Ayam geprek ukuran reguler dengan sambal ijo',
      price: 18000,
      category: 'Makanan',
      isPromo: false,
      isDiscount: false,
      discount: null,
      isNew: false,
      stock: 100
    },
    {
      name: 'Nasi Geprek Telur',
      description: 'Nasi geprek dengan telur dadar dan sambal ijo',
      price: 15000,
      category: 'Makanan',
      isPromo: false,
      isDiscount: false,
      discount: null,
      isNew: true,
      stock: 80
    },
    {
      name: 'Es Teh Manis',
      description: 'Es teh manis segar',
      price: 5000,
      category: 'Minuman',
      isPromo: false,
      isDiscount: true,
      discount: 20,
      isNew: false,
      stock: 200
    },
    {
      name: 'Es Jeruk',
      description: 'Es jeruk segar dengan rasa asam manis',
      price: 6000,
      category: 'Minuman',
      isPromo: true,
      isDiscount: false,
      discount: null,
      isNew: false,
      stock: 150
    },
    {
      name: 'Es Campur',
      description: 'Es campur dengan berbagai buah segar',
      price: 12000,
      category: 'Minuman',
      isPromo: true,
      isDiscount: true,
      discount: 15,
      isNew: true,
      stock: 60
    }
  ]

  for (const product of products) {
    const existing = await prisma.produk.findFirst({
      where: { name: product.name }
    })
    if (!existing) {
      await prisma.produk.create({ data: product })
    }
  }
  console.log(`✅ Created ${products.length} products`)

  // 6. Create Point Products
  const pointProducts = [
    {
      name: 'Ayam Geprek Gratis',
      description: 'Tukar 500 point untuk ayam geprek gratis',
      pointPrice: 500,
      stock: 10
    },
    {
      name: 'Es Teh Manis Gratis',
      description: 'Tukar 100 point untuk es teh manis gratis',
      pointPrice: 100,
      stock: 50
    },
    {
      name: 'Diskon 20%',
      description: 'Tukar 300 point untuk diskon 20%',
      pointPrice: 300,
      stock: 30
    },
    {
      name: 'Voucher Rp 50.000',
      description: 'Tukar 500 point untuk voucher Rp 50.000',
      pointPrice: 500,
      stock: 20
    }
  ]

  for (const pointProduct of pointProducts) {
    const existing = await prisma.produkPoint.findFirst({
      where: { name: pointProduct.name }
    })
    if (!existing) {
      await prisma.produkPoint.create({ data: pointProduct })
    }
  }
  console.log(`✅ Created ${pointProducts.length} point products`)

  // 7. Create Redeem Codes
  const redeemCodes = [
    {
      code: 'WELCOME2024',
      pointValue: 100,
      maxUses: 100
    },
    {
      code: 'PROMO100',
      pointValue: 100,
      maxUses: 50
    },
    {
      code: 'AYAMGEPREK',
      pointValue: 200,
      maxUses: 30
    }
  ]

  for (const redeemCode of redeemCodes) {
    const existing = await prisma.redeemCode.findFirst({
      where: { code: redeemCode.code }
    })
    if (!existing) {
      await prisma.redeemCode.create({ data: redeemCode })
    }
  }
  console.log(`✅ Created ${redeemCodes.length} redeem codes`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
