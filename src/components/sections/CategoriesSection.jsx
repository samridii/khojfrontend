import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Utensils, Palette, Star, MapPin, Scroll } from 'lucide-react'

const CATEGORIES = [
  { label: 'Communities', icon: Users,    to: '/explore?type=community', emoji: '🏘️' },
  { label: 'Food & Drink', icon: Utensils, to: '/explore?type=food',      emoji: '🍛' },
  { label: 'Crafts',       icon: Palette,  to: '/explore?type=craft',     emoji: '🪆' },
  { label: 'Festivals',    icon: Star,     to: '/explore?type=festival',  emoji: '🎉' },
  { label: 'Shrines',      icon: MapPin,   to: '/explore?type=shrine',    emoji: '🛕' },
  { label: 'Old Maps',     icon: Scroll,   to: '/explore?type=maps',      emoji: '🗺️' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function CategoriesSection() {
  return (
    <section className="bg-sage py-16 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto space-y-10">

        {/* Heading */}
        <div className="relative">
          <h2 className="font-display font-bold text-5xl lg:text-6xl leading-tight text-ink">
            Start Exploring
            <br />the Unseen.
          </h2>
          {/* Underline accent */}
          <div className="absolute bottom-0 left-0 w-20 h-[2px] bg-primary opacity-60 mt-2" />
        </div>

        {/* Category Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3"
        >
          {CATEGORIES.map(({ label, icon: Icon, to }) => (
            <motion.div key={label} variants={cardVariants}>
              <Link to={to}
                className="flex flex-col items-center justify-center gap-3 p-5 bg-cream-deep border border-[rgba(220,193,184,0.3)] rounded-lg hover:-translate-y-1 hover:shadow-card transition-all duration-300 group">
                {/* Icon block */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <Icon size={28} className="text-primary group-hover:text-copper transition-colors" strokeWidth={1.5}/>
                </div>
                <span className="font-display font-bold text-sm text-ink text-center leading-tight">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}