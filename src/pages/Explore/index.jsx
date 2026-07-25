import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

const FILTERS = [
  { label: 'Region',       icon: '◎' },
  { label: 'Scenic',       icon: '◎' },
  { label: 'Spiritual',    icon: '✦' },
  { label: 'Traditional',  icon: '◎' },
  { label: 'Food-focused', icon: '◎' },
  { label: 'Hidden Gems',  icon: '◎' },
  { label: 'Locals',       icon: '◎' },
]

const BADGE_STYLES = {
  'ETHNIC COMMUNITY': { bg: '#2D6A4F', text: '#fff' },
  'FOOD EXPERIENCE':  { bg: '#1B4332', text: '#fff' },
  'CRAFT WORKSHOP':   { bg: '#873415', text: '#fff' },
  'FESTIVAL':         { bg: '#6B2737', text: '#fff' },
  'SOUNDS & MUSIC':   { bg: '#1A3A5C', text: '#fff' },
  'HIDDEN PLACE':     { bg: '#1F3A2F', text: '#fff' },
}

const ITEMS = [
  {
    id: 1,
    type: 'ETHNIC COMMUNITY',
    title: 'Newari Community',
    description: 'Ancient traditions, exquisite arts and architecture that thrive in the Kathmandu Valley.',
    location: 'Kathmandu Hills',
    to: '/community/newari',
    gradient: 'from-amber-700 via-orange-600 to-amber-800',
    imgHint: 'Newari Temple',
  },
  {
    id: 2,
    type: 'FOOD EXPERIENCE',
    title: 'Thakali Kitchen Experience',
    description: 'Warm meals, mountain flavors and a culture of hospitality from the Mustang region.',
    location: 'Mustang',
    to: '/food/thakali',
    gradient: 'from-slate-700 via-gray-600 to-slate-800',
    imgHint: 'Thakali Chef',
  },
  {
    id: 3,
    type: 'CRAFT WORKSHOP',
    title: 'Paubha Painting Workshop',
    description: 'Learn sacred art from master artists and take home your journey creation. Immerse...',
    location: 'Bhaktapur',
    to: '/workshops/paubha',
    gradient: 'from-gray-600 via-slate-500 to-gray-700',
    imgHint: 'Master Artisan',
  },
  {
    id: 4,
    type: 'FESTIVAL',
    title: 'Biska Jatra Festival',
    description: 'The festival of life, vibrant processions and ancient Newari traditions. Feel the...',
    location: 'Bhaktapur',
    to: '/festival/biska-jatra',
    gradient: 'from-amber-600 via-yellow-500 to-orange-600',
    imgHint: 'Festival Lion',
  },
  {
    id: 5,
    type: 'SOUNDS & MUSIC',
    title: 'Monastery Sounds',
    description: 'Sacred chants, prayer wheels and sounds that calm the soul in the high Himalayas.',
    location: 'Solukhumbu',
    to: '/music/monastery',
    gradient: 'from-indigo-800 via-blue-700 to-indigo-900',
    imgHint: 'Sacred Figure',
  },
  {
    id: 6,
    type: 'HIDDEN PLACE',
    title: 'Hidden Village of Phu',
    description: 'A timeless village in the Himalayas away from the world. Discover the secrets of...',
    location: 'Inner Mustang',
    to: '/community/phu',
    gradient: 'from-sky-500 via-teal-400 to-emerald-500',
    imgHint: 'Mountain Pagoda',
  },
  {
    id: 7,
    type: 'ETHNIC COMMUNITY',
    title: 'Samay Baji',
    description: 'Ancient traditions, exquisite arts and architecture that thrive in the Kathmandu.',
    location: 'Kathmandu Hills',
    to: '/food/samay-baji',
    gradient: 'from-amber-700 via-orange-600 to-amber-800',
    imgHint: 'Newari Temple',
  },
  {
    id: 8,
    type: 'FOOD EXPERIENCE',
    title: 'Thakali Kitchen Experience',
    description: 'Warm meals, mountain flavors and a culture of hospitality from the Mustang region.',
    location: 'Mustang',
    to: '/food/thakali-2',
    gradient: 'from-slate-700 via-gray-600 to-slate-800',
    imgHint: 'Thakali Chef',
  },
  {
    id: 9,
    type: 'CRAFT WORKSHOP',
    title: 'Paubha Painting Workshop',
    description: 'Learn sacred art from master artists and take home your journey creation. Immerse...',
    location: 'Bhaktapur',
    to: '/workshops/paubha-2',
    gradient: 'from-gray-600 via-slate-500 to-gray-700',
    imgHint: 'Master Artisan',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────

function Badge({ type }) {
  const style = BADGE_STYLES[type] || { bg: '#873415', text: '#fff' }
  return (
    <span
      className="absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm z-10"
      style={{ background: style.bg, color: style.text }}
    >
      {type}
    </span>
  )
}

function ExploreCard({ item, isCompared, onCompareToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl overflow-hidden shadow-card border border-[rgba(0,0,0,0.06)] flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />
        {/* Decorative image label */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="font-display font-bold text-white text-2xl text-center px-4">
            {item.imgHint}
          </span>
        </div>
        <Badge type={item.type} />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-display font-bold text-lg text-ink leading-snug group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sage-dark">
          <MapPin size={13} strokeWidth={2} />
          <span className="font-body text-xs">{item.location}</span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F0EDE8] mt-auto">
          {/* Compare checkbox */}
          <label className="flex items-center gap-2 cursor-pointer group/cb">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onCompareToggle(item.id)}
              className="w-4 h-4 rounded border-2 border-[#D7CCB3] accent-primary cursor-pointer"
            />
            <span className="font-body text-xs text-ink-muted group-hover/cb:text-ink transition-colors">
              Compare
            </span>
          </label>

          {/* View button */}
          <Link
            to={item.to}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-primary border border-[#D7CCB3] px-3 py-1.5 rounded-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            ↗ Compare
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Hero polaroids ────────────────────────────────────────────────────────

function HeroPolaroids() {
  return (
    <div className="relative w-64 h-52 flex-shrink-0">
      {/* Back polaroid */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-white shadow-pin p-2 pb-7 rotate-6 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-orange-950 rounded-sm flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-amber-400 opacity-60 flex items-center justify-center">
            <div className="w-10 h-10 bg-amber-400 rounded-full opacity-80" />
          </div>
        </div>
      </div>
      {/* Front polaroid */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white shadow-pin p-2 pb-6 -rotate-3 overflow-hidden z-10">
        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-300 rounded-sm flex items-center justify-center">
          <div className="text-white opacity-60 font-display text-xs text-center">
            Dal Bhat
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [searchParams] = useSearchParams()
  const [query,        setQuery]    = useState(searchParams.get('q') || '')
  const [activeFilter, setFilter]   = useState(searchParams.get('type') || null)
  const [compared,     setCompared] = useState([])

  const toggleCompare = (id) => {
    setCompared(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-3)
    )
  }

  const filtered = useMemo(() => {
    let items = ITEMS
    if (query) {
      const q = query.toLowerCase()
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
      )
    }
    if (activeFilter) {
      const map = {
        'Spiritual':    ['SOUNDS & MUSIC', 'HIDDEN PLACE'],
        'Food-focused': ['FOOD EXPERIENCE'],
        'Hidden Gems':  ['HIDDEN PLACE'],
        'Traditional':  ['ETHNIC COMMUNITY', 'FESTIVAL'],
        'Scenic':       ['HIDDEN PLACE', 'SOUNDS & MUSIC'],
      }
      const types = map[activeFilter]
      if (types) items = items.filter(i => types.includes(i.type))
    }
    return items
  }, [query, activeFilter])

  return (
    <div className="min-h-screen" style={{ background: '#B7B9A2' }}>

      {/* ── Hero Header ── */}
      <section className="px-6 lg:px-16 pt-16 pb-10 max-w-screen-xl mx-auto">
        <div className="flex items-start justify-between gap-8">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-md"
          >
            <h1 className="font-display font-bold text-5xl lg:text-6xl leading-tight text-primary">
              Explore Nepal<br />Deeply
            </h1>
            <p className="font-body text-sm leading-relaxed text-ink-brown opacity-80 max-w-xs">
              Beyond the summits lies a living scrapbook of ancient traditions, sensory kitchens, and the quiet wisdom of ethnic souls.
            </p>
          </motion.div>

          {/* Right polaroids */}
          <motion.div
            initial={{ opacity: 0, x: 24, rotate: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block"
          >
            <HeroPolaroids />
          </motion.div>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <section className="px-6 lg:px-16 pb-6 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-0 bg-white rounded-xl shadow-card overflow-hidden border border-[rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3 flex-1 px-5 py-4">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setQuery('')}
              placeholder="Search cultures, tastes, traditions..."
              className="flex-1 font-body text-sm text-ink bg-transparent focus:outline-none placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-ink transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
          <button className="h-full px-7 py-4 bg-primary text-white font-mono font-bold text-sm uppercase tracking-wider hover:bg-primary-light transition-colors flex-shrink-0">
            FIND
          </button>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 mt-4"
        >
          {FILTERS.map(({ label }) => (
            <button
              key={label}
              onClick={() => setFilter(f => f === label ? null : label)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border font-body text-xs transition-all duration-200
                ${activeFilter === label
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white/60 border-[#D7CCB3] text-ink-brown hover:border-primary hover:text-primary'
                }`}
            >
              <span className="text-[10px]">+</span>
              {label}
            </button>
          ))}

          {/* Active filter clear */}
          {activeFilter && (
            <button
              onClick={() => setFilter(null)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-copper/10 border border-copper text-copper font-body text-xs hover:bg-copper hover:text-white transition-all"
            >
              <X size={11} /> Clear
            </button>
          )}
        </motion.div>
      </section>

      {/* ── Results Grid ── */}
      <section className="px-6 lg:px-16 pb-16 max-w-screen-xl mx-auto">

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-xs text-ink-brown opacity-70 uppercase tracking-wider">
            {filtered.length} results {activeFilter ? `· ${activeFilter}` : ''}{query ? ` · "${query}"` : ''}
          </p>
          <button className="inline-flex items-center gap-2 font-body text-xs text-ink-brown border border-[#D7CCB3] bg-white/60 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
            <SlidersHorizontal size={13} /> Sort
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <ExploreCard
                    item={item}
                    isCompared={compared.includes(item.id)}
                    onCompareToggle={toggleCompare}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <p className="font-display text-6xl opacity-20">🔍</p>
              <p className="font-display font-bold text-2xl text-ink-brown opacity-60">
                Nothing found
              </p>
              <p className="font-body text-sm text-ink-muted">
                Try a different search or clear your filters
              </p>
              <button
                onClick={() => { setQuery(''); setFilter(null) }}
                className="mt-2 px-6 py-2 bg-primary text-white font-mono text-xs uppercase tracking-wider rounded-lg hover:bg-primary-light transition-colors"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Compare bar (appears when items selected) ── */}
      <AnimatePresence>
        {compared.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-6 py-3 rounded-xl shadow-ledger flex items-center gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-wider">
              {compared.length} item{compared.length > 1 ? 's' : ''} selected
            </span>
            <button className="font-display font-bold text-sm bg-white text-primary px-5 py-1.5 rounded-lg hover:bg-cream transition-colors">
              Compare Now
            </button>
            <button
              onClick={() => setCompared([])}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}