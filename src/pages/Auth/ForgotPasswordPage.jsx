import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { authAPI, getApiError } from "../../services/api";

function TornBottom() {
  return (
    <svg viewBox="0 0 320 24" className="w-full block" style={{ marginTop: -1 }}>
      <path
        d="M0 0 L0 12 L10 0 L20 12 L30 0 L40 12 L50 0 L60 12 L70 0 L80 12
           L90 0 L100 12 L110 0 L120 12 L130 0 L140 12 L150 0 L160 12
           L170 0 L180 12 L190 0 L200 12 L210 0 L220 12 L230 0 L240 12
           L250 0 L260 12 L270 0 L280 12 L290 0 L300 12 L310 0 L320 12
           L320 24 L0 24Z"
        fill="#8FA89A"
      />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setApiError("");
    try {
      await authAPI.forgotPassword({ email: data.email });
      setSent(true);
    } catch (err) {
      setApiError(getApiError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img
        src="/bg-auth.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#F5EDD8]/30" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="absolute -top-3 left-6 z-20">
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-[2px] px-3 py-1"
            style={{ background: "#8FA89A", color: "#F5EDD8" }}
          >
            Recovery Path
          </span>
        </div>
        <div className="rounded-t-lg overflow-hidden" style={{ background: "#8FA89A" }}>
          <div className="px-8 pt-10 pb-7 space-y-6">
            <div className="text-center space-y-0.5">
              <Link to="/">
                <h1 className="font-display font-bold text-[2rem] tracking-[-1px]" style={{ color: "#2C1810" }}>
                  KHOJ
                </h1>
              </Link>
              <p className="font-mono text-[9px] uppercase tracking-[3px] opacity-55" style={{ color: "#2C1810" }}>
                Recover your passage
              </p>
            </div>

            {sent ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-2">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                </div>
                <p className="font-display font-bold text-base" style={{ color: "#2C1810" }}>
                  Reset link sent!
                </p>
                <p className="font-body text-xs leading-relaxed opacity-70" style={{ color: "#2C1810" }}>
                  If <strong>{getValues("email")}</strong> exists in our records, a link has been dispatched.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#873415] hover:text-[#6d2a11] transition-colors"
                >
                  <ArrowLeft size={12} /> Return to sign in
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <p className="font-body text-xs leading-relaxed opacity-60 text-center" style={{ color: "#2C1810" }}>
                  Enter your email and we'll send a reset link.
                </p>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#5C4A3A] block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 border-b border-[rgba(92,74,58,0.3)] focus-within:border-[#873415] transition-colors">
                    <Mail size={13} className="text-[rgba(92,74,58,0.45)] flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="flex-1 bg-transparent py-2.5 font-body text-sm text-[#3E2723] placeholder-[rgba(62,39,35,0.3)] focus:outline-none"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="flex items-center gap-1 font-body text-[11px] text-red-500">
                      <AlertCircle size={10} /> {errors.email.message}
                    </p>
                  )}
                </div>
                {apiError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
                    <p className="font-body text-xs text-red-600">{apiError}</p>
                  </div>
                )}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#873415] text-white font-mono font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-[#6d2a11] transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={14} /> Send Reset Link</>
                    )}
                  </button>
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 font-body text-xs opacity-55 hover:opacity-90 transition-opacity"
                      style={{ color: "#2C1810" }}
                    >
                      <ArrowLeft size={11} /> Back to sign in
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
          <TornBottom />
        </div>
      </motion.div>
    </div>
  );
}