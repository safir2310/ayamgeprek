'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Lock, Mail, Phone, ArrowLeft, Eye, EyeOff, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterAdminPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    birthDate: '',
    verificationCode: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration
    setTimeout(() => {
      setShowSuccess(true)
      setIsLoading(false)
      
      // Auto redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }, 1000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
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

        <section className="bg-gradient-to-br from-green-500 via-green-400 to-emerald-400 py-6 sm:py-8 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Pendaftaran Berhasil!
            </h1>
          </div>
        </section>

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
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Akun Admin Berhasil Dibuat!
                </h2>
                <p className="text-gray-600 mb-6">
                  Anda akan dialihkan ke halaman login dalam beberapa detik...
                </p>
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 via-green-400 to-emerald-400 py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Daftar Admin Baru
            </h1>
            <p className="text-base sm:text-lg text-white/90 font-medium">
              Kelola toko dengan mudah dan efisien
            </p>
          </motion.div>
        </div>
      </section>

      {/* Register Form */}
      <section className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                Daftar sebagai Admin
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-green-600 font-semibold hover:underline">
                  Masuk Sekarang
                </Link>
              </p>
            </CardHeader>

            <CardContent className="pt-4 px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Masukkan username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="pl-12 h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    No HP
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="Masukkan nomor HP"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12 h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="pl-12 h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12 pr-12 h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-8 w-8 flex items-center justify-center"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Kode Verifikasi
                  </label>
                  <Input
                    type="text"
                    placeholder="Masukkan kode verifikasi"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    className="h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base sm:text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                >
                  {isLoading ? 'Memproses...' : 'Daftar Admin'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
