'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const benefits = [
  '50% reduction in tuition fees',
  'Applicable to all undergraduate programs',
  'Valid for entire course duration',
  'Additional sports quota benefits',
  'Priority admission consideration'
]

const conditions = [
  'Must be a registered SPL U19 participant',
  'Complete tournament participation',
  'Meet university admission criteria',
  'Maintain academic standards',
  'No disciplinary issues during tournament'
]

const steps = [
  { n: '01', title: 'Register & Participate', desc: 'Register for SPL U19 and participate in tournament matches as per schedule.' },
  { n: '02', title: 'Receive Certificate', desc: 'Get your official SPL participation certificate after tournament completion.' },
  { n: '03', title: 'Apply to University', desc: 'Submit your application to Saroj International University along with your SPL certificate.' },
  { n: '04', title: 'Scholarship Approved', desc: 'Receive 50% scholarship on tuition fees upon admission confirmation.' },
]

export default function Scholarships() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 transition-colors duration-300">

      {/* Hero */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800 relative overflow-hidden">
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
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6"
            >
              <span className="material-symbols-outlined text-white text-3xl">school</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • EDUCATION REWARD</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              50% <span className="text-blue-600 dark:text-blue-400">SCHOLARSHIP</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base sm:text-lg">
              For every SPL participant — win or lose
            </p>
          </motion.div>
        </div>
      </section>

      {/* Big 50% Highlight */}
      <section className="py-12 bg-white/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-center">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6">
          <div className="text-5xl sm:text-5xl md:text-6xl mb-6 lg:text-[7rem] font-headline font-black text-blue-600 dark:text-blue-400 leading-none tracking-tighter">
            50%
          </div>
          <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-white -mt-4">Scholarship on Tuition Fees</p>
          <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-xl mx-auto text-sm sm:text-base">
            Har player jo SPL mein participate karega, usko <strong className="text-blue-600 dark:text-blue-400">Saroj International University</strong> mein 50% scholarship milega.
          </p>
        </div>
      </section>

      {/* Benefits + Conditions */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-6">
          {/* What You Get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            <h3 className="font-headline font-black text-xl uppercase tracking-tighter text-blue-600 dark:text-blue-400 mb-8">What You Get</h3>
            <ul className="space-y-5">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 bg-blue-600 dark:bg-blue-400 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-400 text-base">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Eligibility Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            <h3 className="font-headline font-black text-xl uppercase tracking-tighter text-blue-600 dark:text-blue-400 mb-8">Eligibility Conditions</h3>
            <ul className="space-y-5">
              {conditions.map((c, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-5 h-5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black mt-1">→</span>
                  <span className="text-gray-600 dark:text-gray-400 text-base">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">How to Claim Your Scholarship</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm"
              >
                <div className="text-5xl font-headline font-black text-blue-200 dark:text-blue-800/60 mb-4">{s.n}</div>
                <h3 className="font-headline font-bold uppercase tracking-tight mb-3 text-base text-gray-800 dark:text-white">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl italic uppercase tracking-tighter mb-6 text-white">
            Play SPL — <span className="text-yellow-300">Secure Your Scholarship</span>
          </h2>
          <p className="text-blue-100 dark:text-blue-200 mb-8 text-sm sm:text-base">Register today and turn your cricket passion into academic success.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-800 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-yellow-300 font-headline font-bold uppercase tracking-tight rounded-2xl px-10 py-4 w-full sm:w-auto transition-all shadow-lg"
              >
                Register as Team
              </motion.button>
            </Link>
            <Link href="/register?type=individual">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:border-gray-300 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-blue-600 font-headline font-bold uppercase tracking-tight rounded-2xl px-10 py-4 w-full sm:w-auto transition-all"
              >
                Register as Individual
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}