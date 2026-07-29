import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck, Bookmark, BookmarkCheck,
  ChevronLeft, ChevronRight, ArrowRight,
  Footprints, MessageCircle, Hand, Heart, Loader
} from "lucide-react";
import api, { getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";

// Calendar component
function AvailabilityCalendar({ price }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS   = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay     = new Date(viewYear, viewMonth, 1).getDay();
  const blanks       = Array(firstDay).fill(null);
  const dayNumbers   = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Mock available dates — in production fetch from backend
  const available = [3, 10, 17, 24];
  const limited   = [5, 12, 19];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="bg-white border border-[#E8E2D8] overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#873415" }}>
        <button onClick={prevMonth} className="text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={18}/>
        </button>
        <p className="font-display font-bold text-sm text-white">
          {MONTHS[viewMonth]} {viewYear}
        </p>
        <button onClick={nextMonth} className="text-white/70 hover:text-white transition-colors">
          <ChevronRight size={18}/>
        </button>
      </div>

      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center font-mono text-[9px] font-bold text-ink-light py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => <div key={`b${i}`}/>)}
          {dayNumbers.map(d => {
            const isAvailable = available.includes(d);
            const isLimited   = limited.includes(d);
            const isPast      = new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return (
              <div
                key={d}
                className={`aspect-square flex items-center justify-center text-xs font-body
                  ${isPast ? "text-ink-light/30" : ""}
                  ${isAvailable && !isPast ? "bg-[#F5E6C8] text-primary font-bold cursor-pointer hover:bg-[#EDD9A3] transition-colors" : ""}
                  ${isLimited && !isPast ? "bg-[#F5E6C8]/50 text-ink-muted cursor-pointer" : ""}
                  ${!isAvailable && !isLimited && !isPast ? "text-ink" : ""}
                `}
              >
                {d}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F0EDE8]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#F5E6C8]"/>
            <span className="font-body text-[10px] text-ink-muted">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-200"/>
            <span className="font-body text-[10px] text-ink-muted">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Static fallback artisan data for when no backend data exists
const FALLBACK = {
  name:        "Ratna Jyoti Shilpakar",
  craft:       "Newar Woodcarving",
  location:    "Patan",
  district:    "Lalitpur",
  bio:         "For over 45 years, Ratna has been the silent architect of some of Nepal's most iconic renovations. Born into a lineage of Newari woodcarvers, his hands have memorized the rhythmic dance of the chisel and mallet.\n\nHe doesn't just carve wood, he listens to it. \"The wood tells you what it wants to become,\" he says. His workshop in the heart of Patan is a sanctuary of tradition.",
  experience:  45,
  isAvailable: true,
  specialties: ["Lunjhya (Golden Windows)", "Ashtamangala Carving", "Traditional Polishing"],
  price:       4500,
  image:       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    "https://images.unsplash.com/photo-1602491674275-316d95560fb1?w=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d72?w=600&q=80",
  ],
  etiquette: [
    "Remove shoes before entering the inner carving sanctuary",
    "Ask before filming his ritual-based carving techniques",
    "Do not touch unfinished works unless specifically invited",
    "A traditional greeting of 'Namaste' is always appreciated",
  ],
  proTip: "Bring a small notebook! Ratna often shares hidden historical anecdotes that aren't found in any travel guide.",
};

const SPECIALTY_ICONS = [
  { Icon: Hand,            desc: "Intricate latticework and symbolic motifs found in Royal Palaces of the Malla era." },
  { Icon: ShieldCheck,     desc: "The eight auspicious symbols representing cosmic harmony and spiritual enlightenment." },
  { Icon: Heart,           desc: "Using ancient natural resins and oils to preserve wood for generations to come." },
];

export default function ArtisanProfilePage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { isAuthenticated } = useAuth();

  const [artisan,   setArtisan]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [saved,     setSaved]     = useState(false);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchArtisan = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/artisans/${id}`);
        setArtisan(res.data.data);

        // Also fetch workshops by this artisan
        const wsRes = await api.get(`/workshops?artisanId=${id}`);
        setWorkshops(wsRes.data.data || []);
      } catch {
        // Use fallback data if backend artisan not found
        setArtisan(FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArtisan();
    else { setArtisan(FALLBACK); setLoading(false); }
  }, [id]);

  const handleSave = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    setSaved(true);
  };

  const handleBookWorkshop = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (workshops.length > 0) {
      navigate(`/workshops/book/${workshops[0]._id}`);
    } else {
      navigate("/workshops");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <Loader size={24} className="animate-spin text-copper"/>
      </div>
    );
  }

  const data = artisan || FALLBACK;
  const gallery = data.gallery?.length > 0 ? data.gallery : FALLBACK.gallery;
  const specialties = data.specialties?.length > 0 ? data.specialties : FALLBACK.specialties;
  const price = workshops[0]?.price || FALLBACK.price;

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-12 pb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Portrait photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            {/* Tape */}
            <div className="relative">
              <div className="absolute -top-3 left-8 w-20 h-5 bg-[#C8B898]/60 z-10"/>
              <div className="bg-white shadow-ledger p-3 pb-10 w-72 lg:w-80">
                <img
                  src={data.image || FALLBACK.image}
                  alt={data.name}
                  className="w-full h-80 object-cover"
                  onError={e => { e.target.src = FALLBACK.image; }}
                />
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 space-y-5 pt-4"
          >
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                Master Artisan
              </p>
              <h1 className="font-display font-bold text-5xl lg:text-6xl text-primary leading-tight">
                {data.name || data.userId?.name}
              </h1>
              <p className="font-serif italic text-lg text-ink-muted">
                {data.craft} · {data.location}, {data.district}
              </p>
            </div>

            {/* Verified badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200">
                <ShieldCheck size={13} className="text-green-600"/>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-green-700">
                  Verified by Khoj Heritage Council
                </span>
              </div>
            </div>

            {/* Experience */}
            {data.experience > 0 && (
              <p className="font-body text-sm text-ink-muted">
                <span className="font-display font-bold text-2xl text-primary">{data.experience}+</span>
                {" "}years of mastery
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleBookWorkshop}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors shadow-pin"
              >
                Book Workshop
              </button>
              <button
                onClick={handleSave}
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 font-display font-bold text-sm transition-colors
                  ${saved
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-[#D7CCB3] text-ink hover:border-primary hover:text-primary"
                  }`}
              >
                {saved ? <BookmarkCheck size={15}/> : <Bookmark size={15}/>}
                {saved ? "Saved" : "Save Artisan"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey + Craft Specialty */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* The Journey */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-copper text-lg">◎</span>
              <h2 className="font-display font-bold text-2xl text-primary">The Journey</h2>
            </div>
            <div className="bg-[#EDE8D8] border border-[#D7CCB3] p-6 space-y-4">
              {(data.bio || FALLBACK.bio).split("\n\n").map((para, i) => (
                <p key={i} className={`font-body text-sm leading-relaxed ${i === 0 ? "text-ink" : "text-ink-muted"}`}>
                  {i === 0 ? (
                    <>
                      <span className="font-bold text-primary">For over {data.experience || 45} years</span>
                      {", " + para.replace(/^For over \d+ years[,.]?\s*/i, "")}
                    </>
                  ) : para}
                </p>
              ))}
            </div>
          </div>

          {/* Craft Specialty */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-copper text-lg">◎</span>
              <h2 className="font-display font-bold text-2xl text-primary">Craft Specialty</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {specialties.map((spec, i) => {
                const { Icon, desc } = SPECIALTY_ICONS[i] || SPECIALTY_ICONS[0];
                return (
                  <div key={i} className="bg-white border border-[#E8E2D8] p-5 space-y-3">
                    <div className="w-8 h-8 border border-copper/30 flex items-center justify-center">
                      <Icon size={16} className="text-copper" strokeWidth={1.5}/>
                    </div>
                    <h3 className="font-display font-bold text-sm text-ink leading-snug">{spec}</h3>
                    <p className="font-body text-xs text-ink-muted leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pb-16 space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display font-bold text-3xl text-ink">Portfolio Gallery</h2>
            <p className="font-body text-sm text-ink-muted mt-1">A curated look at his finest masterpieces</p>
          </div>
          <button className="inline-flex items-center gap-1.5 font-mono text-xs text-copper hover:text-primary transition-colors uppercase tracking-wider">
            View Full Archive <ArrowRight size={13}/>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="overflow-hidden group cursor-pointer"
            >
              <img
                src={img}
                alt={`Work ${i + 1}`}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={e => { e.target.src = FALLBACK.gallery[i % FALLBACK.gallery.length]; }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workshop Availability + Studio Etiquette */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Calendar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="font-display font-bold text-3xl text-ink">Workshop<br/>Availability</h2>
              <div className="text-right">
                <p className="font-display font-bold text-2xl text-primary">
                  NPR {price.toLocaleString()}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-light">Per Session</p>
              </div>
            </div>
            <AvailabilityCalendar price={price}/>
            <button
              onClick={handleBookWorkshop}
              className="w-full py-3.5 bg-primary text-white font-mono font-bold text-sm uppercase tracking-wider hover:bg-primary-light transition-colors"
            >
              Book a Session
            </button>
          </div>

          {/* Studio Etiquette */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-copper text-lg">◎</span>
              <h2 className="font-display font-bold text-2xl text-ink">Studio Etiquette</h2>
            </div>

            <div className="bg-white border border-[#E8E2D8] p-5 space-y-4">
              {(data.etiquette || FALLBACK.etiquette).map((rule, i) => {
                const icons = [Footprints, MessageCircle, Hand, Heart];
                const Icon  = icons[i % icons.length];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Icon size={14} className="text-copper" strokeWidth={1.5}/>
                    </div>
                    <p className="font-body text-xs text-ink-muted leading-relaxed">{rule}</p>
                  </div>
                );
              })}

              {/* Pro tip */}
              {(data.proTip || FALLBACK.proTip) && (
                <div className="border-t border-[#F0EDE8] pt-4 space-y-1">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper">
                    Khoj Pro-Tip
                  </p>
                  <p className="font-body text-xs text-ink-muted leading-relaxed italic">
                    {data.proTip || FALLBACK.proTip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}