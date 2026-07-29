import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, BookOpen, Heart } from "lucide-react";

const VALUES = [
  {
    Icon: Heart,
    title: "Community First",
    desc: "Every feature is built with Nepal's 134 ethnic communities at the centre. We prioritise their stories, their craft, and their right to be represented authentically.",
  },
  {
    Icon: BookOpen,
    title: "Living Documentation",
    desc: "Heritage is not static. We document traditions as they exist today — evolving, adapting, and surviving — not as museum pieces frozen in time.",
  },
  {
    Icon: MapPin,
    title: "Ethical Travel",
    desc: "We connect travellers directly with artisans and communities, ensuring that cultural exchange benefits the people who carry these traditions.",
  },
  {
    Icon: Users,
    title: "Open Archive",
    desc: "Everything documented on KHOJ is accessible to researchers, students, and communities themselves — because heritage belongs to everyone.",
  },
];

const TEAM = [
  { name: "Samridhi",  role: "Founder & Developer",    initial: "S" },
  { name: "Aarav",     role: "Cultural Researcher",     initial: "A" },
  { name: "Maya",      role: "Community Liaison",       initial: "M" },
  { name: "Bikash",    role: "Heritage Documentarian",  initial: "B" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Hero */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-16 py-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-5"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-[rgba(255,255,255,0.5)]">
              About KHOJ
            </p>
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-white leading-tight">
              Preserving the Living Heritage of Nepal.
            </h1>
            <p className="font-body text-base text-[rgba(255,255,255,0.7)] leading-relaxed max-w-lg">
              KHOJ — the Nepali word for "search" or "discovery" — is a platform built to document, celebrate, and connect people to Nepal's 134 ethnic communities through intelligent technology and human storytelling.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Start Exploring <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40 L0 20 Q180 0 360 20 Q540 40 720 20 Q900 0 1080 20 Q1260 40 1440 20 L1440 40Z"
            fill="#FAF7F2"/>
        </svg>
      </section>

      {/* Mission */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-5"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              Our Mission
            </p>
            <h2 className="font-display font-bold text-4xl text-ink leading-tight">
              Because culture is meant to be felt, not forgotten.
            </h2>
            <p className="font-body text-sm leading-relaxed text-ink-muted">
              Nepal is home to one of the most diverse cultural tapestries on earth. From the Thakali kitchens of Mustang to the Newari woodcarvers of Patan, from the Sherpa communities of Solukhumbu to the Tharu farmers of the Terai — each community carries a living archive of knowledge, craft, and wisdom.
            </p>
            <p className="font-body text-sm leading-relaxed text-ink-muted">
              KHOJ was built to make this archive accessible, to connect curious minds with authentic experiences, and to ensure that the people who carry these traditions are seen, heard, and supported.
            </p>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="border border-[#E8E2D8] bg-white p-8 space-y-6 shadow-card">
              {[
                { value: "134",  label: "Ethnic Communities" },
                { value: "77",   label: "Districts Covered" },
                { value: "500+", label: "Heritage Entries" },
                { value: "6",    label: "Craft Categories" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center justify-between border-b border-[#F0EDE8] pb-4 last:border-0 last:pb-0">
                  <span className="font-body text-sm text-ink-muted">{label}</span>
                  <span className="font-display font-bold text-2xl text-primary">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#F0EAD8" }} className="py-20 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              What We Stand For
            </p>
            <h2 className="font-display font-bold text-4xl text-ink">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-[#E8E2D8] p-6 space-y-4"
              >
                <div className="w-10 h-10 border border-copper/30 flex items-center justify-center">
                  <Icon size={18} className="text-copper" strokeWidth={1.5}/>
                </div>
                <h3 className="font-display font-bold text-lg text-ink">{title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 py-20 space-y-12">
        <div className="text-center space-y-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
            The People Behind KHOJ
          </p>
          <h2 className="font-display font-bold text-4xl text-ink">Our Team</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, initial }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              <div className="w-20 h-20 rounded-full bg-primary text-white font-display font-bold text-2xl flex items-center justify-center mx-auto shadow-pin">
                {initial}
              </div>
              <div>
                <p className="font-display font-bold text-base text-ink">{name}</p>
                <p className="font-body text-xs text-ink-muted mt-0.5">{role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#F0EAD8" }} className="py-16 px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto text-center space-y-5">
          <h2 className="font-display font-bold text-3xl text-ink">
            Ready to discover Nepal deeply?
          </h2>
          <p className="font-body text-sm text-ink-muted max-w-sm mx-auto">
            Start with our AI Cultural Compass to find the communities and crafts that resonate with your spirit.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/ai/compass"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors shadow-pin">
              Try AI Compass <ArrowRight size={15}/>
            </Link>
            <Link to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D7CCB3] bg-white text-ink font-display font-bold text-sm hover:border-primary hover:text-primary transition-colors">
              Explore Heritage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}