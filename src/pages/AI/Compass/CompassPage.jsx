import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowRight, Users, Leaf,
  UtensilsCrossed, BookOpen, Zap, Heart, MapPin
} from "lucide-react";
import api, { getApiError } from "../../../services/api";
import { useAuth } from "../../../context/AppContext";

const DURATIONS = ["1–3 days", "4–7 days", "1–2 weeks", "3–4 weeks", "1 month+"];
const BUDGETS   = ["Budget (< $30/day)", "Mid-range ($30–80/day)", "Comfort ($80–150/day)", "Luxury ($150+/day)"];
const CITIES    = ["Kathmandu", "Pokhara", "Bhaktapur", "Lalitpur", "Chitwan", "Lumbini", "Namche Bazaar"];

const INTERESTS = [
  { id: "culture",   label: "Culture",   Icon: MapPin },
  { id: "nature",    label: "Nature",    Icon: Leaf },
  { id: "cuisine",   label: "Cuisine",   Icon: UtensilsCrossed },
  { id: "history",   label: "History",   Icon: BookOpen },
  { id: "adventure", label: "Adventure", Icon: Zap },
  { id: "wellness",  label: "Wellness",  Icon: Heart },
];

const DYNAMICS = ["Solo", "Couple", "Family", "Friends"];

const MODES = [
  { id: "community", label: "Community First",    desc: "Deep immersion into local daily life.", Icon: Users },
  { id: "scenic",    label: "Scenic Harmony",     desc: "Prioritising nature vistas & serenity.", Icon: Leaf },
  { id: "spiritual", label: "The Spiritual Path", desc: "Rituals, temples, and inner peace.", Icon: MapPin },
];

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-copper block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#D7CCB3] px-4 py-3.5 font-body text-base text-ink focus:outline-none focus:border-copper transition-colors cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light pointer-events-none" />
      </div>
    </div>
  );
}

export default function AICompassPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [inputText,  setInputText]  = useState("");
  const [duration,   setDuration]   = useState("");
  const [budget,     setBudget]     = useState("");
  const [city,       setCity]       = useState("");
  const [interests,  setInterests]  = useState([]);
  const [dynamic,    setDynamic]    = useState("Solo");
  const [mode,       setMode]       = useState("community");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const toggleInterest = (id) =>
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );

  const handleSubmit = async () => {
    if (!inputText.trim()) { setError("Please describe what you seek."); return; }
    if (!isAuthenticated) { navigate("/login", { state: { from: "/ai/compass" } }); return; }

    setError("");
    setLoading(true);
    try {
      const moodTags = interests.length > 0 ? interests : [dynamic.toLowerCase()];
      const res = await api.post("/ai/compass", { inputText, moodTags });
      navigate("/ai/compass/result", { state: { result: res.data.data } });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F2EDE4" }}>

      {/* Hero section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="flex items-start justify-between gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 max-w-xl space-y-6"
          >
        

            <h1 className="font-display font-bold text-6xl lg:text-7xl leading-[1.05] text-ink-brown">
              Find Your <span className="text-primary">Cultural</span><br />
              <span className="text-ink">North.</span>
            </h1>

            <p className="font-body text-base leading-relaxed text-ink-muted max-w-md">
              Map your spirit to the living heritage of Nepal. Our AI Compass translates your seekers' heart into an authentic, community-led journey.
            </p>

            {/* Textarea */}
            <div className="relative border border-[#D7CCB3] bg-white">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={4}
                maxLength={700}
                placeholder="Describe what you seek… the rhythm of mountain drums, the silence of a high-altitude monastery, or the scent of ancient cedar?"
                className="w-full bg-transparent px-11 py-6 font-body text-base text-ink placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
              />
              <div className="absolute bottom-3 right-4 font-mono text-[11px] text-gray-300">
                {inputText.length}/500
              </div>
            </div>

            {/* Mood quick-tags */}
            <div className="flex flex-wrap gap-2">
              {["Peaceful", "Adventurous", "Spiritual", "Cultural", "Culinary", "Remote"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setInputText(t => t ? `${t}, ${tag.toLowerCase()}` : tag.toLowerCase())}
                  className="px-3.5 py-1.5 border border-[#D7CCB3] bg-white font-body text-sm text-ink-muted hover:border-copper hover:text-primary transition-all"
                >
                  + {tag}
                </button>
              ))}
            </div>

            {error && (
              <p className="font-body text-sm text-red-500">{error}</p>
            )}
          </motion.div>

          {/* Right — polaroid with a real heritage photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="bg-white shadow-ledger p-3 pb-10 w-80 rotate-1">
              <div className="w-full h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=80"
                  alt="Prayer flags over the Himalayas"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="font-mono text-[10px] text-ink-light tracking-widest uppercase">
                  LAT 28.394°N · LNG 84.124°E
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="border-t border-[#D7CCB3]" />
      </div>

      {/* Preferences + Intelligence Mode */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-14">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* 01 Personal Preferences */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold text-copper/40 tracking-widest">01</span>
              <div>
                <h2 className="font-display font-bold text-3xl text-ink">Personal Preferences</h2>
                <p className="font-body text-sm text-ink-muted mt-0.5">Fine-tune the logistical framework of your odyssey.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField label="Journey Duration" value={duration} onChange={setDuration}
                options={DURATIONS} placeholder="Select your timeframe" />
              <SelectField label="Investment Level" value={budget} onChange={setBudget}
                options={BUDGETS} placeholder="Select budget" />
              <div className="sm:col-span-2">
                <SelectField label="Origin City" value={city} onChange={setCity}
                  options={CITIES} placeholder="Select starting point" />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <label className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-copper block">
                Primary Interests <span className="text-ink-light font-normal">(select up to 4)</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {INTERESTS.map(({ id, label, Icon }) => {
                  const active = interests.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleInterest(id)}
                      className={`flex flex-col items-center gap-2 p-4 border-2 transition-all duration-200
                        ${active
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-[#D7CCB3] bg-white text-ink-muted hover:border-copper hover:text-primary"
                        }`}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                      <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travel Dynamics */}
            <div className="space-y-3">
              <label className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-copper block">
                Travel Dynamics
              </label>
              <div className="flex flex-wrap gap-2">
                {DYNAMICS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDynamic(d)}
                    className={`px-5 py-2.5 border font-body text-base transition-all duration-200
                      ${dynamic === d
                        ? "bg-primary border-primary text-white shadow-sm"
                        : "border-[#D7CCB3] bg-white text-ink hover:border-primary hover:text-primary"
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 02 Intelligence Mode */}
          <div className="lg:w-96 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold text-copper/40 tracking-widest">02</span>
              <div>
                <h2 className="font-display font-bold text-3xl text-ink">Intelligence Mode</h2>
                <p className="font-body text-sm text-ink-muted mt-0.5">Select a lens for your compass.</p>
              </div>
            </div>

            {/* Mode cards — dark terracotta */}
            <div className="bg-primary p-4 space-y-2 shadow-card">
              {MODES.map(({ id, label, desc, Icon }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`w-full flex items-center gap-4 p-4 text-left transition-all duration-200
                      ${active ? "bg-white/15" : "hover:bg-white/8"}`}
                  >
                    <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0
                      ${active ? "bg-copper" : "bg-white/10"}`}>
                      <Icon size={18} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-base text-white">{label}</p>
                      <p className="font-body text-sm text-white/60 mt-0.5">{desc}</p>
                    </div>
                    {active && (
                      <div className="w-4 h-4 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Map preview — with a real terrain-style photo behind the grid */}
            <div className="border border-[#C8BC9E] p-5 space-y-3 shadow-card" style={{ background: "#E8DFC8" }}>
              <div className="w-full h-40 relative border border-[#C8BC9E] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584395631446-e41b0fc3f68d?w=500&q=80"
                  alt="Himalayan terrain"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(rgba(135,52,21,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(135,52,21,0.12) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-3 border border-dashed border-[#873415]/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow">
                  <MapPin size={30} fill="currentColor" />
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-copper">◎ Visualizing Path</p>
                <p className="font-display font-bold text-base text-ink mt-1 leading-snug">
                  Your bespoke map is being woven from threads of intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex justify-center pb-20 px-6">
        <motion.button
          onClick={handleSubmit}
          disabled={!inputText.trim() || loading}
          whileHover={{ scale: !loading && inputText.trim() ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          className={`relative inline-flex items-center gap-3 px-12 py-5 font-display font-bold text-xl text-white shadow-ledger transition-all duration-300
            ${inputText.trim() && !loading
              ? "bg-primary hover:bg-primary-light cursor-pointer"
              : "bg-primary/40 cursor-not-allowed"
            }`}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calibrating…
              </motion.span>
            ) : (
              <motion.span key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                Calibrate My Compass
                <ArrowRight size={20} />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F9BC50] border-2 border-white" />
        </motion.button>
      </section>

      {/* Bottom features */}
      <section className="border-t border-[#D7CCB3]" style={{ background: "#EAE5D8" }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { Icon: Users,    title: "Ethical Stewardship", desc: "Prioritising communities that seek sustainable, respectful engagement." },
              { Icon: BookOpen, title: "Living Records",       desc: "Itineraries synchronised with local lunar calendars and seasonal rites." },
              { Icon: MapPin,   title: "Direct Presence",     desc: "Bridge the gap with community hosts after your path is revealed." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-11 h-11 border border-copper/30 flex items-center justify-center">
                    <Icon size={22} className="text-copper" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-ink">{title}</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}