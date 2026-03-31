'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/coordinator/dashboard', icon: 'dashboard',    label: 'Dashboard'          },
  { href: '/coordinator/teams',     icon: 'groups',       label: 'Teams'              },
  { href: '/coordinator/players',   icon: 'person_check', label: 'Unassigned Players' },
  { href: '/coordinator/results',   icon: 'scoreboard',   label: 'Match Results'      },
]

export default function CoordinatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [district, setDistrict] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('coordinatorToken')
    const dist = localStorage.getItem('coordinatorDistrict') || ''
    
    if (pathname === '/coordinator/login' || pathname === '/coordinator/forgot-password' || pathname === '/coordinator/reset-password') {
      setLoading(false)
      return
    }

    if (!token) {
      router.replace('/coordinator/login')
      return
    }

    setIsAuthenticated(true)
    setDistrict(dist)
    setLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('coordinatorToken')
    localStorage.removeItem('coordinatorDistrict')
    router.push('/coordinator/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <span className="w-8 h-8 border-4 border-[#444650] border-t-[#ffd700] rounded-full animate-spin" />
    </div>
  )

  if (pathname === '/coordinator/login' || pathname === '/coordinator/forgot-password' || pathname === '/coordinator/reset-password') {
    return <>{children}</>
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#002366] border-r border-[#ffd700]/15 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo Header */}
        <div className="px-6 py-6 border-b border-[#ffd700]/15 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#ffd700] flex items-center justify-center rounded-xl flex-shrink-0">
            <span className="material-symbols-outlined text-[#002366] text-xl">shield_person</span>
          </div>
          <div>
            <div className="font-headline font-black text-lg text-[#ffd700]">Coordinator</div>
            <div className="text-xs text-white/40 font-medium tracking-widest truncate max-w-[140px]">{district || 'District Panel'}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-headline font-bold uppercase tracking-wide rounded-2xl transition-all ${isActive 
                  ? 'bg-[#ffd700] text-[#002366]' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#ffd700]/15 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-headline font-bold uppercase tracking-wide text-white/60 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
            <span className="material-symbols-outlined text-xl">public</span>
            View Public Site
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-headline font-bold uppercase tracking-wide text-red-300/70 hover:text-red-300 hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="bg-[#002366] border-b border-[#ffd700]/15 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="lg:hidden text-white/70 hover:text-[#ffd700] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-headline font-bold text-sm text-white/60 tracking-widest uppercase">
              {navItems.find(n => n.href === pathname)?.label || 'Coordinator Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="hidden sm:flex items-center gap-2 text-[#ffd700]/70">
              <span className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse" />
              {district || 'District Panel'}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-300/70 hover:text-red-300 transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}