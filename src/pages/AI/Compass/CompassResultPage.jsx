import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Compass, Heart, Leaf } from 'lucide-react'

// ─── Mock result data (replace with real API response) ───────────────────

const MOCK_RESULT = {
  matchPercent: 95,
  cultureName:  'Thakali Culture',
  tagline:      'Your affinity for sustainable craftsmanship and remote mountain culinary traditions led us here. The Thakali people of the Kali Gandaki Valley embody the spirit of high-altitude hospitality you\'ve been searching for.',
  quote:        '"Nepal reveals everything, if you know how to ask."',
  reasons: [
    {
      icon: '🍜',
      title: 'Culinary Flavor',
      desc: 'Your interest in slow-food and traditional fermentation matches the Thakali mastery of Jimbu-seasoned dal and sun-dried meat delicacies.',
      color: '#FDF3DF',
      accent: '#873415',
    },
    {
      icon: '🤝',
      title: 'The Spirit',
      desc: 'You seek authentic human connection. Thakali culture is built on \'Dhikur\', a unique community-based banking and support system that prioritises collective well-being.',
      color: '#F0F7F0',
      accent: '#2D6A4F',
    },
    {
      icon: '🏔️',
      title: 'Rhythms',
      desc: 'The seasonal migration patterns of the Thakali match your preference for travel that respects nature\'s timing and environmental cycles.',
      color: '#FDF3DF',
      accent: '#873415',
    },
  ],
  scrapbook: [
    { label: 'Tukuche Village Streets', gradient: 'from-blue-800 via-slate-600 to-gray-700' },
    { label: 'The Harvest Ritual',      gradient: 'from-amber-600 via-orange-500 to-yellow-600' },
    { label: 'Mind & Spirit',           gradient: 'from-sky-400 via-blue-300 to-indigo-400' },
    { label: 'The Taste',               gradient: 'from-yellow-700 via-amber-600 to-orange-700' },
    { label: 'Mountain Dawn',           gradient: 'from-indigo-800 via-purple-700 to-slate-800' },
  ],
}

// ─── Scrapbook photo card ─────────────────────────────────────────────────

function PhotoCard({ label, gradient }) {
  return (
    <div className="flex-shrink-0 w-44 bg-white shadow-pin p-2 pb-7 space-y-2">
      <div className={`w-full h-36 bg-gradient-to-br ${gradient}`} />
      <p className="font-body text-xs text-ink-muted text-center leading-snug">{label}</p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function CompassResultPage() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [refine,  setRefine]  = useState('')
  const [scrollX, setScrollX] = useState(0)

  const result = MOCK_RESULT

  const scroll = (dir) => {
    const el = document.getElementById('scrapbook-scroll')
    if (el) el.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7F3EA' }}>

      {/* ── MATCH HERO ── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-20 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-start gap-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 space-y-6"
          >
            {/* Match % */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-copper" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-copper">
                Cultural Match Found
              </span>
            </div>

            <h1 className="font-display font-bold text-6xl lg:text-7xl leading-[1] text-primary">
              {result.matchPercent}%<br />
              <span className="text-ink">Match:</span><br />
              {result.cultureName}
            </h1>

            <p className="font-body text-sm leading-relaxed text-ink-muted max-w-sm">
              {result.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/ai/journey-builder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm rounded-lg hover:bg-primary-light transition-colors shadow-pin">
                Begin Your Journey
                <ArrowRight size={16} />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D7CCB3] bg-white/60 text-ink font-display font-bold text-sm rounded-lg hover:border-primary hover:text-primary transition-colors">
                <BookOpen size={15} />
                Read Heritage Log
              </button>
            </div>
          </motion.div>

          {/* Right — Polaroid stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex-shrink-0 w-72 h-72"
          >
            {/* Back polaroid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white shadow-ledger p-3 pb-8 rotate-3">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
            </div>
            {/* Front polaroid (main) */}
            <div className="absolute top-4 left-0 w-60 h-60 bg-white shadow-ledger p-3 pb-8 -rotate-2 z-10">
              <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 flex items-end p-2">
                <p className="font-body text-[10px] text-white/70 italic leading-snug">
                  "{result.quote.replace(/"/g, '')}"
                </p>
              </div>
            </div>
            {/* Small accent polaroid */}
            <div className="absolute bottom-0 right-4 w-32 h-32 bg-white shadow-pin p-2 pb-5 rotate-6 z-20">
              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TORN EDGE TRANSITION ── */}
      <div className="relative h-8 overflow-hidden" style={{ background: '#F7F3EA' }}>
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full"
          style={{ fill: '#EDE8DA' }}>
          <path d="M0 32 L0 16 Q60 0 120 16 Q180 32 240 16 Q300 0 360 16 Q420 32 480 16 Q540 0 600 16 Q660 32 720 16 Q780 0 840 16 Q900 32 960 16 Q1020 0 1080 16 Q1140 32 1200 16 Q1260 0 1320 16 Q1380 32 1440 16 L1440 32 Z"/>
        </svg>
      </div>

      {/* ── WHY WE MATCHED YOU ── */}
      <section style={{ background: '#EDE8DA' }} className="py-20 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto space-y-12">

          {/* Header */}
          <div className="text-center space-y-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              The AI Reasoning
            </p>
            <h2 className="font-display font-bold text-4xl text-ink">
              Why We Matched You
            </h2>
          </div>

          {/* Reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {result.reasons.map(({ icon, title, desc, color, accent }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-7 space-y-4 border border-[rgba(0,0,0,0.06)]"
                style={{ background: color }}
              >
                <div className="text-3xl">{icon}</div>
                <h3 className="font-display font-bold text-xl" style={{ color: accent }}>
                  {title}
                </h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCRAPBOOK OF DISCOVERY ── */}
      <section className="py-20 px-6 lg:px-20" style={{ background: '#F7F3EA' }}>
        <div className="max-w-screen-xl mx-auto space-y-8">

          {/* Header + nav */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-3xl text-ink">
                The Scrapbook of Discovery
              </h2>
              <p className="font-body text-sm text-ink-muted max-w-xs">
                Fragments of daily life in the Tukuche and Marpha regions, captured for your exploration.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => scroll(-1)}
                className="w-9 h-9 rounded-full border border-[#D7CCB3] bg-white flex items-center justify-center text-ink hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll(1)}
                className="w-9 h-9 rounded-full border border-[#D7CCB3] bg-white flex items-center justify-center text-ink hover:border-primary hover:text-primary transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal scroll */}
          <div id="scrapbook-scroll"
            className="flex gap-4 overflow-x-auto pb-4 snap-x scroll-smooth"
            style={{ scrollbarWidth: 'none' }}>
            {result.scrapbook.map((photo, i) => (
              <motion.div
                key={photo.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="snap-start"
              >
                <PhotoCard {...photo} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT THE RIGHT MATCH ── */}
      <section className="py-20 px-6 lg:px-20" style={{ background: '#EDE8DA' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-lg mx-auto text-center space-y-6">

            <h2 className="font-display font-bold text-3xl text-ink">
              Not quite the right match?
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Our AI Compass is constantly learning. Tweak your preferences to explore other facets of Nepal's diverse cultural landscape.
            </p>

            {/* Refine input */}
            <div className="flex gap-0 overflow-hidden rounded-xl border border-[#D7CCB3] bg-white shadow-card">
              <input
                type="text"
                value={refine}
                onChange={e => setRefine(e.target.value)}
                placeholder="Tell us more about yourself..."
                className="flex-1 px-5 py-4 font-body text-sm text-ink bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button className="px-6 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors flex-shrink-0">
                Recalibrate Discovery
              </button>
            </div>

            {/* Back to compass */}
            <button
              onClick={() => navigate('/ai/compass')}
              className="inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-primary transition-colors"
            >
              <ChevronLeft size={14} />
              Start fresh with new inputs
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}