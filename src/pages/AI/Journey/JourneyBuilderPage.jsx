import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown, ArrowRight, Globe, Heart,
  Shield, Leaf, Users, User, Star, Users2
} from "lucide-react";
import api, { getApiError } from "../../../services/api";
import { useAuth } from "../../../context/AppContext";

const DURATIONS = ["1–3 days", "4–7 days", "1–2 weeks", "2–3 weeks", "1 month+"];
const CITIES    = ["Kathmandu", "Pokhara", "Bhaktapur", "Lalitpur", "Chitwan", "Lumbini", "Namche Bazaar", "Mustang"];
const STYLES    = ["Cultural Immersion", "Adventure & Trekking", "Spiritual Journey", "Food & Cuisine", "Photography", "Wellness & Retreat", "Heritage & History"];
const ETHNIC    = ["Newari", "Thakali", "Sherpa", "Tamang", "Gurung", "Rai", "Limbu", "Magar", "Tharu"];

const GROUPS = [
  { id: "solo",    label: "Solo",    Icon: User },
  { id: "couple",  label: "Couple",  Icon: Heart },
  { id: "family",  label: "Family",  Icon: Users },
  { id: "friends", label: "Friends", Icon: Users2 },
  { id: "senior",  label: "Senior",  Icon: Star },
];

const INTERESTS = [
  { id: "history",   label: "History",   gradient: "from-amber-700 to-amber-900" },
  { id: "culture",   label: "Culture",   gradient: "from-gray-500 to-gray-700" },
  { id: "nature",    label: "Nature",    gradient: "from-green-600 to-emerald-800" },
  { id: "food",      label: "Food",      gradient: "from-orange-400 to-red-500" },
  { id: "adventure", label: "Adventure", gradient: "from-blue-600 to-indigo-800" },
  { id: "wellness",  label: "Wellness",  gradient: "from-cyan-400 to-teal-600" },
];

const QUOTES = [
  '"We\'ll weave your story into an unforgettable Himalayan experience."',
  '"Every step in Nepal is a conversation with centuries of living culture."',
  '"Your journey begins long before you arrive — it begins in how you dream."',
];

const FEATURES = [
  { Icon: Globe,  title: "Authentic & Meaningful", desc: "Go beyond tourist trails with real local connections." },
  { Icon: Heart,  title: "Curated with Care",      desc: "Every detail crafted by heritage experts and AI." },
  { Icon: Shield, title: "Safe & Trusted",          desc: "Your comfort and safety are our top priority." },
  { Icon: Leaf,   title: "Sustainable Impact",     desc: "Your journey supports local communities and traditions." },
];

function VintageIllustration() {
  return (
    <svg viewBox="0 0 460 900" className="absolute inset-0 w-full h-full opacity-25" fill="none">
      <path d="M-20 400 L80 180 L160 300 L240 100 L340 250 L420 150 L500 320 L500 900 L-20 900Z"
        fill="#873415" opacity="0.2"/>
      <path d="M-20 500 L60 320 L130 420 L200 280 L300 380 L380 300 L460 400 L460 900 L-20 900Z"
        fill="#873415" opacity="0.15"/>
      <path d="M230 150 Q180 300 200 450 Q220 580 160 680 Q120 750 180 820"
        stroke="#873415" strokeWidth="2.5" strokeDasharray="8 6" fill="none" opacity="0.6"/>
      <circle cx="230" cy="150" r="8" fill="#873415" opacity="0.7"/>
      <path d="M230 142 L230 115" stroke="#873415" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="160" cy="680" r="8" fill="#873415" opacity="0.7"/>
      <path d="M160 672 L160 645" stroke="#873415" strokeWidth="1.5" opacity="0.6"/>
      <ellipse cx="160" cy="820" rx="50" ry="8" fill="#873415" opacity="0.15"/>
      <rect x="135" y="760" width="50" height="60" rx="4" fill="#873415" opacity="0.12"/>
      <path d="M160 700 L145 760 L175 760Z" fill="#873415" opacity="0.15"/>
      <rect x="148" y="690" width="24" height="12" rx="2" fill="#873415" opacity="0.12"/>
      <ellipse cx="200" cy="480" rx="30" ry="18" fill="#873415" opacity="0.15"/>
      <rect x="185" y="490" width="8" height="20" rx="3" fill="#873415" opacity="0.12"/>
      <rect x="205" y="490" width="8" height="20" rx="3" fill="#873415" opacity="0.12"/>
      <circle cx="228" cy="470" r="12" fill="#873415" opacity="0.15"/>
      <path d="M60 600 L75 560 L90 600Z" fill="#873415" opacity="0.15"/>
      <rect x="71" y="600" width="8" height="20" fill="#873415" opacity="0.12"/>
      <path d="M350 500 L365 460 L380 500Z" fill="#873415" opacity="0.15"/>
      <rect x="361" y="500" width="8" height="20" fill="#873415" opacity="0.12"/>
    </svg>
  );
}

function SelectField({ label, icon, value, onChange, options, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
        {icon && <span>{icon}</span>}{label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#D7CCB3] px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-copper transition-colors cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light pointer-events-none"/>
      </div>
    </div>
  );
}

export default function JourneyBuilderPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [duration,  setDuration]  = useState("");
  const [budget,    setBudget]    = useState(1);
  const [city,      setCity]      = useState("");
  const [style,     setStyle]     = useState("");
  const [interests, setInterests] = useState(["history", "nature"]);
  const [group,     setGroup]     = useState("couple");
  const [ethnic,    setEthnic]    = useState("");
  const [quoteIdx,  setQuoteIdx]  = useState(0);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const toggleInterest = (id) =>
    setInterests(p => p.includes(id) ? p.filter(i => i !== id) : p.length < 3 ? [...p, id] : p);

  const budgetLabels = ["budget", "mid-range", "luxury"];

  const durationToDays = {
    "1–3 days": 3, "4–7 days": 5, "1–2 weeks": 10,
    "2–3 weeks": 18, "1 month+": 30,
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) { navigate("/login", { state: { from: "/ai/journey-builder" } }); return; }
    if (!city) { setError("Please select a starting city."); return; }

    setError("");
    setLoading(true);
    try {
      const res = await api.post("/ai/journey", {
        durationDays: durationToDays[duration] || 5,
        budget:       budgetLabels[budget],
        startCity:    city,
        travelStyle:  style || "Cultural Immersion",
        interests:    interests.length > 0 ? interests : ["culture"],
        groupType:    group,
        ethnicFocus:  ethnic || undefined,
      });
      navigate("/ai/journey-builder/result", { state: { journey: res.data.data } });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">

        {/* LEFT — Vintage illustration */}
        <div
          className="relative lg:w-[42%] flex-shrink-0 min-h-[280px] lg:min-h-screen overflow-hidden"
          style={{ background: "#E8CFC4" }}
        >
          <VintageIllustration />
          <div className="relative z-10 flex flex-col justify-center h-full px-10 lg:px-14 py-16 lg:py-24 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-display font-bold text-4xl lg:text-5xl leading-tight text-white drop-shadow-sm">
                Let's craft<br />your perfect<br />
                <span style={{ color: "#873415" }}>Nepal journey</span>
              </h1>
              <p className="font-body text-sm leading-relaxed text-white/80 mt-4 max-w-xs">
                Share your preferences and our AI will craft a meaningful journey rooted in heritage, culture and authentic experiences.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#F5F0E8" }}>
          <div className="max-w-2xl mx-auto px-8 lg:px-12 py-10 space-y-8">

            <h2 className="font-display font-bold text-2xl text-primary">
              Tell us your preferences
            </h2>

            {/* Duration + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField
                label="Duration" icon="◎" value={duration} onChange={setDuration}
                options={DURATIONS} placeholder="Select duration"
              />
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper block">
                  ◎ Budget
                </label>
                <input
                  type="range" min={0} max={2} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full cursor-pointer accent-primary bg-[#D7CCB3]"
                />
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-light">
                  <span>Economy</span><span>Comfort</span><span>Luxury</span>
                </div>
              </div>
            </div>

            {/* City + Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField
                label="Starting City" icon="◎" value={city} onChange={setCity}
                options={CITIES} placeholder="Select starting city"
              />
              <SelectField
                label="Travel Style" icon="◎" value={style} onChange={setStyle}
                options={STYLES} placeholder="Select travel style"
              />
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper block">
                Interests <span className="text-ink-light font-normal">(choose up to 3)</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {INTERESTS.map(({ id, label, gradient }) => {
                  const active = interests.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleInterest(id)}
                      className={`relative aspect-square overflow-hidden border-2 transition-all duration-200
                        ${active ? "border-primary shadow-md" : "border-transparent hover:border-[#D7CCB3]"}`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}/>
                      {active && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/30 py-2">
                        <p className={`font-mono text-[10px] font-bold uppercase tracking-wider text-center
                          ${active ? "text-[#F9BC50]" : "text-white"}`}>
                          {label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group Type */}
            <div className="space-y-3">
              <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper block">
                Group Type
              </label>
              <div className="flex flex-wrap gap-2">
                {GROUPS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setGroup(id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 border font-body text-sm transition-all duration-200
                      ${group === id
                        ? "bg-primary border-primary text-white shadow-sm"
                        : "border-[#D7CCB3] bg-white text-ink hover:border-primary hover:text-primary"
                      }`}
                  >
                    <Icon size={14} strokeWidth={1.5}/>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ethnic Focus */}
            <SelectField
              label="Ethnic Focus (optional)" icon="◎" value={ethnic} onChange={setEthnic}
              options={ETHNIC} placeholder="Select ethnic focus"
            />

            {/* Ready to begin */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-2xl text-ink">
                Ready to{" "}
                <span className="underline decoration-primary decoration-2 underline-offset-4 text-primary">
                  begin?
                </span>
              </h3>

              {/* Quote carousel */}
              <div className="relative bg-white border border-[#D7CCB3] px-8 py-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif italic text-sm text-ink-muted text-center leading-relaxed"
                  >
                    {QUOTES[quoteIdx]}
                  </motion.p>
                </AnimatePresence>
                <div className="flex justify-center gap-1.5 mt-3">
                  {QUOTES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setQuoteIdx(i)}
                      className={`rounded-full transition-all duration-200 ${i === quoteIdx ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-[#D7CCB3]"}`}
                    />
                  ))}
                </div>
              </div>

              {error && <p className="font-body text-xs text-red-500">{error}</p>}

              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white font-mono font-bold text-sm uppercase tracking-[2px] hover:bg-primary-light transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    Crafting…
                  </>
                ) : (
                  <>Craft My Journey <ArrowRight size={18}/></>
                )}
              </motion.button>
            </div>
          </div>

          {/* Bottom feature strip */}
          <div className="border-t border-[#D7CCB3]" style={{ background: "#EEE8D8" }}>
            <div className="max-w-2xl mx-auto px-8 lg:px-12 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
                {FEATURES.map(({ Icon, title, desc }) => (
                  <div key={title} className="space-y-2">
                    <div className="flex justify-center">
                      <Icon size={18} className="text-copper" strokeWidth={1.5}/>
                    </div>
                    <p className="font-display font-bold text-xs text-ink">{title}</p>
                    <p className="font-body text-[11px] text-ink-muted leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}