import { motion } from 'framer-motion'
const TESTIMONIALS = [
  { name: 'Aarav, India',      quote: '"A life-changing experience. The people, the culture, the landscape — unforgettable!"' },
  { name: 'Maya, Australia',   quote: '"Truly authentic and heartwarming. Felt like home in Nepal."' },
  { name: 'Lobsang, Canada',   quote: '"Every moment was a story I\'ll cherish forever."' },
]
export default function StoriesSection() {
  return (
    <section className="bg-sage py-20 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-display font-extrabold text-4xl uppercase tracking-[4px] text-primary">
            Stories From Our Travelers
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-[#FFF8F0] border border-[#C5C6CF] shadow-card flex overflow-hidden relative paper-texture"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 z-0 noise-overlay opacity-40 pointer-events-none" />

          {/* Vertical center divider */}
          <div className="absolute left-1/2 top-1 bottom-1 w-px bg-[rgba(197,198,207,0.3)] z-10" />
          {/* Left: Photos */}
          <div className="w-60 flex-shrink-0 relative z-10 p-8 flex items-center justify-center">
            {/* Photo 1 */}
            <div className="absolute top-4 left-4 w-40 h-40 bg-white border-4 border-white shadow-card -rotate-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&q=80"
                alt="Traveler above the clouds in the Himalayas"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Photo 2 */}
            <div className="absolute bottom-4 right-2 w-32 h-32 bg-white border-4 border-white shadow-card rotate-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&q=80"
                alt="Nepali thali shared with locals"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Pinned note */}
            <div className="absolute bottom-0 left-2 w-36 bg-[#FDF3DF] border border-[#C5C6CF] shadow-pin p-4 -rotate-6 z-10">
              <p className="font-display font-black text-sm text-ink">Real People.</p>
              <p className="font-display font-black text-sm text-ink">Real Stories.</p>
              <span className="text-copper text-lg">♥</span>
            </div>
          </div>
          {/* Right: Testimonials */}
          <div className="flex-1 relative z-10 flex flex-col justify-center py-8 px-6 gap-0">
            {TESTIMONIALS.map(({ name, quote }, i) => (
              <div key={name}
                className={`py-7 space-y-2 ${i < TESTIMONIALS.length - 1 ? 'border-b border-[rgba(197,198,207,0.5)]' : ''}`}>
                <p className="font-display font-medium text-base text-[#031635]">{name}</p>
                <p className="font-display font-medium text-sm text-[#44474E] leading-relaxed">{quote}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}