'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, 
  Wallet, 
  Gift, 
  ShoppingCart, 
  MapPin, 
  History, 
  LogOut, 
  CreditCard,
  Home,
  Star,
  Crown,
  Diamond,
  ChevronRight,
  Camera,
  Edit,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardUserPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [walletBalance] = useState(500000)
  const [walletPoints, setWalletPoints] = useState(5000)
  const [memberLevel] = useState<'Silver' | 'Gold' | 'Platinum'>('Silver')
  const [redeemCode, setRedeemCode] = useState('')
  const [redeemMessage, setRedeemMessage] = useState('')

  // Check authentication
  const isMounted = useRef(true)
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (!user || !token) {
        if (isMounted.current) {
          router.push('/login?redirect=' + encodeURIComponent('/dashboard-user'))
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
            router.push('/login?redirect=' + encodeURIComponent('/dashboard-user'))
          }
          return
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        if (isMounted.current) {
          router.push('/login?redirect=' + encodeURIComponent('/dashboard-user'))
        }
        return
      }
      
      // Check if user is trying to access user dashboard (prevent admin)
      if (parsedUser.role === 'admin') {
        if (isMounted.current) {
          router.push('/dashboard-admin')
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

  const handleRedeemCode = () => {
    if (redeemCode) {
      // Simulate redeem
      setWalletPoints(prev => prev + 100)
      setRedeemMessage('Kode berhasil ditukar! +100 Point')
      setRedeemCode('')
      setTimeout(() => setRedeemMessage(''), 3000)
    }
  }

  const getMemberColor = (level: string) => {
    switch (level) {
      case 'Silver': return 'from-gray-400 to-gray-300'
      case 'Gold': return 'from-yellow-500 to-yellow-400'
      case 'Platinum': return 'from-purple-500 to-purple-400'
      default: return 'from-gray-400 to-gray-300'
    }
  }

  const menuItems = [
    { icon: User, label: 'Edit Profile', href: '#profile' },
    { icon: Camera, label: 'Upload Foto', href: '#photo' },
    { icon: MapPin, label: 'Alamat', href: '#address' },
    { icon: ShoppingCart, label: 'Keranjang', href: '/cart' },
    { icon: Wallet, label: 'Saldo Point', href: '#wallet' },
    { icon: Gift, label: 'Tukar Produk Point', href: '#redeem-product' },
    { icon: CreditCard, label: 'Redeem Code', href: '#redeem-code' },
    { icon: History, label: 'Riwayat Saldo', href: '#history' },
  ]

  const walletHistory = [
    { type: 'topup', amount: 50000, points: 500, date: '2024-01-15', description: 'Top Up Saldo' },
    { type: 'cashback', amount: 0, points: 100, date: '2024-01-14', description: 'Cashback Transaksi' },
    { type: 'redeem', amount: 0, points: -200, date: '2024-01-13', description: 'Tukar Produk' },
    { type: 'transaction', amount: -25000, points: 0, date: '2024-01-12', description: 'Pembayaran Pesanan' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Loading Screen */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">🔥</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">AYAM GEPREK</h1>
                <p className="text-xs text-orange-600 font-medium">SAMBAL IJO</p>
              </div>
            </Link>

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Home className="w-4 h-4 mr-2" />
                Beranda
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Dashboard User
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Kelola akun dan pesananmu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-6">
        <div className="container mx-auto max-w-4xl">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-10 sm:h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">📊</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">👤</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Wallet</span>
                <span className="sm:hidden">💰</span>
              </TabsTrigger>
              <TabsTrigger value="redeem" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Redeem</span>
                <span className="sm:hidden">🎁</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">History</span>
                <span className="sm:hidden">📋</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">⚙️</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Wallet Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${getMemberColor(memberLevel)} flex items-center justify-center shadow-lg`}>
                          {memberLevel === 'Silver' && <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                          {memberLevel === 'Gold' && <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                          {memberLevel === 'Platinum' && <Diamond className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm opacity-90">Level Member</p>
                          <p className="text-lg sm:text-xl font-bold">{memberLevel}</p>
                        </div>
                      </div>
                      <Wallet className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs sm:text-sm opacity-90">Saldo</p>
                        <motion.p
                          key={walletBalance}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl sm:text-4xl font-bold"
                        >
                          Rp {walletBalance.toLocaleString('id-ID')}
                        </motion.p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm opacity-90">Point</p>
                        <motion.p
                          key={walletPoints}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-xl sm:text-2xl font-bold"
                        >
                          {walletPoints.toLocaleString('id-ID')} Point
                        </motion.p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-xs opacity-80">1 Point = Rp 100</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Menu Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {menuItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Link key={index} href={item.href}>
                            <Button
                              variant="outline"
                              className="w-full h-12 sm:h-16 flex-col gap-1 border-gray-200 hover:border-orange-500 hover:bg-orange-50"
                            >
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                        <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                      </div>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
                      <Input defaultValue="user123" className="bg-gray-50 h-10 sm:h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
                      <Input defaultValue="user@example.com" className="bg-gray-50 h-10 sm:h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">No HP</label>
                      <Input defaultValue="081234567890" className="bg-gray-50 h-10 sm:h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Alamat</label>
                      <Input defaultValue="Jl. Contoh No. 123, Kota" className="bg-gray-50 h-10 sm:h-12" />
                    </div>
                  </div>

                  <Button className="w-full h-10 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold">Dompet Saya</h3>
                    <Wallet className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs sm:text-sm opacity-90">Saldo Uang</p>
                      <p className="text-2xl sm:text-3xl font-bold">Rp {walletBalance.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm opacity-90">Saldo Point</p>
                      <p className="text-xl sm:text-2xl font-bold">{walletPoints.toLocaleString('id-ID')} Point</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="h-10 sm:h-12 bg-white text-green-600 hover:bg-gray-100">
                        + Top Up
                      </Button>
                      <Button className="h-10 sm:h-12 bg-white/20 text-white hover:bg-white/30">
                        Riwayat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Transaksi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                    {walletHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm sm:text-base text-gray-900">{item.description}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className="text-right">
                          {item.amount !== 0 && (
                            <p className={`font-bold text-sm sm:text-base ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.amount > 0 ? '+' : ''}Rp {item.amount.toLocaleString('id-ID')}
                            </p>
                          )}
                          {item.points !== 0 && (
                            <p className={`text-xs sm:text-sm font-semibold ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.points > 0 ? '+' : ''}{item.points} Point
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Redeem Tab */}
            <TabsContent value="redeem" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Masukkan Kode & Dapatkan Point</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Masukkan kode redeem"
                      value={redeemCode}
                      onChange={(e) => setRedeemCode(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button
                    onClick={handleRedeemCode}
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Tukar Kode
                  </Button>
                  {redeemMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium"
                    >
                      {redeemMessage}
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produk Point</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Ayam Geprek Gratis', points: 500, image: '🍗' },
                      { name: 'Es Teh Manis Gratis', points: 100, image: '🥤' },
                      { name: 'Diskon 20%', points: 300, image: '🎁' },
                      { name: 'Voucher Rp 50.000', points: 500, image: '💰' },
                    ].map((product, index) => (
                      <Card key={index} className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50">
                        <CardContent className="p-4">
                          <div className="text-4xl mb-3 text-center">{product.image}</div>
                          <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                          <p className="text-orange-600 font-bold text-lg mb-3">
                            {product.points} Point
                          </p>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            disabled={walletPoints < product.points}
                          >
                            {walletPoints >= product.points ? 'Tukar' : 'Point Tidak Cukup'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'ORD-001', items: 'Ayam Geprek Jumbo x2, Es Teh x1', total: 55000, status: 'Selesai', date: '2024-01-15' },
                      { id: 'ORD-002', items: 'Ayam Geprek Reguler x1, Nasi Geprek x1', total: 33000, status: 'Diproses', date: '2024-01-14' },
                      { id: 'ORD-003', items: 'Es Campur x2', total: 24000, status: 'Menunggu', date: '2024-01-13' },
                    ].map((order, index) => (
                      <Card key={index} className="border-0 bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-bold text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                              order.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{order.items}</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-orange-600">Rp {order.total.toLocaleString('id-ID')}</p>
                            <Button size="sm" variant="outline" className="text-xs">
                              Lihat Detail
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/">
                    <Button variant="outline" className="w-full h-12 justify-start border-gray-200">
                      <User className="w-5 h-5 mr-3" />
                      Edit Profil
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full h-12 justify-start border-gray-200">
                      <MapPin className="w-5 h-5 mr-3" />
                      Alamat Pengiriman
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full h-12 justify-start border-gray-200">
                      <CreditCard className="w-5 h-5 mr-3" />
                      Metode Pembayaran
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </Button>
                  </Link>
                  
                  <div className="pt-4 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full h-12 justify-start text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center rounded-lg px-4 transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Keluar Akun
                    </button>
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
