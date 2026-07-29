import { useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Bookmark, BookmarkCheck, ArrowRight } from "lucide-react";
import api, { getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";

const FILTERS = [
  { label: "All" },
  { label: "Spiritual" },
  { label: "Food-focused" },
  { label: "Traditional" },
  { label: "Hidden Gems" },
  { label: "Scenic" },
];

const BADGE_STYLES = {
  "ETHNIC COMMUNITY": { bg: "#2D6A4F", text: "#fff" },
  "FOOD EXPERIENCE":  { bg: "#1B4332", text: "#fff" },
  "CRAFT WORKSHOP":   { bg: "#873415", text: "#fff" },
  "FESTIVAL":         { bg: "#6B2737", text: "#fff" },
  "SOUNDS & MUSIC":   { bg: "#1A3A5C", text: "#fff" },
  "HIDDEN PLACE":     { bg: "#1F3A2F", text: "#fff" },
};

// Real Unsplash images for each item
const ITEMS = [
  {
    id: 1,
    type: "ETHNIC COMMUNITY",
    title: "Newari Community",
    description: "Ancient traditions, exquisite arts and architecture that thrive in the Kathmandu Valley. The Newars are the original inhabitants of the valley, their culture woven into every temple, courtyard, and festival.",
    location: "Kathmandu Valley",
    to: "/explore/newari-community",
    itemType: "community",
    image: "https://images.unsplash.com/photo-1662721737580-b1558a41a49a?w=600&q=80",
    tags: ["Traditional", "Spiritual"],
  },
  {
    id: 2,
    type: "FOOD EXPERIENCE",
    title: "Thakali Kitchen Experience",
    description: "Warm meals, mountain flavors and a culture of hospitality from the Mustang region. Dal bhat, buckwheat bread, and the famous Thakali set are a window into mountain life.",
    location: "Mustang",
    to: "/explore/thakali-kitchen",
    itemType: "food",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
    tags: ["Food-focused"],
  },
  {
    id: 3,
    type: "CRAFT WORKSHOP",
    title: "Paubha Sacred Painting",
    description: "Learn sacred art from master artists and take home your journey creation. Paubha is the Newari tradition of scroll painting — a cousin of Thangka with its own distinct iconography.",
    location: "Bhaktapur",
    to: "/explore/paubha-painting",
    itemType: "craft",
    image: "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=600&q=80",
    tags: ["Traditional", "Spiritual"],
  },
  {
    id: 4,
    type: "FESTIVAL",
    title: "Biska Jatra Festival",
    description: "The festival of life — vibrant processions, chariot pulling, and ancient Newari traditions that mark the Nepali New Year in Bhaktapur with extraordinary energy.",
    location: "Bhaktapur",
    to: "/explore/biska-jatra",
    itemType: "festival",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80",
    tags: ["Traditional", "Spiritual"],
  },
  {
    id: 5,
    type: "SOUNDS & MUSIC",
    title: "Monastery Sounds",
    description: "Sacred chants, prayer wheels and sounds that calm the soul in the high Himalayas. The resonance of Tibetan horns and bells creates a meditative atmosphere unlike anywhere on earth.",
    location: "Solukhumbu",
    to: "/explore/monastery-sounds",
    itemType: "music",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    tags: ["Spiritual", "Scenic"],
  },
  {
    id: 6,
    type: "HIDDEN PLACE",
    title: "Hidden Village of Phu",
    description: "A timeless village in the Himalayas away from the world. Phu sits at 4000m, accessible only by a narrow trail, home to a community that has preserved its Tibetan Buddhist culture for centuries.",
    location: "Inner Mustang",
    to: "/explore/village-phu",
    itemType: "community",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    tags: ["Hidden Gems", "Scenic"],
  },
  {
    id: 7,
    type: "FOOD EXPERIENCE",
    title: "Samay Baji Ritual Feast",
    description: "The quintessential Newari feast — beaten rice, dried meats, boiled eggs, and spiced vegetables arranged on a plate that tells the story of a civilization's relationship with food and ritual.",
    location: "Kathmandu",
    to: "/explore/samay-baji",
    itemType: "food",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    tags: ["Food-focused", "Traditional"],
  },
  {
    id: 8,
    type: "ETHNIC COMMUNITY",
    title: "Sherpa Culture",
    description: "The mountain guides of the world, the Sherpa people carry a rich cultural heritage of Buddhism, yak herding, and deep knowledge of the Himalayan landscape passed down through generations.",
    location: "Solukhumbu",
    to: "/explore/sherpa-culture",
    itemType: "community",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80",
    tags: ["Traditional", "Scenic"],
  },
  {
    id: 9,
    type: "CRAFT WORKSHOP",
    title: "Dhaka Weaving",
    description: "The intricate handloom textile of eastern Nepal, Dhaka fabric is woven with geometric patterns that carry the cultural identity of the hills. Each piece takes days to complete.",
    location: "Tansen, Palpa",
    to: "/explore/dhaka-weaving",
    itemType: "craft",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d72?w=600&q=80",
    tags: ["Traditional"],
  },
];

const FILTER_MAP = {
  "Spiritual":    ["SOUNDS & MUSIC", "FESTIVAL", "HIDDEN PLACE"],
  "Food-focused": ["FOOD EXPERIENCE"],
  "Hidden Gems":  ["HIDDEN PLACE"],
  "Traditional":  ["ETHNIC COMMUNITY", "FESTIVAL", "CRAFT WORKSHOP"],
  "Scenic":       ["HIDDEN PLACE", "SOUNDS & MUSIC"],
};

// Save to collection modal
function SaveModal({ item, onClose }) {
  const [collections, setCollections] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [error,       setError]       = useState("");
  const [colName,     setColName]     = useState("");
  const [creating,    setCreating]    = useState(false);

  // Load user collections on mount
  useState(() => {
    api.get("/collections")
      .then(res => setCollections(res.data.data || []))
      .catch(() => setError("Failed to load collections."))
      .finally(() => setLoading(false));
  });

  const saveToCollection = async (collectionId) => {
    setSaving(true);
    setError("");
    try {
      await api.post(`/collections/${collectionId}/items`, {
        itemType: item.itemType,
        itemId:   item.id.toString(),
        note:     item.title,
      });
      setSaved(true);
      setTimeout(onClose, 1200);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const createAndSave = async () => {
    if (!colName.trim()) return;
    setCreating(true);
    setError("");
    try {
      const res = await api.post("/collections", { title: colName, isPublic: false });
      await saveToCollection(res.data.data._id);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-sm bg-amber-50 border border-[#E8E2D8] shadow-ledger p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-ink">Save to Collection</h3>
          <button onClick={onClose} className="text-ink-muted hover:text-ink transition-colors">
            <X size={18}/>
          </button>
        </div>

        <p className="font-body text-xs text-ink-muted">
          Saving: <span className="font-bold text-ink">{item.title}</span>
        </p>

        {saved ? (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200">
            <BookmarkCheck size={16} className="text-green-600"/>
            <p className="font-body text-sm text-green-700">Saved successfully!</p>
          </div>
        ) : (
          <>
            {loading ? (
              <p className="font-body text-sm text-ink-muted text-center py-4">Loading collections…</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {collections.length === 0 && (
                  <p className="font-body text-xs text-ink-muted text-center py-2">
                    No collections yet. Create one below.
                  </p>
                )}
                {collections.map(col => (
                  <button
                    key={col._id}
                    onClick={() => saveToCollection(col._id)}
                    disabled={saving}
                    className="w-full flex items-center justify-between px-4 py-3 border border-[#E8E2D8] hover:border-primary hover:bg-[#FAF7F2] transition-all text-left disabled:opacity-50"
                  >
                    <div>
                      <p className="font-display font-bold text-sm text-ink">{col.title}</p>
                      <p className="font-body text-xs text-ink-muted">
                        {col.items?.length || 0} items
                      </p>
                    </div>
                    <Bookmark size={14} className="text-copper flex-shrink-0"/>
                  </button>
                ))}
              </div>
            )}

            {/* Create new collection */}
            <div className="border-t border-[#F0EDE8] pt-3 space-y-2">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light">
                New Collection
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={colName}
                  onChange={e => setColName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && createAndSave()}
                  placeholder="Collection name..."
                  className="flex-1 border border-[#E8E2D8] px-3 py-2 font-body text-xs text-ink focus:outline-none focus:border-copper"
                />
                <button
                  onClick={createAndSave}
                  disabled={creating || !colName.trim()}
                  className="px-4 py-2 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors disabled:opacity-50"
                >
                  {creating ? "…" : "Save"}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-body text-xs text-red-500">{error}</p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

function Badge({ type }) {
  const style = BADGE_STYLES[type] || { bg: "#873415", text: "#fff" };
  return (
    <span
      className="absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 z-10"
      style={{ background: style.bg, color: style.text }}
    >
      {type}
    </span>
  );
}

function ExploreCard({ item, index }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSave, setShowSave] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate("/login"); return; }
    setShowSave(true);
  };

  return (
    <>
      {showSave && (
        <SaveModal
          item={item}
          onClose={() => { setShowSave(false); setBookmarked(true); }}
        />
      )}

      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="bg-amber-50 overflow-hidden border border-[#E8E2D8] shadow-card group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-orange-900 hidden items-center justify-center">
            <p className="font-display font-bold text-white/30 text-lg">{item.title}</p>
          </div>
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"/>
          <Badge type={item.type} />

          {/* Save button — the single save action for this card */}
          <button
            onClick={handleSave}
            aria-label={bookmarked ? "Saved" : "Save"}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary hover:text-white"
          >
            {bookmarked
              ? <BookmarkCheck size={14} className="text-primary"/>
              : <Bookmark size={14} className="text-ink"/>
            }
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display font-bold text-base text-ink leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="font-body text-xs text-ink-muted leading-relaxed mt-1.5 line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-ink-muted">
            <MapPin size={12} className="text-copper flex-shrink-0" strokeWidth={2}/>
            <span className="font-body text-xs">{item.location}</span>
          </div>

          {/* Actions — View only; Save lives on the image above */}
          <div className="flex items-center justify-end pt-2 border-t border-[#F0EDE8]">
            <Link
              to={item.to}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary border border-primary px-3 py-1.5 hover:bg-primary hover:text-white transition-all duration-200"
            >
              View <ArrowRight size={12}/>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function HeroPolaroids() {
  return (
    <div className="relative w-48 h-40 flex-shrink-0">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 shadow-pin p-2 pb-5 rotate-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1662721737580-b1558a41a49a?w=300&q=80"
          alt="Nepal"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-50 shadow-pin p-2 pb-4 -rotate-3 overflow-hidden z-10">
        <img
          src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&q=80"
          alt="Dal Bhat"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [query,        setQuery]  = useState(searchParams.get("q") || "");
  const [activeFilter, setFilter] = useState(searchParams.get("type") || "All");

  const filtered = useMemo(() => {
    let items = ITEMS;
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
      );
    }
    if (activeFilter && activeFilter !== "All") {
      const types = FILTER_MAP[activeFilter];
      if (types) items = items.filter(i => types.includes(i.type));
    }
    return items;
  }, [query, activeFilter]);

  return (
    <div className="min-h-screen" style={{ background: "#B7B9A2" }}>
{/* Hero */}
<section className="px-6 lg:px-12 pt-10 pb-6 max-w-[1600px] mx-auto">
  <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">

    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-8 w-full"
    >
      <div className="max-w-4xl">
        <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] text-primary">
          Explore Nepal
          <br />
          Deeply
        </h1>

        <p className="mt-5 font-body text-lg leading-8 text-ink-brown opacity-80 max-w-3xl">
          Beyond the summits lies a living scrapbook of ancient traditions,
          sensory kitchens, and the quiet wisdom of ethnic souls.
        </p>
      </div>
    </motion.div>

    {/* Right Images */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hidden lg:flex lg:col-span-4 justify-end"
    >
      <HeroPolaroids />
    </motion.div>

  </div>
</section>

      {/* Search */}
      <section className="px-6 lg:px-12 pb-5 max-w-[1600px] mx-auto">
        <div className="flex items-center bg-white border border-[rgba(0,0,0,0.08)] shadow-card overflow-hidden">
          <div className="flex items-center gap-3 flex-1 px-5 py-3.5">
            <Search size={16} className="text-gray-400 flex-shrink-0"/>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search cultures, tastes, traditions..."
              className="flex-1 font-body text-sm text-ink bg-transparent focus:outline-none placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 hover:text-ink transition-colors">
                <X size={15}/>
              </button>
            )}
          </div>
          <button className="px-7 py-3.5 bg-primary text-white font-mono font-bold text-sm uppercase tracking-wider hover:bg-primary-light transition-colors flex-shrink-0">
            FIND
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {FILTERS.map(({ label }) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 py-1.5 border font-body text-xs transition-all duration-200
                ${activeFilter === label
                  ? "bg-primary border-primary text-white"
                  : "bg-white/60 border-[#D7CCB3] text-ink-brown hover:border-primary hover:text-primary"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-12 pb-16 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-xs text-ink-brown opacity-60 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
            {query ? ` · "${query}"` : ""}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <ExploreCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Search size={40} className="text-ink-brown opacity-20"/>
              <p className="font-display font-bold text-2xl text-ink-brown opacity-60">Nothing found</p>
              <p className="font-body text-sm text-ink-muted">Try a different search or filter</p>
              <button
                onClick={() => { setQuery(""); setFilter("All"); }}
                className="px-6 py-2 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}