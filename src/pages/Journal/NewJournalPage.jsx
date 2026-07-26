import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bold, Italic, Quote, Link2, List,
  Camera, MapPin, AlertCircle, Loader, X, Upload, Image
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

// Convert file to base64 data URL for preview
const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function NewJournalPage() {
  const navigate  = useNavigate();
  const fileInput = useRef(null);

  const [title,     setTitle]     = useState("");
  const [content,   setContent]   = useState("");
  const [location,  setLocation]  = useState("");
  const [district,  setDistrict]  = useState("");
  const [mood,      setMood]      = useState("reflective");
  const [era,       setEra]       = useState("");
  const [tags,      setTags]      = useState([]);
  const [tagInput,  setTagInput]  = useState("");
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);
  const [photos,    setPhotos]    = useState([]);   // { file, preview, label }
  const [uploading, setUploading] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  // Handle file selection from input or drop
  const handleFiles = async (files) => {
    setUploading(true);
    const newPhotos = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (photos.length + newPhotos.length >= 6) break; // max 6 images
      try {
        const preview = await fileToDataUrl(file);
        newPhotos.push({ file, preview, label: file.name.replace(/\.[^/.]+$/, "") });
      } catch {}
    }
    setPhotos(prev => [...prev, ...newPhotos]);
    setUploading(false);
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (index) =>
    setPhotos(prev => prev.filter((_, i) => i !== index));

  const updateLabel = (index, label) =>
    setPhotos(prev => prev.map((p, i) => i === index ? { ...p, label } : p));

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
      // Store photo previews as data URLs (base64)
      // In production replace with real upload to S3 or Cloudinary
      const photoUrls = photos.map(p => p.preview);

      await api.post("/journal", {
        title,
        content,
        mood,
        location,
        district,
        tags,
        photos: photoUrls,
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

  const visualScore = [title, content, location, tags.length > 0, photos.length > 0].filter(Boolean).length;
  const scoreLabel  = visualScore >= 4 ? "High" : visualScore >= 2 ? "Medium" : "Low";
  const scoreColor  = visualScore >= 4 ? "text-green-600" : visualScore >= 2 ? "text-amber-500" : "text-red-500";

  return (
    <div className="min-h-screen" style={{ background: "#EAE6DC" }}>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex gap-4" style={{ height: "calc(100vh - 140px)" }}>

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

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden">
                  <img
                    src={photo.preview}
                    alt={photo.label}
                    className="w-full h-20 object-cover"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                  {/* Label input */}
                  <div className="bg-white px-1.5 py-1">
                    <input
                      type="text"
                      value={photo.label}
                      onChange={e => updateLabel(i, e.target.value)}
                      placeholder="Caption..."
                      className="w-full font-serif italic text-[9px] text-ink-muted bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              ))}

              {/* Add Fragment drop zone */}
              {photos.length < 6 && (
                <div
                  onClick={() => fileInput.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  className="rounded-lg border-2 border-dashed border-[#D7CCB3] h-28 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-copper hover:bg-[#FDF8F0] transition-all"
                >
                  {uploading ? (
                    <Loader size={16} className="animate-spin text-copper" />
                  ) : (
                    <>
                      <Camera size={18} className="text-ink-light" />
                      <p className="font-body text-[10px] text-ink-light text-center leading-snug px-2">
                        Add Fragment
                      </p>
                      <p className="font-mono text-[8px] text-ink-light/60 uppercase tracking-wider">
                        or drag & drop
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />

            {/* Upload button */}
            <button
              onClick={() => fileInput.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 border border-[#D7CCB3] rounded-lg font-mono text-[10px] uppercase tracking-wider text-ink-muted hover:border-copper hover:text-copper transition-colors"
            >
              <Upload size={12} /> Upload Photos
            </button>

            {photos.length > 0 && (
              <p className="font-mono text-[9px] text-ink-light text-center">
                {photos.length}/6 fragments added
              </p>
            )}

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
            {/* Top bar */}
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
              {photos.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Image size={12} className="text-copper" />
                  <span className="font-mono text-[10px] text-copper">{photos.length} photo{photos.length > 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {/* Scrollable editor area */}
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
                  { Icon: Bold,   label: "Bold" },
                  { Icon: Italic, label: "Italic" },
                  { Icon: Quote,  label: "Quote" },
                  { Icon: Link2,  label: "Link" },
                  { Icon: List,   label: "List" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    title={label}
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
                className="w-full bg-transparent font-body text-base text-ink placeholder-[#C4B8A8] focus:outline-none resize-none leading-relaxed min-h-[300px]"
              />

              {/* Photo preview strip inside editor */}
              {photos.length > 0 && (
                <div className="pt-4 border-t border-[#E8E2D8]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light mb-3">
                    Attached Fragments
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {photos.map((photo, i) => (
                      <div key={i} className="relative group">
                        <div className="bg-white shadow-pin p-1.5 pb-5 w-24">
                          <img
                            src={photo.preview}
                            alt={photo.label}
                            className="w-full h-16 object-cover"
                          />
                          <p className="font-serif italic text-[8px] text-ink-muted text-center mt-1 truncate px-0.5">
                            {photo.label || "Fragment"}
                          </p>
                        </div>
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 border-t border-[#E8E2D8] flex items-center justify-between">
              {error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={13} />
                  <span className="font-body text-xs">{error}</span>
                </div>
              ) : <div />}
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
                  {loading
                    ? <><Loader size={14} className="animate-spin" /> Saving…</>
                    : <>💾 Save Journal</>
                  }
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
                  <span key={tag}
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
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-ink-muted">Visual Coverage</span>
                  <span className={`font-mono text-xs font-bold ${scoreColor}`}>{scoreLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-ink-muted">Source References</span>
                  <span className="font-mono text-xs font-bold text-ink">{tags.length} Items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-ink-muted">Photos Added</span>
                  <span className="font-mono text-xs font-bold text-ink">{photos.length}/6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-ink-muted">Heritage Impact</span>
                  <span className="font-mono text-xs text-copper">●●●</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}