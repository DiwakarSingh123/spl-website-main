'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Sponsor { 
  id: string; 
  name: string; 
  tier: string; 
  logoUrl?: string; 
  website?: string 
}

const packages = [
  { 
    tier: 'Title Sponsor', 
    amount: '₹50L+', 
    perks: ['Tournament naming rights', 'Maximum brand visibility', 'VIP hospitality', 'Media partnerships'] 
  },
  { 
    tier: 'Official Partner', 
    amount: '₹20L+', 
    perks: ['Category exclusivity', 'Stadium branding', 'Digital presence', 'Hospitality packages'] 
  },
  { 
    tier: 'Associate', 
    amount: '₹5L+', 
    perks: ['Logo placement', 'Website listing', 'Social media mentions', 'Networking opportunities'] 
  },
]

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  useEffect(() => {
    fetch('/api/admin/sponsors')
      .then(r => r.json())
      .then(data => { 
        if (Array.isArray(data)) setSponsors(data.filter((s: Sponsor & { active: boolean }) => s.active)) 
      })
  }, [])

  const title = sponsors.filter(s => s.tier === 'TITLE')
  const official = sponsors.filter(s => s.tier === 'OFFICIAL')
  const associate = sponsors.filter(s => s.tier === 'ASSOCIATE')

  const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-3xl p-8 text-center transition-all shadow-sm"
    >
      {sponsor.logoUrl ? (
        <img 
          src={sponsor.logoUrl} 
          alt={sponsor.name} 
          className="h-16 w-auto object-contain mx-auto mb-6" 
        />
      ) : (
        <div className="h-16 flex items-center justify-center mb-6">
          <span className="font-headline font-bold text-xl text-gray-800 dark:text-gray-100">{sponsor.name}</span>
        </div>
      )}
      
      {sponsor.website && (
        <a 
          href={sponsor.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-blue-600 dark:text-blue-400 font-headline hover:underline inline-block"
        >
          Visit Website →
        </a>
      )}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 transition-colors duration-300">

      {/* Hero */}
      <section className="relative py-16 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Abstract shapes */}
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
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6"
            >
              <span className="material-symbols-outlined text-white text-3xl">handshake</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • PARTNERS</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              OUR <span className="text-blue-600 dark:text-blue-400">SPONSORS</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base">
              Proud partners supporting youth cricket in Uttar Pradesh
            </p>
          </motion.div>
        </div>
      </section>

      {/* Title Sponsor */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-blue-600 dark:text-blue-400 text-xl">🏆</span>
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Title Sponsor</h2>
          </div>

          {title.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {title.map(s => <SponsorCard key={s.id} sponsor={s} />)}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm">
              <div className="font-headline font-black text-2xl uppercase text-blue-600 dark:text-blue-400">SAROJ INTERNATIONAL UNIVERSITY</div>
              <p className="text-gray-600 dark:text-gray-400 mt-3">Academic Partner & Title Sponsor</p>
            </div>
          )}
        </div>
      </section>

      {/* Official Partners */}
      {official.length > 0 && (
        <section className="py-16 px-5 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Official Partners</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {official.map(s => <SponsorCard key={s.id} sponsor={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Associate Sponsors */}
      {associate.length > 0 && (
        <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Associate Sponsors</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {associate.map(s => <SponsorCard key={s.id} sponsor={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Sponsorship Packages */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Sponsorship Packages</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white dark:bg-gray-800 border rounded-3xl p-8 shadow-sm ${i === 0 ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}`}
              >
                <h3 className={`font-headline font-black text-xl uppercase tracking-tighter mb-4 ${i === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>
                  {p.tier}
                </h3>
                <div className={`text-4xl font-black mb-8 ${i === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {p.amount}
                </div>
                <ul className="space-y-4">
                  {p.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-headline font-black text-4xl sm:text-5xl italic uppercase tracking-tighter mb-6 text-white">
            Become a <span className="text-yellow-300">Sponsor</span>
          </h2>
          <p className="text-blue-100 dark:text-blue-200 mb-8">
            Join hands in nurturing young cricket talent across Uttar Pradesh
          </p>
          
          <div className="text-blue-100 dark:text-blue-200 text-sm mb-8 space-y-1">
            <p>Email: <span className="text-yellow-300">info@splcricket.com</span></p>
            <p>Phone: <span className="text-yellow-300">+91 98765 43210</span></p>
          </div>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-800 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-yellow-300 font-headline font-black uppercase tracking-tight rounded-2xl px-12 py-4 transition-all shadow-lg"
            >
              Contact Sponsorship Team
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}