import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Users, Search, ArrowRight,
  Loader, AlertCircle, Hammer, Palette, Shirt,
  Wrench, Circle, Brush, RefreshCw
} from "lucide-react";
import api from "../../services/api";

const FILTERS   = ["All", "Fine Art", "Craft Workshop", "Textile", "Metalwork", "Pottery", "Painting"];
const LOCATIONS = ["All Locations", "Kathmandu", "Bhaktapur", "Lalitpur", "Palpa"];


const CRAFT_IMAGES = {
  "Thangka Painting":
    "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=600&q=80", // Colorful Tibetan Buddhist thangka mural, Nepal
  "Woodcarving":
    "https://images.unsplash.com/photo-1750534232355-1cf0e16f48e9?w=600&q=80", // Wood carving tools laid out on a wooden surface
  "Pottery":
    "https://images.unsplash.com/photo-1753164725860-ffcd260b7b32?w=600&q=80", // Hands shaping clay on a pottery wheel
  "Textile Weaving":
    "https://images.unsplash.com/photo-1760328715296-9714daa8a737?w=600&q=80", // Close-up of a handloom threaded with yarn
  "Paubha Painting":
    "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=600&q=80", // Paubha is the Newari name for the same thangka scroll-painting tradition
  "Metalwork":
    "https://images.unsplash.com/photo-1691315040131-8785183c20e8?w=600&q=80", // Blacksmith hammering metal on an anvil
};
const CRAFT_FALLBACK = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80";

const getImage = (craft) => CRAFT_IMAGES[craft] || CRAFT_FALLBACK;

function WorkshopCard({ workshop, index }) {
  const available = workshop.isActive;
  const price     = workshop.price || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white overflow-hidden border border-[#E8E2D8] shadow-card group hover:-translate-y-0.5 transition-all duration-300"
      style={{ borderRadius: 6 }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={getImage(workshop.craft)}
          alt={workshop.craft}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => { e.target.src = CRAFT_FALLBACK; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>

        {/* Craft badge */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-black/40 text-white backdrop-blur-sm">
            {workshop.craft}
          </span>
        </div>

        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 ${
            available ? "bg-green-500/80 text-white" : "bg-gray-500/80 text-white"
          }`}>
            {available ? "Available" : "Full"}
          </span>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 shadow-sm">
          <p className="font-mono text-[9px] text-ink-light uppercase tracking-wider">Per Person</p>
          <p className="font-display font-bold text-sm text-primary">
            NPR {price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-bold text-lg text-ink leading-snug group-hover:text-primary transition-colors">
            {workshop.title}
          </h3>
          <p className="font-body text-sm text-copper mt-0.5">
            {workshop.artisanId?.userId?.name
              ? `with ${workshop.artisanId.userId.name}`
              : workshop.craft}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-ink-muted">
            <MapPin size={12} className="text-copper flex-shrink-0" />
            <span className="font-body text-xs">{workshop.location}, {workshop.district}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-muted">
            <Clock size={12} className="text-copper flex-shrink-0" />
            <span className="font-body text-xs">{workshop.duration} {workshop.duration === 1 ? "Hour" : "Hours"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-muted">
            <Users size={12} className="text-copper flex-shrink-0" />
            <span className="font-body text-xs">Max {workshop.capacity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(workshop.includes || []).map((item) => (
            <span
              key={item}
              className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-[#F5F0E8] text-ink-muted border border-[#E8E2D8]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="pt-1 border-t border-[#F0EDE8]">
          {available ? (
            <Link
              to={`/workshops/book/${workshop._id}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
              style={{ borderRadius: 4 }}
            >
              Book Workshop <ArrowRight size={13} />
            </Link>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-400 font-mono font-bold text-xs uppercase tracking-wider cursor-not-allowed"
              style={{ borderRadius: 4 }}
            >
              Fully Booked
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState("All");
  const [location,  setLocation]  = useState("All Locations");

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const res = await api.get("/workshops");
        setWorkshops(res.data.data || []);
      } catch {
        setError("Failed to load workshops. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const filtered = workshops.filter((w) => {
    const matchSearch   = w.title.toLowerCase().includes(search.toLowerCase()) ||
                          w.craft.toLowerCase().includes(search.toLowerCase());
    const matchFilter   = filter === "All" || w.craft.toLowerCase().includes(filter.toLowerCase());
    const matchLocation = location === "All Locations" ||
                          w.location.includes(location) ||
                          w.district.includes(location);
    return matchSearch && matchFilter && matchLocation;
  });

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Hero — full width image with overlay */}
      <section className="relative overflow-hidden h-72">
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85"
          alt="Nepal workshops"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(89,32,15,0.85) 0%, rgba(89,32,15,0.55) 60%, rgba(89,32,15,0.2) 100%)" }}/>

        <div className="relative h-full max-w-screen-xl mx-auto px-6 lg:px-16 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 max-w-xl"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-white/60">
              Hands-On Heritage
            </p>
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-white leading-tight">
              Master Workshops
            </h1>
            <p className="font-body text-base text-white/75 max-w-md leading-relaxed">
              Learn directly from Nepal's living masters. Book a hands-on experience in pottery, painting, weaving, and more.
            </p>
            <div className="flex gap-10 pt-2">
              {[
                { value: workshops.length || "6+", label: "Workshops" },
                { value: "18",                     label: "Master Artisans" },
                { value: "6",                      label: "Districts" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-white">{value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/50 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8 space-y-4">
        <div className="flex items-center gap-0 bg-white border border-[#E8E2D8] shadow-sm overflow-hidden" style={{ borderRadius: 4 }}>
          <div className="flex items-center gap-3 flex-1 px-5 py-3.5">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search workshops or craft types..."
              className="flex-1 font-body text-sm text-ink bg-transparent focus:outline-none placeholder-gray-400"
            />
          </div>
          <div className="border-l border-[#E8E2D8] px-4 py-3.5">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="font-body text-sm text-ink bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 border font-mono text-xs font-bold uppercase tracking-wider transition-all`}
              style={{
                borderRadius: 4,
                background:   filter === f ? "#59200F" : "#fff",
                borderColor:  filter === f ? "#59200F" : "#E8E2D8",
                color:        filter === f ? "#fff"    : "#6B5B4E",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-light">
            {filtered.length} workshop{filtered.length !== 1 ? "s" : ""} available
          </p>
        )}
      </section>

      {/* Workshop Grid */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pb-16">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader size={20} className="animate-spin text-copper mr-3" />
            <span className="font-body text-sm text-ink-muted">Loading workshops…</span>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24 space-y-4">
            <AlertCircle size={40} className="text-ink-muted/20 mx-auto" strokeWidth={1}/>
            <p className="font-display font-bold text-xl text-ink-muted">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
              style={{ borderRadius: 4 }}
            >
              <RefreshCw size={13}/> Try Again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <Brush size={40} className="text-ink-muted/20 mx-auto" strokeWidth={1}/>
            <p className="font-display font-bold text-2xl text-ink-muted">No workshops found</p>
            <p className="font-body text-sm text-ink-light">Try a different search or filter</p>
            <button
              onClick={() => { setSearch(""); setFilter("All"); setLocation("All Locations"); }}
              className="mt-2 px-6 py-2.5 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
              style={{ borderRadius: 4 }}
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((workshop, i) => (
              <WorkshopCard key={workshop._id} workshop={workshop} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E8E2D8]" style={{ background: "#F0EAD8" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-lg">
            <h2 className="font-display font-bold text-3xl text-primary">
              Are you a master artisan?
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Share your craft with the world. Join KHOJ's network of heritage artisans and open your workshop to learners from across the globe.
            </p>
          </div>
          <Link
            to="/signup"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-display font-bold text-base hover:bg-primary-light transition-colors shadow-pin"
            style={{ borderRadius: 4 }}
          >
            Join as Artisan <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}