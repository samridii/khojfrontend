import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Music, Palette, MapPin, Trash2, X } from "lucide-react";
import api, { getApiError } from "../../services/api";

const MOOD_ICONS = {
  peaceful:     { Icon: MapPin,   color: "bg-blue-100 text-blue-600" },
  excited:      { Icon: Plus,     color: "bg-amber-100 text-amber-600" },
  reflective:   { Icon: BookOpen, color: "bg-purple-100 text-purple-600" },
  adventurous:  { Icon: MapPin,   color: "bg-green-100 text-green-600" },
  grateful:     { Icon: Palette,  color: "bg-rose-100 text-rose-600" },
  nostalgic:    { Icon: Music,    color: "bg-orange-100 text-orange-600" },
};

// Small confirm popover so a stray click can't wipe out a memory
function DeleteConfirm({ onConfirm, onCancel, deleting }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center gap-2 p-3"
      onClick={e => e.stopPropagation()}
    >
      <p className="font-body text-[11px] text-white text-center leading-snug">
        Delete this memory?
      </p>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="px-3 py-1 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {deleting ? "…" : "Delete"}
        </button>
        <button
          onClick={onCancel}
          disabled={deleting}
          className="px-3 py-1 bg-white/20 text-white font-mono text-[9px] font-bold uppercase tracking-wider hover:bg-white/30 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

// Polaroid memory card
function MemoryCard({ entry, rotation, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting,   setDeleting]   = useState(false);
  const [error,      setError]      = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await onDelete(entry._id);
    } catch (err) {
      setError(getApiError(err));
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      className="relative bg-white shadow-pin p-2.5 pb-8 cursor-pointer hover:-translate-y-1 transition-transform duration-300 group"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative w-full h-36 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 overflow-hidden">
        {entry.photos?.[0] ? (
          <img src={entry.photos[0]} alt={entry.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <BookOpen size={32} className="text-gray-600" />
          </div>
        )}

        {/* Delete icon — shows on hover, opens a confirm step before removing */}
        <button
          onClick={e => { e.stopPropagation(); setConfirming(true); }}
          aria-label="Delete memory"
          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 z-10"
        >
          <Trash2 size={12} className="text-white"/>
        </button>

        <AnimatePresence>
          {confirming && (
            <DeleteConfirm
              deleting={deleting}
              onConfirm={handleDelete}
              onCancel={() => setConfirming(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="mt-2 px-1">
        <p className="font-display font-bold text-xs text-ink leading-snug">{entry.title}</p>
        <p className="font-serif italic text-[10px] text-ink-muted mt-0.5">{entry.location || entry.district}</p>
        {error && <p className="font-body text-[10px] text-red-500 mt-1">{error}</p>}
      </div>
    </motion.div>
  );
}

// Timeline entry
function TimelineEntry({ entry, index }) {
  const moodCfg = MOOD_ICONS[entry.mood] || MOOD_ICONS.reflective;
  const { Icon, color } = moodCfg;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-6 items-start"
    >
      {/* Left — date + icon */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 w-32">
        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
          {new Date(entry.visitDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
        </p>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <Icon size={14} />
        </div>
        {/* Vertical line */}
        <div className="w-px flex-1 bg-[#D7CCB3] min-h-[40px]" />
      </div>

      {/* Right — content */}
      <div className="flex-1 pb-8">
        <Link to={`/journal/${entry._id}`}>
          <h3 className="font-display font-bold text-base text-ink hover:text-primary transition-colors">
            {entry.title}
          </h3>
        </Link>
        <div className="mt-2 bg-[#F5F0E8] rounded-xl p-4 border border-[#E8E2D8]">
          <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-3">
            "{entry.content}"
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {entry.tags?.map(tag => (
            <span key={tag} className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EDE8D8] text-ink-muted">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function JournalPage() {
  const [entries,  setEntries]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/journal");
        setEntries(res.data.data || []);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDeleteEntry = async (id) => {
    await api.delete(`/journal/${id}`);
    setEntries(prev => prev.filter(e => e._id !== id));
  };

  const recent   = entries.slice(0, 3);
  const timeline = entries;
  const rotations = [-2, 1.5, -1, 2.5, -1.5, 1];

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#EAE6DC" }}>
      <div className="max-w-screen-lg mx-auto">

        {/* Outer paper card */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "#F2EEE8",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          {/* Sparkle decorations */}
          <div className="absolute top-8 left-8 opacity-30">
            <span className="text-3xl text-amber-400">✦</span>
          </div>
          <div className="absolute top-12 left-16 opacity-20">
            <span className="text-xl text-amber-400">✦</span>
          </div>

          <div className="p-10 lg:p-14 space-y-12">

            {/* Header */}
            <div className="flex items-start justify-between gap-8">
              <div className="space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-[3px]"
                  style={{ background: "#8B6914", color: "#FFF9ED" }}>
                  Archive No. 042
                </span>
                <h1 className="font-display font-bold text-5xl text-primary leading-tight">
                  My Cultural<br />Journal
                </h1>
                <p className="font-body text-sm text-ink-muted leading-relaxed max-w-xs">
                  Documenting the vibrant threads of heritage, craft, and soul-stirring journeys across Nepal.
                </p>
              </div>

              {/* Hero polaroid */}
              <div className="hidden lg:block flex-shrink-0">
                <div className="bg-white shadow-pin p-2.5 pb-8 w-36 rotate-3">
                  <div className="w-full h-28 bg-gradient-to-b from-gray-300 to-gray-600" />
                  <p className="font-serif italic text-[9px] text-ink-muted text-center mt-2">
                    Patan, March 2024
                  </p>
                </div>
              </div>
            </div>

            {/* New Entry button */}
            <div className="flex justify-end">
              <Link
                to="/journal/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary-light transition-colors shadow-pin"
              >
                <Plus size={15} /> New Entry
              </Link>
            </div>

            {/* Recent Memories */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#D7CCB3] pb-3">
                <h2 className="font-display font-bold text-2xl text-ink">Recent Memories</h2>
                <Link to="/journal/all" className="font-mono text-[10px] uppercase tracking-widest text-copper hover:text-primary transition-colors">
                  View All
                </Link>
              </div>

              {loading && (
                <div className="flex items-center gap-3 text-ink-muted py-8">
                  <div className="w-4 h-4 border-2 border-copper/30 border-t-copper rounded-full animate-spin" />
                  <span className="font-body text-sm">Loading memories…</span>
                </div>
              )}

              {!loading && recent.length === 0 && (
                <div className="text-center py-12 space-y-3">
                  <p className="text-4xl opacity-20">📖</p>
                  <p className="font-body text-sm text-ink-muted">No journal entries yet. Start writing your first memory.</p>
                </div>
              )}

              {!loading && recent.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {recent.map((entry, i) => (
                      <MemoryCard
                        key={entry._id}
                        entry={entry}
                        rotation={rotations[i % rotations.length]}
                        onDelete={handleDeleteEntry}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Discovery Timeline */}
            {!loading && timeline.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-2xl text-ink border-b border-[#D7CCB3] pb-3">
                  Discovery Timeline
                </h2>
                <div className="space-y-2">
                  {timeline.map((entry, i) => (
                    <TimelineEntry key={entry._id} entry={entry} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}