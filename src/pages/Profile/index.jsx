import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AppContext";
import { User, Mail, BookOpen, MapPin, Calendar, AlertCircle, CheckCircle, Loader } from "lucide-react";
import api, { getApiError } from "../../services/api";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing,  setEditing]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccess(false);
    try {
      const res = await api.patch("/auth/me", { name: data.name });
      if (typeof setUser === "function") setUser(res.data.data);
      setSuccess(true);
      setEditing(false);
    } catch (err) {
      setApiError(getApiError(err));
    }
  };

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: "#FAF7F2" }}>
      <div className="max-w-screen-md mx-auto space-y-6">

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-card"
        >
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-primary via-copper to-amber-700 relative">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-10 mb-4 flex items-end justify-between">
              <div className="w-20 h-20 rounded-full bg-primary border-4 border-white shadow-pin flex items-center justify-center">
                <span className="font-display font-bold text-3xl text-white">{initial}</span>
              </div>
              <button
                onClick={() => setEditing(v => !v)}
                className="px-4 py-2 border border-[#E0D8C8] rounded-lg font-mono text-xs uppercase tracking-wider text-ink-muted hover:border-primary hover:text-primary transition-colors"
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* User info */}
            {!editing ? (
              <div className="space-y-3">
                <div>
                  <h1 className="font-display font-bold text-2xl text-ink">{user?.name}</h1>
                  <p className="font-mono text-xs uppercase tracking-widest text-copper mt-0.5">{user?.role}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Mail size={14} className="text-copper" />
                    <span className="font-body text-sm">{user?.email}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full border border-[#E0D8C8] rounded-xl px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-copper transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    disabled
                    className="w-full border border-[#E0D8C8] rounded-xl px-4 py-3 font-body text-sm text-ink-light bg-[#F5F0E8] cursor-not-allowed"
                  />
                  <p className="font-body text-xs text-ink-light">Email cannot be changed.</p>
                </div>
                {apiError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={13} className="text-red-500" />
                    <p className="font-body text-xs text-red-600">{apiError}</p>
                  </div>
                )}
                <button type="submit" disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? <><Loader size={13} className="animate-spin" /> Saving…</> : "Save Changes"}
                </button>
              </form>
            )}

            {success && (
              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle size={13} className="text-green-600" />
                <p className="font-body text-xs text-green-700">Profile updated successfully.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { Icon: BookOpen, label: "My Journal",    to: "/journal",     color: "text-amber-600",  bg: "bg-amber-50" },
            { Icon: MapPin,   label: "My Journeys",   to: "/journeys",    color: "text-teal-600",   bg: "bg-teal-50" },
            { Icon: Calendar, label: "My Bookings",   to: "/bookings",    color: "text-blue-600",   bg: "bg-blue-50" },
            { Icon: User,     label: "Collections",   to: "/collections", color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ Icon, label, to, color, bg }) => (
            <Link key={label} to={to}
              className="bg-white rounded-xl border border-[#E8E2D8] p-5 flex flex-col items-center gap-3 hover:border-primary hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
              <span className="font-display font-bold text-sm text-ink text-center">{label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Account section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-4 shadow-card"
        >
          <h2 className="font-display font-bold text-lg text-ink">Account</h2>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-[#F0EDE8]">
              <div>
                <p className="font-body text-sm text-ink">Password</p>
                <p className="font-body text-xs text-ink-muted">Change your account password</p>
              </div>
              <Link to="/forgot-password"
                className="font-mono text-xs uppercase tracking-wider text-copper hover:text-primary transition-colors">
                Change
              </Link>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-body text-sm text-ink">Account Role</p>
                <p className="font-body text-xs text-ink-muted capitalize">{user?.role} account</p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {user?.role}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}