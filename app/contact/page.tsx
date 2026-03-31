'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', 
    message: '' 
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      })
      if (res.ok) { 
        setStatus('sent'); 
        setForm({ name: '', email: '', phone: '', subject: '', message: '' }) 
      } else setStatus('error')
    } catch { 
      setStatus('error') 
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-20 transition-colors duration-300">

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
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6"
            >
              <span className="material-symbols-outlined text-white text-3xl">contact_mail</span>
            </motion.div>

            <p className="uppercase font-headline font-bold tracking-[3px] text-blue-600 dark:text-blue-400 text-xs mb-2">SPL 2026 • SUPPORT</p>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl italic uppercase tracking-[-2px] leading-none text-gray-900 dark:text-white">
              CONTACT <span className="text-blue-600 dark:text-blue-400">US</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-md text-base">
              Have questions? We’re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Tournament Office</h2>
            </div>

            <div className="space-y-10">
              {[
                { icon: '📍', title: 'Address', lines: ['Saroj Educational Group', 'Lucknow, Uttar Pradesh', 'India — 226001'] },
                { icon: '📞', title: 'Phone', lines: ['Main: +91 98765 43210', 'Registration: +91 98765 43211'] },
                { icon: '✉️', title: 'Email', lines: ['info@splcricket.com', 'support@splcricket.com'] },
                { icon: '🕐', title: 'Office Hours', lines: ['Mon–Fri: 9AM – 6PM', 'Sat: 9AM – 2PM', 'Sun: Closed'] },
              ].map(item => (
                <div key={item.title} className="flex gap-6">
                  <span className="text-3xl flex-shrink-0 mt-1">{item.icon}</span>
                  <div>
                    <h3 className="font-headline font-bold uppercase tracking-tight text-blue-600 dark:text-blue-400 mb-2 text-sm">{item.title}</h3>
                    {item.lines.map((l, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-400 text-base">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10 bg-blue-600 dark:bg-blue-400" />
              <h2 className="font-headline font-black text-3xl uppercase tracking-tighter">Send Us a Message</h2>
            </div>

            {status === 'sent' ? (
              <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="font-headline font-black text-2xl uppercase tracking-tighter text-blue-600 dark:text-blue-400">Message Sent Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-4">We will reply within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')} 
                  className="mt-8 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-3 font-headline font-bold uppercase tracking-tight hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all rounded-2xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all" 
                      placeholder="Your full name" 
                      required 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Email *</label>
                    <input 
                      type="email" 
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all" 
                      placeholder="your@email.com" 
                      required 
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all" 
                      placeholder="+91 98765 43210" 
                      value={form.phone} 
                      onChange={e => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Subject</label>
                    <select 
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all" 
                      value={form.subject} 
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="">Select Subject</option>
                      <option value="Registration Query">Registration Query</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-headline font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Message *</label>
                  <textarea 
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-3xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-y min-h-[140px]" 
                    placeholder="Write your message here..." 
                    required 
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })} 
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-4 font-headline font-black uppercase tracking-tighter rounded-2xl transition-all disabled:opacity-60 shadow-md"
                >
                  {status === 'sending' ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-12 px-5 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '📞', title: '24/7 Helpline', desc: 'Call us for urgent queries during tournament' },
            { icon: '✉️', title: 'Quick Response', desc: 'We reply to emails within 24 hours' },
            { icon: '🏢', title: 'Visit Us', desc: 'Walk-in support available during office hours' },
          ].map((item, i) => (
            <div key={i} className="p-6">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-headline font-bold uppercase tracking-tight mb-2 text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}