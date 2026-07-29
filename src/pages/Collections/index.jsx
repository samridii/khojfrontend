import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookmarkIcon, Trash2, Lock, Globe,
  ChevronRight, Loader, AlertCircle, MapPin
} from "lucide-react";
import api, { getApiError } from "../../services/api";

const TYPE_COLORS = {
  craft:     "bg-amber-100 text-amber-700",
  food:      "bg-orange-100 text-orange-700",
  festival:  "bg-purple-100 text-purple-700",
  community: "bg-teal-100 text-teal-700",
  music:     "bg-blue-100 text-blue-700",
  artisan:   "bg-rose-100 text-rose-700",
  workshop:  "bg-green-100 text-green-700",
  ai_match:  "bg-indigo-100 text-indigo-700",
};

function CollectionCard({ collection, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const itemCount = collection.items?.length || 0;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Delete this collection?")) return;
    setDeleting(true);
    try {
      await onDelete(collection._id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="bg-white border border-[#E8E2D8] shadow-card overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Cover */}
      <div className="h-36 relative overflow-hidden" style={{ background: "#EDE8D8" }}>
        <div className="absolute inset-0 flex flex-wrap gap-2 p-4 content-start">
          {(collection.items || []).slice(0, 6).map((item, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded font-mono text-[8px] font-bold uppercase ${TYPE_COLORS[item.itemType] || "bg-gray-100 text-gray-600"}`}
            >
              {item.itemType?.replace("_", " ")}
            </div>
          ))}
          {itemCount === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookmarkIcon size={28} className="text-[#C8B898]" strokeWidth={1.5}/>
            </div>
          )}
        </div>

        {/* Public/Private badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
            collection.isPublic
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gray-100 text-gray-600 border border-gray-200"
          }`}>
            {collection.isPublic
              ? <><Globe size={9}/> Public</>
              : <><Lock size={9}/> Private</>
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-display font-bold text-lg text-ink leading-snug group-hover:text-primary transition-colors">
            {collection.title}
          </h3>
          {collection.description && (
            <p className="font-body text-xs text-ink-muted mt-1 line-clamp-2">
              {collection.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-ink-muted">
          <BookmarkIcon size={12} className="text-copper" />
          <span className="font-body text-xs">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F0EDE8]">
          <Link
            to={`/collections/${collection._id}`}
            className="font-body text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1"
          >
            View Collection <ChevronRight size={12} />
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-ink-muted hover:text-red-500 transition-colors disabled:opacity-40"
          >
            {deleting
              ? <Loader size={14} className="animate-spin" />
              : <Trash2 size={14} />
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/collections");
        setCollections(res.data.data || []);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const deleteCollection = async (id) => {
    await api.delete(`/collections/${id}`);
    setCollections(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header */}
      <div className="border-b border-[#E8E2D8]" style={{ background: "#F5F0E8" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10">
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              My Account
            </p>
            <h1 className="font-display font-bold text-4xl text-ink">My Collections</h1>
            <p className="font-body text-sm text-ink-muted">
              Items you've saved from crafts, foods, festivals, and artisans.
            </p>
          </div>

          {!loading && collections.length > 0 && (
            <div className="flex gap-8 mt-6 pt-6 border-t border-[#E8E2D8]">
              {[
                { label: "Collections", value: collections.length },
                { label: "Total Items", value: collections.reduce((a, c) => a + (c.items?.length || 0), 0) },
                { label: "Public",      value: collections.filter(c => c.isPublic).length },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-primary">{value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-10">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex items-center gap-3 text-ink-muted">
              <Loader size={20} className="animate-spin text-copper" />
              <span className="font-body text-sm">Loading collections…</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 max-w-md">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && collections.length === 0 && (
          <div className="text-center py-24 space-y-5">
            <div className="w-16 h-16 border border-[#E8E2D8] flex items-center justify-center mx-auto">
              <BookmarkIcon size={28} className="text-copper" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <p className="font-display font-bold text-2xl text-ink">No saved items yet</p>
              <p className="font-body text-sm text-ink-muted max-w-xs mx-auto">
                Browse the Explore page and save crafts, foods, festivals, and artisans to your collections.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
            >
              <MapPin size={14} /> Browse Explore
            </Link>
          </div>
        )}

        {!loading && !error && collections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <CollectionCard
                key={collection._id}
                collection={collection}
                onDelete={deleteCollection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}