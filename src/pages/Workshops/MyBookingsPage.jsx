import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ChevronRight, AlertCircle, Loader, X } from "lucide-react";
import api, { getApiError } from "../../services/api";

// Status badge styles
const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-400" },
  confirmed: { label: "Confirmed", bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500" },
  completed: { label: "Completed", bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-500"  },
  cancelled: { label: "Cancelled", bg: "bg-gray-50",   text: "text-gray-500",   border: "border-gray-200",   dot: "bg-gray-400"  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function BookingCard({ booking, onCancel }) {
  const [cancelling, setCancelling] = useState(false);

  const workshop = booking.workshopId;
  const date     = new Date(booking.scheduledDate);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      await onCancel(booking._id);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="bg-white rounded-2xl border border-[#E0D8C8] overflow-hidden shadow-card"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image strip */}
        <div className="sm:w-36 flex-shrink-0 h-28 sm:h-auto bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900 relative">
          <div className="absolute bottom-2 left-2">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-copper mb-1">
                Workshop Booking
              </p>
              <h3 className="font-display font-bold text-lg text-ink leading-snug">
                {workshop?.title || "Workshop"}
              </h3>
              <p className="font-body text-sm text-ink-muted mt-0.5">
                with {workshop?.artisanId?.name || "Artisan"}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-mono text-[9px] text-ink-light uppercase tracking-wider">Ref</p>
              <p className="font-mono text-xs font-bold text-ink">
                KHJ-{booking._id?.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-ink-muted">
              <Calendar size={13} className="text-copper" />
              <span className="font-body text-xs">
                {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-ink-muted">
              <Users size={13} className="text-copper" />
              <span className="font-body text-xs">{booking.participants} {booking.participants === 1 ? "person" : "people"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-ink-muted">
              <MapPin size={13} className="text-copper" />
              <span className="font-body text-xs">{workshop?.location || "Nepal"}</span>
            </div>
          </div>

          {/* Artisan note */}
          {booking.artisanNote && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                Artisan Note
              </p>
              <p className="font-body text-xs text-amber-800">{booking.artisanNote}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1 border-t border-[#F0EDE8]">
            <Link
              to={`/bookings/${booking._id}`}
              className="font-body text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1"
            >
              View Details <ChevronRight size={12} />
            </Link>
            {(booking.status === "pending" || booking.status === "confirmed") && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="ml-auto flex items-center gap-1.5 font-body text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
              >
                {cancelling
                  ? <Loader size={12} className="animate-spin" />
                  : <X size={12} />
                }
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const FILTER_TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [filter,   setFilter]   = useState("all");

  // Fetch real bookings from backend
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.data || []);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: "cancelled" } : b)
      );
    } catch (err) {
      setError(getApiError(err));
    }
  };

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  // Counts for tabs
  const counts = FILTER_TABS.reduce((acc, f) => {
    acc[f] = f === "all" ? bookings.length : bookings.filter(b => b.status === f).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
      <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-12 space-y-8">

        {/* Header */}
        <div className="space-y-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
            My Account
          </p>
          <h1 className="font-display font-bold text-4xl text-ink">My Bookings</h1>
          <p className="font-body text-sm text-ink-muted">
            Track and manage all your workshop reservations.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total",     value: counts.all,       color: "text-ink" },
            { label: "Upcoming",  value: counts.confirmed,  color: "text-green-600" },
            { label: "Pending",   value: counts.pending,    color: "text-amber-600" },
            { label: "Completed", value: counts.completed,  color: "text-blue-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-[#E0D8C8] p-4 text-center">
              <p className={`font-display font-bold text-3xl ${color}`}>{value}</p>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs font-bold uppercase tracking-wider transition-all
                ${filter === f
                  ? "bg-primary border-primary text-white"
                  : "border-[#E0D8C8] bg-white text-ink-muted hover:border-primary hover:text-primary"
                }`}
            >
              {f === "all" ? "All" : f}
              {counts[f] > 0 && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${filter === f ? "bg-white/20" : "bg-[#F0EDE8]"}`}>
                  {counts[f]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-ink-muted">
              <Loader size={20} className="animate-spin text-copper" />
              <span className="font-body text-sm">Loading your bookings…</span>
            </div>
          </div>
        )}

        {/* Bookings list */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <p className="text-5xl opacity-20">📋</p>
                <p className="font-display font-bold text-2xl text-ink-muted">
                  {filter === "all" ? "No bookings yet" : `No ${filter} bookings`}
                </p>
                <p className="font-body text-sm text-ink-light">
                  {filter === "all"
                    ? "Start exploring workshops and book your first cultural experience."
                    : "Try a different filter to see other bookings."}
                </p>
                {filter === "all" && (
                  <Link
                    to="/workshops"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary text-white font-display font-bold text-sm rounded-xl hover:bg-primary-light transition-colors"
                  >
                    Browse Workshops <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((booking, i) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onCancel={cancelBooking}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}