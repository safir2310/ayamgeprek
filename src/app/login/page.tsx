'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Lock, ArrowLeft, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  // Rate limiting
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  // Check if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (user && token) {
      // Redirect based on role
      const userData = JSON.parse(user)
      if (userData.role === 'admin') {
        router.push('/dashboard-admin')
      } else {
        router.push(redirectUrl || '/dashboard-user')
      }
    }
  }, [router, redirectUrl])

  // Handle lock timer
  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const timer = setInterval(() => {
        setLockTimer(prev => {
          if (prev <= 1) {
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
    return undefined
  }, [isLocked, lockTimer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    
    // Check if locked
    if (isLocked) {
      setErrorMessage('Terlalu banyak percobaan. Coba lagi dalam ' + lockTimer + ' detik.')
      return
    }
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setErrorMessage('Username dan password harus diisi')
      return
    }

    if (formData.username.length < 3) {
      setErrorMessage('Username minimal 3 karakter')
      return
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password minimal 6 karakter')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo: Check credentials (In production, this would be an API call)
      // Admin credentials: admin / admin123
      // User credentials: user / user123
      
      const isAdmin = formData.username.toLowerCase() === 'admin' && formData.password === 'admin123'
      const isUser = formData.username.toLowerCase() === 'user' && formData.password === 'user123'
      
      if (!isAdmin && !isUser) {
        // Increment login attempts
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        
        // Lock after 5 failed attempts
        if (newAttempts >= 5) {
          setIsLocked(true)
          setLockTimer(60) // Lock for 60 seconds
          setErrorMessage('Terlalu banyak percobaan. Akun dikunci selama 1 menit.')
        } else {
          setErrorMessage(`Username atau password salah. Percobaan tersisa: ${5 - newAttempts}`)
        }
        setIsLoading(false)
        return
      }
      
      // Create user session
      const userData = {
        id: isAdmin ? 'admin-1' : 'user-1',
        username: formData.username,
        role: isAdmin ? 'admin' : 'user',
        email: isAdmin ? 'admin@ayamgeprek.com' : 'user@ayamgeprek.com',
        phone: '085260812758',
        name: isAdmin ? 'Admin Toko' : 'User Demo',
        memberLevel: 'Silver'
      }
      
      // Generate simple token (in production, use JWT from backend)
      const token = btoa(JSON.stringify({
        userId: userData.id,
        username: userData.username,
        role: userData.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }))
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
      
      // Reset login attempts on success
      setLoginAttempts(0)
      
      // Redirect based on role
      if (isAdmin) {
        router.push('/dashboard-admin')
      } else {
        router.push(redirectUrl || '/dashboard-user')
      }
      
    } catch (error) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
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
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Selamat Datang Kembali
            </h1>
            <p className="text-base sm:text-lg text-white/90 font-medium">
              Masuk untuk pesan menu favoritmu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
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
                Masuk ke Akun
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Belum punya akun?{' '}
                <Link href="/register" className="text-orange-600 font-semibold hover:underline">
                  Daftar Sekarang
                </Link>
              </p>
            </CardHeader>

            <CardContent className="pt-4 px-4 sm:px-6">
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </motion.div>
              )}

              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2"
                >
                  <Lock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-700">
                    Akun dikunci selama <span className="font-bold">{lockTimer}</span> detik
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                      className="pl-12 h-12 sm:h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
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
                      className="pl-12 pr-12 h-12 sm:h-12 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      required
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 sm:h-12 text-base sm:text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>

              {/* Demo Credentials Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-2">🔐 Demo Credentials:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Admin:</strong> username: <code>admin</code> / password: <code>admin123</code></p>
                  <p><strong>User:</strong> username: <code>user</code> / password: <code>user123</code></p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Tabs defaultValue="user" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-11 sm:h-12">
                    <TabsTrigger value="user" className="text-sm font-semibold">
                      <User className="w-4 h-4 mr-2" />
                      User
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="text-sm font-semibold">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="user" className="mt-4">
                    <p className="text-sm text-gray-600 text-center mb-3">
                      Belum punya akun user?
                    </p>
                    <Link href="/register" className="block">
                      <Button className="w-full h-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold">
                        <User className="w-4 h-4 mr-2" />
                        Daftar User
                      </Button>
                    </Link>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-4">
                    <p className="text-sm text-gray-600 text-center mb-3">
                      Belum punya akun admin?
                    </p>
                    <Link href="/register-admin" className="block">
                      <Button className="w-full h-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold">
                        <Shield className="w-4 h-4 mr-2" />
                        Daftar Admin
                      </Button>
                    </Link>
                  </TabsContent>
                </Tabs>
              </div>

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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
            <span className="text-3xl animate-pulse">🔥</span>
          </div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
