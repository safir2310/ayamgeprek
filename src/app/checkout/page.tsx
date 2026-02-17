'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Trash2, 
  Check,
  MessageCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface CartProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isDiscount: boolean
  discount?: number
}

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: CartProduct
}

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: '1',
      quantity: 2,
      product: {
        id: '1',
        name: 'Ayam Geprek Jumbo',
        description: 'Ayam geprek ukuran jumbo dengan sambal ijo pedas',
        price: 25000,
        category: 'Makanan',
        image: '/api/placeholder/300/200',
        isDiscount: true,
        discount: 10
      }
    },
    {
      id: 'cart-2',
      productId: '3',
      quantity: 1,
      product: {
        id: '3',
        name: 'Es Teh Manis',
        description: 'Es teh manis segar',
        price: 5000,
        category: 'Minuman',
        image: '/api/placeholder/300/200',
        isDiscount: true,
        discount: 20
      }
    }
  ])
  
  const [useWallet, setUseWallet] = useState(false)
  const [walletBalance] = useState(50000)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (!user || !token) {
        // Redirect to login with return URL
        window.location.href = `/login?redirect=${encodeURIComponent('/checkout')}`
        return
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const WHATSAPP_NUMBER = '6285260812758' // 085260812758

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.productId === productId) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId))
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.isDiscount && item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price
    return sum + (price * item.quantity)
  }, 0)

  const walletAmount = useWallet ? Math.min(walletBalance, subtotal) : 0
  const total = subtotal - walletAmount

  const generateWhatsAppMessage = () => {
    let message = `🍗 *PESANAN BARU - AYAM GEPREK SAMBAL IJO*\n\n`
    
    message += `📦 *Detail Pesanan:*\n`
    cartItems.forEach((item, index) => {
      const price = item.product.isDiscount && item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price
      message += `${index + 1}. ${item.product.name} x${item.quantity}\n`
      message += `   Rp ${Math.round(price).toLocaleString('id-ID')}\n`
    })
    
    message += `\n💰 *Rincian Pembayaran:*\n`
    message += `Subtotal: Rp ${Math.round(subtotal).toLocaleString('id-ID')}\n`
    if (walletAmount > 0) {
      message += `Penggunaan Saldo: -Rp ${walletAmount.toLocaleString('id-ID')}\n`
    }
    message += `*Total: Rp ${Math.round(total).toLocaleString('id-ID')}*\n\n`
    message += `Terima kasih! 🙏🔥`
    
    return message
  }

  const handleWhatsAppCheckout = async () => {
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    setOrderSuccess(true)
    setIsProcessing(false)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">AYAM GEPREK</h1>
                <p className="text-xs text-orange-600 font-medium">SAMBAL IJO</p>
              </div>
            </Link>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-xl border-0">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Pesanan Berhasil!
                </h2>
                <p className="text-gray-600 mb-4">
                  Pesanan Anda telah dikirim ke WhatsApp. Kami akan segera memproses pesanan Anda.
                </p>
                <div className="space-y-3">
                  <Link href="/">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Pesan Lagi
                    </Button>
                  </Link>
                  <Link href="/dashboard-user">
                    <Button variant="outline" className="w-full">
                      Lihat Riwayat Pesanan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <footer className="bg-gradient-to-br from-orange-700 to-orange-600 text-white py-6 px-4 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2024 Ayam Geprek Sambal Ijo. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
            <span className="text-3xl animate-pulse">🔥</span>
          </div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
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

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 h-10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 py-6 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag className="w-8 h-8 text-white" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Periksa Pesanan
              </h1>
            </div>
            <p className="text-white/90 mt-2">
              Review pesanan Anda sebelum checkout
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Keranjang Belanja
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Keranjang kosong</p>
                        <Link href="/">
                          <Button className="mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                            Mulai Belanja
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      cartItems.map((item) => {
                        const price = item.product.isDiscount && item.product.discount
                          ? item.product.price * (1 - item.product.discount / 100)
                          : item.product.price
                        
                        return (
                          <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl sm:text-3xl">{item.product.category === 'Makanan' ? '🍗' : '🥤'}</span>
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                              {item.product.isDiscount && item.product.discount && (
                                <p className="text-sm text-gray-400 line-through">
                                  Rp {item.product.price.toLocaleString('id-ID')}
                                </p>
                              )}
                              <p className="text-lg font-bold text-orange-600">
                                Rp {Math.round(price).toLocaleString('id-ID')}
                              </p>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.productId)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 hidden sm:flex"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => updateQuantity(item.productId, -1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 rounded-full"
                                  onClick={() => updateQuantity(item.productId, 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="lg:sticky lg:top-24 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle>Ringkasan Pesanan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">Rp {Math.round(subtotal).toLocaleString('id-ID')}</span>
                      </div>

                      {walletBalance > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="use-wallet"
                              checked={useWallet}
                              onCheckedChange={(checked) => setUseWallet(checked as boolean)}
                            />
                            <Label htmlFor="use-wallet" className="cursor-pointer text-sm">
                              Gunakan Saldo
                            </Label>
                          </div>
                          <span className="text-sm text-green-600 font-semibold">
                            {useWallet ? `Rp ${walletAmount.toLocaleString('id-ID')}` : `Rp 0`}
                            <span className="text-gray-400"> / Rp {walletBalance.toLocaleString('id-ID')}</span>
                          </span>
                        </div>
                      )}

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total</span>
                          <motion.span
                            key={total}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-orange-600"
                          >
                            Rp {Math.round(total).toLocaleString('id-ID')}
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleWhatsAppCheckout}
                      disabled={isProcessing}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg font-bold shadow-lg"
                    >
                      {isProcessing ? (
                        'Memproses...'
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Checkout via WhatsApp
                        </>
                      )}
                    </Button>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        Pesanan akan dikirim ke WhatsApp. Pastikan data pengiriman sudah benar.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-orange-700 to-orange-600 text-white py-6 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Ayam Geprek Sambal Ijo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
