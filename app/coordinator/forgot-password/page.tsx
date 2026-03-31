'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send reset email. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Card container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Icon Box */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400" style={{ fontSize: '24px' }}>
                lock_reset
              </span>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="font-headline font-black text-3xl sm:text-4xl italic uppercase tracking-tighter text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-body">
              Enter your coordinator email to receive a reset link
            </p>
          </div>

          {sent ? (
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 px-5 py-4 text-sm font-body rounded-xl flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5" style={{ fontSize: '18px' }}>mark_email_read</span>
              <div>
                <p className="font-bold mb-1">Reset link sent!</p>
                <p className="text-green-600 dark:text-green-400/80">Check your email inbox. The link expires in 1 hour.</p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 font-body mb-4">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="coordinator@spl.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
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
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <Link
              href="/coordinator/login"
              className="text-sm font-body text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back to Coordinator Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}