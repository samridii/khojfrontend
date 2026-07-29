import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Sun, Sunset, Moon,
  MapPin, Clock, Users, Calendar, Tag,
  ShieldCheck, AlertCircle, Loader, Hammer,
  Package, UserCheck, Heart
} from "lucide-react";
import api, { getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";

const getDaysInMonth      = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDayOfMonth  = (y, m) => new Date(y, m, 1).getDay();

const TIME_SLOTS = [
  { id: "morning",   label: "Morning",   time: "9:00 AM – 12:00 PM", Icon: Sun },
  { id: "afternoon", label: "Afternoon", time: "1:00 PM – 4:00 PM",  Icon: Sunset },
  { id: "evening",   label: "Evening",   time: "5:00 PM – 8:00 PM",  Icon: Moon },
];

const EXPERIENCE_TYPES = ["Shared Group", "Private Session", "Family Group"];

const FEATURES = [
  { Icon: Hammer,    title: "Authentic Experience",   desc: "Learn directly from master artisans in their traditional studios." },
  { Icon: Package,   title: "All Materials Included", desc: "We provide high-quality materials for your learning." },
  { Icon: UserCheck, title: "Small Group Learning",   desc: "Personal attention in small groups for the best experience." },
  { Icon: Heart,     title: "Support Local",          desc: "Your booking supports local artisans and preserves heritage." },
];

// Verified, working Unsplash photos — kept in sync with WorkshopsPage.jsx
// so the same craft always shows the same real image everywhere in the app.
const CRAFT_IMAGES = {
  "Thangka Painting":
    "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=900&q=80", // Colorful Tibetan Buddhist thangka mural, Nepal
  "Woodcarving":
    "https://images.unsplash.com/photo-1750534232355-1cf0e16f48e9?w=900&q=80", // Wood carving tools laid out on a wooden surface
  "Pottery":
    "https://images.unsplash.com/photo-1753164725860-ffcd260b7b32?w=900&q=80", // Hands shaping clay on a pottery wheel
  "Textile Weaving":
    "https://images.unsplash.com/photo-1760328715296-9714daa8a737?w=900&q=80", // Close-up of a handloom threaded with yarn
  "Paubha Painting":
    "https://images.unsplash.com/photo-1755011309974-fd02724c4a2d?w=900&q=80", // Paubha is the Newari name for the same thangka scroll-painting tradition
  "Metalwork":
    "https://images.unsplash.com/photo-1691315040131-8785183c20e8?w=900&q=80", // Blacksmith hammering metal on an anvil
};
const CRAFT_FALLBACK = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=80";

function BookingCalendar({ selected, onSelect }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS   = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = getFirstDayOfMonth(viewYear, viewMonth);
  const blanks      = Array(firstDay).fill(null);
  const dayNumbers  = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday    = d => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isSelected = d => selected && selected.getDate() === d && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
  const isPast     = d => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-1.5 hover:bg-[#EDE8D8] transition-colors" style={{ borderRadius: 4 }}>
          <ChevronLeft size={17} className="text-ink-muted" />
        </button>
        <p className="font-display font-bold text-base text-ink">{MONTHS[viewMonth]} {viewYear}</p>
        <button onClick={nextMonth} className="p-1.5 hover:bg-[#EDE8D8] transition-colors" style={{ borderRadius: 4 }}>
          <ChevronRight size={17} className="text-ink-muted" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(d => (
          <div key={d} className="text-center font-mono text-[10px] font-bold text-ink-light py-1">{d}</div>
        ))}
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {dayNumbers.map(d => (
          <button
            key={d}
            disabled={isPast(d)}
            onClick={() => onSelect(new Date(viewYear, viewMonth, d))}
            className={`aspect-square flex items-center justify-center text-sm font-body transition-all
              ${isPast(d)     ? "text-ink-light/30 cursor-not-allowed" : "hover:bg-[#EDE8D8]"}
              ${isSelected(d) ? "bg-primary text-white font-bold" : ""}
              ${isToday(d) && !isSelected(d) ? "border border-copper text-copper font-bold" : ""}
            `}
            style={{ borderRadius: 4 }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2">
        {[
          { color: "bg-green-500", label: "Available" },
          { color: "bg-amber-400", label: "Limited"   },
          { color: "bg-gray-300",  label: "Booked"    },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 ${color}`} style={{ borderRadius: 2 }} />
            <span className="font-body text-sm text-ink-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkshopBookingPage() {
  const navigate            = useNavigate();
  const { id }              = useParams();
  const { isAuthenticated } = useAuth();

  const [workshop,     setWorkshop]     = useState(null);
  const [loadingWS,    setLoadingWS]    = useState(true);
  const [selectedDate, setDate]         = useState(null);
  const [selectedSlot, setSlot]         = useState("morning");
  const [participants, setParticipants] = useState(2);
  const [expType,      setExpType]      = useState("Shared Group");
  const [note,         setNote]         = useState("");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");

  useEffect(() => {
    const fetchWorkshop = async () => {
      setLoadingWS(true);
      try {
        const res = await api.get(`/workshops/${id}`);
        setWorkshop(res.data.data);
      } catch {
        setError("Workshop not found.");
      } finally {
        setLoadingWS(false);
      }
    };
    if (id) fetchWorkshop();
  }, [id]);

  const slotInfo = TIME_SLOTS.find(s => s.id === selectedSlot);
  const total    = (workshop?.price || 0) * participants;

  const handleConfirm = async () => {
    if (!isAuthenticated) { navigate("/login", { state: { from: location.pathname } }); return; }
    if (!selectedDate)    { setError("Please select a date."); return; }
    if (!workshop)        { setError("Workshop not found."); return; }

    setError("");
    setLoading(true);
    try {
      await api.post("/bookings", {
        workshopId:    workshop._id,
        scheduledDate: selectedDate.toISOString(),
        participants,
        note:          `Experience: ${expType}. ${note}`.trim(),
      });
      navigate("/bookings/confirmed", {
        state: {
          workshop:     workshop.title,
          artisan:      workshop.artisanId?.userId?.name || "Artisan",
          date:         selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          time:         slotInfo?.time,
          participants,
          expType,
          total,
          location:     workshop.location,
        },
      });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (loadingWS) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <Loader size={20} className="animate-spin text-copper mr-3" />
        <span className="font-body text-base text-ink-muted">Loading workshop…</span>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="text-center space-y-3">
          <p className="font-display font-bold text-2xl text-primary">Workshop not found</p>
          <Link to="/workshops" className="inline-flex items-center gap-2 font-body text-base text-copper hover:text-primary transition-colors">
            <ChevronLeft size={15} /> Back to Workshops
          </Link>
        </div>
      </div>
    );
  }

  const workshopImage = CRAFT_IMAGES[workshop.craft] || CRAFT_FALLBACK;

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Hero image strip — rounded at the bottom instead of a hard rectangle */}
      <div className="relative h-64 overflow-hidden rounded-b-[2rem]">
        <img
          src={workshopImage}
          alt={workshop.craft}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = CRAFT_FALLBACK; }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(89,32,15,0.3) 0%, rgba(89,32,15,0.72) 100%)" }}/>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12 pb-9">
            <Link to="/workshops" className="inline-flex items-center gap-1.5 font-mono text-sm text-white/70 hover:text-white transition-colors mb-3">
              <ChevronLeft size={15}/> Workshops
            </Link>
            <h1 className="font-display font-bold text-5xl text-white">{workshop.title}</h1>
            <p className="font-body text-base text-white/70 mt-1">
              with {workshop.artisanId?.userId?.name || "Artisan"} · {workshop.location}, {workshop.district}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">

        {/* Info strip */}
        <div className="flex flex-wrap gap-0 border border-[#E0D8C8] overflow-hidden mb-8 bg-white" style={{ borderRadius: 4 }}>
          {[
            { Icon: Tag,    label: "Workshop", value: workshop.title },
            { Icon: Users,  label: "Artisan",  value: workshop.artisanId?.userId?.name || "Artisan" },
            { Icon: MapPin, label: "Location", value: `${workshop.location}, ${workshop.district}` },
            { Icon: Clock,  label: "Duration", value: `${workshop.duration} Hour${workshop.duration > 1 ? "s" : ""}` },
          ].map(({ Icon, label, value }, i) => (
            <div key={label} className={`flex items-center gap-3 px-5 py-4 flex-1 min-w-[160px] ${i > 0 ? "border-l border-[#E0D8C8]" : ""}`}>
              <div className="w-9 h-9 bg-copper/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 4 }}>
                <Icon size={15} className="text-copper" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light">{label}</p>
                <p className="font-display font-bold text-base text-ink mt-0.5 line-clamp-1">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Form */}
          <div className="flex-1 space-y-6">

            {/* Step 1 */}
            <div className="bg-white border border-[#E0D8C8] p-6 space-y-6" style={{ borderRadius: 4 }}>
              <h2 className="font-display font-bold text-xl text-ink flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white text-sm flex items-center justify-center font-mono font-bold flex-shrink-0" style={{ borderRadius: 4 }}>1</span>
                Choose Date & Time
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-light mb-4">Select Date</p>
                  <BookingCalendar selected={selectedDate} onSelect={setDate} />
                </div>

                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-light mb-4">Select Time Slot</p>
                  <div className="space-y-3">
                    {TIME_SLOTS.map(({ id, label, time, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setSlot(id)}
                        className={`w-full flex items-center gap-4 p-4 border-2 transition-all text-left ${
                          selectedSlot === id
                            ? "border-primary bg-primary/5"
                            : "border-[#E0D8C8] hover:border-[#C8B898]"
                        }`}
                        style={{ borderRadius: 4 }}
                      >
                        <Icon size={20} className={selectedSlot === id ? "text-primary" : "text-ink-muted"} strokeWidth={1.5} />
                        <div className="flex-1">
                          <p className={`font-display font-bold text-base ${selectedSlot === id ? "text-primary" : "text-ink"}`}>{label}</p>
                          <p className="font-body text-sm text-ink-muted mt-0.5">{time}</p>
                        </div>
                        {selectedSlot === id && (
                          <div className="w-5 h-5 bg-primary flex items-center justify-center flex-shrink-0" style={{ borderRadius: 4 }}>
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#E0D8C8] p-6 space-y-6" style={{ borderRadius: 4 }}>
              <h2 className="font-display font-bold text-xl text-ink flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white text-sm flex items-center justify-center font-mono font-bold flex-shrink-0" style={{ borderRadius: 4 }}>2</span>
                Workshop Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Group size */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-light block">Group Size</label>
                  <div className="flex items-center gap-3 border border-[#E0D8C8] px-4 py-3" style={{ borderRadius: 4 }}>
                    <button
                      onClick={() => setParticipants(p => Math.max(1, p - 1))}
                      className="w-7 h-7 border border-[#E0D8C8] flex items-center justify-center font-bold text-ink hover:border-primary hover:text-primary transition-colors text-base" style={{ borderRadius: 3 }}
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-display font-bold text-base text-ink">
                      {participants} {participants === 1 ? "Person" : "People"}
                    </span>
                    <button
                      onClick={() => setParticipants(p => Math.min(workshop.capacity || 8, p + 1))}
                      className="w-7 h-7 border border-[#E0D8C8] flex items-center justify-center font-bold text-ink hover:border-primary hover:text-primary transition-colors text-base" style={{ borderRadius: 3 }}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-body text-sm text-ink-light">Max {workshop.capacity || 8} people</p>
                </div>

                {/* Experience type */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-light block">Experience Type</label>
                  <div className="relative">
                    <select
                      value={expType}
                      onChange={e => setExpType(e.target.value)}
                      className="w-full appearance-none border border-[#E0D8C8] px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-copper transition-colors cursor-pointer bg-white"
                      style={{ borderRadius: 4 }}
                    >
                      {EXPERIENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronRight size={15} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink-light pointer-events-none" />
                  </div>
                </div>

                {/* Special request */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-light block">
                    Special Request <span className="normal-case font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    maxLength={200}
                    rows={3}
                    placeholder="Any specific requests?"
                    className="w-full border border-[#E0D8C8] px-4 py-3 font-body text-base text-ink resize-none focus:outline-none focus:border-copper transition-colors"
                    style={{ borderRadius: 4 }}
                  />
                  <p className="font-body text-sm text-ink-light text-right">{note.length}/200</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-copper/5 border border-copper/15" style={{ borderRadius: 4 }}>
                <ShieldCheck size={17} className="text-copper flex-shrink-0 mt-0.5" strokeWidth={1.5}/>
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  You can reschedule or cancel up to 24 hours before your workshop at no charge.
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200" style={{ borderRadius: 4 }}>
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="font-body text-base text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* RIGHT — Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white border border-[#E0D8C8] overflow-hidden shadow-card" style={{ borderRadius: 6 }}>

                {/* Workshop image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={workshopImage}
                    alt={workshop.craft}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = CRAFT_FALLBACK; }}
                  />
                </div>

                {/* Artisan row */}
                <div className="p-5 border-b border-[#E0D8C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-amber-600 to-orange-700 flex-shrink-0" style={{ borderRadius: 4 }}/>
                    <div>
                      <p className="font-display font-bold text-base text-ink">{workshop.title}</p>
                      <p className="font-body text-sm text-ink-muted">with {workshop.artisanId?.userId?.name || "Artisan"}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <ShieldCheck size={12} className="text-green-600" />
                        <span className="font-mono text-[10px] text-green-600 font-bold uppercase tracking-wider">Verified Artisan</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  {[
                    { Icon: Calendar, label: "Date",        value: selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }) : "Not selected" },
                    { Icon: Clock,    label: "Time",        value: slotInfo?.time || "Not selected" },
                    { Icon: Users,    label: "Experience",  value: expType },
                    { Icon: Users,    label: "Group Size",  value: `${participants} ${participants === 1 ? "Person" : "People"}` },
                    { Icon: MapPin,   label: "Location",    value: `${workshop.location}, ${workshop.district}` },
                    { Icon: Tag,      label: "Per Person",  value: `NPR ${(workshop.price || 0).toLocaleString()}` },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Icon size={13} className="text-ink-light" />
                        <span className="font-body text-sm text-ink-muted">{label}</span>
                      </div>
                      <span className="font-body text-sm text-ink text-right max-w-[140px]">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="px-5 pb-3 pt-3 border-t border-[#E0D8C8]">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-lg text-ink">Total</p>
                    <div className="text-right">
                      <p className="font-display font-bold text-2xl text-primary">NPR {total.toLocaleString()}</p>
                      <p className="font-body text-xs text-ink-light">All materials included</p>
                    </div>
                  </div>
                </div>

                {/* Confirm */}
                <div className="px-5 pb-5">
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-display font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary-light transition-colors disabled:opacity-60 shadow-pin"
                    style={{ borderRadius: 4 }}
                  >
                    {loading ? (
                      <><Loader size={19} className="animate-spin" /> Processing…</>
                    ) : (
                      <><ShieldCheck size={17} strokeWidth={2}/> Confirm Booking</>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <ShieldCheck size={13} className="text-ink-light" strokeWidth={1.5}/>
                    <p className="font-body text-xs text-ink-light">Secure booking · Instant confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-[#E0D8C8]">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-11 h-11 bg-copper/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 4 }}>
                <Icon size={19} className="text-copper" strokeWidth={1.5}/>
              </div>
              <div>
                <p className="font-display font-bold text-base text-ink">{title}</p>
                <p className="font-body text-sm text-ink-muted leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}