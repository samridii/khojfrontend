// Photo grid with real Unsplash images
import { motion } from "framer-motion";

const PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    label: "Pashupatinath at Dawn",
    tall: true,
  },
  {
    url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=85",
    label: "Tihar Festival Lights",
    tall: false,
    wide: true,
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    label: "Boudhanath Stupa",
    tall: true,
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85",
    label: "Newari Pottery",
    tall: false,
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85",
    label: "Rice Terraces",
    tall: false,
  },
];

export default function PhotoGridSection() {
  return (
    <section className="bg-primary py-20 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto space-y-14">

        // Heading
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl leading-tight text-white max-w-3xl mx-auto">
            Because culture is meant to be{" "}
            <span className="underline decoration-[#F9BC50] decoration-4 underline-offset-4">felt.</span>
          </h2>
        </motion.div>

        // Photo mosaic with real images
        <div className="grid grid-cols-4 gap-3 h-[480px]">

          // Tall left
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 overflow-hidden"
            style={{ gridRow: "span 2" }}
          >
            <img
              src={PHOTOS[0].url}
              alt={PHOTOS[0].label}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          // Top middle (wide)
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-2 overflow-hidden"
          >
            <img
              src={PHOTOS[1].url}
              alt={PHOTOS[1].label}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          // Tall right
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 overflow-hidden"
            style={{ gridRow: "span 2" }}
          >
            <img
              src={PHOTOS[2].url}
              alt={PHOTOS[2].label}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          // Bottom middle-left
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden"
          >
            <img
              src={PHOTOS[3].url}
              alt={PHOTOS[3].label}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          // Bottom middle-right
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="overflow-hidden"
          >
            <img
              src={PHOTOS[4].url}
              alt={PHOTOS[4].label}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}