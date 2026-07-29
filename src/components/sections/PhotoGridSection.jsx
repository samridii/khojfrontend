import { motion } from 'framer-motion'

// Real imagery representing Nepal's living culture
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80',
    label: 'Durbar Square at Dawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=700&q=80',
    label: 'Tihar Festival Lights',
  },
  {
    src: 'https://images.unsplash.com/photo-1648702978569-d21e6c4701b2?w=700&q=80',
    label: 'Boudhanath Stupa',
  },
  {
    src: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&q=80',
    label: 'Steamed Momos',
  },
  {
    src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=80',
    label: 'Nepali Thali',
  },
]

export default function PhotoGridSection() {
  return (
    <section className="bg-primary py-20 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto space-y-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl leading-tight text-white max-w-3xl mx-auto">
            Because culture is meant to be{' '}
            <span className="underline decoration-[#F9BC50] decoration-4 underline-offset-4">felt.</span>
          </h2>
        </motion.div>

        {/* Photo Mosaic */}
        <div className="grid grid-cols-4 gap-3 h-[480px]">
          {/* Tall left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 rounded-xl overflow-hidden"
          >
            <img src={PHOTOS[0].src} alt={PHOTOS[0].label} className="w-full h-full object-cover" />
          </motion.div>

          {/* Top middle-left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-2 rounded-xl overflow-hidden"
          >
            <img src={PHOTOS[1].src} alt={PHOTOS[1].label} className="w-full h-full object-cover" />
          </motion.div>

          {/* Tall right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 rounded-xl overflow-hidden"
          >
            <img src={PHOTOS[2].src} alt={PHOTOS[2].label} className="w-full h-full object-cover" />
          </motion.div>

          {/* Bottom middle-left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden"
          >
            <img src={PHOTOS[3].src} alt={PHOTOS[3].label} className="w-full h-full object-cover" />
          </motion.div>

          {/* Bottom middle-right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-xl overflow-hidden"
          >
            <img src={PHOTOS[4].src} alt={PHOTOS[4].label} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}