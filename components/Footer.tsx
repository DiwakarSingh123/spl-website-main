'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa'
import { motion } from 'framer-motion'

const socials = [
  { Icon: FaInstagram, link: 'https://www.instagram.com/segindia/', label: 'Instagram' },
  { Icon: FaLinkedin, link: 'https://www.linkedin.com/company/saroj-educational-group/', label: 'LinkedIn' },
  { Icon: FaFacebook, link: 'https://www.facebook.com/SEGofficial', label: 'Facebook' },
  { Icon: FaYoutube, link: 'https://www.youtube.com/@sarojeducationalgroup1018', label: 'YouTube' },
]

const leagueLinks = [
  { href: '/about', label: 'About SPL' },
  { href: '/tournament-format', label: 'Tournament Format' },
  { href: '/eligibility', label: 'Eligibility & Rules' },
  { href: '/scholarships', label: 'Scholarship Info' },
  { href: '/sponsors', label: 'Sponsors' },
]

const supportLinks = [
  { href: '/schedule', label: 'Match Schedule' },
  { href: '/prizes', label: 'Prize Money' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Footer() {
  const { isSignedIn } = useUser()
  const [isStaff, setIsStaff] = useState(false)

  useEffect(() => {
    setIsStaff(!!localStorage.getItem('adminToken') || !!localStorage.getItem('coordinatorToken'))
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Animated top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />

      <div className="max-w-screen-2xl mx-auto px-8 pt-16 pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
        >
          {/* Logo + Description */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-md flex-shrink-0"
              >
                <span className="material-symbols-outlined text-white text-3xl group-active:scale-90">sports_cricket</span>
              </motion.div>
              <div className="text-3xl font-headline font-black italic tracking-[-1px]">
                <span className="text-blue-600 dark:text-blue-400">Saroj</span>
                <span className="text-gray-800 dark:text-white"> Premier</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] max-w-md">
              Uttar Pradesh&apos;s most prestigious cricket tournament for Class 12 students.
              <br />
              Powered by Saroj Educational Group since 2024.
            </p>

            {/* Social Icons - Animated */}
            <div className="flex gap-4 mt-10">
              {socials.map(({ Icon, link, label }) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* League Column */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h5 className="font-headline font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400 text-sm mb-6 flex items-center gap-2">
              <span className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
              LEAGUE
            </h5>
            <div className="flex flex-col gap-4">
              {leagueLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[15px] transition-all"
                  >
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform">arrow_forward</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Column */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h5 className="font-headline font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400 text-sm mb-6 flex items-center gap-2">
              <span className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
              SUPPORT
            </h5>
            <div className="flex flex-col gap-4">
              {supportLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[15px] transition-all"
                  >
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform">arrow_forward</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {!isSignedIn && !isStaff && (
                <>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/admin/login"
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[15px] transition-all"
                    >
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform">admin_panel_settings</span>
                      Admin Login
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/coordinator/login"
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[15px] transition-all"
                    >
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl group-hover:rotate-12 transition-transform">shield_person</span>
                      Coordinator Login
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar with subtle animation */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs font-body uppercase tracking-widest text-gray-500 dark:text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            © 2026 Saroj Premier League • All Rights Reserved
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-2 md:mt-0 text-center md:text-right"
          >
            Organized by{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">Saroj Educational Group</span>
          </motion.p>

          <div className="hidden md:flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 mt-3 md:mt-0">
            MADE WITH{' '}
            <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-base animate-pulse">favorite</span>{' '}
            IN UTTAR PRADESH
          </div>
        </div>
      </div>
    </footer>
  )
}