'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const phases = [
  {
    num: '01', week: 'Week 1–2', title: 'District Level', color: 'text-blue-600 dark:text-blue-400',
    desc: 'All registered teams compete within their respective districts.',
    points: ['Round-robin format within districts', 'Top 2 teams from each district qualify', 'Matches conducted at local grounds'],
  },
  {
    num: '02', week: 'Week 3', title: 'Zonal Championships', color: 'text-gray-600 dark:text-gray-400',
    desc: 'District winners compete in zonal championships.',
    points: ['4 zones: East, West, North, South UP', 'Knockout format', 'Zone winners advance to state level'],
  },
  {
    num: '03', week: 'Week 4', title: 'State Semi-Finals', color: 'text-blue-600 dark:text-blue-400',
    desc: 'Final phase with semi-finals and grand finale.',
    points: ['Semi-finals: 4 zone winners', 'Grand Final at Ekana Cricket Stadium', 'Live streaming and media coverage'],
  },
  {
    num: '04', week: 'Final', title: 'Ekana Grand Final', color: 'text-blue-600 dark:text-blue-400',
    desc: 'The ultimate showdown at Lucknow\'s premier cricket venue.',
    points: ['₹11,00,000 winner prize', '50% scholarship for all participants', 'State-level media coverage'],
  },
]

const rules = [
  { label: 'Format', value: '20 Overs per side' },
  { label: 'Powerplay', value: 'First 6 overs' },
  { label: 'Max overs/bowler', value: '4 overs' },
  { label: 'Rain rule', value: 'DLS Method' },
  { label: 'Team size', value: 'Max 15 players' },
  { label: 'Ball', value: 'Leather ball only' },
]

const equipment = [
  'Standard cricket whites or colored clothing',
  'Protective gear mandatory (helmet, pads, gloves)',
  'Only leather balls will be used',
  'Bat specifications as per ICC guidelines',
]

const notes = [
  'DLS method for rain-affected matches',
  'No ball and wide ball penalties as per ICC rules',
  'Umpire decisions are final',
  'Players must carry original documents',
]

export default function TournamentFormat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 overflow-x-hidden transition-colors duration-300">

      {/* HERO - with abstract shapes like homepage */}
      <section className="relative py-16 md:py-24 lg:py-28 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg"
            >
              <span className="material-symbols-outlined text-white text-4xl sm:text-5xl">format_list_bulleted</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] sm:tracking-[4px] text-blue-600 dark:text-blue-400 text-xs sm:text-sm mb-3">SPL 2026 • TOURNAMENT</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] sm:tracking-[-4px] leading-[0.9] text-gray-900 dark:text-white px-2">
              TOURNAMENT <span className="text-blue-600 dark:text-blue-400">FORMAT</span>
            </h1>
            <p className="mt-6 max-w-md sm:max-w-lg text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
             SPL Under-19 Cricket Tournament Structure — District to Ekana
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/10 to-transparent pointer-events-none" />
      </section>

      {/* PHASES - Modern connected cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mb-4" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter italic">Tournament Phases</h2>
            </div>
          </motion.div>

          <div className="space-y-6 sm:space-y-8 mt-6">
            {phases.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden group shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Left badge column */}
                  <div className="md:col-span-3 bg-gray-50 dark:bg-gray-900 p-8 flex flex-col items-center md:items-start justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                    <div className="text-7xl font-headline font-black text-blue-200 dark:text-blue-800/30 group-hover:text-blue-400 dark:group-hover:text-blue-500/50 transition-colors">
                      {p.num}
                    </div>
                    <div className="text-xs font-headline font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400 mt-3">{p.week}</div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9 p-8 sm:p-10">
                    <h3 className={`font-headline font-black text-2xl sm:text-2.5xl uppercase tracking-tighter mb-2 ${p.color}`}>
                      {p.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-3">{p.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-1 gap-y-1 gap-x-6 text-sm">
                      {p.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MATCH RULES - Glass cards */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mb-4" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter italic mb-10">Match Rules</h2>
            </div>
          </motion.div>

          {/* Rules grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {rules.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, boxShadow: '0 0 20px #3b82f6' }}
                className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-3xl p-5 text-center hover:border-blue-600 dark:hover:border-blue-400 transition-all"
              >
                <div className="text-2xl sm:text-2.5xl font-headline font-black text-blue-600 dark:text-blue-400 mb-3">{r.value}</div>
                <div className="text-xs font-headline font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{r.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Equipment + Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-md"
            >
              <h3 className="font-headline font-black uppercase tracking-tight text-blue-600 dark:text-blue-400 text-xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">shield</span>
                Equipment &amp; Dress Code
              </h3>
              <ul className="space-y-4">
                {equipment.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl mt-px">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-md"
            >
              <h3 className="font-headline font-black uppercase tracking-tight text-blue-600 dark:text-blue-400 text-xl mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">info</span>
                Important Notes
              </h3>
              <ul className="space-y-4">
                {notes.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl mt-px">warning</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRAND FINAL CTA - with gradient background similar to homepage */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-5 sm:py-6 mb-6 sm:mb-8"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl">🏟️</span>
            <div className="text-center sm:text-left italic">
              <span className="block text-yellow-300 text-xs sm:text-sm font-headline font-black tracking-widest">
                GRAND FINAL
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-headline font-black text-white leading-tight">
                Ekana Stadium • Lucknow
              </span>
            </div>
          </motion.div>

          <p className="text-blue-100 dark:text-blue-200 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
            Lucknow's premier cricket venue. The biggest U19 final in Uttar Pradesh.
          </p>

          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-800 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-yellow-300 font-bold px-6 sm:px-10 md:px-6 py-3 sm:py-4 md:py-3 rounded-2xl sm:rounded-3xl inline-flex items-center gap-2 sm:gap-3 shadow-lg transition-all"
            >
              Register Your Team
              <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl">
                arrow_forward
              </span>
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}