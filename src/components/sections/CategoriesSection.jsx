// Categories section with real Unsplash images and horizontal scroll on mobile
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    label: "Communities",
    to: "/explore?type=community",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    desc: "134 ethnic groups",
  },
  {
    label: "Food & Drink",
    to: "/explore?type=food",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    desc: "Recipes and ritual",
  },
  {
    label: "Crafts",
    to: "/explore?type=craft",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    desc: "Living traditions",
  },
  {
    label: "Festivals",
    to: "/explore?type=festival",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
    desc: "Sacred calendars",
  },
  {
    label: "Shrines",
    to: "/explore?type=shrine",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    desc: "Sacred spaces",
  },
  {
    label: "Old Maps",
    to: "/explore?type=maps",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    desc: "Heritage cartography",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CategoriesSection() {
  return (
    <section className="py-16 px-6 lg:px-16" style={{ background: "#B7B9A2" }}>
      <div className="max-w-screen-xl mx-auto space-y-10">

        // Section heading
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-primary/70">
              Browse by Category
            </p>
            <h2 className="font-display font-bold text-5xl lg:text-6xl leading-tight text-ink">
              Start Exploring<br />the Unseen.
            </h2>
          </div>
          <Link to="/explore"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-primary/30 bg-white/40 font-mono text-xs text-primary uppercase tracking-wider hover:bg-white/60 transition-colors flex-shrink-0">
            View All
          </Link>
        </div>

        // Cards grid
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3"
        >
          {CATEGORIES.map(({ label, to, image, desc }) => (
            <motion.div key={label} variants={cardVariants}>
              <Link to={to}
                className="flex flex-col overflow-hidden bg-white border border-[rgba(220,193,184,0.3)] group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                // Image
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                // Label
                <div className="px-3 py-2.5">
                  <p className="font-display font-bold text-sm text-ink leading-tight">{label}</p>
                  <p className="font-mono text-[9px] text-ink-muted uppercase tracking-wider mt-0.5">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}