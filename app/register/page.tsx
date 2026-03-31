'use client'

import { useEffect, useState, Suspense } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TeamRegistrationForm from '@/components/TeamRegistrationForm'
import IndividualRegistrationForm from '@/components/IndividualRegistrationForm'

function RegisterInner() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [registrationType, setRegistrationType] = useState<'team' | 'individual'>('team')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'individual') setRegistrationType('individual')
  }, [searchParams])

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) { setChecking(false); return }
    fetch('/api/my-registration')
      .then(r => r.json())
      .then(d => {
        if (d.registration) router.replace('/my-registration')
        else setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || checking) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <span className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
    </div>
  )

  if (!isSignedIn) {
    router.push('/sign-in?redirect_url=/register')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 transition-colors duration-300">

      {/* Hero with abstract shapes */}
      <section className="relative py-16 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-white text-3xl">app_registration</span>
            </div>
            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • JOIN NOW</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              REGISTER FOR <span className="text-blue-600 dark:text-blue-400">SPL</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base">
              Choose your registration type and secure your spot
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12">

        {/* Type Selector */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => setRegistrationType('team')}
            className={`p-8 border-2 rounded-3xl text-left transition-all ${
              registrationType === 'team' 
                ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/5' 
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className={`material-symbols-outlined text-4xl ${
                registrationType === 'team' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}>groups</span>
              <h3 className={`font-headline font-black uppercase tracking-tighter text-xl ${
                registrationType === 'team' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'
              }`}>
                Team Registration
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Already have a team? Register with complete squad</p>
            <div className="text-blue-600 dark:text-blue-400 font-headline font-black text-lg">₹11,000</div>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => setRegistrationType('individual')}
            className={`p-8 border-2 rounded-3xl text-left transition-all ${
              registrationType === 'individual' 
                ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/5' 
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className={`material-symbols-outlined text-4xl ${
                registrationType === 'individual' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}>person</span>
              <h3 className={`font-headline font-black uppercase tracking-tighter text-xl ${
                registrationType === 'individual' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'
              }`}>
                Individual Registration
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Don't have a team? We'll assign you to a district team</p>
            <div className="text-blue-600 dark:text-blue-400 font-headline font-black text-lg">₹1,000</div>
          </motion.button>
        </div>

        {registrationType === 'team' ? <TeamRegistrationForm /> : <IndividualRegistrationForm />}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
      </div>
    }>
      <RegisterInner />
    </Suspense>
  )
}