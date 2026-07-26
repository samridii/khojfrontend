import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download, RefreshCw, ArrowRight, MapPin,
  Clock, Star, Globe, Shield, Leaf, Heart,
  ChevronLeft, Users, Bookmark
} from "lucide-react";
import api, { getApiError } from "../../../services/api";
import { useAuth } from "../../../context/AppContext";

const STOP_GRADIENTS = {
  cultural_site: "from-amber-700 via-orange-800 to-amber-900",
  workshop:      "from-teal-600 via-blue-700 to-indigo-800",
  food:          "from-orange-500 via-red-600 to-orange-800",
  festival:      "from-purple-600 via-indigo-600 to-purple-800",
  rest:          "from-green-600 via-emerald-700 to-green-900",
};

const BOTTOM_FEATURES = [
  { Icon: Star,      title: "Curated for You",      desc: "AI-powered recommendations" },
  { Icon: Globe,     title: "Authentic Experiences", desc: "Handpicked by local experts" },
  { Icon: RefreshCw, title: "Flexible & Easy",       desc: "Edit, swap or add anytime" },
  { Icon: Download,  title: "Offline Ready",          desc: "Access your trip anywhere" },
];

function VintageBg() {
  return (
    <svg viewBox="0 0 1200 320" className="absolute inset-0 w-full h-full opacity-15" fill="none">
      <path
        d="M0 320 L0 200 Q100 100 200 160 Q300 220 400 120 Q500 40 600 100 Q700 160 800 80 Q900 20 1000 100 Q1100 160 1200 80 L1200 320Z"
        fill="#873415" opacity="0.15"
      />
      <path d="M200 160 L215 120 L200 135 L215 100" stroke="#873415" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="200" cy="160" r="6" fill="#873415" opacity="0.5"/>
      <circle cx="700" cy="100" r="6" fill="#873415" opacity="0.5"/>
      <path d="M200 160 Q400 80 700 100" stroke="#873415" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4"/>
      <path d="M700 100 Q950 60 1100 120" stroke="#873415" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4"/>
      <rect x="80" y="200" width="40" height="50" rx="3" fill="#873415" opacity="0.1"/>
      <path d="M100 160 L85 200 L115 200Z" fill="#873415" opacity="0.1"/>
      <rect x="90" y="152" width="20" height="10" rx="2" fill="#873415" opacity="0.1"/>
      <path d="M1050 220 L1065 185 L1080 220Z" fill="#873415" opacity="0.1"/>
      <path d="M1100 230 L1118 190 L1136 230Z" fill="#873415" opacity="0.1"/>
    </svg>
  );
}

function DayCard({ day, index }) {
  const firstStop = day.stops?.[0];
  const gradient  = STOP_GRADIENTS[firstStop?.type] || STOP_GRADIENTS.cultural_site;
  const foodStops = (day.stops || []).filter(s => s.type === "food");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex gap-5 items-start"
    >
      {/* Number circle */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-display font-bold text-base flex items-center justify-center shadow-pin mt-5">
        {day.day}
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-[rgba(0,0,0,0.06)] shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row">

          {/* Photo area */}
          <div className="relative sm:w-52 flex-shrink-0 h-44 sm:h-auto">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}/>
            {firstStop?.place && (
              <div className="absolute bottom-3 left-3 bg-primary/80 px-3 py-1">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                  {firstStop.place}
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-copper">
                {day.dayLabel || `Day ${day.day}`}
              </span>
              {index === 0 && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-copper/10 text-copper border border-copper/20">
                  Must-See
                </span>
              )}
            </div>

            <h3 className="font-display font-bold text-xl text-ink leading-snug">
              {day.title}
            </h3>

            {firstStop?.description && (
              <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-2">
                {firstStop.description}
              </p>
            )}

            {/* Experiences + Food grid */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
                  Experiences
                </p>
                <ul className="space-y-1">
                  {(day.stops || []).slice(0, 2).map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-copper mt-0.5 text-xs">•</span>
                      <span className="font-body text-xs text-ink-muted">{s.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
                  Food to Try
                </p>
                <ul className="space-y-1">
                  {foodStops.length > 0 ? foodStops.slice(0, 2).map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-copper mt-0.5 text-xs">•</span>
                      <span className="font-body text-xs text-ink-muted">{s.place}</span>
                    </li>
                  )) : (
                    <li className="flex items-start gap-1.5">
                      <span className="text-copper mt-0.5 text-xs">•</span>
                      <span className="font-body text-xs text-ink-muted">Local specialties</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Etiquette tip */}
            {day.etiquetteTips?.[0] && (
              <div className="flex items-start gap-2 pt-2 border-t border-[#F0EDE8]">
                <Clock size={11} className="text-copper mt-0.5 flex-shrink-0"/>
                <span className="font-body text-xs text-ink-light">{day.etiquetteTips[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneyResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const journey = location.state?.journey;

  const [pace,      setPace]      = useState(60);
  const [depth,     setDepth]     = useState(80);
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (!journey || saved) return;
    setSaving(true);
    setSaveError("");
    try {
      await api.post("/journeys", {
        title:        journey.title,
        durationDays: journey.durationDays,
        budget:       journey.budget,
        startCity:    journey.startCity,
        travelStyle:  journey.travelStyle,
        interests:    journey.interests,
        groupType:    journey.groupType,
        ethnicFocus:  journey.ethnicFocus,
        days:         journey.days,
      });
      setSaved(true);
    } catch (err) {
      setSaveError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F0E8" }}>
        <div className="text-center space-y-3">
          <p className="font-display font-bold text-2xl text-primary">No journey found</p>
          <p className="font-body text-sm text-ink-muted">Please build a journey first.</p>
          <Link to="/ai/journey-builder"
            className="inline-flex items-center gap-2 font-body text-sm text-copper hover:text-primary transition-colors">
            <ChevronLeft size={14}/> Build a Journey
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>

      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: "#E8CFC4", minHeight: 260 }}>
        <VintageBg />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-20 py-12">
          <div className="flex items-start justify-between gap-8">

            <div className="space-y-3 max-w-lg">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-primary/70">
                Ready to Explore?
              </p>
              <h1 className="font-display font-bold text-5xl lg:text-6xl leading-tight text-primary">
                Your journey<br />is ready!
              </h1>
              <p className="font-body text-sm leading-relaxed text-ink-muted max-w-sm">
                {journey.title} — A personalized itinerary crafted just for you.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-3">
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#D7CCB3] font-body text-xs text-ink hover:bg-white transition-colors shadow-sm disabled:opacity-60"
              >
                <Bookmark size={13}/>
                {saved ? "Saved" : saving ? "Saving…" : "Save Offline"}
              </button>
              {saveError && <p className="font-body text-xs text-red-500">{saveError}</p>}

              <div className="bg-white/90 border border-[#D7CCB3] p-4 shadow-card min-w-[180px] space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={12} className="text-primary"/>
                  <span className="font-display font-bold text-sm text-ink">Your Live Timeline</span>
                </div>
                <p className="font-body text-xs text-ink-muted">
                  • {journey.days?.length || 0} Destinations
                </p>
                <p className="font-body text-xs text-ink-muted">
                  • {journey.durationDays} Days
                </p>
                <p className="font-body text-xs text-ink-muted capitalize">
                  • {journey.budget} budget
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDEBAR */}
          <div className="lg:w-60 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-[rgba(0,0,0,0.06)] p-5 space-y-5 shadow-card">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-copper"/>
                <h3 className="font-display font-bold text-sm text-ink">Personalize Your Journey</h3>
              </div>

              {/* Journey Pace */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
                    Journey Pace
                  </label>
                  <span className="font-mono text-[9px] text-primary">Soulful</span>
                </div>
                <input
                  type="range" min={0} max={100} value={pace}
                  onChange={e => setPace(Number(e.target.value))}
                  className="w-full h-1 cursor-pointer accent-primary bg-[#E8E2D8]"
                />
                <div className="flex justify-between font-mono text-[9px] text-ink-light">
                  <span>Relaxed</span><span>Intense</span>
                </div>
              </div>

              {/* Cultural Depth */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
                    Cultural Depth
                  </label>
                  <span className="font-mono text-[9px] text-primary">Deep Heritage</span>
                </div>
                <input
                  type="range" min={0} max={100} value={depth}
                  onChange={e => setDepth(Number(e.target.value))}
                  className="w-full h-1 cursor-pointer accent-primary bg-[#E8E2D8]"
                />
                <div className="flex justify-between font-mono text-[9px] text-ink-light">
                  <span>Surface</span><span>Immersive</span>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper block">
                  Your Interests
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(journey.interests || []).map(t => (
                    <span key={t}
                      className="px-2.5 py-1 font-body text-[11px] bg-primary/10 text-primary border border-primary/20 capitalize">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optimize button */}
              <button className="w-full py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors flex items-center justify-center gap-2 shadow-sm">
                Optimize Your Odyssey <ArrowRight size={14}/>
              </button>

              {/* Regenerate */}
              <button
                onClick={() => navigate("/ai/journey-builder")}
                className="w-full flex items-center justify-center gap-2 font-body text-xs text-ink-muted hover:text-primary transition-colors"
              >
                <RefreshCw size={12}/> Regenerate Itinerary
              </button>
            </div>
          </div>

          {/* RIGHT — Day cards */}
          <div className="flex-1 space-y-6">
            {(journey.days || []).map((day, i) => (
              <DayCard key={i} day={day} index={i}/>
            ))}
            {(!journey.days || journey.days.length === 0) && (
              <div className="text-center py-16">
                <p className="font-body text-sm text-ink-muted">No days generated. Try regenerating.</p>
                <button
                  onClick={() => navigate("/ai/journey-builder")}
                  className="mt-4 px-6 py-2.5 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
                >
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <section className="mx-6 lg:mx-20 mb-10 overflow-hidden" style={{ background: "#2D4A35" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-7">
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#F9BC50] flex-shrink-0" strokeWidth={1.5}/>
              <p className="font-display font-bold text-base text-white leading-snug">
                This itinerary is crafted just for you — flexible, immersive, and meaningful.
              </p>
            </div>
            <p className="font-body text-xs text-white/60 pl-6">
              You can easily adjust days, experiences, and pace using the sidebar.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors shadow-pin disabled:opacity-60"
          >
            {saved ? "Saved to Journeys" : "Customize More"}
            <ArrowRight size={15}/>
          </button>
        </div>
      </section>

      {/* Bottom features */}
      <div className="border-t border-[#D7CCB3]" style={{ background: "#EEE8D8" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
            {BOTTOM_FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="space-y-2">
                <div className="flex justify-center">
                  <Icon size={18} className="text-copper" strokeWidth={1.5}/>
                </div>
                <p className="font-display font-bold text-xs text-ink">{title}</p>
                <p className="font-body text-[11px] text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}