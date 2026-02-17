'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  User, 
  Home as HomeIcon, 
  Utensils, 
  GlassWater, 
  Percent,
  Tag,
  Clock,
  ShoppingCart,
  ChevronRight,
  Phone,
  Facebook,
  Instagram,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

// Types
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isPromo: boolean
  isDiscount: boolean
  discount?: number
  isNew: boolean
  stock: number
}

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Sample products
  const products: Product[] = [
    {
      id: '1',
      name: 'Ayam Geprek Jumbo',
      description: 'Ayam geprek ukuran jumbo dengan sambal ijo pedas',
      price: 25000,
      category: 'Makanan',
      image: '/api/placeholder/300/200',
      isPromo: true,
      isDiscount: true,
      discount: 10,
      isNew: false,
      stock: 50
    },
    {
      id: '2',
      name: 'Ayam Geprek Reguler',
      description: 'Ayam geprek ukuran reguler dengan sambal ijo',
      price: 18000,
      category: 'Makanan',
      image: '/api/placeholder/300/200',
      isPromo: false,
      isDiscount: false,
      isNew: false,
      stock: 100
    },
    {
      id: '3',
      name: 'Es Teh Manis',
      description: 'Es teh manis segar',
      price: 5000,
      category: 'Minuman',
      image: '/api/placeholder/300/200',
      isPromo: false,
      isDiscount: true,
      discount: 20,
      isNew: false,
      stock: 200
    },
    {
      id: '4',
      name: 'Es Jeruk',
      description: 'Es jeruk segar dengan rasa asam manis',
      price: 6000,
      category: 'Minuman',
      image: '/api/placeholder/300/200',
      isPromo: true,
      isDiscount: false,
      isNew: false,
      stock: 150
    },
    {
      id: '5',
      name: 'Nasi Geprek Telur',
      description: 'Nasi geprek dengan telur dadar dan sambal ijo',
      price: 15000,
      category: 'Makanan',
      image: '/api/placeholder/300/200',
      isPromo: false,
      isDiscount: false,
      isNew: true,
      stock: 80
    },
    {
      id: '6',
      name: 'Es Campur',
      description: 'Es campur dengan berbagai buah segar',
      price: 12000,
      category: 'Minuman',
      image: '/api/placeholder/300/200',
      isPromo: true,
      isDiscount: true,
      discount: 15,
      isNew: true,
      stock: 60
    }
  ]

  const categories = [
    { id: 'all', name: 'Semua', icon: HomeIcon },
    { id: 'Makanan', name: 'Makanan', icon: Utensils },
    { id: 'Minuman', name: 'Minuman', icon: GlassWater },
    { id: 'promo', name: 'Promo', icon: Percent },
    { id: 'diskon', name: 'Diskon', icon: Tag },
    { id: 'terbaru', name: 'Terbaru', icon: Clock }
  ]

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedCategory === 'all') return matchesSearch
    if (selectedCategory === 'promo') return product.isPromo && matchesSearch
    if (selectedCategory === 'diskon') return product.isDiscount && matchesSearch
    if (selectedCategory === 'terbaru') return product.isNew && matchesSearch
    return product.category === selectedCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, {
        id: `cart-${product.id}`,
        productId: product.id,
        quantity: 1,
        product
      }])
    }
    
    // Open cart popup
    setCartOpen(true)
    setTimeout(() => setCartOpen(false), 2000)
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.productId === productId) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.product.isDiscount && item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price
    return sum + (price * item.quantity)
  }, 0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">AYAM GEPREK</h1>
                <p className="text-xs text-orange-600 font-medium">SAMBAL IJO</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-100 border-0 focus:ring-2 focus:ring-orange-500 text-base"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="relative h-11 w-11 sm:h-10 sm:w-10"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Login Icon Only */}
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative h-11 w-11 sm:h-10 sm:w-10"
                >
                  <User className="w-5 h-5 text-gray-700" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="sm:hidden h-11 w-11"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Header Info Bar - Address & Contact */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
              {/* Address */}
              <div className="flex items-center gap-2 text-orange-50">
                <span className="hidden sm:inline">📍</span>
                <span className="text-center md:text-left">
                  Jl. Medan - Banda Aceh, Simpang Camat, Gampong Tijue, Kec. Pidie, Kab. Pidie, 24151
                </span>
              </div>
              
              {/* Contact */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-orange-200 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-orange-200 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
                <a 
                  href="https://wa.me/6285260812758" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-orange-200 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>085260812758</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 sm:hidden container mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari menu favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-100 border-0 focus:ring-2 focus:ring-orange-500 text-base"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t sm:hidden"
            >
              <nav className="container mx-auto px-4 py-4 space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-base font-semibold">
                    <User className="w-4 h-4 mr-2" />
                    Masuk
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Popup */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`absolute right-0 top-0 h-full bg-white shadow-2xl overflow-hidden
                ${cartItems.length > 0 ? 'w-full sm:max-w-md' : 'w-full sm:w-96'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Cart Header */}
                <div className="p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Keranjang</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCartOpen(false)}
                      className="text-white hover:bg-white/20 h-10 w-10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  {cartCount > 0 && (
                    <p className="text-sm mt-1 opacity-90">{cartCount} item{cartCount > 1 ? 's' : ''}</p>
                  )}
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500">Keranjang kosong</p>
                      <Link href="/login" className="mt-4 block">
                        <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-base font-semibold">
                          Mulai Belanja
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const price = item.product.isDiscount && item.product.discount
                          ? item.product.price * (1 - item.product.discount / 100)
                          : item.product.price

                        return (
                          <div key={item.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-3xl">{item.product.category === 'Makanan' ? '🍗' : '🥤'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate mb-1">{item.product.name}</p>
                              <p className="text-orange-600 font-bold">
                                Rp {Math.round(price).toLocaleString('id-ID')}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => updateQuantity(item.productId, -1)}
                                >
                                  <span className="text-lg font-bold">-</span>
                                </Button>
                                <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => updateQuantity(item.productId, 1)}
                                >
                                  <span className="text-lg font-bold">+</span>
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 flex-shrink-0"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cartItems.length > 0 && (
                  <div className="p-4 bg-gray-50 border-t flex-shrink-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="text-2xl font-bold text-orange-600">
                        Rp {Math.round(totalPrice).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <Link href="/checkout" onClick={() => setCartOpen(false)}>
                      <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Checkout Sekarang
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
              AYAM GEPREK SAMBAL IJO
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6 font-medium">
              Pedasnya Bikin Nagih 🔥🔥
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link href="#menu">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-lg">
                  Pesan Sekarang
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 bg-white shadow-sm py-3 px-4 -mt-1">
        <div className="container mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="menu" className="flex-1 py-6 sm:py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => {
              const finalPrice = product.isDiscount && product.discount
                ? product.price * (1 - product.discount / 100)
                : product.price
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white border-gray-100">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl">{product.category === 'Makanan' ? '🍗' : '🥤'}</span>
                      </div>
                      {product.isPromo && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          PROMO
                        </div>
                      )}
                      {product.isDiscount && product.discount && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          -{product.discount}%
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          BARU
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {product.isDiscount && product.discount && (
                            <p className="text-sm text-gray-400 line-through">
                              Rp {product.price.toLocaleString('id-ID')}
                            </p>
                          )}
                          <p className="text-lg font-bold text-orange-600">
                            Rp {Math.round(finalPrice).toLocaleString('id-ID')}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                          disabled={product.stock === 0}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          {product.stock === 0 ? 'Habis' : 'Tambah'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-br from-orange-700 to-orange-600 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-1">AYAM GEPREK SAMBAL IJO</h3>
              <p className="text-orange-200">Pedasnya Bikin Nagih 🔥🔥</p>
            </div>
            
            <div className="space-y-2 text-sm text-orange-100">
              <p>📍 Jl. Medan - Banda Aceh, Simpang Camat, Gampong Tijue, Kec. Pidie, Kab. Pidie, 24151</p>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/6285260812758" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  085260812758
                </a>
              </div>
              <div className="flex justify-center gap-4 mt-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            
            <div className="pt-4 border-t border-orange-500/30 text-xs text-orange-200">
              <p>© 2024 Ayam Geprek Sambal Ijo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
