import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Users, MapPin, Tag, ArrowRight, Home } from "lucide-react";

export default function BookingConfirmedPage() {
  const location = useLocation();
  const booking  = location.state || {
    workshop:     "Thangka Painting Workshop",
    artisan:      "Pema Dorje",
    date:         "Friday, 16 May 2025",
    time:         "9:00 AM – 12:00 PM",
    participants: 2,
    expType:      "Shared Group",
    total:        7000,
    location:     "Boudhanath, Kathmandu",
  };

  // Generate a booking reference
  const ref = `KHJ-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: "#FAF7F2" }}>
      <div className="w-full max-w-xl">

        {/* Success animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8 space-y-2"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
            Booking Confirmed
          </p>
          <h1 className="font-display font-bold text-4xl text-ink">
            You're all set!
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Your workshop seat is reserved. A confirmation email has been sent to you.
          </p>
        </motion.div>

        {/* Confirmation card — ticket style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl overflow-hidden shadow-ledger border border-[#E0D8C8]"
        >
          {/* Top colored strip */}
          <div className="h-2 bg-primary" />

          <div className="p-8 space-y-6">
            {/* Workshop title */}
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                Workshop
              </p>
              <h2 className="font-display font-bold text-2xl text-ink">{booking.workshop}</h2>
              <p className="font-body text-sm text-ink-muted">with {booking.artisan}</p>
            </div>

            {/* Divider with hole punches */}
            <div className="relative flex items-center gap-0">
              <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E0D8C8] -ml-8" />
              <div className="flex-1 border-t-2 border-dashed border-[#E0D8C8]" />
              <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E0D8C8] -mr-8" />
            </div>

            {/* Booking details grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { Icon: Calendar, label: "Date",             value: booking.date },
                { Icon: Clock,    label: "Time",             value: booking.time },
                { Icon: Users,    label: "Participants",     value: `${booking.participants} ${booking.participants === 1 ? "Person" : "People"}` },
                { Icon: Tag,      label: "Experience Type",  value: booking.expType },
                { Icon: MapPin,   label: "Location",         value: booking.location },
                { Icon: Tag,      label: "Booking Ref",      value: ref },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-copper flex-shrink-0" />
                    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-light">
                      {label}
                    </p>
                  </div>
                  <p className="font-display font-bold text-sm text-ink">{value}</p>
                </div>
              ))}
            </div>

            {/* Total amount info */}
            <div className="rounded-xl bg-[#FDF7EE] border border-copper/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light">
                    Total Amount
                  </p>
                  <p className="font-body text-xs text-ink-muted mt-1">
                    No payment required upfront. Amount is collected at the workshop.
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-2xl text-primary">
                    NPR {booking.total.toLocaleString()}
                  </p>
                  <p className="font-body text-[10px] text-ink-light">Pay at venue</p>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-green-600" />
                <span className="font-display font-bold text-sm text-green-700">Booking Pending Artisan Confirmation</span>
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-100 text-green-700">
                Pending
              </span>
            </div>

            <p className="font-body text-xs text-ink-muted text-center leading-relaxed">
              The artisan will review your request and confirm within 24 hours. You'll receive an update via email.
            </p>
          </div>

          {/* Bottom mountain cut */}
          <svg viewBox="0 0 600 30" className="w-full block" style={{ marginTop: -1 }} preserveAspectRatio="none">
            <path
              d="M0 0 L0 30 L600 30 L600 0 L575 18 L550 0 L525 18 L500 0 L475 18 L450 0 L425 18 L400 0 L375 18 L350 0 L325 18 L300 0 L275 18 L250 0 L225 18 L200 0 L175 18 L150 0 L125 18 L100 0 L75 18 L50 0 L25 18 L0 0Z"
              fill="#FAF7F2"
            />
          </svg>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Link
            to="/bookings"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-display font-bold text-sm rounded-xl hover:bg-primary-light transition-colors"
          >
            View My Bookings <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border border-[#E0D8C8] bg-white text-ink font-display font-bold text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
          >
            <Home size={16} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}