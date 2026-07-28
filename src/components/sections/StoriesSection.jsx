// Stories section with real profile images
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Aarav, India",
    quote: "A life-changing experience. The people, the culture, the landscape — unforgettable!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Maya, Australia",
    quote: "Truly authentic and heartwarming. Felt like home in Nepal.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Lobsang, Canada",
    quote: "Every moment was a story I will cherish forever.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
  "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&q=80",
];

export default function StoriesSection() {
  return (
    <section className="py-20 px-6 lg:px-16" style={{ background: "#B7B9A2" }}>
      <div className="max-w-screen-xl mx-auto">

        // Section label
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-display font-extrabold text-2xl uppercase tracking-[4px] text-primary">
            Stories From Our Travelers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-[#FFF8F0] border border-[#C5C6CF] shadow-card flex overflow-hidden relative"
        >
          // Vertical center divider
          <div className="absolute left-1/3 top-1 bottom-1 w-px bg-[rgba(197,198,207,0.3)]" />

          // Left: polaroid photos
          <div className="w-56 flex-shrink-0 relative p-8 flex items-center justify-center">
            // Photo 1 — tilted back
            <div className="absolute top-4 left-4 w-40 h-40 bg-white border-4 border-white shadow-card -rotate-2 overflow-hidden">
              <img
                src={GALLERY[0]}
                alt="Nepal"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            // Photo 2 — tilted front
            <div className="absolute bottom-10 right-2 w-28 h-28 bg-white border-4 border-white shadow-card rotate-3 overflow-hidden z-10">
              <img
                src={GALLERY[1]}
                alt="Food"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            // Pinned note
            <div className="absolute bottom-2 left-2 w-32 bg-[#FDF3DF] border border-[#C5C6CF] shadow-pin p-3 -rotate-6 z-20">
              <p className="font-display font-black text-xs text-ink">Real People.</p>
              <p className="font-display font-black text-xs text-ink">Real Stories.</p>
            </div>
          </div>

          // Right: testimonials
          <div className="flex-1 flex flex-col justify-center py-8 px-6">
            {TESTIMONIALS.map(({ name, quote, image }, i) => (
              <div
                key={name}
                className={`py-5 flex items-start gap-3 ${i < TESTIMONIALS.length - 1 ? "border-b border-[rgba(197,198,207,0.5)]" : ""}`}
              >
                // Avatar
                <div className="w-9 h-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm mt-0.5">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = "#A64B2A";
                    }}
                  />
                </div>
                // Quote
                <div className="space-y-1">
                  <p className="font-display font-bold text-sm text-ink">{name}</p>
                  <p className="font-body text-xs text-ink-muted leading-relaxed">{quote}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}