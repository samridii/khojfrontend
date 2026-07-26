import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bold, Italic, Quote, Link2, List,
  Camera, MapPin, AlertCircle, Loader, X
} from "lucide-react";
import api, { getApiError } from "../../services/api";

const MOODS = ["peaceful", "excited", "reflective", "adventurous", "grateful", "nostalgic"];

const ERAS = [
  "Ancient (Before 500 AD)",
  "Early Medieval (500–1200 AD)",
  "Late Medieval / Malla (1200–1769 AD)",
  "Shah Dynasty (1769–2008 AD)",
  "Modern Nepal (2008–Present)",
];

const DISTRICTS = [
  "Kathmandu", "Bhaktapur", "Lalitpur", "Pokhara", "Chitwan",
  "Mustang", "Solukhumbu", "Palpa", "Dolpa", "Humla",
];

export default function NewJournalPage() {
  const navigate = useNavigate();

  const [title,    setTitle]    = useState("");
  const [content,  setContent]  = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [mood,     setMood]     = useState("reflective");
  const [era,      setEra]      = useState("");
  const [tags,     setTags]     = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, "");
      if (!tags.includes(clean)) setTags(prev => [...prev, clean]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

  const handleSave = async () => {
    if (!title.trim())   { setError("Please add a title."); return; }
    if (!content.trim()) { setError("Please write something in your entry."); return; }

    setError("");
    setLoading(true);
    try {
      await api.post("/journal", {
        title,
        content,
        mood,
        location,
        district,
        tags,
        visitDate: new Date(visitDate).toISOString(),
      });
      navigate("/journal");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => navigate("/journal");

  // Visual integrity score
  const visualScore = [title, content, location, tags.length > 0].filter(Boolean).length;
  const scoreLabel  = ["Low", "Medium", "High", "High"][visualScore - 1] || "Low";
  const scoreColor  = ["text-red-500", "text-amber-500", "text-green-600", "text-green-600"][visualScore - 1] || "text-red-500";

  return (
    <div className="min-h-screen" style={{ background: "#EAE6DC" }}>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex gap-4 h-[calc(100vh-140px)]">

          {/* LEFT — Visual Context */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-72 flex-shrink-0 bg-white rounded-2xl border border-[#E0D8C8] p-5 space-y-4 overflow-y-auto"
          >
            <div className="flex items-center gap-2">
              <Camera size={14} className="text-copper" />
              <h3 className="font-display font-bold text-sm text-ink">Visual Context</h3>
            </div>
            <p className="font-body text-xs text-ink-muted leading-relaxed">
              Drag historical fragments into your story to anchor your memories.
            </p>

            {/* Fragment grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Durbar Square, 1974", gradient: "from-gray-400 to-gray-600" },
                { label: "Ancestor's Script",   gradient: "from-amber-200 to-amber-400" },
                { label: "Mela Offerings",       gradient: "from-orange-400 to-red-500" },
              ].map(({ label, gradient }) => (
                <div
                  key={label}
                  className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className={`h-20 bg-gradient-to-br ${gradient}`} />
                  <div className="bg-white px-2 py-1.5">
                    <p className="font-serif italic text-[9px] text-ink-muted">{label}</p>
                  </div>
                </div>
              ))}

              {/* Add Fragment */}
              <div className="rounded-lg border-2 border-dashed border-[#D7CCB3] h-28 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-copper transition-colors">
                <Camera size={18} className="text-ink-light" />
                <p className="font-body text-[10px] text-ink-light">Add Fragment</p>
              </div>
            </div>

            {/* Mood selector */}
            <div className="space-y-2 pt-2 border-t border-[#F0EDE8]">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light">Mood</p>
              <div className="flex flex-wrap gap-1.5">
                {MOODS.map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-2.5 py-1 rounded-full font-body text-[10px] capitalize transition-all border
                      ${mood === m
                        ? "bg-primary border-primary text-white"
                        : "border-[#E0D8C8] text-ink-muted hover:border-primary hover:text-primary"
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Visit date */}
            <div className="space-y-1.5 pt-2 border-t border-[#F0EDE8]">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light">Visit Date</p>
              <input
                type="date"
                value={visitDate}
                onChange={e => setVisitDate(e.target.value)}
                className="w-full border border-[#E0D8C8] rounded-lg px-3 py-2 font-body text-xs text-ink focus:outline-none focus:border-copper"
              />
            </div>
          </motion.div>

          {/* CENTER — Editor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-[#E0D8C8]"
            style={{
              background: "#FDFAF5",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Editor top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-4 text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">📅</span>
                  <span className="font-mono text-[10px]">
                    {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-green-600">● Draft saved</span>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Title */}
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title of your discovery..."
                className="w-full bg-transparent font-display font-bold text-3xl text-[#C4B8A8] placeholder-[#C4B8A8] focus:outline-none focus:text-ink transition-colors"
              />

              {/* Formatting toolbar */}
              <div className="flex items-center gap-1">
                {[
                  { Icon: Bold,   title: "Bold" },
                  { Icon: Italic, title: "Italic" },
                  { Icon: Quote,  title: "Quote" },
                  { Icon: Link2,  title: "Link" },
                  { Icon: List,   title: "List" },
                ].map(({ Icon, title }) => (
                  <button
                    key={title}
                    title={title}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#EDE8D8] text-ink-muted hover:text-ink transition-colors"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>

              {/* Content textarea */}
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Once upon a time..."
                className="w-full flex-1 bg-transparent font-body text-base text-ink placeholder-[#C4B8A8] focus:outline-none resize-none leading-relaxed min-h-[300px]"
              />
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 border-t border-[#E8E2D8] flex items-center justify-between">
              {error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={13} />
                  <span className="font-body text-xs">{error}</span>
                </div>
              )}
              {!error && <div />}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="px-5 py-2 border border-[#D7CCB3] rounded-lg font-body text-sm text-ink-muted hover:border-primary hover:text-primary transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white font-display font-bold text-sm rounded-lg hover:bg-primary-light transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <><Loader size={14} className="animate-spin" /> Saving…</>
                  ) : (
                    <>💾 Save Journal</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Cultural Mapping */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-72 flex-shrink-0 rounded-2xl border border-[#E0D8C8] p-5 space-y-5 overflow-y-auto"
            style={{ background: "#B7B9A2" }}
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              <h3 className="font-display font-bold text-sm text-primary">Cultural Mapping</h3>
            </div>

            {/* Primary Location */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light block">
                Primary Location
              </label>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Bhaktapur Durbar Square"
                  className="w-full bg-white border border-[#D7CCB3] rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper placeholder-gray-400"
                />
              </div>
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light block">
                District
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-white border border-[#D7CCB3] rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper cursor-pointer"
              >
                <option value="">Select district</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Chronological Era */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light block">
                Chronological Era
              </label>
              <select
                value={era}
                onChange={e => setEra(e.target.value)}
                className="w-full bg-white border border-[#D7CCB3] rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper cursor-pointer"
              >
                <option value="">Select era</option>
                {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            {/* Contextual Tags */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light block">
                Contextual Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 border border-[#D7CCB3] font-mono text-[9px] text-ink"
                  >
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="+ Add Tag (press Enter)"
                className="w-full bg-white border border-[#D7CCB3] rounded-lg px-3 py-2 font-body text-xs text-ink focus:outline-none focus:border-copper placeholder-gray-400"
              />
            </div>

            {/* Integrity Check */}
            <div className="bg-white/80 rounded-xl p-4 space-y-3 border border-[#D7CCB3]">
              <div className="flex items-center gap-2">
                <span className="text-copper">◎</span>
                <p className="font-display font-bold text-sm text-ink">Integrity Check</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Visual Coverage",   value: title && content ? "High" : "Low", valueColor: title && content ? "text-green-600" : "text-red-500" },
                  { label: "Source References", value: `${tags.length} Items`,              valueColor: "text-ink" },
                  { label: "Heritage Impact",   value: "●●●",                              valueColor: "text-copper" },
                ].map(({ label, value, valueColor }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-body text-xs text-ink-muted">{label}</span>
                    <span className={`font-mono text-xs font-bold ${valueColor}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}