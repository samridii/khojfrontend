import { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import api, { getApiError } from "../../../services/api";

// Scrapbook photo cards with gradients representing Nepal imagery
const SCRAPBOOK_GRADIENTS = [
  "from-blue-800 via-slate-600 to-gray-700",
  "from-amber-600 via-orange-500 to-yellow-600",
  "from-sky-400 via-blue-300 to-indigo-400",
  "from-yellow-700 via-amber-600 to-orange-700",
  "from-indigo-800 via-purple-700 to-slate-800",
];

function ScrapbookCard({ label, index }) {
  return (
    <div className="flex-shrink-0 w-44 bg-white shadow-pin p-2 pb-7">
      <div className={`w-full h-36 bg-gradient-to-br ${SCRAPBOOK_GRADIENTS[index % SCRAPBOOK_GRADIENTS.length]}`} />
      <p className="font-body text-xs text-ink-muted text-center mt-2 leading-snug px-1">{label}</p>
    </div>
  );
}

export default function CompassResultPage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [refine,  setRefine]  = useState("");
  const [refining, setRefining] = useState(false);
  const scrollRef = useRef(null);

  const result = location.state?.result;

  // Extract data from real AI response
  const matchPercent  = result?.results?.matchPercent  || 95;
  const cultureName   = result?.results?.cultureName   || result?.results?.communities?.[0] || "Nepali Culture";
  const tagline       = result?.results?.tagline       || result?.results?.culturalInsight  || "";
  const culturalInsight = result?.results?.culturalInsight || "";

  const reasons = [
    {
      icon: "🍜",
      title: "Culinary Flavor",
      desc: result?.results?.foods?.length
        ? `Your palate aligns with: ${result.results.foods.join(", ")}.`
        : "A deep connection to traditional Nepali food culture.",
      color: "#FDF3DF",
      accent: "#873415",
    },
    {
      icon: "🤝",
      title: "The Spirit",
      desc: result?.results?.communities?.length
        ? `You resonate with: ${result.results.communities.join(", ")}.`
        : "You seek authentic community-led experiences.",
      color: "#F0F7F0",
      accent: "#2D6A4F",
    },
    {
      icon: "🏔️",
      title: "Rhythms",
      desc: result?.results?.regions?.length
        ? `Your path leads through: ${result.results.regions.join(", ")}.`
        : "Your travel rhythm matches Nepal's natural cycles.",
      color: "#FDF3DF",
      accent: "#873415",
    },
  ];

  // Scrapbook labels from real AI data
  const scrapbookItems = [
    ...(result?.results?.crafts   || []).map(c => c),
    ...(result?.results?.festivals || []).map(f => f),
    ...(result?.results?.music    || []).map(m => m),
  ].slice(0, 5);

  const scrollScrapbook = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const handleRefine = async () => {
    if (!refine.trim()) return;
    setRefining(true);
    try {
      const res = await api.post("/ai/compass", {
        inputText: refine,
        moodTags: ["cultural", "authentic"],
      });
      navigate("/ai/compass/result", { state: { result: res.data.data } });
    } catch (err) {
      console.error(err);
    } finally {
      setRefining(false);
    }
  };

  // No result — redirect
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F2EDE4" }}>
        <div className="text-center space-y-3">
          <p className="font-display font-bold text-2xl text-primary">No result found</p>
          <Link to="/ai/compass" className="font-body text-sm text-copper hover:text-primary transition-colors">
            ← Try the Compass
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F2EDE4" }}>

      {/* Match Hero */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-20 pt-16 pb-14">
        <div className="flex flex-col lg:flex-row items-start gap-14">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-copper" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                Cultural Match Found
              </span>
            </div>

            <h1 className="font-display font-bold text-6xl lg:text-7xl leading-[1] text-primary">
              {matchPercent}%<br />
              <span className="text-ink">Match:</span><br />
              {cultureName}
            </h1>

            <p className="font-body text-sm leading-relaxed text-ink-muted max-w-sm">
              {tagline || culturalInsight}
            </p>

            {/* Tags from AI */}
            {result?.results?.crafts?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {[
                  ...(result.results.crafts || []),
                  ...(result.results.festivals || []),
                ].slice(0, 4).map(tag => (
                  <span key={tag}
                    className="px-3 py-1 border border-[#D7CCB3] bg-white font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/ai/journey-builder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors shadow-pin">
                Begin Your Journey <ArrowRight size={16} />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D7CCB3] bg-white text-ink font-display font-bold text-sm hover:border-primary hover:text-primary transition-colors">
                <BookOpen size={15} /> Read Heritage Log
              </button>
            </div>
          </motion.div>

          {/* Right — Polaroid stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex-shrink-0 w-72 h-72"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white shadow-ledger p-3 pb-8 rotate-3">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
            </div>
            <div className="absolute top-4 left-0 w-60 h-60 bg-white shadow-ledger p-3 pb-8 -rotate-2 z-10">
              <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 flex items-end p-2">
                <p className="font-body text-[10px] text-white/70 italic leading-snug">
                  "{culturalInsight.slice(0, 80)}…"
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-4 w-28 h-28 bg-white shadow-pin p-2 pb-5 rotate-6 z-20">
              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Torn edge divider */}
      <div style={{ background: "#F2EDE4" }}>
        <svg viewBox="0 0 1440 28" preserveAspectRatio="none" className="w-full" style={{ display: "block" }}>
          <path d="M0 28 L0 14 Q60 0 120 14 Q180 28 240 14 Q300 0 360 14 Q420 28 480 14 Q540 0 600 14 Q660 28 720 14 Q780 0 840 14 Q900 28 960 14 Q1020 0 1080 14 Q1140 28 1200 14 Q1260 0 1320 14 Q1380 28 1440 14 L1440 28Z"
            fill="#EAE5D8" />
        </svg>
      </div>

      {/* Why We Matched You */}
      <section style={{ background: "#EAE5D8" }} className="py-16 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">The AI Reasoning</p>
            <h2 className="font-display font-bold text-4xl text-ink">Why We Matched You</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {reasons.map(({ icon, title, desc, color, accent }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-7 space-y-4 border border-[rgba(0,0,0,0.06)]"
                style={{ background: color }}
              >
                <div className="text-3xl">{icon}</div>
                <h3 className="font-display font-bold text-xl" style={{ color: accent }}>{title}</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Communities and music if available */}
          {result?.results?.music?.length > 0 && (
            <div className="border-t border-[#D7CCB3] pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Crafts",      items: result.results.crafts },
                { label: "Festivals",   items: result.results.festivals },
                { label: "Music",       items: result.results.music },
                { label: "Regions",     items: result.results.regions },
              ].map(({ label, items }) => (
                <div key={label} className="space-y-2">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">{label}</p>
                  <ul className="space-y-1">
                    {(items || []).map(item => (
                      <li key={item} className="font-body text-sm text-ink-muted">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Scrapbook of Discovery */}
      <section className="py-16 px-6 lg:px-20" style={{ background: "#F2EDE4" }}>
        <div className="max-w-screen-xl mx-auto space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display font-bold text-3xl text-ink">The Scrapbook of Discovery</h2>
              <p className="font-body text-sm text-ink-muted mt-1 max-w-xs">
                Fragments of culture matched to your spirit, captured for your exploration.
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollScrapbook(-1)}
                className="w-9 h-9 border border-[#D7CCB3] bg-white flex items-center justify-center text-ink hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scrollScrapbook(1)}
                className="w-9 h-9 border border-[#D7CCB3] bg-white flex items-center justify-center text-ink hover:border-primary hover:text-primary transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x"
            style={{ scrollbarWidth: "none" }}>
            {(scrapbookItems.length > 0 ? scrapbookItems : [
              "Tukuche Village Streets", "The Harvest Ritual", "Mind & Spirit", "Sacred Crafts", "Mountain Dawn"
            ]).map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="snap-start"
              >
                <ScrapbookCard label={label} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Not the right match */}
      <section className="py-16 px-6 lg:px-20" style={{ background: "#EAE5D8" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <h2 className="font-display font-bold text-3xl text-ink">Not quite the right match?</h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Our AI Compass is constantly learning. Tweak your preferences to explore other facets of Nepal's diverse cultural landscape.
            </p>

            <div className="flex overflow-hidden border border-[#D7CCB3] bg-white">
              <input
                type="text"
                value={refine}
                onChange={e => setRefine(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleRefine()}
                placeholder="Tell us more about yourself..."
                className="flex-1 px-5 py-4 font-body text-sm text-ink bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button
                onClick={handleRefine}
                disabled={refining || !refine.trim()}
                className="px-6 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-60 flex-shrink-0"
              >
                {refining ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                ) : "Recalibrate Discovery"}
              </button>
            </div>

            <button
              onClick={() => navigate("/ai/compass")}
              className="inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-primary transition-colors"
            >
              <ChevronLeft size={14} /> Start fresh with new inputs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}