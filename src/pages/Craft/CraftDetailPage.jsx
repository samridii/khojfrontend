import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Share2, MapPin, ArrowUpRight, ChevronRight } from "lucide-react";

// Process step card data
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Wood Selection",
    desc: "Using Sal wood (Shorea robusta), seasoned for years to prevent warping in the Himalayan humidity.",
    bg: "#F5F0E8",
    accent: "#873415",
    image: "from-amber-800 to-amber-950",
  },
  {
    number: "02",
    title: "Iconographic Sketching",
    desc: "Transferring centuries of iconometric canons and folk patterns onto the wood using sacred hand drawings.",
    bg: "#C8D5C8",
    accent: "#2D4A2D",
    image: "from-gray-400 to-gray-600",
  },
  {
    number: "03",
    title: "The Deep Carve",
    desc: "Using Thaasi (shaping) and Tika (detailing) chisels to create depth that can reach up to 6 inches, making the figures appear to float.",
    bg: "#873415",
    accent: "#F5F0E8",
    image: "from-amber-600 to-amber-800",
    light: true,
  },
  {
    number: "04",
    title: "Oil Finishing",
    desc: "A traditional mixture of mustard oil and natural resins is hand-rubbed to protect against weathering and mold.",
    bg: "#EDE8D8",
    accent: "#873415",
    sub: "NATURAL & SUSTAINABLE LEGACY PROCESS",
  },
];

const RELATED_CRAFTS = [
  { title: "Lost-wax Metal Casting", type: "METALWORK", gradient: "from-orange-900 via-amber-800 to-orange-950" },
  { title: "Pauva Sacred Arts", type: "FINE ART", gradient: "from-teal-800 via-cyan-700 to-teal-900" },
];

export default function CraftDetailPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-12 pb-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-copper mb-8">
          <Link to="/explore" className="hover:text-primary transition-colors">Crafts</Link>
          <ChevronRight size={10} />
          <span className="text-ink-muted">Artisan</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-copper/30 bg-copper/5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[2px] text-copper">
                Craft of Artisans
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] text-primary">
              Newar<br />Woodcarving
            </h1>

            <p className="font-body text-sm leading-relaxed text-ink-muted max-w-sm">
              A thousand-year legacy etched into Sal wood. Discover the intricate geometry and divine symbolism of Nepal's most iconic architectural marvel, reborn for a modern era.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/workshops?craft=woodcarving"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-primary-light transition-colors"
              >
                <BookOpen size={13} /> Book Workshop
              </Link>
              <button
                onClick={() => setSaved(v => !v)}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D7CCB3] bg-white/60 text-ink font-mono text-xs font-bold uppercase tracking-wider rounded hover:border-primary hover:text-primary transition-colors"
              >
                <Share2 size={13} /> {saved ? "Saved" : "Save Story"}
              </button>
            </div>
          </motion.div>

          {/* Right — polaroid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="relative">
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#C8B898]/60 z-10" />
              <div className="bg-white shadow-ledger p-3 pb-8 w-72 rotate-1">
                <div className="w-full h-48 bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900" />
                <p className="font-serif italic text-[11px] text-ink-light text-center mt-2">
                  "The Peacock Window, Bhaktapur — 15th century"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none" style={{ background: "#F5F0E8" }}>
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0 20 Q180 40 360 20 Q540 0 720 20 Q900 40 1080 20 Q1260 0 1440 20 L1440 40 L0 40Z"
            fill="#EDE8D5" />
        </svg>
      </div>

      {/* Story Section */}
      <section style={{ background: "#EDE8D5" }} className="py-16 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Text */}
            <div className="flex-1 space-y-6">
              <h2 className="font-display font-bold text-3xl text-primary">
                The Story of the Chisel
              </h2>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                In the narrow alleys of Patan and Bhaktapur, the rhythmic tap-tap of the chisel has been the heartbeat of the Kathmandu Valley for centuries. Newar woodcarving is not merely decoration. It is a sacred architectural language.
              </p>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                Historically practiced by the Shilpakar caste, this craft reached its zenith during the Malla period (1201–1768 AD). Every deity, floral motif, and mythical creature carved into the struts of a pagoda temple serves as a bridge between the earthly and the divine.
              </p>

              {/* Stats */}
              <div className="flex gap-10 pt-4 border-t border-[#D7CCB3]">
                <div>
                  <p className="font-display font-bold text-2xl text-primary">1000+</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light mt-0.5">Years of Legacy</p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-primary">50+</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light mt-0.5">Traditional Chisels</p>
                </div>
              </div>
            </div>

            {/* Photo with sticky note */}
            <div className="lg:w-96 flex-shrink-0 relative">
              <div className="w-full h-64 bg-gradient-to-br from-amber-700 via-orange-800 to-amber-950 rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-end p-4">
                  {/* Sticky note */}
                  <div className="bg-[#8B6914] text-white px-4 py-3 rounded shadow-pin max-w-[200px] -rotate-1">
                    <p className="font-serif italic text-xs leading-relaxed">
                      "Every stroke of the chisel is a prayer. Each finished window is a gateway to history."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ background: "#F5F0E8" }} className="py-16 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto space-y-10">
          <h2 className="font-display font-bold text-3xl text-primary text-center">
            The Alchemy of Wood
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden p-6 space-y-4 flex flex-col"
                style={{ background: step.bg }}
              >
                <span
                  className="font-display font-bold text-4xl opacity-20"
                  style={{ color: step.light ? "#F5F0E8" : "#873415" }}
                >
                  {step.number}
                </span>
                <div className="flex-1 space-y-2">
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: step.light ? "#F5F0E8" : step.accent }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: step.light ? "rgba(245,240,232,0.75)" : "#6D4C41" }}
                  >
                    {step.desc}
                  </p>
                  {step.sub && (
                    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper mt-4">
                      {step.sub}
                    </p>
                  )}
                </div>
                {step.image && (
                  <div className={`h-24 rounded-lg bg-gradient-to-br ${step.image} mt-2`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Crafts */}
      <section style={{ background: "#F5F0E8" }} className="pb-16 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display font-bold text-2xl text-primary">Interwoven Traditions</h2>
              <p className="font-body text-sm text-ink-muted mt-1">Crafts that share the same Newar soul, centuries in the making.</p>
            </div>
            <Link to="/explore" className="flex items-center gap-1 font-mono text-xs text-copper hover:text-primary transition-colors">
              Show All Crafts <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RELATED_CRAFTS.map((craft) => (
              <motion.div
                key={craft.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${craft.gradient}`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-5 left-5 space-y-1">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/70">
                    {craft.type}
                  </p>
                  <p className="font-display font-bold text-xl text-white">{craft.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Craftsman */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden flex flex-col lg:flex-row"
            style={{ background: "#EDE8D5" }}
          >
            {/* Photo */}
            <div className="relative lg:w-72 flex-shrink-0">
              <div className="w-full h-72 lg:h-full bg-gradient-to-b from-gray-400 to-gray-700">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="font-display font-bold text-white text-xl">Master Artisan</span>
                </div>
              </div>
              {/* Master Artisan badge */}
              <div className="absolute bottom-4 right-4 bg-[#8B6914] text-white font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                Master Artisan
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 p-10 space-y-5 flex flex-col justify-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                Featured Craftsman
              </p>
              <h2 className="font-display font-bold text-3xl text-ink">
                Ratna Jyoti Shilpakar
              </h2>
              <blockquote className="border-l-4 border-primary pl-4">
                <p className="font-serif italic text-base text-ink-muted leading-relaxed">
                  "The wood tells you where it wants to be cut. My job is simply to listen and remove the parts that aren't the God hidden inside."
                </p>
              </blockquote>
              <p className="font-body text-sm text-ink-muted leading-relaxed max-w-md">
                A 7th-generation carver from Patan, Ratna has restored over 40 heritage shrines after the 2015 earthquake. He believes that the survival of Newar Woodcarving depends on the fusion of traditional techniques with modern relevance.
              </p>
              <div className="pt-2">
                <Link
                  to="/ai/journey-builder"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm rounded-lg hover:bg-primary-light transition-colors"
                >
                  Add to Journey <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}