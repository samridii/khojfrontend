import { motion } from 'framer-motion'

// Photo placeholder colors representing Nepal imagery
const PHOTOS = [
  { bg: 'from-amber-700 to-orange-900',  label: 'Pashupatinath at Dawn',  span: 'row-span-2' },
  { bg: 'from-yellow-500 to-amber-600',  label: 'Tihar Festival Lights',  span: '' },
  { bg: 'from-blue-700 to-indigo-800',   label: 'Boudhanath Stupa',       span: '' },
  { bg: 'from-red-800 to-rose-900',      label: 'Newari Pottery',         span: '' },
  { bg: 'from-green-700 to-emerald-900', label: 'Rice Terraces',          span: '' },
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
            <div className={`w-full h-full bg-gradient-to-b ${PHOTOS[0].bg} opacity-90`} />
          </motion.div>

          {/* Top middle-left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-2 rounded-xl overflow-hidden"
          >
            <div className={`w-full h-full bg-gradient-to-b ${PHOTOS[1].bg} opacity-90`} />
          </motion.div>

          {/* Tall right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 rounded-xl overflow-hidden"
          >
            <div className={`w-full h-full bg-gradient-to-b ${PHOTOS[2].bg} opacity-90`} />
          </motion.div>

          {/* Bottom middle-left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden"
          >
            <div className={`w-full h-full bg-gradient-to-b ${PHOTOS[3].bg} opacity-90`} />
          </motion.div>

          {/* Bottom middle-right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-xl overflow-hidden"
          >
            <div className={`w-full h-full bg-gradient-to-b ${PHOTOS[4].bg} opacity-90`} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}