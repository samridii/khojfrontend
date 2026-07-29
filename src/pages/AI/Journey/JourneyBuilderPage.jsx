import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown, ArrowRight, Globe, Heart,
  Shield, Leaf, Users, User, Star, Users2,
  Landmark, UtensilsCrossed, Mountain, Flower2,
  MapPin, Compass
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
  { id: "history",   label: "History",   Icon: Landmark,       image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80" },
  { id: "culture",   label: "Culture",   Icon: Users,          image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80" },
  { id: "nature",    label: "Nature",    Icon: Leaf,           image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
  { id: "food",      label: "Food",      Icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" },
  { id: "adventure", label: "Adventure", Icon: Mountain,       image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80" },
  { id: "wellness",  label: "Wellness",  Icon: Flower2,        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
];

const FEATURES = [
  { Icon: Globe,  title: "Authentic & Meaningful", desc: "Go beyond tourist trails with real local connections." },
  { Icon: Heart,  title: "Curated with Care",       desc: "Every detail crafted by heritage experts and AI." },
  { Icon: Shield, title: "Safe & Trusted",           desc: "Your comfort and safety are our top priority." },
  { Icon: Leaf,   title: "Sustainable Impact",      desc: "Your journey supports local communities and traditions." },
];

function CraftingOverlay() {
  const steps = [
    { Icon: MapPin,   text: "Mapping your cultural interests…" },
    { Icon: Compass,  text: "Calibrating your heritage path…" },
    { Icon: Landmark, text: "Discovering authentic communities…" },
    { Icon: Mountain, text: "Charting your Nepal journey…" },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(89,32,15,0.92)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-10 max-w-sm px-8"
      >
        <div className="relative flex items-center justify-center mx-auto w-28 h-28">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
              <circle cx="56" cy="56" r="52" stroke="#F9BC50" strokeWidth="1" strokeDasharray="6 4" opacity="0.6"/>
              {[0,45,90,135,180,225,270,315].map((angle, i) => (
                <circle
                  key={i}
                  cx={56 + 52 * Math.cos(angle * Math.PI / 180)}
                  cy={56 + 52 * Math.sin(angle * Math.PI / 180)}
                  r="3" fill="#F9BC50" opacity="0.5"
                />
              ))}
            </svg>
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3"
          >
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
              <circle cx="44" cy="44" r="40" stroke="#A64B2A" strokeWidth="1" strokeDasharray="3 6" opacity="0.7"/>
            </svg>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8"
          >
            <div className="w-full h-full rounded-full border border-[#FFF9ED]/30 bg-[#FFF9ED]/10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {steps.map((s, i) => i === step ? (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <s.Icon size={22} className="text-[#F9BC50]" strokeWidth={1.5}/>
                  </motion.div>
                ) : null)}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-[#F9BC50]/70">
            AI Journey Builder
          </p>
          <h2 className="font-display font-bold text-2xl text-white leading-snug">
            Crafting your<br />Nepal journey…
          </h2>
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-body text-sm text-white/60"
              >
                {steps[step].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width:      i === step ? 24 : 8,
                opacity:    i === step ? 1  : 0.3,
                background: i === step ? "#F9BC50" : "#FFF9ED",
              }}
              transition={{ duration: 0.3 }}
              className="h-2"
              style={{ borderRadius: 4 }}
            />
          ))}
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[5px] text-white/20">
          नेपाल · Heritage Discovery
        </p>
      </motion.div>
    </motion.div>
  );
}

function SelectField({ label, icon, value, onChange, options, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
        {icon && <span className="text-copper">{icon}</span>}
        {label}
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
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const toggleInterest = (id) =>
    setInterests(p =>
      p.includes(id) ? p.filter(i => i !== id) : p.length < 3 ? [...p, id] : p
    );

  const budgetLabels   = ["budget", "mid-range", "luxury"];
  const durationToDays = {
    "1–3 days": 3, "4–7 days": 5, "1–2 weeks": 10,
    "2–3 weeks": 18, "1 month+": 30,
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/ai/journey-builder" } });
      return;
    }
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
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <CraftingOverlay />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col" style={{ background: "#F5F0E8" }}>
        <div className="flex flex-col lg:flex-row flex-1">

          {/* LEFT — Full height image, text vertically centred */}
          <div
            className="relative lg:w-[42%] flex-shrink-0 min-h-[320px] lg:min-h-screen overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=90"
              alt="Nepal Himalayan landscape"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark gradient — stronger at left/bottom for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, rgba(10,5,2,0.22) 0%, rgba(20,8,3,0.50) 45%, rgba(55,18,6,0.84) 100%)"
              }}
            />

            {/* Mandala decoration */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20">
              <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="#F9BC50" strokeWidth="0.8"/>
                <circle cx="30" cy="30" r="18" stroke="#F9BC50" strokeWidth="0.6"/>
                <circle cx="30" cy="30" r="5"  fill="#F9BC50" opacity="0.5"/>
                {[0,45,90,135,180,225,270,315].map((angle, i) => (
                  <line key={i}
                    x1={30 + 18 * Math.cos(angle * Math.PI / 180)}
                    y1={30 + 18 * Math.sin(angle * Math.PI / 180)}
                    x2={30 + 27 * Math.cos(angle * Math.PI / 180)}
                    y2={30 + 27 * Math.sin(angle * Math.PI / 180)}
                    stroke="#F9BC50" strokeWidth="0.6"
                  />
                ))}
              </svg>
            </div>

            {/* Vertically centred text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 flex flex-col items-start justify-center h-full px-10 lg:px-14 space-y-5"
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[4px]"
                style={{ color: "rgba(249,188,80,0.75)" }}
              >
                AI Journey Builder
              </p>

              <h1
                className="font-display font-bold text-5xl lg:text-5xl leading-tight"
                style={{ color: "#FFF9ED", textShadow: "0 2px 20px rgba(0,0,0,0.45)" }}
              >
                Let's craft<br />your perfect<br />
                <span style={{ color: "#F9BC50" }}>Nepal journey</span>
              </h1>

              <div className="flex items-center gap-3 w-full max-w-xs" style={{ opacity: 0.35 }}>
                <div className="flex-1 h-px bg-white"/>
                <span className="text-white text-[10px]">◆</span>
                <div className="flex-1 h-px bg-white"/>
              </div>

              <p
                className="font-body text-sm leading-relaxed max-w-xs"
                style={{ color: "rgba(255,249,237,0.80)" }}
              >
                Share your preferences and our AI will craft a meaningful journey rooted in heritage, culture and authentic experiences.
              </p>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {[
                  { value: "134", label: "Communities" },
                  { value: "77",  label: "Districts" },
                  { value: "6",   label: "Crafts" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-display font-bold text-2xl text-white">{value}</p>
                    <p
                      className="font-mono text-[9px] uppercase tracking-widest mt-0.5"
                      style={{ color: "rgba(255,249,237,0.40)" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Form fills full available width */}
          <div className="flex-1 overflow-y-auto" style={{ background: "#F5F0E8" }}>
            <div className="w-full px-8 lg:px-16 py-10 space-y-7">

              {/* Header */}
              <div className="text-center space-y-1 pb-2 border-b border-[#D7CCB3]">
                <h2 className="font-display font-bold text-3xl text-ink">
                  Tell us your preferences
                </h2>
                <div className="flex items-center justify-center gap-2 pt-1 opacity-30">
                  <div className="w-10 h-px bg-copper"/>
                  <span className="text-copper text-xs">◎</span>
                  <div className="w-10 h-px bg-copper"/>
                </div>
              </div>

              {/* Duration + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField
                  label="Duration" icon="●" value={duration} onChange={setDuration}
                  options={DURATIONS} placeholder="Select duration"
                />
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper">
                    <span>●</span> Budget
                  </label>
                  <input
                    type="range" min={0} max={2} value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full h-1.5 cursor-pointer accent-primary bg-[#D7CCB3]"
                  />
                  <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-light">
                    <span>Economy</span><span>Comfort</span><span>Luxury</span>
                  </div>
                </div>
              </div>

              {/* City + Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField
                  label="Starting City" icon="●" value={city} onChange={setCity}
                  options={CITIES} placeholder="Select starting city"
                />
                <SelectField
                  label="Travel Style" icon="●" value={style} onChange={setStyle}
                  options={STYLES} placeholder="Select travel style"
                />
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-copper block">
                  Interests{" "}
                  <span className="text-ink-light font-normal normal-case tracking-normal">
                    (choose up to 3)
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {INTERESTS.map(({ id, label, Icon, image }) => {
                    const active = interests.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleInterest(id)}
                        className={`relative overflow-hidden border-2 transition-all duration-200 aspect-[16/9]
                          ${active
                            ? "border-primary shadow-md"
                            : "border-transparent hover:border-[#D7CCB3]"
                          }`}
                      >
                        <img
                          src={image}
                          alt={label}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"/>
                        {active && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 shadow-pin">
                            <span className="text-white text-xs font-bold leading-none">✓</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 pb-2.5 flex flex-col items-center gap-1">
                          <Icon size={16} className="text-white" strokeWidth={1.5}/>
                          <p className={`font-mono text-[10px] font-bold uppercase tracking-wider
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
                      className={`inline-flex items-center gap-2 px-5 py-2.5 border font-body text-sm transition-all duration-200
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
                label="Ethnic Focus (optional)" icon="●" value={ethnic} onChange={setEthnic}
                options={ETHNIC} placeholder="Select ethnic focus"
              />

              {error && (
                <p className="font-body text-sm text-red-500">{error}</p>
              )}

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white font-mono font-bold text-base uppercase tracking-[3px] hover:bg-primary-light transition-colors disabled:opacity-60 shadow-pin"
              >
                Craft My Journey
                <ArrowRight size={18}/>
              </motion.button>
            </div>

            {/* Bottom feature strip */}
            <div className="border-t border-[#D7CCB3]" style={{ background: "#EEE8D8" }}>
              <div className="w-full px-8 lg:px-16 py-6">
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
    </>
  );
}