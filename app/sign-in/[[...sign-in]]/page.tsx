'use client'

import { useSignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) {
      setError('Auth not ready, please wait a moment and try again.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        const redirect = searchParams.get('redirect_url') || '/register'
        window.location.href = redirect
      } else {
        setError('Sign in incomplete. Please try again.')
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { code?: string; message: string; longMessage?: string }[] })?.errors?.[0]
      if (msg?.code === 'strategy_for_user_invalid') {
        setError('This account was created with Google. Please use "Continue with Google" below.')
      } else {
        setError(msg?.longMessage || msg?.message || 'Invalid email or password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    // Main container: column on mobile, row on large screens
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* LEFT PANEL - upar on mobile, left on desktop */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 overflow-visible">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-2xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
        
        <div className="relative z-10 text-center max-lg:mt-20">
          {/* Responsive Image - size changes on different screens */}
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
          
          {/* Responsive text sizes */}
          <h1 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic uppercase tracking-tighter text-gray-900 dark:text-white mb-2 sm:mb-3 px-2">
            Saroj Premier League
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-body px-4">
            Under-19 Cricket Tournament — Uttar Pradesh
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - form, neeche on mobile */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h2 className="font-headline font-black text-3xl sm:text-4xl italic mb-2 uppercase tracking-tighter text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-body">
              Sign in to register for the tournament
            </p>
          </div>

          {!isLoaded && (
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4 font-body">
              <span className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
              Loading...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">mail</span>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="you@example.com"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base">lock</span>
                <input 
                  type={showPass ? 'text' : 'password'} 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl pl-10 pr-11 py-2.5 sm:py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">{showPass ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            
            <div className="flex justify-end -mt-1">
              <a href="/forgot-password" className="text-xs text-blue-600 dark:text-blue-400 font-headline font-bold uppercase tracking-widest">
                Forgot password?
              </a>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl font-body">
                <span className="material-symbols-outlined text-sm">error</span>{error}
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
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            <span className="text-xs font-headline font-bold uppercase tracking-widest text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          <button
            onClick={() => signIn?.authenticateWithRedirect({ strategy: 'oauth_google', redirectUrl: '/sso-callback', redirectUrlComplete: searchParams.get('redirect_url') || '/register' })}
            disabled={!isLoaded}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 sm:py-3.5 font-headline font-bold uppercase tracking-tight text-sm hover:border-blue-500 hover:bg-gray-50 transition-all rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6 font-body">
            Don&apos;t have an account?{' '}
            <a href="/sign-up" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <span className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}