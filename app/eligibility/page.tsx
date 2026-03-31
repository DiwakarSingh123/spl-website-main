'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const playerReqs = [
  'Must be Under-19 years of age',
  'Currently enrolled in Class 12',
  'Resident of Uttar Pradesh',
  'Valid Aadhaar Card required'
]

const teamReqs = [
  'Minimum 11, Maximum 15 players',
  'All players from same district',
  'Coach and Manager details required',
  'Registration fee: ₹11,000'
]

const disqualify = [
  { title: 'Age Fraud', desc: 'Providing false age documents will lead to immediate disqualification' },
  { title: 'Fake Documents', desc: 'Submission of forged or invalid documents' },
  { title: 'Misconduct', desc: 'Unsporting behavior or violation of tournament rules' },
  { title: 'Incomplete Registration', desc: 'Missing required documents or information' },
]

const notes = [
  'Registration fee is non-refundable once payment is completed',
  'Tournament committee decisions are final and binding',
  'Players must carry original documents during matches',
  'Age fraud will lead to immediate disqualification',
  "Final team allocation for individual players is at SPL committee's discretion",
]

const matchRules = [
  'Each match will be 20 overs per side',
  'Powerplay for first 6 overs (only 2 fielders outside 30-yard circle)',
  'Maximum 4 overs per bowler',
  'DLS method will be used for rain-affected matches',
  'No ball and wide ball penalties as per ICC rules'
]

const equipment = [
  'Standard cricket whites or colored clothing',
  'Protective gear mandatory (helmet, pads, gloves)',
  'Only leather balls will be used',
  'Bat specifications as per ICC guidelines'
]

export default function Eligibility() {
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
              <span className="material-symbols-outlined text-white text-5xl">gavel</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[4px] text-blue-600 dark:text-blue-400 text-sm mb-3">SPL 2026 • LIVE FIXTURES</p>
            <h1 className="font-headline font-black text-6xl md:text-7xl italic uppercase tracking-[-4px] leading-[0.85] text-gray-900 dark:text-white">
              ELIGIBILITY &amp; <span className="text-blue-600 dark:text-blue-400">RULES</span>
            </h1>
            <p className="mt-6 max-w-md sm:max-w-lg text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl px-4">
              Complete guidelines and requirements for participation in Saroj Premier League
            </p>
          </motion.div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/10 to-transparent pointer-events-none" />
      </section>

      {/* ELIGIBILITY CRITERIA */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Eligibility Criteria</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Player Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">person</span>
                <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-blue-600 dark:text-blue-400">Player Requirements</h3>
              </div>
              <ul className="space-y-6">
                {playerReqs.map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-black">✓</div>
                    <span className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Team Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">group</span>
                <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-blue-600 dark:text-blue-400">Team Requirements</h3>
              </div>
              <ul className="space-y-6">
                {teamReqs.map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-black">✓</div>
                    <span className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DISQUALIFICATION CRITERIA */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-8 h-px bg-red-500" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter text-red-500">Disqualification Criteria</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disqualify.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-500/30 rounded-3xl p-8 group hover:border-red-400 dark:hover:border-red-400 transition-all shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl font-headline font-black text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-400 transition-colors">0{i + 1}</span>
                  <div>
                    <h3 className="font-headline font-bold uppercase tracking-tight text-red-600 dark:text-red-400 text-xl mb-3">{d.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENT RULES */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Tournament Rules</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Match Rules */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <h3 className="font-headline font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400 text-2xl mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined">sports_cricket</span>
                Match Rules
              </h3>
              <ul className="space-y-6">
                {matchRules.map((rule, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Equipment & Dress Code */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <h3 className="font-headline font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400 text-2xl mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined">shield</span>
                Equipment &amp; Dress Code
              </h3>
              <ul className="space-y-6">
                {equipment.map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTES */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tighter">Important Notes</h2>
          </motion.div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-8 sm:p-12">
            <ul className="space-y-6">
              {notes.map((note, i) => (
                <li key={i} className="flex gap-5 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  <span className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 mt-1">⚠</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DOWNLOAD DOCUMENTS */}
     <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-screen-2xl mx-auto">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10"
    >
      <div className="w-6 sm:w-10 h-px bg-blue-600 dark:bg-blue-400" />
      <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
        Download Documents
      </h2>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

      {[
        { 
          label: 'SPL Official Brochure', 
          desc: 'Tournament overview, rules and prize details', 
          file: '/uploads/SPL Website Document.pdf', 
          icon: 'picture_as_pdf' 
        },
        { 
          label: 'Registration Form (PDF)', 
          desc: 'Printable registration form for offline submission', 
          file: '/uploads/Registration-Form.pdf', 
          icon: 'assignment' 
        },
      ].map((doc, i) => (

        <motion.a
          key={i}
          href={doc.file}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
          hover:border-blue-500 dark:hover:border-blue-400 
          rounded-2xl sm:rounded-3xl 
          p-4 sm:p-6 lg:p-8 
          flex items-start sm:items-center gap-4 sm:gap-6 
          transition-all shadow-sm"
        >

          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 
          bg-blue-100 dark:bg-blue-900/30 
          border border-blue-300 dark:border-blue-500/30 
          rounded-xl sm:rounded-2xl 
          flex items-center justify-center flex-shrink-0 
          group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
            
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl sm:text-2xl lg:text-3xl">
              {doc.icon}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {doc.label}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
              {doc.desc}
            </p>
          </div>

          {/* Download Icon */}
          <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-3xl 
          text-blue-500 dark:text-blue-400 
          group-hover:text-blue-600 dark:group-hover:text-blue-300">
            download
          </span>

        </motion.a>

      ))}

    </div>
  </div>
</section>

      {/* FINAL CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">

  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

  <div className="max-w-2xl mx-auto text-center relative z-10">

    {/* Heading */}
    <h2 className="font-headline font-black italic uppercase tracking-tight 
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
    mb-6 sm:mb-8 text-white">
      Meet the Criteria? <span className="text-yellow-300">Register Now</span>
    </h2>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

      {/* Team */}
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

      {/* Individual */}
      <Link href="/register?type=individual" className="w-full sm:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-full sm:w-auto 
            border-2 border-white text-white
            hover:text-blue-600
            font-semibold sm:font-bold uppercase tracking-wide
            text-sm sm:text-base lg:text-lg
            rounded-full sm:rounded-2xl
            px-6 sm:px-8 lg:px-10 py-3 sm:py-4
            transition-all duration-300

            hover:bg-white
          "
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