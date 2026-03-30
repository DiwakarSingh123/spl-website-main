'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Trophy, Users, MapPin, Award, Star, Sparkles } from 'lucide-react'

interface Match {
  id: string; phase: string; venue: string; date: string
  result?: string; winner?: string; score1?: string; score2?: string
  team1: { name: string }; team2?: { name: string }
}
interface Announcement { id: string; title: string; content: string; type: string; active: boolean; createdAt: string }
interface PlayerOfWeek {
  name: string; teamName: string; district: string; role: string
  photoUrl?: string; runs?: string; wickets?: string; impactRating?: string; description?: string
}

export default function Home() {
  const [fixtures, setFixtures] = useState<Match[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [liveMatch, setLiveMatch] = useState<Match | null>(null)
  const [pow, setPow] = useState<PlayerOfWeek | null>(null)

  useEffect(() => {
    fetch('/api/schedule').then(r => r.json()).then(d => {
      if (Array.isArray(d)) {
        setFixtures(d.slice(0, 4))
        const completed = d.filter((m: Match) => m.result || m.score1)
        if (completed.length > 0) setLiveMatch(completed[completed.length - 1])
      }
    }).catch(() => { })
    fetch('/api/admin/announcements').then(r => r.json()).then(d => { if (Array.isArray(d)) setAnnouncements(d.filter((a: Announcement) => a.active).slice(0, 3)) }).catch(() => { })
    fetch('/api/admin/player-of-week').then(r => r.json()).then(d => { if (d) setPow(d) }).catch(() => { })
  }, [])

  const upcomingFixtures = fixtures.filter(f => !f.result && !f.winner)

  const fallbackAnnouncements = [
    { id: '1', title: 'Ekana Stadium Confirmed as Final Venue', content: '...', type: 'INFO', createdAt: '2025-02-10' },
    { id: '2', title: '50% Scholarship for All Participants', content: '...', type: 'UPDATE', createdAt: '2025-02-05' },
  ]

  return (
    <main className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with abstract shapes - dark mode variants */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-600/10 dark:bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-blue-200 dark:border-blue-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
                </span>
                <span className="text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">Live Match</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">• Finals Week</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6 text-gray-900 dark:text-white">
                BATTLE OF <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TITANS</span>
              </h1>

              {/* Live Scoreboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl mb-8"
              >
                {liveMatch ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <div className="text-3xl font-black text-gray-800 dark:text-white">{liveMatch.team1.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">TEAM</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">VS</div>
                      <div className="text-center flex-1">
                        <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{liveMatch.team2?.name || 'TBD'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">TEAM</div>
                      </div>
                    </div>
                    {liveMatch.score1 && (
                      <div className="text-center mb-4">
                        <div className="text-5xl font-black text-blue-600 dark:text-blue-400">{liveMatch.score1}</div>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-mono">{liveMatch.phase.replace('_', ' ')}</span>
                      {liveMatch.winner && (
                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><Trophy size={12} /> {liveMatch.winner}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <div className="text-3xl font-black text-gray-800 dark:text-white">SPL</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Season 2026</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">U19</div>
                      <div className="text-center flex-1">
                        <div className="text-3xl font-black text-blue-600 dark:text-blue-400">UP</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Uttar Pradesh</div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-5xl font-black text-blue-600 dark:text-blue-400">₹11L</div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-mono">Winner Prize Money</span>
                      <span className="text-blue-600 dark:text-blue-400">50% Scholarship</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-full transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  Register Now <ArrowRight size={18} />
                </Link>
                <Link
                  href="/tournament-format"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-3 rounded-full transition-all"
                >
                  Tournament Info
                </Link>
              </div>
            </motion.div>

            {/* Right Stats Panel */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { label: 'Winner Prize', value: '₹11L', icon: Trophy },
                { label: 'Scholarship', value: '50%', icon: Award },
                { label: 'Participants', value: '1000+', icon: Users },
                { label: 'Final Venue', value: 'Ekana', icon: MapPin },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-5 text-center border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* UPCOMING FIXTURES */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">Next Matches</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">Upcoming <span className="text-blue-600 dark:text-blue-400">Fixtures</span></h2>
            </div>
            <Link
              href="/schedule"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {upcomingFixtures.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingFixtures.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} •{' '}
                    {new Date(f.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{f.team1.name}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">VS</span>
                    <span className="font-bold text-right text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{f.team2?.name || 'TBD'}</span>
                  </div>
                  <div className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full mb-4">
                    {f.phase.replace('_', ' ')}
                  </div>
                  <Link
                    href="/schedule"
                    className="block w-full text-center text-sm border border-gray-200 dark:border-gray-700 rounded-full py-2 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                  >
                    Details
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Fixtures will be announced soon</p>
              <Link href="/schedule" className="mt-4 inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View Full Schedule →
              </Link>
            </div>
          )}

          {/* Mobile view all */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/schedule" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
              View All Fixtures <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-12">News & <span className="text-blue-600 dark:text-blue-400">Announcements</span></h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured News */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 group relative h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/Hero.png"
                alt="SPL News"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {announcements[0]?.type || 'Official'}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {announcements[0]?.title || 'SPL 2025 — Registration Now Open'}
                </h3>
                <p className="text-white/80 text-sm max-w-xl line-clamp-2">
                  {announcements[0]?.content || 'Team and individual registrations are now open for Saroj Premier League Under-19 tournament. Register today to compete for ₹11,00,000 prize money.'}
                </p>
              </div>
            </motion.div>

            {/* Side Announcements */}
            <div className="space-y-6">
              {(announcements.length > 1 ? announcements.slice(1) : fallbackAnnouncements).slice(0, 2).map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">{n.type}</span>
                      <h4 className="font-bold text-gray-800 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{n.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-4"
              >
                All Announcements <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYER OF THE WEEK */}
      {pow && (
        <section className="py-20 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 rounded-full px-4 py-1.5 mb-6">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">Player of the Week</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
                  <span className="text-blue-600 dark:text-blue-400">Star</span> Performer
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                    <span className="text-gray-600 dark:text-gray-400">Runs Scored</span>
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pow.runs || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                    <span className="text-gray-600 dark:text-gray-400">Best Bowling</span>
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pow.wickets || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                    <span className="text-gray-600 dark:text-gray-400">Impact Rating</span>
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pow.impactRating || '—'}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pow.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mt-1">{pow.role} • {pow.teamName} • {pow.district}</p>
                  {pow.description && <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">{pow.description}</p>}
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 mt-8 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all"
                >
                  Register Now <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={pow.photoUrl || '/Hero.png'}
                  alt={pow.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full inline-block">
                    #{pow.name.split(' ')[0]}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* REGISTRATION CTA */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            JOIN THE <span className="text-yellow-300">ARENA</span>
          </h2>
          <p className="text-blue-100 dark:text-blue-200 text-lg max-w-2xl mx-auto mb-10">
            Register your team or join as an individual player. Compete for ₹11,00,000 prize money and a 50% scholarship at Saroj International University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?type=team"
              className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-800 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-yellow-300 font-bold px-10 py-4 rounded-full transition-all text-lg shadow-lg"
            >
              Register Team — ₹11,000
            </Link>
            <Link
              href="/register?type=individual"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:border-gray-300 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-blue-600 font-bold px-10 py-4 rounded-full transition-all text-lg"
            >
              Register Individual — ₹1,000
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}