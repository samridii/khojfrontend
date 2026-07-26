import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Trash2, MapPin, BookOpen,
  Loader, AlertCircle, Globe, Lock
} from "lucide-react";
import api, { getApiError } from "../../services/api";

const TYPE_COLORS = {
  craft:     { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  label: "Craft" },
  food:      { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", label: "Food" },
  festival:  { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: "Festival" },
  community: { bg: "bg-teal-50",   text: "text-teal-700",   border: "border-teal-200",   label: "Community" },
  music:     { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   label: "Music" },
  artisan:   { bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200",   label: "Artisan" },
  workshop:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  label: "Workshop" },
  ai_match:  { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", label: "AI Match" },
};

const ITEM_GRADIENTS = [
  "from-amber-700 to-orange-900",
  "from-teal-600 to-blue-800",
  "from-green-600 to-emerald-800",
  "from-purple-600 to-indigo-800",
  "from-orange-500 to-red-700",
  "from-rose-600 to-pink-800",
];

function CollectionItem({ item, index, onRemove }) {
  const [removing, setRemoving] = useState(false);
  const cfg = TYPE_COLORS[item.itemType] || TYPE_COLORS.craft;

  const handleRemove = async () => {
    if (!window.confirm("Remove this item from collection?")) return;
    setRemoving(true);
    try {
      await onRemove(item.itemType, item.itemId);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white border border-[#E8E2D8] shadow-card overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Image */}
      <div className={`h-40 bg-gradient-to-br ${ITEM_GRADIENTS[index % ITEM_GRADIENTS.length]} relative`}>
        <div className="absolute top-3 left-3">
          <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            {cfg.label}
          </span>
        </div>
        <button
          onClick={handleRemove}
          disabled={removing}
          className="absolute top-3 right-3 w-7 h-7 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
        >
          {removing
            ? <Loader size={12} className="animate-spin" />
            : <Trash2 size={12} />
          }
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="font-display font-bold text-sm text-ink leading-snug">
          {item.itemType?.replace("_", " ")} Item
        </p>
        {item.note && (
          <p className="font-body text-xs text-ink-muted leading-relaxed line-clamp-2">
            {item.note}
          </p>
        )}
        <p className="font-mono text-[9px] text-ink-light uppercase tracking-widest">
          Saved {new Date(item.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </motion.div>
  );
}

export default function CollectionDetailPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const [collection, setCollection] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/collections/${id}`);
        setCollection(res.data.data);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  const removeItem = async (itemType, itemId) => {
    try {
      await api.delete(`/collections/${id}/items/${itemType}/${itemId}`);
      setCollection(prev => ({
        ...prev,
        items: prev.items.filter(i => !(i.itemType === itemType && i.itemId === itemId)),
      }));
    } catch (err) {
      setError(getApiError(err));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="flex items-center gap-3 text-ink-muted">
          <Loader size={20} className="animate-spin text-copper" />
          <span className="font-body text-sm">Loading collection…</span>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="text-center space-y-3">
          <p className="font-display font-bold text-2xl text-primary">Collection not found</p>
          <Link to="/collections" className="font-body text-sm text-copper hover:text-primary transition-colors flex items-center gap-1 justify-center">
            <ArrowLeft size={14} /> Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const items = collection.items || [];

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header */}
      <div className="border-b border-[#E8E2D8]" style={{ background: "#F5F0E8" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10 space-y-4">

          {/* Back link */}
          <button
            onClick={() => navigate("/collections")}
            className="flex items-center gap-2 font-body text-sm text-ink-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> All Collections
          </button>

          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="font-display font-bold text-4xl text-ink">{collection.title}</h1>
                <span className={`inline-flex items-center gap-1 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  collection.isPublic
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                  {collection.isPublic ? <><Globe size={9}/> Public</> : <><Lock size={9}/> Private</>}
                </span>
              </div>
              {collection.description && (
                <p className="font-body text-sm text-ink-muted max-w-lg">{collection.description}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-2 border-t border-[#E8E2D8]">
            <div>
              <p className="font-display font-bold text-2xl text-primary">{items.length}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light mt-0.5">
                {items.length === 1 ? "Item" : "Items"}
              </p>
            </div>
            {Object.entries(
              items.reduce((acc, item) => {
                acc[item.itemType] = (acc[item.itemType] || 0) + 1;
                return acc;
              }, {})
            ).map(([type, count]) => (
              <div key={type}>
                <p className="font-display font-bold text-2xl text-primary">{count}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light mt-0.5 capitalize">
                  {type.replace("_", " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10">

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 mb-6 max-w-md">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-5">
            <div className="w-16 h-16 border border-[#E8E2D8] flex items-center justify-center mx-auto">
              <BookOpen size={28} className="text-copper" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <p className="font-display font-bold text-2xl text-ink">This collection is empty</p>
              <p className="font-body text-sm text-ink-muted max-w-xs mx-auto">
                Browse crafts, foods, festivals, and artisans on the Explore page and save them here.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
            >
              <MapPin size={14} /> Go to Explore
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <CollectionItem
                key={`${item.itemType}-${item.itemId}`}
                item={item}
                index={i}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}