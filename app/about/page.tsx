'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { value: '₹11L', label: 'Winner Prize' },
  { value: '50%', label: 'Scholarship' },
  { value: '1 Month', label: 'Duration' },
  { value: 'Ekana', label: 'Grand Final' },
]

const features = [
  { icon: '🏆', title: '₹11,00,000 Prize', desc: 'Massive winner prize money for the champion team' },
  { icon: '🎓', title: '50% Scholarship', desc: 'All participating players eligible for university scholarship' },
  { icon: '📅', title: '1 Month Duration', desc: 'Comprehensive tournament spanning across the state' },
  { icon: '📍', title: 'Ekana Stadium Final', desc: "Grand finale at Lucknow's premier cricket venue" },
  { icon: '👥', title: 'Statewide Participation', desc: 'Teams from all districts of Uttar Pradesh' },
  { icon: '⭐', title: 'Professional Standards', desc: 'Tournament conducted with professional cricket standards' },
]

const reasons = [
  { title: 'Educational Benefits', desc: '50% scholarship opportunity at Saroj International University' },
  { title: 'Professional Exposure', desc: 'Play at professional venues with standard equipment' },
  { title: 'Skill Development', desc: 'Learn from experienced coaches and mentors' },
  { title: 'Network Building', desc: 'Connect with fellow cricketers and sports professionals' },
  { title: 'Recognition', desc: 'State-level recognition and media coverage' },
]

export default function AboutPage() {
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
              <span className="material-symbols-outlined text-white text-5xl">emoji_events</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[4px] text-blue-600 dark:text-blue-400 text-sm mb-3">SPL 2026 • LIVE FIXTURES</p>
            <h1 className="font-headline font-black text-6xl md:text-7xl italic uppercase tracking-[-4px] leading-[0.85] text-gray-900 dark:text-white">
              SAROJ <span className="text-blue-600 dark:text-blue-400">PREMIER LEAGUE</span>
            </h1>
            <p className="mt-6 max-w-md sm:max-w-lg text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl px-4 leading-relaxed">
              Uttar Pradesh&apos;s most prestigious Under-19 cricket tournament for Class 12 students
            </p>
          </motion.div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/10 to-transparent pointer-events-none" />
      </section>

      {/* STATS - Floating glass cards */}
      <section className="py-12 sm:py-16 bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center group shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-headline font-black text-blue-600 dark:text-blue-400 mb-3 group-hover:text-blue-500 transition-colors">
                  {s.value}
                </div>
                <div className="text-xs font-headline font-black uppercase tracking-[2px] text-gray-600 dark:text-gray-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Tournament Overview</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              The Saroj Premier League (SPL) is a prestigious Under-19 cricket tournament organized by Saroj Educational Group in partnership with Saroj International University. This statewide tournament is exclusively designed for Class 12 students across Uttar Pradesh, providing them with a platform to showcase their cricketing talent while pursuing their education.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              With a duration of one month, SPL features simultaneous district-level matches culminating in a grand finale at the iconic Ekana Cricket Stadium in Lucknow. The tournament bridges sports and academics, offering every participant a 50% scholarship regardless of performance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS - Premium feature cards */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8 sm:mb-12"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Key Highlights</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px #3b82f6' }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all group shadow-sm"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="font-headline font-black text-xl uppercase mb-3 text-gray-800 dark:text-white">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border-l-8 border-blue-600 dark:border-blue-400 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">flag</span>
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter text-blue-600 dark:text-blue-400">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              To provide a premier platform for young cricketers in Uttar Pradesh to showcase their talent, develop their skills, and pursue their dreams while maintaining focus on their academic excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border-l-8 border-gray-300 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-3xl text-gray-500 dark:text-gray-400">visibility</span>
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter text-gray-800 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              To become the most prestigious Under-19 cricket tournament in India, nurturing future cricket stars while promoting education and sportsmanship among the youth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY PARTICIPATE */}
      <section className="py-16 sm:py-20 bg-white/80 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8 sm:mb-12"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Why Participate in SPL?</h2>
          </motion.div>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 group shadow-sm"
              >
                <div className="font-headline font-black text-4xl text-blue-300 dark:text-blue-500/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors w-10 flex-shrink-0">
                  0{i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-bold uppercase text-lg sm:text-xl mb-2 text-gray-800 dark:text-white">{r.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">

        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

        <div className="max-w-2xl mx-auto text-center relative z-10">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline font-black italic uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 text-white"
          >
            Ready to <span className="text-yellow-300">Join the League?</span>
          </motion.h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

            <Link href="/register?type=team" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
    w-full sm:w-auto 
    bg-white text-blue-600 
    hover:text-white
    font-semibold sm:font-bold uppercase tracking-wide
    text-sm sm:text-base lg:text-lg
    rounded-full sm:rounded-2xl
    px-6 sm:px-8 lg:px-10 py-3 sm:py-4
    shadow-lg transition-all duration-300

    bg-gradient-to-r from-white to-white 
    hover:from-blue-600 hover:to-indigo-600
  "
              >
                Register Team
              </motion.button>
            </Link>

            <Link href="/register?type=individual" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600
          font-semibold sm:font-bold uppercase tracking-wide
          text-sm sm:text-base lg:text-lg
          rounded-full sm:rounded-2xl
          px-6 sm:px-8 lg:px-10 py-3 sm:py-4
          transition-all"
              >
                Register Individual
              </motion.button>
            </Link>

          </div>

        </div>
      </section>
    </div>
  )
}