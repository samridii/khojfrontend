import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Map, Hammer, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 0,
    bg: '#F7EED2',
    label: 'AI FEATURE 01',
    title: 'AI Cultural\nCompass.',
    titleColor: '#873415',
    description: 'Navigate Nepal\'s living culture with purpose. Tell us your mood and interests, and the Compass finds 134 ethnic communities, crafts, foods, and festivals that speak to your soul.',
    cta: { label: 'Try the Compass', to: '/ai/compass', filled: true },
    ctaSecondary: { label: 'Learn More', to: '/ai/compass' },
    visual: (
      <div className="relative w-full h-[420px] flex items-center justify-center">
        {/* Large photo card tilted */}
        <div className="absolute right-0 top-8 w-56 h-72 bg-white shadow-ledger rotate-2 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80"
            alt="Swayambhunath Stupa"
            className="w-full h-56 object-cover"
          />
          <div className="p-3">
            <p className="font-serif italic text-xs text-ink-light text-center">Swayambhunath Stupa</p>
          </div>
        </div>
        {/* Decorative sticky note */}
        <div className="absolute left-4 top-4 bg-[#FFDEAC] px-4 py-1.5 shadow-sm rotate-12 font-mono text-sm text-ink-brown">
          AI powered ✦
        </div>
        {/* Decorative color squares */}
        <div className="absolute left-8 bottom-8 flex gap-1 rotate-[33deg]">
          {['#3B82F6','#FFFFFF','#EF4444','#22C55E','#EAB308'].map((c,i) => (
            <div key={i} className="w-8 h-8" style={{ background: c, border: i===1 ? '1px solid #E5E7EB' : 'none' }} />
          ))}
        </div>
        {/* Compass icon */}
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full border-[3px] border-dashed border-[rgba(135,52,21,0.4)] flex items-center justify-center">
          <Compass size={28} className="text-[#873415]" />
        </div>
      </div>
    ),
  },
  {
    id: 1,
    bg: '#FFDED4',
    label: 'AI FEATURE 02',
    title: 'AI Journey\nBuilder.',
    titleColor: '#7D2D0E',
    description: 'Craft a path through the Himalayas tailored to your curiosity. From pottery villages to hidden monasteries, your itinerary evolves as you do.',
    cta: { label: 'Build Journey', to: '/ai/journey-builder', filled: true },
    ctaSecondary: { label: 'View Example', to: '/ai/journey-builder' },
    visual: (
      <div className="relative w-full h-[420px] flex items-center justify-center">
        {/* Map background */}
        <div className="absolute inset-4 bg-[#E2DABF] border-8 border-white shadow-inner -rotate-1 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: 'linear-gradient(#873415 1px, transparent 1px), linear-gradient(90deg, #873415 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Map pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#873415]">
            <MapPin size={40} fill="#873415" />
          </div>
        </div>
        {/* Polaroid 1 */}
        <div className="absolute left-4 top-8 w-28 h-36 bg-white shadow-pin p-2 -rotate-9 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1585116210839-1e0f89ff1e7b?w=300&q=80"
            alt="Pokhara Lake"
            className="w-full h-24 object-cover"
          />
          <p className="font-mono text-[9px] text-center mt-1.5 text-ink">Pokhara Lake</p>
        </div>
        {/* Polaroid 2 */}
        <div className="absolute right-4 bottom-12 w-32 h-40 bg-white shadow-pin p-2 rotate-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=350&q=80"
            alt="Bhaktapur"
            className="w-full h-28 object-cover"
          />
          <p className="font-mono text-[9px] text-center mt-1.5 text-ink">Bhaktapur</p>
        </div>
        {/* Label tag */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#873415] text-white font-mono text-xs px-3 py-1.5 rounded -rotate-2">
          AI Journey Builder
        </div>
      </div>
    ),
  },
  {
    id: 2,
    bg: '#873415',
    label: 'WORKSHOPS',
    title: 'Master\nWorkshops.',
    titleColor: '#D4E8D3',
    description: 'Learn directly from Nepal\'s master artisans. Book hands-on workshops in pottery, thangka painting, wood carving, and more — no payment required, just your curiosity.',
    cta: { label: 'Browse Tours', to: '/workshops', filled: false, dark: true },
    ctaSecondary: null,
    features: [
      { icon: '🏺', title: 'Hands-on Learning',  desc: 'Work directly with master artisans in their studios' },
      { icon: '📿', title: 'Cultural Immersion', desc: 'Experience authentic traditions and techniques' },
    ],
    visual: (
      <div className="relative w-full h-[420px] grid grid-cols-2 gap-4">
        {/* Workshop card 1 */}
        <div className="relative rounded-2xl border-4 border-[rgba(212,232,211,0.2)] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80"
            alt="Pottery painting workshop in Bhaktapur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-mono text-xs uppercase tracking-wider opacity-80">City of Bhaktapur</p>
            <p className="font-display text-xl mt-1">Pottery Painting</p>
          </div>
        </div>
        {/* Workshop card 2 */}
        <div className="relative rounded-2xl border-4 border-[rgba(212,232,211,0.2)] overflow-hidden mt-16">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80"
            alt="Thangka painting school"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-mono text-xs uppercase tracking-wider opacity-80">Bhaktapur</p>
            <p className="font-display text-xl mt-1">The Thangka School</p>
          </div>
        </div>
      </div>
    ),
  },
]

// Tiny import for MapPin used inside slide visuals
function MapPin({ size, fill, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export default function AIFeaturesSection() {
  const [active, setActive] = useState(0)
  const slide = SLIDES[active]

  return (
    <section className="py-4 px-4" style={{ background: '#FFF9ED' }}>
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[520px]"
          style={{ background: slide.bg }}
        >
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center px-12 py-12 lg:py-16 gap-6">
            {/* Label tag */}
            <div className="inline-flex">
              <span className="bg-primary text-white font-mono text-xs px-3 py-1.5 rounded -rotate-1">
                {slide.label}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display font-normal text-5xl lg:text-6xl leading-[1.1] tracking-[-2px]"
              style={{ color: slide.titleColor }}>
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </h2>

            {/* Feature list (workshops only) */}
            {slide.features && (
              <div className="space-y-4">
                {slide.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4E8D3] flex items-center justify-center flex-shrink-0 text-xl">
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-display text-xl text-[#D4E8D3]">{f.title}</p>
                      <p className="font-body text-sm text-[rgba(212,232,211,0.7)] leading-relaxed mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Description card */}
            {!slide.features && (
              <div className="bg-cream-warm border border-[rgba(137,114,107,0.2)] rounded-lg p-6 shadow-sm -rotate-[0.5deg] space-y-4">
                <p className="font-body text-base leading-relaxed text-ink-muted">
                  {slide.description}
                </p>
                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link to={slide.cta.to}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#873415] text-white font-display text-base rounded-full hover:bg-primary transition-colors">
                    <Compass size={18}/>
                    {slide.cta.label}
                  </Link>
                  {slide.ctaSecondary && (
                    <Link to={slide.ctaSecondary.to}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.5)] border border-[#873415] text-[#873415] font-display text-base rounded-lg hover:bg-white transition-colors">
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* CTA for workshops */}
            {slide.features && (
              <div className="pt-2">
                <Link to={slide.cta.to}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#D4E8D3] font-display text-xl text-[#0F1F12] shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-all">
                  {slide.cta.label}
                  <ArrowRight size={20}/>
                </Link>
              </div>
            )}
          </div>

          {/* Right: Visual */}
          <div className="lg:w-[480px] flex-shrink-0 p-8 flex items-center justify-center">
            {slide.visual}
          </div>
        </motion.div>

        {/* Slide navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setActive(a => Math.max(0, a-1))}
            disabled={active === 0}
            className="p-2 rounded-full border border-[#D7CCB3] text-primary disabled:opacity-30 hover:bg-cream-warm transition-colors">
            <ChevronLeft size={18}/>
          </button>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-[#D7CCB3] hover:bg-copper'}`}
              />
            ))}
          </div>
          <button onClick={() => setActive(a => Math.min(SLIDES.length-1, a+1))}
            disabled={active === SLIDES.length-1}
            className="p-2 rounded-full border border-[#D7CCB3] text-primary disabled:opacity-30 hover:bg-cream-warm transition-colors">
            <ChevronRight size={18}/>
          </button>
        </div>
      </div>
    </section>
  )
}