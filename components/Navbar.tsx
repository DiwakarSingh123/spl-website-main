'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/context/ThemeContext'

function useHasRegistration() {
  const { isSignedIn, isLoaded } = useUser()
  const [hasReg, setHasReg] = useState<boolean>(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) { setHasReg(false); setChecked(true); return }
    localStorage.removeItem('adminToken')
    localStorage.removeItem('coordinatorToken')
    localStorage.removeItem('coordinatorDistrict')
    fetch('/api/my-registration')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => { setHasReg(!!d.registration); setChecked(true) })
      .catch(() => { setHasReg(false); setChecked(true) })
  }, [isLoaded, isSignedIn])

  return { hasReg, checked }
}

function useAdminToken() {
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken') || !!localStorage.getItem('coordinatorToken'))
  }, [])
  return isAdmin
}

const mainLinks = [
  { href: '/schedule', label: 'Schedule', icon: 'calendar_today' },
  { href: '/tournament-format', label: 'Format', icon: 'format_list_bulleted' },
  { href: '/about', label: 'About', icon: 'info' },
  { href: '/news', label: 'News', icon: 'newspaper' },
]

const moreLinks = [
  { href: '/eligibility', label: 'Rules', icon: 'gavel' },
  { href: '/prizes', label: 'Prizes', icon: 'emoji_events' },
  { href: '/scholarships', label: 'Scholarship', icon: 'school' },
  { href: '/gallery', label: 'Gallery', icon: 'photo_library' },
  { href: '/contact', label: 'Contact', icon: 'contact_mail' },
  { href: '/sponsors', label: 'Sponsors', icon: 'handshake' },
]

function AccountDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative hidden md:block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-headline font-bold uppercase tracking-tight text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Account
        <span className="material-symbols-outlined text-base">{open ? 'expand_less' : 'expand_more'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full right-0 mt-3 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl flex flex-col py-2 z-50 overflow-hidden"
          >
            <Link href="/sign-in" onClick={() => setOpen(false)}
              className="px-5 py-3 text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-all">
              <span className="material-symbols-outlined text-lg">login</span>
              Player Sign In
            </Link>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-4 my-1" />
            <p className="px-5 pt-2 pb-1 text-[0.55rem] font-headline font-bold uppercase tracking-widest text-blue-600/70 dark:text-blue-400/70">Staff Access</p>
            <Link href="/admin/login" onClick={() => setOpen(false)}
              className="px-5 py-3 text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-all">
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              Admin Login
            </Link>
            <Link href="/coordinator/login" onClick={() => setOpen(false)}
              className="px-5 py-3 text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-all">
              <span className="material-symbols-outlined text-lg">shield_person</span>
              Coordinator Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UserDropdown() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative hidden md:flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-headline font-bold uppercase tracking-tight text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="avatar" className="w-7 h-7 rounded-full ring-2 ring-blue-600/30 dark:ring-blue-400/30" />
        ) : (
          <span className="material-symbols-outlined text-2xl">account_circle</span>
        )}
        <span className="truncate max-w-[110px]">{user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'Account'}</span>
        <span className="material-symbols-outlined text-base">{open ? 'expand_less' : 'expand_more'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl flex flex-col py-2 z-50 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="avatar" className="w-12 h-12 rounded-2xl ring-2 ring-blue-600/40 dark:ring-blue-400/40" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-blue-600/30 dark:text-blue-400/30">account_circle</span>
              )}
              <div>
                <p className="font-headline font-bold text-blue-600 dark:text-blue-400">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
            </div>

            <button
              onClick={() => { setOpen(false); signOut().then(() => { window.location.href = '/' }) }}
              className="px-5 py-3.5 text-xs font-headline font-bold uppercase tracking-widest text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-all w-full text-left"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileUserSection({ onClose, hasReg }: { onClose: () => void; hasReg: boolean }) {
  const { user } = useUser()
  const { signOut } = useClerk()
  return (
    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
      <div className="flex items-center gap-3 px-2">
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="avatar" className="w-11 h-11 rounded-2xl ring-2 ring-blue-600/30 dark:ring-blue-400/30" />
        ) : (
          <span className="material-symbols-outlined text-4xl text-blue-600 dark:text-blue-400">account_circle</span>
        )}
        <div>
          <p className="font-headline font-bold text-blue-600 dark:text-blue-400">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.emailAddresses?.[0]?.emailAddress}</p>
        </div>
      </div>

      {hasReg ? (
        <Link href="/my-registration" onClick={onClose} className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-headline font-bold uppercase tracking-tight text-base hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-xl transition-all">
          <span className="material-symbols-outlined text-2xl">assignment</span>
          My Registration
        </Link>
      ) : (
        <Link href="/register" onClick={onClose} className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-headline font-bold uppercase tracking-tight text-base hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-xl transition-all">
          <span className="material-symbols-outlined text-2xl">app_registration</span>
          Register Now
        </Link>
      )}

      <button
        onClick={() => { onClose(); signOut().then(() => { window.location.href = '/' }) }}
        className="flex items-center gap-3 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-headline font-bold uppercase tracking-tight text-base w-full px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">logout</span>
        Sign Out
      </button>
    </div>
  )
}

function RegisterButton({ hasReg }: { hasReg: boolean }) {
  const { isSignedIn } = useUser()
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth <= 450)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isSmallScreen) return null

  const content = isSignedIn && hasReg ? (
    <>
      <span className="material-symbols-outlined text-lg">assignment</span>
      My Registration
    </>
  ) : (
    'Register Now'
  )

  const href = isSignedIn && hasReg ? '/my-registration' : '/register'

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.08, boxShadow: "0 0 20px #3b82f6" }}
        whileTap={{ scale: 0.92 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 font-headline font-bold uppercase tracking-tighter text-sm rounded-2xl flex items-center gap-2 shadow-md transition-all"
      >
        {content}
      </motion.div>
    </Link>
  )
}

function AdminBadge() {
  const isAdmin = useAdminToken()
  if (!isAdmin) return null
  const isCoord = typeof window !== 'undefined' && !!localStorage.getItem('coordinatorToken')
  const href = isCoord ? '/coordinator/dashboard' : '/admin/dashboard'
  const label = isCoord ? 'Coordinator Panel' : 'Admin Panel'

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px #3b82f6" }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex items-center gap-2 border border-blue-600/40 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-xs font-headline font-black uppercase tracking-[2px] rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-all"
      >
        <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
        {label}
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </motion.div>
    </Link>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const pathname = usePathname()
  const moreRef = useRef<HTMLDivElement>(null)
  const isStaff = useAdminToken()
  const { hasReg } = useHasRegistration()

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [mobileOpen])

  const isMoreActive = moreLinks.some(l => l.href === pathname)

  return (
    <>
      <header ref={mobileMenuRef} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">

          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ rotate: [0, -20, 20, 0] }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400/50 rounded-2xl flex items-center justify-center shadow-sm"
              >
                <span className="material-symbols-outlined text-white text-2xl group-hover:scale-110 transition-transform">sports_cricket</span>
              </motion.div>
              <span className="text-xl md:text-2xl font-black tracking-tight font-headline italic uppercase">
                <span className="text-blue-600 dark:text-blue-400">Saroj</span><span className="text-gray-800 dark:text-white"> Premier</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-9 font-headline font-bold uppercase tracking-tighter text-sm items-center">
            {mainLinks.map(l => (
              <Link key={l.href} href={l.href}
                className={`relative transition-all duration-300 ${pathname === l.href
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                {l.label}
                {pathname === l.href && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div ref={moreRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 transition-all ${isMoreActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                More
                <span className="material-symbols-outlined text-base">{moreOpen ? 'expand_less' : 'expand_more'}</span>
              </motion.button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-52 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl py-3 z-50"
                  >
                    {moreLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setMoreOpen(false)}
                        className={`block px-6 py-3.5 text-sm font-headline font-bold uppercase tracking-widest ${pathname === l.href ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'} transition-all`}>
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <AdminBadge />
            {!isStaff && (
              <>
                <SignedOut><AccountDropdown /></SignedOut>
                <SignedIn><UserDropdown /></SignedIn>
                <RegisterButton hasReg={hasReg} />
              </>
            )}

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-6 py-8 flex flex-col gap-2">
                {[...mainLinks, ...moreLinks].map((l, index) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight transition-all ${pathname === l.href ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <span className="material-symbols-outlined text-2xl">{l.icon}</span>
                    {l.label}
                  </Link>
                ))}

                {isStaff ? (
                  <Link
                    href={typeof window !== 'undefined' && localStorage.getItem('coordinatorToken') ? '/coordinator/dashboard' : '/admin/dashboard'}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                    {typeof window !== 'undefined' && localStorage.getItem('coordinatorToken') ? 'Coordinator Panel' : 'Admin Panel'}
                  </Link>
                ) : (
                  <>
                    <SignedOut>
                      <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                        Sign In
                      </Link>
                      <Link href="/register" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight text-blue-600 dark:text-blue-400">
                        Register
                      </Link>
                      <Link href="/admin/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                        Admin Login
                      </Link>
                      <Link href="/coordinator/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-headline font-bold uppercase tracking-tight text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                        Coordinator Login
                      </Link>
                    </SignedOut>
                    <SignedIn>
                      <MobileUserSection onClose={() => setMobileOpen(false)} hasReg={hasReg} />
                    </SignedIn>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl z-50 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex justify-around items-center max-w-xs mx-auto">
          {[
            { href: '/', icon: 'home', label: 'Home' },
            { href: '/schedule', icon: 'calendar_today', label: 'Fixtures' },
            { href: '/register', icon: 'app_registration', label: 'Register' },
            { href: '/news', icon: 'newspaper', label: 'News' },
            { href: '/contact', icon: 'sensors', label: 'Contact' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center transition-all ${pathname === item.href ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                <span className="text-[10px] font-headline font-bold tracking-widest mt-0.5">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}