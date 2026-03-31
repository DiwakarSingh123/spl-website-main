'use client'

import { useSignIn } from '@clerk/nextjs'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) {
      setError('Auth not ready, please wait a moment and try again.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signIn.create({ strategy: 'reset_password_email_code', identifier: email })
      setStep('reset')
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setError(msg || 'Email not found')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) return
    setLoading(true)
    setError('')
    try {
      const result = await signIn.attemptFirstFactor({ strategy: 'reset_password_email_code', code, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        window.location.href = '/register'
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setError(msg || 'Invalid code or password')
    } finally {
      setLoading(false)
    }
  }

  // Shared input classes (matching login page)
  const inputClasses =
    'w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all'
  const labelClasses =
    'block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider mb-1.5'

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
              {step === 'email' ? 'Forgot Password' : 'Reset Password'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-body">
              {step === 'email'
                ? 'Enter your email to receive a reset code'
                : `Code sent to ${email}`}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <label className={labelClasses}>Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClasses + ' pl-10'}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 font-body">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !isLoaded}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 sm:py-3.5 font-headline font-black uppercase tracking-tight text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className={labelClasses}>Verification Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 sm:py-3 text-center tracking-[0.5em] font-headline font-black text-lg placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className={labelClasses}>New Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">
                    lock
                  </span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={inputClasses + ' pl-10 pr-11'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 font-body">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code.length < 6}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 sm:py-3.5 font-headline font-black uppercase tracking-tight text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resetting…
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <a
              href="/sign-in"
              className="text-sm font-body text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}