'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SponsorStrip from '@/components/SponsorStrip'

// --- Interfaces (unchanged) ---
interface Player {
  id: string; name: string; phone: string; role: string; isIndividual?: boolean
  aadhaarDoc?: string; schoolIdDoc?: string; dobProofDoc?: string; photoDoc?: string
}
interface Team {
  id: string; name: string; district: string; schoolCollege: string
  status: string; registrationId: string; createdAt: string
  coachName?: string; coachPhone?: string; managerName?: string; managerPhone?: string
  contactEmail?: string; contactPhone?: string
  _count: { players: number }
  payments: { status: string; amount: number }[]
  players: Player[]
}

interface Match {
  id: string; phase: string; venue: string; date: string
  result?: string; winner?: string; score1?: string; score2?: string
  team1: { name: string; district: string }
  team2?: { name: string; district: string }
}

// Phase colors – using blue for all phases (with appropriate lightness)
const phaseColors: Record<string, string> = {
  DISTRICT: 'text-blue-600 dark:text-blue-400 border-blue-500/40 bg-blue-50 dark:bg-blue-500/10',
  ZONAL: 'text-gray-600 dark:text-gray-400 border-gray-400/40 bg-gray-50 dark:bg-gray-500/10',
  SEMI_FINAL: 'text-orange-600 dark:text-orange-400 border-orange-500/40 bg-orange-50 dark:bg-orange-500/10',
  FINAL: 'text-blue-600 dark:text-blue-400 border-blue-500/60 bg-blue-50 dark:bg-blue-500/10',
}

const timeline = [
  { week: 'Week 1–2', label: 'District Level', icon: '🏏' },
  { week: 'Week 3', label: 'Zonal Championships', icon: '⚡' },
  { week: 'Week 4', label: 'State Semi-Finals', icon: '🔥' },
  { week: 'Final', label: 'Ekana Stadium', icon: '🏆' },
]

export default function Schedule() {
  const [matches, setMatches] = useState<Match[]>([])
  const [activePhase, setActivePhase] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [activeDistrict, setActiveDistrict] = useState('ALL')

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [teamsLoading, setTeamsLoading] = useState(true)
  const [teamsMap, setTeamsMap] = useState<Map<string, Team>>(new Map())

  // Fetch matches
  useEffect(() => {
    fetch('/api/schedule')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setMatches(data) })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  // Fetch teams for player lookup
  useEffect(() => {
    fetch('/api/FetchingTeams')
      .then(res => res.json())
      .then((teams: Team[]) => {
        if (!Array.isArray(teams)) {
          setTeamsMap(new Map())
          return
        }
        const map = new Map<string, Team>()
        teams.forEach(team => {
          const key = `${team.name}|${team.district}`
          map.set(key, team)
        })
        setTeamsMap(map)
      })
      .catch(err => console.error('Failed to fetch teams', err))
      .finally(() => setTeamsLoading(false))
  }, [])

  const phases = ['ALL', 'DISTRICT', 'ZONAL', 'SEMI_FINAL', 'FINAL']
  const districts = ['ALL', ...Array.from(new Set(matches.flatMap(m => [m.team1.district, m.team2?.district].filter(Boolean) as string[]))).sort()]

  const filtered = matches.filter(m => {
    const phaseOk = activePhase === 'ALL' || m.phase === activePhase
    const districtOk = activeDistrict === 'ALL' || m.team1.district === activeDistrict || m.team2?.district === activeDistrict
    return phaseOk && districtOk
  })

  const getTeamFromMatch = (match: Match, side: 'team1' | 'team2') => {
    const teamData = match[side]
    if (!teamData) return null
    const key = `${teamData.name}|${teamData.district}`
    return teamsMap.get(key) || null
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120 } }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-20 overflow-x-hidden transition-colors duration-300">
      {/* HERO */}
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
              <span className="material-symbols-outlined text-white text-5xl">sports_cricket</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[4px] text-blue-600 dark:text-blue-400 text-sm mb-3">SPL 2026 • LIVE FIXTURES</p>
            <h1 className="font-headline font-black text-6xl md:text-7xl italic uppercase tracking-[-4px] leading-[0.85] text-gray-900 dark:text-white">
              MATCH <span className="text-blue-600 dark:text-blue-400">SCHEDULE</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-2 max-w-2xl">SPL Tournament Match Schedule Across Uttar Pradesh</p>
          </motion.div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/10 to-transparent pointer-events-none" />
      </section>

      {/* TIMELINE */}
      <section className="py-16 bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-4 gap-6 relative"
          >
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-400/30 to-transparent" />

            {timeline.map((t, i) => (
              <motion.div
                key={t.week}
                variants={item}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center relative group shadow-md"
              >
                <div className="text-5xl mb-6 transition-transform group-hover:scale-110">{t.icon}</div>
                <div className="text-xs font-headline font-black uppercase tracking-[2px] text-blue-600 dark:text-blue-400 mb-2">{t.week}</div>
                <div className="text-xl font-headline font-bold text-gray-800 dark:text-white">{t.label}</div>
                {i < timeline.length - 1 && (
                  <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hidden md:flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">→</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTERS + MATCHES */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header + Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-6">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 sm:gap-4"
            >
               <div>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mb-4" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter italic">Match Fixtures</h2>
            </div>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              {/* Phase Filter */}
              <div className="flex overflow-x-auto no-scrollbar bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-1">
                {phases.map(p => (
                  <motion.button
                    key={p}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePhase(p)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-[10px] sm:text-xs font-headline font-black uppercase tracking-widest rounded-2xl sm:rounded-3xl transition-all ${
                      activePhase === p
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {p === 'ALL' ? 'ALL' : p.replace('_', ' ')}
                  </motion.button>
                ))}
              </div>

              {/* District Filter */}
              {districts.length > 1 && (
                <div className="flex overflow-x-auto no-scrollbar bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-1">
                  {districts.map(d => (
                    <motion.button
                      key={d}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveDistrict(d)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-[10px] sm:text-xs font-headline font-black uppercase tracking-widest rounded-2xl sm:rounded-3xl transition-all ${
                        activeDistrict === d
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {d === 'ALL' ? 'All' : d}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Matches */}
          {loading ? (
            <div className="flex justify-center py-20 sm:py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"
              />
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:gap-6"
            >
              {filtered.map(match => (
                <motion.div
                  key={match.id}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedMatch(match)}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 cursor-pointer transition-all flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8 shadow-sm"
                >

                  {/* Phase */}
                  <div className={`text-[10px] sm:text-xs font-headline font-black uppercase tracking-widest px-3 sm:px-5 py-2 rounded-xl sm:rounded-2xl border ${phaseColors[match.phase]}`}>
                    {match.phase.replace('_', ' ')}
                  </div>

                  {/* Teams */}
                  <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">

                    {/* Team 1 */}
                    <div className="flex-1">
                      <div className="font-headline font-black text-lg sm:text-xl md:text-2xl uppercase text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {match.team1.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {match.team1.district}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl md:text-4xl">VS</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(match.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1">
                      <div className="font-headline font-black text-lg sm:text-xl md:text-2xl uppercase text-blue-600 dark:text-blue-400">
                        {match.team2?.name || 'TBD'}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {match.team2?.district || ''}
                      </div>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="w-full md:w-52 text-center md:text-left text-xs sm:text-sm">
                    <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base">location_on</span>
                      {match.venue}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(match.date).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Status */}
                  {match.result ? (
                    <div className="w-full sm:w-auto text-center bg-gray-50 dark:bg-gray-900 border border-blue-600/30 dark:border-blue-500/30 px-5 sm:px-7 py-3 sm:py-5 rounded-2xl sm:rounded-3xl">
                      <p className="text-blue-600 dark:text-blue-400 text-xs font-bold">FINAL</p>
                      {match.winner && (
                        <p className="text-gray-800 dark:text-white text-sm sm:text-lg font-black mt-1">
                          🏆 {match.winner}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full sm:w-auto text-center bg-green-50 dark:bg-green-900/20 border border-green-500/30 text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-black uppercase px-5 sm:px-7 py-3 sm:py-5 rounded-2xl sm:rounded-3xl">
                      UPCOMING
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 sm:py-32 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl sm:rounded-3xl">
              <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">📅</div>
              <p className="font-headline font-bold text-lg sm:text-2xl text-gray-500 dark:text-gray-400">
                No matches found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GRAND FINAL TEASER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 relative">
        <div className="max-w-screen-2xl mx-auto text-center">

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:inline-flex sm:flex-row items-center gap-3 sm:gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-blue-600/30 dark:border-blue-500/30 rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-4 sm:py-5 mb-6 sm:mb-8"
          >
            {/* Icon */}
            <span className="text-3xl sm:text-4xl md:text-5xl">🏟️</span>

            {/* Text */}
            <div className="text-center sm:text-left">
              <span className="block text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-headline font-black tracking-widest">
                GRAND FINAL
              </span>

              <span className="text-lg sm:text-2xl md:text-3xl font-headline font-black text-gray-800 dark:text-white leading-tight">
                Ekana Stadium • Lucknow
              </span>
            </div>
          </motion.div>

          {/* Prize */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Prize Pool <span className="text-blue-600 dark:text-blue-400 font-bold">₹11,00,000</span> + 50% Scholarship
          </p>

        </div>
      </section>

      <SponsorStrip />

      {/* MATCH DETAIL MODAL */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[999] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
            >

              {/* Header (fixed) */}
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-t-2xl sm:rounded-t-3xl">
                <div>
                  <h2 className="font-headline font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-tight text-gray-800 dark:text-white">
                    {selectedMatch.team1.name}{' '}
                    <span className="text-blue-600 dark:text-blue-400">VS</span>{' '}
                    {selectedMatch.team2?.name || 'TBD'}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                    <span>
                      {new Date(selectedMatch.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 hidden sm:inline">•</span>
                    <span>{selectedMatch.venue}</span>
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMatch(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-3xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  ✕
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 scroll-smooth">

                {[1, 2].map((sideNum) => {
                  const side = sideNum === 1 ? 'team1' : 'team2'
                  const teamData = selectedMatch[side]
                  if (!teamData) return null

                  const fullTeam = getTeamFromMatch(
                    selectedMatch,
                    side as 'team1' | 'team2'
                  )
                  const players = fullTeam?.players || []

                  return (
                    <motion.div
                      key={side}
                      initial={{ opacity: 0, x: sideNum === 1 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sideNum * 0.15 }}
                      className="space-y-4 sm:space-y-6"
                    >

                      {/* Team Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-headline font-black uppercase text-base sm:text-lg md:text-xl text-gray-800 dark:text-white">
                          {teamData.name}
                        </h3>

                        <span className="text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl">
                          {players.length} PLAYERS
                        </span>
                      </div>

                      {/* Players */}
                      <div className="space-y-3 sm:space-y-4">
                        {players.length > 0 ? (
                          players.map((player, idx) => (
                            <motion.div
                              key={player.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex gap-3 sm:gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-blue-500 dark:hover:border-blue-500/30 transition-all"
                            >
                              {/* Player Image */}
                              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                {player.photoDoc ? (
                                  <img
                                    src={player.photoDoc}
                                    alt={player.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-gray-400 dark:text-gray-600">
                                    👤
                                  </div>
                                )}
                              </div>

                              {/* Player Info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-headline font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white truncate">
                                  {player.name}
                                </p>

                                <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
                                  <span className="text-[10px] sm:text-xs font-black uppercase px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg sm:rounded-xl">
                                    {player.role}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-500 italic text-center py-8 sm:py-12">
                            No player data yet
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer (ALWAYS VISIBLE) */}
              {selectedMatch.result && (
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-200 dark:border-gray-700 text-center text-blue-600 dark:text-blue-400 font-headline font-bold uppercase bg-gray-50 dark:bg-gray-900 rounded-b-2xl sm:rounded-b-3xl">
                  {selectedMatch.result} • Winner: {selectedMatch.winner || '—'}
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}