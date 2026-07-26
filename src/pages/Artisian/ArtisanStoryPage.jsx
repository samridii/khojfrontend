import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ChevronRight, Calendar, Users } from "lucide-react";

const WORKS = [
  { title: "Peacock Window Panel",   gradient: "from-amber-700 via-orange-800 to-amber-900", tall: true },
  { title: "Temple Strut Carvings",  gradient: "from-stone-600 via-stone-700 to-stone-800" },
  { title: "Chisel at Work",         gradient: "from-amber-500 via-orange-600 to-red-700" },
  { title: "The Workshop",           gradient: "from-amber-900 via-stone-800 to-amber-950" },
];

export default function ArtisanStoryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F2EEE6" }}>

      {/* Hero — Artisan Profile */}
      <section className="max-w-screen-lg mx-auto px-6 lg:px-12 pt-12 pb-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-copper mb-10">
          <Link to="/explore" className="hover:text-primary transition-colors">Stories</Link>
          <ChevronRight size={10} />
          <span className="text-ink-muted">Master Siddhi Bahadur</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Polaroid photo card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            {/* Tape */}
            <div className="relative">
              <div className="absolute -top-3 left-8 w-16 h-5 bg-[#C8B898]/70 z-10" />
              <div className="bg-white shadow-ledger p-3 pb-8 w-64">
                <div className="w-full h-72 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700" />
                <div className="mt-3 px-1 space-y-1">
                  <p className="font-mono text-[9px] text-ink-light tracking-widest">
                    Registration No. #NP-442-KAT
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 space-y-5"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[2px] text-copper">
                Master Carver
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary leading-tight">
              Master Siddhi Bahadur
            </h1>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary/30 pl-4">
              <p className="font-serif italic text-lg text-ink-muted leading-relaxed">
                "The wood speaks; I only remove the silence."
              </p>
            </blockquote>

            {/* Article text with drop cap */}
            <div className="space-y-4 max-w-xl">
              <p className="font-body text-sm leading-relaxed text-ink">
                <span className="float-left font-display font-bold text-5xl text-primary leading-none mr-2 mt-1">S</span>
                iddhi Bahadur has spent five decades in the narrow alleys of Patan, continuing a lineage of woodcarving that dates back to the Malla era. His workshop smells of cedar and history.
              </p>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                Observed his process today: he doesn't use modern sketches. The mandalas are etched in his memory, passed down through oral tradition and hundreds of thousands of chisel strokes. His hands are maps of every Newari motif known to the valley.
              </p>
              <p className="font-body text-sm leading-relaxed text-ink-muted">
                Specialization: <em>Mayur Jhyal</em> (Peacock Windows) and intricate temple struts. He is one of the few remaining masters who can recreate the 14th-century lattice patterns without architectural blueprints.
              </p>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#D7CCB3]">
              <div className="flex items-center gap-2 text-ink-muted">
                <MapPin size={14} className="text-copper" />
                <span className="font-body text-sm">Patan, Kathmandu Valley</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <ShieldCheck size={14} className="text-copper" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  Legacy Certified
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Works Archive */}
      <section style={{ background: "#EBE6D8" }} className="py-16 px-6 lg:px-12">
        <div className="max-w-screen-lg mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h2 className="font-display font-bold text-3xl text-primary">Works Archive</h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              Documenting the Tangible Heritage
            </p>
          </div>

          {/* Asymmetric photo grid */}
          <div className="grid grid-cols-3 gap-4 h-[480px]">
            {/* Large left */}
            <div className={`col-span-1 row-span-2 rounded-xl overflow-hidden bg-gradient-to-b ${WORKS[0].gradient}`} />
            {/* Top right two */}
            <div className={`col-span-2 rounded-xl overflow-hidden bg-gradient-to-br ${WORKS[1].gradient}`} />
            {/* Bottom right two */}
            <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${WORKS[2].gradient}`} />
            <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${WORKS[3].gradient}`} />
          </div>
        </div>
      </section>

      {/* Preserve the Legacy / Booking CTA */}
      <section style={{ background: "#F2EEE6" }} className="py-16 px-6 lg:px-12">
        <div className="max-w-screen-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#D7CCB3] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8"
            style={{ background: "#EDE8D8" }}
          >
            <div className="space-y-4 flex-1">
              <h2 className="font-display font-bold text-2xl text-primary">
                Preserve the Legacy
              </h2>
              <p className="font-body text-sm text-ink-muted leading-relaxed max-w-sm">
                Master Siddhi Bahadur opens his workshop once a month for a select group of five apprentices. Learn the fundamental geometry of Newari woodcarving in an immersive 3-day residency.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="space-y-1">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">Next Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-ink-muted" />
                    <p className="font-display font-bold text-sm text-ink">Oct 12 – 14, 2024</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">Availability</p>
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-ink-muted" />
                    <p className="font-display font-bold text-sm text-ink">2 Spots Remaining</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/workshops/book/woodcarving-residency"
              className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-display font-bold text-base rounded-xl hover:bg-primary-light transition-colors shadow-pin"
            >
              Book Workshop →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}