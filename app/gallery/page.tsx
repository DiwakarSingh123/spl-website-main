'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GalleryItem {
  id: string
  title: string
  url: string
  category: string
  type: string
  active: boolean
}

const CATEGORIES = ['All', 'Events', 'Matches', 'Training', 'Registration', 'General']

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setItems(data.filter((i: GalleryItem) => i.active))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const photos = items.filter(i => i.type === 'photo')
  const videos = items.filter(i => i.type === 'video')
  const filtered = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 transition-colors duration-300">

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4" 
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img 
              src={lightbox.url} 
              alt={lightbox.title} 
              className="w-full max-h-[85vh] object-contain rounded-2xl" 
            />
            <p className="text-center mt-6 font-headline font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {lightbox.title}
            </p>
            <button 
              onClick={() => setLightbox(null)} 
              className="absolute top-6 right-6 text-4xl text-white hover:text-blue-400 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative py-16 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6"
            >
              <span className="material-symbols-outlined text-white text-3xl">photo_library</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • MOMENTS</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              GALLERY
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base">
              Capturing the spirit, action and memories of Saroj Premier League
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <div className="h-px w-10 bg-blue-600 dark:bg-blue-400 mb-3" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">
                Photo Gallery <span className="text-gray-500 dark:text-gray-500 text-xl">({photos.length})</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c === 'All' || photos.some(p => p.category === c)).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs font-headline font-black uppercase tracking-widest rounded-2xl transition-all ${
                    activeCategory === cat 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                      : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 cursor-pointer shadow-sm"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex flex-col justify-end">
                    <h3 className="text-white font-headline font-bold text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-blue-400 dark:text-blue-300 text-xs mt-1">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-500">
              <span className="text-6xl mb-4 block">📷</span>
              <p className="font-headline font-bold uppercase">No photos yet</p>
              <p className="text-sm mt-2">Gallery will be updated during the tournament</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery */}
      {videos.length > 0 && (
        <section className="py-16 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">
                Video Gallery <span className="text-gray-500 dark:text-gray-500 text-xl">({videos.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <a 
                  key={video.id} 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center mb-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors overflow-hidden">
                    <div className="w-16 h-16 border-2 border-blue-400 dark:border-blue-500/50 rounded-full flex items-center justify-center group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:scale-110 transition-all">
                      <span className="text-blue-600 dark:text-blue-400 text-3xl ml-1">▶</span>
                    </div>
                  </div>
                  <h3 className="font-headline font-bold uppercase text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{video.category}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Stream Teaser */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Live Stream</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-video rounded-3xl flex items-center justify-center shadow-sm">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-30">📺</div>
              <p className="font-headline font-bold uppercase text-gray-600 dark:text-gray-400">Live coverage during tournament</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Schedule will be updated soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}