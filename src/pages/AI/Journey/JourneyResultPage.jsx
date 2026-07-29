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

const STOP_IMAGES = {
  cultural_site: "https://images.unsplash.com/photo-1662721737580-b1558a41a49a?w=500&q=80",
  workshop:      "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=500&q=80",
  food:          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
  festival:      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&q=80",
  rest:          "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=500&q=80",
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
  const stopType  = firstStop?.type || "cultural_site";
  const gradient  = STOP_GRADIENTS[stopType] || STOP_GRADIENTS.cultural_site;
  const image     = STOP_IMAGES[stopType] || STOP_IMAGES.cultural_site;
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
          <div className="relative sm:w-52 flex-shrink-0 h-44 sm:h-auto overflow-hidden">
            {/* Gradient sits underneath as a fallback in case the image fails to load */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}/>
            <img
              src={image}
              alt={firstStop?.place || day.title || "Journey stop"}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={e => { e.target.style.display = "none"; }}
            />
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
      await api.post("/collections", {
        title:       journey.title,
        description: `AI Journey — ${journey.durationDays} days from ${journey.startCity}`,
        isPublic:    false,
      });
      setSaved(true);
      setTimeout(() => navigate("/collections"), 1500);
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

        {/* Save button — pinned to the very top-right corner of the hero */}
        <div className="absolute top-6 right-6 lg:right-20 z-20 flex flex-col items-end gap-1.5">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 border border-[#D7CCB3] font-body text-sm text-ink hover:bg-white transition-colors shadow-sm disabled:opacity-60"
          >
            <Bookmark size={15}/>
            {saved ? "Saved to Collections" : "Save to Collections"}
          </button>
          {saveError && <p className="font-body text-xs text-red-500">{saveError}</p>}
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-20 py-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">

            {/* Left side - Title */}
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

            {/* Right side - Timeline box (Save button now sits above, pinned to the corner) */}
            <div className="flex flex-col items-end gap-3 w-full lg:w-auto mt-14 lg:mt-0">
              <div className="bg-[#F5F0E8] border border-[#D7CCB3] p-5 shadow-card min-w-[200px] w-full lg:w-auto space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} className="text-primary"/>
                  <span className="font-display font-bold text-sm text-ink">Your Live Timeline</span>
                </div>
                <p className="font-body text-sm text-ink-muted">
                  • {journey.days?.length || 0} Destinations
                </p>
                <p className="font-body text-sm text-ink-muted">
                  • {journey.durationDays} Days
                </p>
                <p className="font-body text-sm text-ink-muted capitalize">
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

          {/* LEFT SIDEBAR — bigger card, larger type */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-[rgba(0,0,0,0.06)] p-7 space-y-6 shadow-card">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-copper"/>
                <h3 className="font-display font-bold text-base text-ink">Personalize Your Journey</h3>
              </div>

              {/* Journey Pace */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-copper">
                    Journey Pace
                  </label>
                  <span className="font-mono text-[10px] text-primary">Soulful</span>
                </div>
                <input
                  type="range" min={0} max={100} value={pace}
                  onChange={e => setPace(Number(e.target.value))}
                  className="w-full h-1.5 cursor-pointer accent-primary bg-[#E8E2D8]"
                />
                <div className="flex justify-between font-mono text-[10px] text-ink-light">
                  <span>Relaxed</span><span>Intense</span>
                </div>
              </div>

              {/* Cultural Depth */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-copper">
                    Cultural Depth
                  </label>
                  <span className="font-mono text-[10px] text-primary">Deep Heritage</span>
                </div>
                <input
                  type="range" min={0} max={100} value={depth}
                  onChange={e => setDepth(Number(e.target.value))}
                  className="w-full h-1.5 cursor-pointer accent-primary bg-[#E8E2D8]"
                />
                <div className="flex justify-between font-mono text-[10px] text-ink-light">
                  <span>Surface</span><span>Immersive</span>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-copper block">
                  Your Interests
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(journey.interests || []).map(t => (
                    <span key={t}
                      className="px-2.5 py-1 font-body text-xs bg-primary/10 text-primary border border-primary/20 capitalize">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optimize button */}
              <button className="w-full py-3.5 bg-primary text-white font-display font-bold text-base hover:bg-primary-light transition-colors flex items-center justify-center gap-2 shadow-sm">
                Optimize Your Odyssey <ArrowRight size={15}/>
              </button>

              {/* Regenerate — goldenish, bold */}
              <button
                onClick={() => navigate("/ai/journey-builder")}
                className="w-full flex items-center justify-center gap-2 font-body font-bold text-sm transition-colors"
                style={{ color: "#B8860B" }}
                onMouseEnter={e => e.currentTarget.style.color = "#8B6914"}
                onMouseLeave={e => e.currentTarget.style.color = "#B8860B"}
              >
                <RefreshCw size={13}/> Regenerate Itinerary
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

      {/* CTA strip with curved bottom */}
      <section className="mx-6 lg:mx-20 mb-10 overflow-hidden rounded-b-[50px]" style={{ background: "#2D4A35" }}>
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