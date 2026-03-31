'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Award } from 'lucide-react'

const prizes = [
  { place: '1st', label: 'Champion', amount: '₹11,00,000', icon: '🥇', color: 'text-yellow-500 dark:text-yellow-400' },
  { place: '2nd', label: 'Runner-Up', amount: '₹5,00,000', icon: '🥈', color: 'text-gray-500 dark:text-gray-400' },
  { place: '3rd', label: 'Third Place', amount: '₹2,00,000', icon: '🥉', color: 'text-amber-700 dark:text-amber-500' },
]

const individual = [
  { title: 'Best Batsman', amount: '₹50,000' },
  { title: 'Best Bowler', amount: '₹50,000' },
  { title: 'Best All-Rounder', amount: '₹50,000' },
  { title: 'Player of Tournament', amount: '₹1,00,000' },
]

export default function Prizes() {
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
              <Trophy className="w-8 h-8 text-white" />
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              PRIZES &amp; <span className="text-blue-600 dark:text-blue-400">SCHOLARSHIPS</span>
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md text-base sm:text-lg">
              Big rewards for winners • 50% scholarship for every player
            </p>
          </motion.div>
        </div>
      </section>

      {/* Champion Prize Highlight */}
      <section className="py-12 bg-white/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Trophy className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-6xl sm:text-7xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">₹11,00,000</div>
              <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">Champion Prize</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Prizes */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Team Prize Distribution</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {prizes.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-3xl p-8 text-center shadow-sm transition-all"
              >
                <div className="text-6xl mb-6">{p.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">{p.place} Place</div>
                <h3 className="text-2xl font-black mb-2 text-gray-800 dark:text-white">{p.label}</h3>
                <div className={`text-4xl font-black ${p.color}`}>{p.amount}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Awards */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Individual Awards</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {individual.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-3xl p-8 text-center shadow-sm"
              >
                <Award className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold uppercase text-sm mb-3 text-gray-700 dark:text-gray-300">{item.title}</h3>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{item.amount}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Highlight */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-12 shadow-sm">
          <div className="text-blue-600 dark:text-blue-400 text-6xl mb-6">🎓</div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gray-800 dark:text-white">
            50% Scholarship <span className="text-blue-600 dark:text-blue-400">for Every Player</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Win or lose — har participant ko Saroj International University mein 50% scholarship milega.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-8 text-white">
            Ab Der Mat Karo — <span className="text-yellow-300">Register Karo</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-800 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-yellow-300 font-headline font-bold uppercase tracking-tight rounded-2xl px-10 py-4 w-full sm:w-auto transition-all shadow-lg"
              >
                Register Team
              </motion.button>
            </Link>
            <Link href="/register?type=individual">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:border-gray-300 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-blue-600 font-headline font-bold uppercase tracking-tight rounded-2xl px-10 py-4 w-full sm:w-auto transition-all"
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