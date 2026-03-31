'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  active: boolean
  createdAt: string
}

// Type badges – using Tailwind classes with dark variants
const typeBadge: Record<string, string> = {
  INFO: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
  IMPORTANT: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30',
  UPDATE: 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30',
}

const staticNews = [
  { id: 1, title: 'SPL Registration Opens', excerpt: 'Team and individual registrations are now open for Saroj Premier League Under-19 tournament.', date: '2025-02-15', category: 'Registration' },
  { id: 2, title: 'Ekana Stadium Confirmed as Final Venue', excerpt: 'The grand finale of SPL will be held at the prestigious Ekana Cricket Stadium in Lucknow.', date: '2025-02-10', category: 'Venue' },
  { id: 3, title: 'Prize Money ₹11 Lakhs Announced', excerpt: 'Winner prize money is ₹11,00,000 making it the biggest U19 tournament in UP.', date: '2025-02-08', category: 'Prize' },
  { id: 4, title: '50% Scholarship for All Participants', excerpt: 'Every player participating in SPL will be eligible for 50% scholarship at Saroj International University.', date: '2025-02-05', category: 'Scholarship' },
]

export default function News() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/announcements')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setAnnouncements(data.filter((a: Announcement) => a.active))
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 overflow-x-hidden transition-colors duration-300">

      {/* HERO - with abstract shapes */}
      <section className="relative py-20 md:py-28 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg"
            >
              <span className="material-symbols-outlined text-white text-5xl">newspaper</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[4px] text-blue-600 dark:text-blue-400 text-sm mb-3">SPL 2026 • LIVE FIXTURES</p>
            <h1 className="font-headline font-black max-md:text-4xl text-5xl md:text-7xl italic uppercase tracking-[-4px] leading-[0.85] text-gray-900 dark:text-white">
              NEWS &amp; <span className="text-blue-600 dark:text-blue-400">ANNOUNCEMENTS</span>
            </h1>
            <p className="mt-6 max-w-md sm:max-w-lg text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl px-4">
              Stay ahead of the game with the latest from Saroj Premier League
            </p>
          </motion.div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/10 to-transparent pointer-events-none" />
      </section>

      {/* OFFICIAL ANNOUNCEMENTS - Modern pinned feed */}
      <section className="py-12 sm:py-16 bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8 sm:mb-12"
          >
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div className="w-8 h-px bg-red-500" />
            <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase tracking-tighter">Official Announcements</h2>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"
              />
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid gap-4 sm:gap-6">
              {announcements.map((ann, i) => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-start gap-6 shadow-sm"
                >
                  <div className={`text-xs font-headline font-black uppercase tracking-widest px-5 py-2 border rounded-2xl w-fit ${typeBadge[ann.type] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'}`}>
                    {ann.type}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-xl sm:text-2xl uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {ann.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 text-base leading-relaxed">{ann.content}</p>
                  </div>

                  <span className="text-xs font-headline text-gray-500 dark:text-gray-500 whitespace-nowrap mt-1 sm:mt-2">
                    {new Date(ann.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl"
            >
              <span className="text-6xl mb-6 block">📢</span>
              <p className="font-headline font-black text-2xl text-gray-600 dark:text-gray-400">No announcements yet</p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">We&apos;ll post the latest updates here</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURED NEWS - Beautiful grid + list */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8 sm:mb-12"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Latest News</h2>
          </motion.div>

          {/* Featured big cards (first 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {staticNews.slice(0, 2).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="h-48 sm:h-56 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative">
                  <span className="font-headline font-black text-4xl italic uppercase text-blue-300 dark:text-blue-500/30 group-hover:text-blue-400 dark:group-hover:text-blue-400/50 transition-colors tracking-widest">
                    SPL NEWS
                  </span>
                  <div className="absolute top-6 right-6 px-4 py-1 bg-blue-600 text-white text-xs font-black uppercase rounded-2xl">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-headline font-black text-2xl uppercase tracking-tighter mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">{item.excerpt}</p>
                  <p className="text-xs font-headline text-gray-500 dark:text-gray-500">
                    {new Date(item.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full list - mobile friendly */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200  dark:border-gray-700 rounded-3xl divide-y divide-gray-100 dark:divide-gray-700 shadow-sm">
            {staticNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                // whileHover={{ backgroundColor: 'gray' }}
                className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="px-4 py-1 text-xs font-headline font-black  uppercase tracking-widest border border-blue-300 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-2xl w-fit">
                  {item.category}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-lg sm:text-xl uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{item.excerpt}</p>
                </div>

                <span className="text-xs font-headline text-gray-500 dark:text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
                  {new Date(item.date).toLocaleDateString('en-IN')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}