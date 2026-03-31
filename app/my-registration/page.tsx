'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Registration {
  type: 'team' | 'individual'
  registrationId: string
  name: string
  district: string
  status?: string
  playerCount?: number
  players?: { id: string; name: string; role: string; phone: string; district: string; schoolCollege: string; isIndividual: boolean }[]
  payment?: { status: string; transactionId: string; amount: number } | null
  role?: string
  teamAssigned?: boolean
  assignedTeam?: {
    name: string
    district: string
    schoolCollege: string
    managerName: string | null
    managerPhone: string | null
    coachName: string | null
    coachPhone: string | null
    contactEmail: string | null
    registrationId: string
  } | null
  createdAt: string
}

// Status colors – keep semantic colors but use Tailwind light/dark variants
const statusMap: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  APPROVED:  { icon: 'check_circle',  color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30', label: 'Approved'      },
  PENDING:   { icon: 'schedule',      color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30', label: 'Pending Review'},
  REJECTED:  { icon: 'cancel',        color: 'text-red-600 dark:text-red-400',       bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30', label: 'Rejected'      },
  COMPLETED: { icon: 'verified',      color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30', label: 'Completed'     },
}

export default function MyRegistrationPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) { router.push('/sign-in'); return }
    fetch('/api/my-registration')
      .then(r => r.json())
      .then(d => { setRegistration(d.registration); setLoading(false) })
      .catch(() => setLoading(false))
  }, [isLoaded, isSignedIn, router])

  const copyId = () => {
    if (!registration?.registrationId) return
    navigator.clipboard.writeText(registration.registrationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isLoaded || loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <span className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
    </div>
  )

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
              <span className="material-symbols-outlined text-white text-3xl">assignment</span>
            </div>
            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • DASHBOARD</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              My <span className="text-blue-600 dark:text-blue-400">Registration</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base">
              Track your SPL registration status
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-12">

        {!registration ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-blue-300 dark:text-blue-500/30 text-7xl mb-6 block">emoji_events</span>
            <h2 className="font-headline font-black text-2xl uppercase tracking-tighter mb-3">No Registration Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">You haven't registered for SPL yet. Join the tournament today!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=team" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-headline font-black uppercase tracking-tight rounded-2xl transition-all shadow-md">
                Register as Team
              </Link>
              <Link href="/register?type=individual" className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 px-8 py-4 font-headline font-black uppercase tracking-tight rounded-2xl transition-all">
                Register as Individual
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Registration Header */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">REGISTRATION ID</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="font-headline font-black text-2xl tracking-wider text-blue-600 dark:text-blue-400">{registration.registrationId}</p>
                    <button 
                      onClick={copyId} 
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
                    </button>
                  </div>
                </div>

                <div className={`px-6 py-2 text-xs font-headline font-black uppercase tracking-widest rounded-2xl border self-start sm:self-auto ${
                  registration.type === 'team' 
                    ? 'text-blue-600 dark:text-blue-400 border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' 
                    : 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10'
                }`}>
                  {registration.type.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm">
                <div>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">NAME</p>
                  <p className="font-headline font-bold text-gray-800 dark:text-white">{registration.name}</p>
                </div>
                <div>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">DISTRICT</p>
                  <p className="font-headline font-bold text-gray-800 dark:text-white">{registration.district}</p>
                </div>
                <div>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">REGISTERED ON</p>
                  <p className="font-headline font-bold text-gray-800 dark:text-white">{new Date(registration.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                {registration.type === 'team' && registration.playerCount && (
                  <div>
                    <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">PLAYERS</p>
                    <p className="font-headline font-bold text-gray-800 dark:text-white">{registration.playerCount} / 15</p>
                  </div>
                )}
                {registration.type === 'individual' && registration.role && (
                  <div>
                    <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">ROLE</p>
                    <p className="font-headline font-bold text-gray-800 dark:text-white">{registration.role.replace('_', ' ')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Card */}
            {registration.status && (
              <div className={`rounded-3xl p-8 border ${statusMap[registration.status]?.bg || 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center gap-4">
                  <span className={`material-symbols-outlined text-4xl ${statusMap[registration.status]?.color || 'text-blue-600 dark:text-blue-400'}`}>
                    {statusMap[registration.status]?.icon || 'schedule'}
                  </span>
                  <div>
                    <p className="text-xs font-headline font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">STATUS</p>
                    <p className={`font-headline font-black text-2xl uppercase ${statusMap[registration.status]?.color || 'text-blue-600 dark:text-blue-400'}`}>
                      {statusMap[registration.status]?.label || 'Pending'}
                    </p>
                  </div>
                </div>
                {registration.status === 'PENDING' && (
                  <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">Your registration is under review. You will be notified via email once approved.</p>
                )}
                {registration.status === 'REJECTED' && (
                  <p className="text-red-600 dark:text-red-400 mt-4 text-sm">Your registration was rejected. Please contact info@splcricket.com for details.</p>
                )}
              </div>
            )}

            {/* Squad for Team */}
            {registration.type === 'team' && registration.players && registration.players.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
                <h3 className="font-headline font-black uppercase tracking-tighter mb-6 text-gray-800 dark:text-white">Your Squad ({registration.players.length} players)</h3>
                <div className="space-y-4">
                  {registration.players.map((player, idx) => (
                    <div key={player.id} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">{idx + 1}</div>
                      <div className="flex-1">
                        <p className="font-headline font-bold text-gray-800 dark:text-white">{player.name}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{player.role.replace('_', ' ')}</p>
                      </div>
                      {player.isIndividual && (
                        <span className="text-xs px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30 rounded-xl">Individual</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Team Assignment */}
            {registration.type === 'individual' && registration.assignedTeam && (
              <div className="bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-500/30 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">groups</span>
                  <div>
                    <p className="text-xs font-headline font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">ASSIGNED TEAM</p>
                    <p className="font-headline font-black text-2xl text-blue-600 dark:text-blue-400">{registration.assignedTeam.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Contact your team manager immediately to confirm availability and get practice schedule details.</p>
              </div>
            )}

            {/* Payment Status */}
            {(registration.type === 'team' || registration.type === 'individual') && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
                <h3 className="font-headline font-black uppercase tracking-tighter mb-4 text-gray-800 dark:text-white">Payment Status</h3>
                {registration.payment ? (() => {
                  const s = statusMap[registration.payment.status] || statusMap.PENDING
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${s.color}`} style={{ fontSize: '20px' }}>{s.icon}</span>
                        <span className={`font-headline font-bold uppercase ${s.color}`}>{s.label}</span>
                      </div>
                      <span className="font-headline font-black text-blue-600 dark:text-blue-400">₹{registration.payment.amount.toLocaleString('en-IN')}</span>
                    </div>
                  )
                })() : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400" style={{ fontSize: '20px' }}>schedule</span>
                      <span className="font-headline font-bold uppercase text-amber-600 dark:text-amber-400">Payment Pending</span>
                    </div>
                    <Link href="/register" className="text-xs font-headline font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      Complete <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Help Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-6 text-center text-sm text-gray-600 dark:text-gray-300">
              Need help? Contact us at{' '}
              <a href="mailto:info@splcricket.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">info@splcricket.com</a>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}