'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Package, 
  Gift, 
  Users, 
  CreditCard, 
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Search,
  Filter,
  Download,
  Printer,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function DashboardAdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Check authentication
  const isMounted = useRef(true)
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (!user || !token) {
        if (isMounted.current) {
          router.push('/login')
        }
        return
      }
      
      const parsedUser = JSON.parse(user)
      
      // Verify token expiration
      try {
        const tokenData = JSON.parse(atob(token))
        if (tokenData.exp && tokenData.exp < Date.now()) {
          // Token expired
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          if (isMounted.current) {
            router.push('/login')
          }
          return
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        if (isMounted.current) {
          router.push('/login')
        }
        return
      }
      
      // Check if user is admin
      if (parsedUser.role !== 'admin') {
        if (isMounted.current) {
          router.push('/dashboard-user')
        }
        return
      }
      
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
    
    checkAuth()
    
    return () => {
      isMounted.current = false
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Sample data
  const products = [
    { id: '1', name: 'Ayam Geprek Jumbo', category: 'Makanan', price: 25000, stock: 50, isPromo: true, isDiscount: true, discount: 10 },
    { id: '2', name: 'Ayam Geprek Reguler', category: 'Makanan', price: 18000, stock: 100, isPromo: false, isDiscount: false, discount: 0 },
    { id: '3', name: 'Es Teh Manis', category: 'Minuman', price: 5000, stock: 200, isPromo: false, isDiscount: true, discount: 20 },
    { id: '4', name: 'Es Jeruk', category: 'Minuman', price: 6000, stock: 150, isPromo: true, isDiscount: false, discount: 0 },
  ]

  const pointProducts = [
    { id: '1', name: 'Ayam Geprek Gratis', points: 500, stock: 10 },
    { id: '2', name: 'Es Teh Manis Gratis', points: 100, stock: 50 },
    { id: '3', name: 'Diskon 20%', points: 300, stock: 30 },
    { id: '4', name: 'Voucher Rp 50.000', points: 500, stock: 20 },
  ]

  const users = [
    { id: '1', username: 'user123', email: 'user@example.com', phone: '081234567890', memberLevel: 'Silver', balance: 500000, points: 5000 },
    { id: '2', username: 'user456', email: 'user2@example.com', phone: '082345678901', memberLevel: 'Gold', balance: 1000000, points: 10000 },
    { id: '3', username: 'user789', email: 'user3@example.com', phone: '083456789012', memberLevel: 'Platinum', balance: 2000000, points: 20000 },
  ]

  const redeemCodes = [
    { id: '1', code: 'WELCOME2024', pointValue: 100, usedCount: 5, maxUses: 100, isActive: true, expiryDate: '2024-12-31' },
    { id: '2', code: 'PROMO100', pointValue: 100, usedCount: 15, maxUses: 50, isActive: true, expiryDate: '2024-06-30' },
    { id: '3', code: 'EXPIRED20', pointValue: 200, usedCount: 30, maxUses: 50, isActive: false, expiryDate: '2024-01-31' },
  ]

  const transactions = [
    { id: 'ORD-001', user: 'user123', items: 'Ayam Geprek Jumbo x2, Es Teh x1', total: 55000, status: 'Selesai', date: '2024-01-15' },
    { id: 'ORD-002', user: 'user456', items: 'Ayam Geprek Reguler x1, Nasi Geprek x1', total: 33000, status: 'Diproses', date: '2024-01-14' },
    { id: 'ORD-003', user: 'user789', items: 'Es Campur x2', total: 24000, status: 'Menunggu', date: '2024-01-13' },
    { id: 'ORD-004', user: 'user123', items: 'Ayam Geprek Jumbo x1', total: 25000, status: 'Cancel', date: '2024-01-12' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700'
      case 'Diproses': return 'bg-yellow-100 text-yellow-700'
      case 'Menunggu': return 'bg-orange-100 text-orange-700'
      case 'Cancel': return 'bg-gray-200 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getMemberBadge = (level: string) => {
    switch (level) {
      case 'Silver': return <Badge className="bg-gray-100 text-gray-700">Silver</Badge>
      case 'Gold': return <Badge className="bg-yellow-100 text-yellow-700">Gold</Badge>
      case 'Platinum': return <Badge className="bg-purple-100 text-purple-700">Platinum</Badge>
      default: return <Badge>{level}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Loading Screen */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-gray-600">Memuat...</p>
          </div>
        </div>
      ) : (
        <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">AYAM GEPREK</h1>
                <p className="text-xs text-orange-600 font-medium">SAMBAL IJO</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Admin
              </span>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Home className="w-4 h-4 mr-2" />
                  Beranda
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Panel Kontrol Toko
            </h1>
            <p className="text-lg text-white/90">
              Kelola produk, pesanan, dan pelanggan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Produk</TabsTrigger>
              <TabsTrigger value="products-point">Produk Point</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="redeem-codes">Redeem</TabsTrigger>
              <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            </TabsList>

            {/* Dashboard Overview */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Pesanan', value: '1,234', icon: Package, color: 'from-blue-500 to-blue-600' },
                  { label: 'Total Pengguna', value: '567', icon: Users, color: 'from-green-500 to-green-600' },
                  { label: 'Total Pendapatan', value: 'Rp 45.6M', icon: CreditCard, color: 'from-orange-500 to-orange-600' },
                  { label: 'Produk Aktif', value: '24', icon: Gift, color: 'from-purple-500 to-purple-600' },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-0 shadow-lg overflow-hidden">
                        <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs text-gray-500">Hari Ini</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Transaksi Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.user}</TableCell>
                          <TableCell>Rp {transaction.total.toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Printer className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Harga</TableHead>
                          <TableHead>Stok</TableHead>
                          <TableHead>Promo</TableHead>
                          <TableHead>Diskon</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              {product.isPromo ? <Badge className="bg-orange-100 text-orange-700">Ya</Badge> : <Badge variant="secondary">Tidak</Badge>}
                            </TableCell>
                            <TableCell>
                              {product.isDiscount ? <Badge className="bg-green-100 text-green-700">{product.discount}%</Badge> : <Badge variant="secondary">-</Badge>}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Point Tab */}
            <TabsContent value="products-point" className="space-y-6">
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk Point
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pointProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-3 text-center">🎁</div>
                      <h4 className="font-bold text-gray-900 mb-2 text-center">{product.name}</h4>
                      <p className="text-green-600 font-bold text-lg text-center mb-3">
                        {product.points} Point
                      </p>
                      <p className="text-sm text-gray-500 text-center mb-4">Stok: {product.stock}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>No HP</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Saldo</TableHead>
                          <TableHead>Point</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{getMemberBadge(user.memberLevel)}</TableCell>
                            <TableCell>Rp {user.balance.toLocaleString('id-ID')}</TableCell>
                            <TableCell>{user.points.toLocaleString('id-ID')}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline" className="h-8">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Redeem Codes Tab */}
            <TabsContent value="redeem-codes" className="space-y-6">
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Kode Redeem
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kode</TableHead>
                        <TableHead>Point</TableHead>
                        <TableHead>Penggunaan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expired</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {redeemCodes.map((code) => (
                        <TableRow key={code.id}>
                          <TableCell className="font-mono font-bold">{code.code}</TableCell>
                          <TableCell>{code.pointValue} Point</TableCell>
                          <TableCell>{code.usedCount} / {code.maxUses || '∞'}</TableCell>
                          <TableCell>
                            <Badge className={code.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                              {code.isActive ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </TableCell>
                          <TableCell>{code.expiryDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Wallet Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Wallet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Nilai Tukar Point (1 Point = Rp ?)
                    </label>
                    <Input type="number" defaultValue={100} className="max-w-xs" />
                  </div>
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                    Simpan Pengaturan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Pesanan</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.user}</TableCell>
                            <TableCell className="max-w-xs truncate">{transaction.items}</TableCell>
                            <TableCell>Rp {transaction.total.toLocaleString('id-ID')}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Printer className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-orange-700 to-orange-600 text-white py-6 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Ayam Geprek Sambal Ijo. All rights reserved.</p>
        </div>
      </footer>
        </>
      )}
    </div>
  )
}
