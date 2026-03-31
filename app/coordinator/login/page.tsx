'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useClerk } from '@clerk/nextjs'
import Image from 'next/image'

export default function CoordinatorLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { signOut } = useClerk()

  useEffect(() => {
    if (localStorage.getItem('coordinatorToken')) router.replace('/coordinator/dashboard')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/coordinator-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await res.json()
      if (res.ok) {
        await signOut()
        localStorage.setItem('coordinatorToken', data.token)
        localStorage.setItem('coordinatorDistrict', data.user?.district || '')
        router.push('/coordinator/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* LEFT PANEL - same as user login */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 overflow-visible">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-2xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />

        <div className="relative z-10 text-center max-lg:mt-20">
          <div className="mx-auto mb-6 sm:mb-8 w-32 sm:w-40 md:w-48 lg:w-52">
            <Image
              src="/Hero.png"
              alt="SPL Logo"
              width={200}
              height={120}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic uppercase tracking-tighter text-gray-900 dark:text-white mb-2 sm:mb-3 px-2">
            Saroj Premier League
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-body px-4">
            Under-19 Cricket Tournament — Uttar Pradesh
          </p>
          <div className="mt-6 inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full text-xs font-headline font-bold uppercase tracking-wider">
            Coordinator Portal
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - with icon box restored */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-sm">
          {/* Icon Box - back again! */}
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400" style={{ fontSize: '24px' }}>
                shield_person
              </span>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h2 className="font-headline font-black text-3xl sm:text-4xl italic mb-2 uppercase tracking-tighter text-gray-900 dark:text-white">
              Coordinator Access
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-body">
              District Coordinator Sign In
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl font-body mb-4">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="coordinator@spl.com"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/coordinator/forgot-password"
                  className="text-xs text-blue-600 dark:text-blue-400 font-headline font-bold uppercase tracking-widest hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl pl-10 pr-11 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 sm:py-3.5 font-headline font-black uppercase tracking-tight text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign In as Coordinator'
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            <span className="text-xs font-headline font-bold uppercase tracking-widest text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="space-y-3 text-center">
            <Link
              href="/admin/login"
              className="block text-sm font-body text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Admin?{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Login here →</span>
            </Link>
            <Link
              href="/"
              className="block text-xs font-body text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              ← Back to SPL Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}