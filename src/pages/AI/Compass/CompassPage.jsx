import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown, Compass, Users, Leaf, UtensilsCrossed,
  BookOpen, Zap, Heart, MapPin, ArrowRight
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────

const DURATIONS = ['1–3 days', '4–7 days', '1–2 weeks', '3–4 weeks', '1 month+']
const BUDGETS   = ['Budget (< $30/day)', 'Mid-range ($30–80/day)', 'Comfort ($80–150/day)', 'Luxury ($150+/day)']
const CITIES    = ['Kathmandu', 'Pokhara', 'Bhaktapur', 'Lalitpur', 'Chitwan', 'Lumbini', 'Namche Bazaar']

const INTERESTS = [
  { id: 'culture',    label: 'Culture',    Icon: Compass },
  { id: 'nature',     label: 'Nature',     Icon: Leaf },
  { id: 'cuisine',    label: 'Cuisine',    Icon: UtensilsCrossed },
  { id: 'history',    label: 'History',    Icon: BookOpen },
  { id: 'adventure',  label: 'Adventure',  Icon: Zap },
  { id: 'wellness',   label: 'Wellness',   Icon: Heart },
]

const DYNAMICS = ['Solo', 'Couple', 'Family', 'Friends']

const MODES = [
  {
    id: 'community',
    label: 'Community First',
    desc: 'Deep immersion into local daily life.',
    Icon: Users,
  },
  {
    id: 'scenic',
    label: 'Scenic Harmony',
    desc: 'Prioritising nature vistas & serenity.',
    Icon: Leaf,
  },
  {
    id: 'spiritual',
    label: 'The Spiritual Path',
    desc: 'Rituals, temples, and inner peace.',
    Icon: MapPin,
  },
]

// ─── Small reusables ──────────────────────────────────────────────────────

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#D7CCB3] rounded-lg px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-copper transition-colors cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light pointer-events-none" />
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function AICompassPage() {
  const navigate = useNavigate()

  const [inputText,  setInputText]  = useState('')
  const [duration,   setDuration]   = useState('')
  const [budget,     setBudget]     = useState('')
  const [city,       setCity]       = useState('')
  const [interests,  setInterests]  = useState([])
  const [dynamic,    setDynamic]    = useState('Solo')
  const [mode,       setMode]       = useState('community')
  const [loading,    setLoading]    = useState(false)

  const toggleInterest = (id) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const handleSubmit = async () => {
    if (!inputText.trim()) return
    setLoading(true)
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    navigate('/ai/compass/result', {
      state: { inputText, duration, budget, city, interests, dynamic, mode }
    })
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7F3EA' }}>

      {/* ── HERO ── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-20 pt-20 pb-16">
        <div className="flex items-start justify-between gap-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-lg space-y-6"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-copper" />
              <span className="font-mono text-xs font-bold uppercase tracking-[3px] text-copper">
                AI Cultural Compass
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] text-ink-brown">
              Find Your <span className="text-primary">Cultural</span><br />
              <span className="text-ink">North.</span>
            </h1>

            <p className="font-body text-sm leading-relaxed text-ink-muted max-w-sm">
              Map your spirit to the living heritage of Nepal. Our AI Compass translates your seekers' heart into an authentic, community-led journey.
            </p>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={4}
                placeholder="Describe what you seek… the rhythm of mountain drums, the silence of a high-altitude monastery, or the scent of ancient cedar?"
                className="w-full bg-white/80 border border-[#D7CCB3] rounded-xl px-5 py-4 font-body text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 resize-none transition-all leading-relaxed"
              />
              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-gray-300">
                {inputText.length} / 500
              </div>
            </div>

            {/* Mood tags */}
            <div className="flex flex-wrap gap-2">
              {['Peaceful', 'Adventurous', 'Spiritual', 'Cultural', 'Culinary', 'Remote'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setInputText(t => t ? `${t} ${tag.toLowerCase()}` : tag.toLowerCase())}
                  className="px-3 py-1 rounded-full border border-[#D7CCB3] bg-white/60 font-body text-xs text-ink-muted hover:border-copper hover:text-primary transition-all"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Polaroid */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="w-72 bg-white shadow-ledger p-3 pb-10 rotate-1">
              <div className="w-full h-64 bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-700 flex items-end justify-start p-3">
                <div className="space-y-0.5">
                  <div className="w-16 h-px bg-white/40" />
                  <p className="font-mono text-[9px] text-white/60 uppercase tracking-widest">
                    Himalayan Monastery
                  </p>
                </div>
              </div>
              <div className="mt-3 px-1 space-y-0.5">
                <p className="font-mono text-[9px] text-ink-light tracking-widest uppercase">
                  LAT 28.394°N · LNG 84.124°E
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20">
        <div className="border-t border-[#D7CCB3]" />
      </div>

      {/* ── PREFERENCES + INTELLIGENCE MODE ── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-20 py-16">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* ── 01 Personal Preferences ── */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-copper/40 tracking-widest">01</span>
              <div>
                <h2 className="font-display font-bold text-2xl text-ink">Personal Preferences</h2>
                <p className="font-body text-xs text-ink-muted mt-0.5">Fine-tune the logistical framework of your odyssey.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField label="Journey Duration" value={duration} onChange={setDuration}
                options={DURATIONS} placeholder="Select your timeframe" />
              <SelectField label="Investment Level" value={budget}   onChange={setBudget}
                options={BUDGETS}   placeholder="Select budget" />
              <div className="sm:col-span-2">
                <SelectField label="Origin City" value={city} onChange={setCity}
                  options={CITIES} placeholder="Select starting point" />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
                Primary Interests <span className="text-ink-light font-normal">(select up to 4)</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {INTERESTS.map(({ id, label, Icon }) => {
                  const active = interests.includes(id)
                  return (
                    <button
                      key={id}
                      onClick={() => toggleInterest(id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                        ${active
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-[#D7CCB3] bg-white/60 text-ink-muted hover:border-copper hover:text-primary'
                        }`}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                      <span className="font-mono text-[9px] uppercase tracking-wider">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Travel Dynamics */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
                Travel Dynamics
              </label>
              <div className="flex flex-wrap gap-2">
                {DYNAMICS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDynamic(d)}
                    className={`px-5 py-2 rounded-full border font-body text-sm transition-all duration-200
                      ${dynamic === d
                        ? 'bg-primary border-primary text-white'
                        : 'border-[#D7CCB3] bg-white/60 text-ink hover:border-primary hover:text-primary'
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── 02 Intelligence Mode ── */}
          <div className="lg:w-80 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-copper/40 tracking-widest">02</span>
              <div>
                <h2 className="font-display font-bold text-2xl text-ink">Intelligence Mode</h2>
                <p className="font-body text-xs text-ink-muted mt-0.5">Select a lens for your compass.</p>
              </div>
            </div>

            {/* Mode cards */}
            <div className="rounded-2xl overflow-hidden bg-primary p-4 space-y-2">
              {MODES.map(({ id, label, desc, Icon }) => {
                const active = mode === id
                return (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200
                      ${active
                        ? 'bg-white/15 ring-1 ring-white/30'
                        : 'hover:bg-white/8'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${active ? 'bg-copper' : 'bg-white/10'}`}>
                      <Icon size={16} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-white">{label}</p>
                      <p className="font-body text-xs text-white/60 mt-0.5 leading-snug">{desc}</p>
                    </div>
                    {active && (
                      <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Map preview card */}
            <div className="rounded-2xl overflow-hidden bg-[#E8DFC8] border border-[#C8BC9E] p-5 space-y-3">
              {/* Vintage map grid */}
              <div className="w-full h-32 rounded-lg overflow-hidden relative"
                style={{
                  background: '#D4C8A8',
                  backgroundImage: 'linear-gradient(rgba(135,52,21,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(135,52,21,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}>
                {/* Dashed border on map */}
                <div className="absolute inset-3 border-2 border-dashed border-[#873415]/30 rounded" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-30">
                  <MapPin size={32} fill="currentColor" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-copper">
                  ◎ Visualizing Path
                </p>
                <p className="font-display font-bold text-sm text-ink leading-snug">
                  Your bespoke map is being woven from threads of intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="flex justify-center pb-20 px-6">
        <motion.button
          onClick={handleSubmit}
          disabled={!inputText.trim() || loading}
          whileHover={{ scale: inputText.trim() && !loading ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          className={`relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-display font-bold text-lg text-white shadow-ledger transition-all duration-300
            ${inputText.trim() && !loading
              ? 'bg-primary hover:bg-primary-light cursor-pointer'
              : 'bg-primary/40 cursor-not-allowed'
            }`}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calibrating…
              </motion.span>
            ) : (
              <motion.span key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3">
                Calibrate My Compass
                <ArrowRight size={18} />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Gold dot accent */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold border-2 border-white" />
        </motion.button>
      </section>

      {/* ── Bottom Features ── */}
      <section className="border-t border-[#D7CCB3] bg-[#F0EAD8]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users,    title: 'Ethical Stewardship', desc: 'Prioritising communities that seek sustainable, respectful engagement.' },
              { icon: BookOpen, title: 'Living Records',       desc: 'Itineraries synchronised with local lunar calendars and seasonal rites.' },
              { icon: MapPin,   title: 'Direct Presence',     desc: 'Bridge the gap with community hosts after your path is revealed.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center">
                    <Icon size={22} className="text-copper" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display font-bold text-base text-ink">{title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}