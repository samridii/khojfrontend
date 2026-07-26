import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Sun, Sunset, Moon,
  MapPin, Clock, Users, Calendar, Tag,
  ShieldCheck, AlertCircle, Loader
} from "lucide-react";
import api, { getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";

// Days in a month helper
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// Mock workshop data — replace with real API call
const WORKSHOP = {
  id: "woodcarving-residency",
  title: "Thangka Painting Workshop",
  artisan: "Pema Dorje",
  location: "Boudhanath, Kathmandu",
  duration: "3 Hours",
  pricePerPerson: 3500,
  capacity: 8,
  gradient: "from-teal-700 via-blue-800 to-indigo-900",
};

const TIME_SLOTS = [
  { id: "morning",   label: "Morning",   time: "9:00 AM – 12:00 PM",  Icon: Sun },
  { id: "afternoon", label: "Afternoon", time: "1:00 PM – 4:00 PM",   Icon: Sunset },
  { id: "evening",   label: "Evening",   time: "5:00 PM – 8:00 PM",   Icon: Moon },
];

const EXPERIENCE_TYPES = ["Shared Group", "Private Session", "Family Group"];

const FEATURES = [
  { emoji: "🏛️", title: "Authentic Experience",   desc: "Learn directly from master artisans in their traditional studios." },
  { emoji: "🎨", title: "All Materials Included", desc: "We provide high-quality materials for your learning." },
  { emoji: "👥", title: "Small Group Learning",   desc: "Personal attention in small groups for the best experience." },
  { emoji: "❤️", title: "Support Local",           desc: "Your booking supports local artisans and preserves heritage." },
];

// Mini calendar component
function BookingCalendar({ selected, onSelect }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS   = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDay     = getFirstDayOfMonth(viewYear, viewMonth);
  const blanks       = Array(firstDay).fill(null);
  const dayNumbers   = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday    = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isSelected = (d) => selected && selected.getDate() === d && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
  const isPast     = (d) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-[#EDE8D8] transition-colors">
          <ChevronLeft size={16} className="text-ink-muted" />
        </button>
        <p className="font-display font-bold text-sm text-ink">
          {MONTHS[viewMonth]} {viewYear}
        </p>
        <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-[#EDE8D8] transition-colors">
          <ChevronRight size={16} className="text-ink-muted" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(d => (
          <div key={d} className="text-center font-mono text-[9px] font-bold text-ink-light py-1">
            {d}
          </div>
        ))}

        {/* Blank cells */}
        {blanks.map((_, i) => <div key={`b${i}`} />)}

        {/* Day cells */}
        {dayNumbers.map(d => (
          <button
            key={d}
            disabled={isPast(d)}
            onClick={() => onSelect(new Date(viewYear, viewMonth, d))}
            className={`aspect-square flex items-center justify-center rounded-full text-xs font-body transition-all
              ${isPast(d) ? "text-ink-light/30 cursor-not-allowed" : "hover:bg-[#EDE8D8]"}
              ${isSelected(d) ? "bg-primary text-white hover:bg-primary font-bold" : ""}
              ${isToday(d) && !isSelected(d) ? "border border-copper text-copper font-bold" : ""}
            `}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2">
        {[
          { color: "bg-green-500",  label: "Available" },
          { color: "bg-yellow-400", label: "Limited" },
          { color: "bg-gray-300",   label: "Booked" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="font-body text-xs text-ink-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkshopBookingPage() {
  const navigate            = useNavigate();
  const { isAuthenticated } = useAuth();

  const [selectedDate,  setDate]       = useState(null);
  const [selectedSlot,  setSlot]       = useState("morning");
  const [participants,  setParticipants] = useState(2);
  const [expType,       setExpType]    = useState("Shared Group");
  const [note,          setNote]       = useState("");
  const [loading,       setLoading]    = useState(false);
  const [error,         setError]      = useState("");

  const slotInfo  = TIME_SLOTS.find(s => s.id === selectedSlot);
  const total     = WORKSHOP.pricePerPerson * participants;

  const handleConfirm = async () => {
    if (!isAuthenticated) { navigate("/login", { state: { from: location.pathname } }); return; }
    if (!selectedDate)    { setError("Please select a date."); return; }

    setError("");
    setLoading(true);
    try {
      await api.post("/bookings", {
        workshopId:    WORKSHOP.id,
        scheduledDate: selectedDate.toISOString(),
        participants,
        note: `Experience: ${expType}. ${note}`.trim(),
      });
      navigate("/bookings/confirmed", {
        state: {
          workshop:     WORKSHOP.title,
          artisan:      WORKSHOP.artisan,
          date:         selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          time:         slotInfo?.time,
          participants,
          expType,
          total,
          location:     WORKSHOP.location,
        }
      });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-8">
        <div className="flex items-center gap-2 font-body text-xs text-ink-muted">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/workshops" className="hover:text-primary transition-colors">Workshops</Link>
          <span>/</span>
          <span>{WORKSHOP.artisan}</span>
          <span>/</span>
          <span className="text-ink">Book Workshop</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8">

        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-4xl text-ink">Book Your Workshop</h1>
            <span className="text-copper text-2xl">◎</span>
          </div>
          <p className="font-body text-sm text-ink-muted mt-2">
            Secure your spot and get ready for an unforgettable cultural experience.
          </p>
        </div>

        {/* Workshop info strip */}
        <div className="flex flex-wrap gap-0 border border-[#E0D8C8] rounded-xl overflow-hidden mb-8 bg-white">
          {[
            { Icon: Tag,    label: "Workshop", value: WORKSHOP.title },
            { Icon: Users,  label: "Artisan",  value: WORKSHOP.artisan },
            { Icon: MapPin, label: "Location", value: WORKSHOP.location },
          ].map(({ Icon, label, value }, i) => (
            <div key={label} className={`flex items-center gap-3 px-6 py-4 flex-1 min-w-[180px] ${i > 0 ? "border-l border-[#E0D8C8]" : ""}`}>
              <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-copper" />
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light">{label}</p>
                <p className="font-display font-bold text-sm text-ink mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Form */}
          <div className="flex-1 space-y-8">

            {/* Step 1 — Date & Time */}
            <div className="bg-white rounded-2xl border border-[#E0D8C8] p-6 space-y-6">
              <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
                Choose Date & Time
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light mb-4">
                    Select Date
                  </p>
                  <BookingCalendar selected={selectedDate} onSelect={setDate} />
                </div>

                {/* Time slots */}
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light mb-4">
                    Select Time Slot
                  </p>
                  <div className="space-y-3">
                    {TIME_SLOTS.map(({ id, label, time, Icon }) => (
                      <button
                        key={id}
                        onClick={() => setSlot(id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                          ${selectedSlot === id
                            ? "border-primary bg-primary/5"
                            : "border-[#E0D8C8] hover:border-[#C8B898]"
                          }`}
                      >
                        <Icon size={18} className={selectedSlot === id ? "text-primary" : "text-ink-muted"} strokeWidth={1.5} />
                        <div className="flex-1">
                          <p className={`font-display font-bold text-sm ${selectedSlot === id ? "text-primary" : "text-ink"}`}>
                            {label}
                          </p>
                          <p className="font-body text-xs text-ink-muted mt-0.5">{time}</p>
                        </div>
                        {selectedSlot === id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 — Workshop Details */}
            <div className="bg-white rounded-2xl border border-[#E0D8C8] p-6 space-y-6">
              <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-mono font-bold">2</span>
                Workshop Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Group size */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                    Group Size
                  </label>
                  <div className="flex items-center gap-3 border border-[#E0D8C8] rounded-xl px-4 py-3">
                    <button
                      onClick={() => setParticipants(p => Math.max(1, p - 1))}
                      className="w-6 h-6 rounded-full border border-[#E0D8C8] flex items-center justify-center font-bold text-ink hover:border-primary hover:text-primary transition-colors"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-display font-bold text-sm text-ink">
                      {participants} {participants === 1 ? "Person" : "People"}
                    </span>
                    <button
                      onClick={() => setParticipants(p => Math.min(WORKSHOP.capacity, p + 1))}
                      className="w-6 h-6 rounded-full border border-[#E0D8C8] flex items-center justify-center font-bold text-ink hover:border-primary hover:text-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-body text-xs text-ink-light">Max {WORKSHOP.capacity} people per session</p>
                </div>

                {/* Experience type */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                    Experience Type
                  </label>
                  <div className="relative">
                    <select
                      value={expType}
                      onChange={e => setExpType(e.target.value)}
                      className="w-full appearance-none border border-[#E0D8C8] rounded-xl px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-copper transition-colors cursor-pointer bg-white"
                    >
                      {EXPERIENCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink-light pointer-events-none" />
                  </div>
                  <p className="font-body text-xs text-ink-light">Meet fellow culture enthusiasts</p>
                </div>

                {/* Special request */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                    Special Request <span className="normal-case font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    maxLength={200}
                    rows={3}
                    placeholder="Any specific request or something we should know before the workshop?"
                    className="w-full border border-[#E0D8C8] rounded-xl px-4 py-3 font-body text-xs text-ink resize-none focus:outline-none focus:border-copper transition-colors"
                  />
                  <p className="font-body text-[10px] text-ink-light text-right">{note.length}/200</p>
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-copper/5 border border-copper/15">
                <span className="text-copper text-lg flex-shrink-0">◎</span>
                <p className="font-body text-xs text-ink-muted leading-relaxed">
                  You can reschedule or cancel up to 24 hours before your workshop.
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                <p className="font-body text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* RIGHT — Booking Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-[#E0D8C8] overflow-hidden shadow-card">

                {/* Workshop image */}
                <div className={`h-44 bg-gradient-to-br ${WORKSHOP.gradient}`} />

                {/* Artisan row */}
                <div className="p-5 border-b border-[#E0D8C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex-shrink-0" />
                    <div>
                      <p className="font-display font-bold text-sm text-ink">{WORKSHOP.title}</p>
                      <p className="font-body text-xs text-ink-muted">with {WORKSHOP.artisan}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <ShieldCheck size={11} className="text-green-600" />
                        <span className="font-mono text-[9px] text-green-600 font-bold uppercase tracking-wider">Verified Artisan</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details list */}
                <div className="p-5 space-y-3">
                  {[
                    { Icon: Calendar, label: "Date",           value: selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "Not selected" },
                    { Icon: Clock,    label: "Time",           value: slotInfo?.time || "Not selected" },
                    { Icon: Users,    label: "Experience Type", value: expType },
                    { Icon: Users,    label: "Group Size",     value: `${participants} ${participants === 1 ? "Person" : "People"}` },
                    { Icon: MapPin,   label: "Location",       value: `${WORKSHOP.artisan} Studio, ${WORKSHOP.location}` },
                    { Icon: Clock,    label: "Duration",       value: WORKSHOP.duration },
                    { Icon: Tag,      label: "Price per Person", value: `NPR ${WORKSHOP.pricePerPerson.toLocaleString()}` },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Icon size={13} className="text-ink-light" />
                        <span className="font-body text-xs text-ink-muted">{label}</span>
                      </div>
                      <span className="font-body text-xs text-ink text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="px-5 pb-5 pt-3 border-t border-[#E0D8C8]">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-base text-ink">Total Amount</p>
                    <div className="text-right">
                      <p className="font-display font-bold text-xl text-primary">
                        NPR {total.toLocaleString()}
                      </p>
                      <p className="font-body text-[10px] text-ink-light">Inclusive of all materials and taxes</p>
                    </div>
                  </div>
                </div>

                {/* Confirm button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-display font-bold text-base rounded-xl flex items-center justify-center gap-3 hover:bg-primary-light transition-colors disabled:opacity-60 shadow-pin"
                  >
                    {loading ? (
                      <><Loader size={18} className="animate-spin" /> Processing…</>
                    ) : (
                      <>🔒 Confirm Booking</>
                    )}
                  </button>
                  <p className="font-body text-[10px] text-ink-light text-center mt-3">
                    🛡️ Secure booking • Instant confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#E0D8C8]">
          {FEATURES.map(({ emoji, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center flex-shrink-0 text-xl">
                {emoji}
              </div>
              <div>
                <p className="font-display font-bold text-sm text-ink">{title}</p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}