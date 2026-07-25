import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Lock, Shield, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { authAPI, getApiError } from "../../services/api";

function Polaroid({ gradient, caption, rotation, className }) {
  return (
    <div className={`hidden lg:block absolute ${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-50"
        style={{ background: rotation > 0 ? "#A89070" : "#C4A882" }}
      />
      <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3 pb-8 w-44">
        <div className={`w-full h-36 bg-gradient-to-br ${gradient}`} />
        <p className="font-serif italic text-[11px] text-[#6D4C41] text-center mt-2">{caption}</p>
      </div>
    </div>
  );
}

function PwInput({ icon: Icon, label, placeholder, reg, error, show, onToggle }) {
  return (
    <div className="space-y-2">
      <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#6D4C41] block">
        {label}
      </label>
      <div className="flex items-center gap-3 border-b border-[#C8B898] focus-within:border-[#873415] pb-2 transition-colors">
        <Icon size={14} className="text-[#A08060] flex-shrink-0" strokeWidth={1.5} />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="new-password"
          className="flex-1 bg-transparent font-body text-sm text-[#3E2723] placeholder-[rgba(62,39,35,0.28)] focus:outline-none"
          {...reg}
        />
        <button type="button" onClick={onToggle} className="text-[#A08060] hover:text-[#873415] transition-colors flex-shrink-0">
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      {error && (
        <p className="flex items-center gap-1 font-body text-[11px] text-red-500">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const pw = watch("password", "");

  const onSubmit = async (data) => {
    setApiError("");
    if (!token) {
      setApiError("Invalid reset link. Please request a new one.");
      return;
    }
    try {
      await authAPI.resetPassword({ token, password: data.password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setApiError(getApiError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#F5EDD8" }}>
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#873415,#873415 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#873415,#873415 1px,transparent 1px,transparent 40px)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20">
        <Link to="/" className="font-display font-bold text-2xl tracking-[-1px] text-[#873415]">
          KHOJ
        </Link>
        <Link to="/login" className="flex items-center gap-2 font-body text-sm text-[#6D4C41] hover:text-[#873415] transition-colors">
          <ArrowLeft size={14} /> Return to Trails
        </Link>
      </div>
      <Polaroid gradient="from-gray-700 via-gray-600 to-gray-800" caption="Ancient Gateways" rotation={-4} className="left-[7%] top-1/2 -translate-y-1/2" />
      <Polaroid gradient="from-gray-300 via-gray-200 to-gray-400" caption="Temple of Reflection" rotation={3} className="right-[7%] top-1/2 -translate-y-1/2" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="flex justify-center mb-0">
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-[2px] px-4 py-1.5 relative z-10"
            style={{ background: "#8B6914", color: "#F5EDD8" }}
          >
            Confidential
          </span>
        </div>
        <div className="bg-[#EDE4CC] border border-[#C8B898] rounded-xl p-10 shadow-[0_25px_60px_rgba(0,0,0,0.15)] space-y-8 -mt-1">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
              </div>
              <h2 className="font-display font-bold text-2xl text-[#873415]">Password Updated!</h2>
              <p className="font-serif italic text-sm text-[#6D4C41] leading-relaxed">
                Your record has been secured. Redirecting you to sign in…
              </p>
              <div className="w-8 h-8 border-2 border-[#873415]/30 border-t-[#873415] rounded-full animate-spin mx-auto" />
            </motion.div>
          ) : (
            <>
              <div className="space-y-2">
                <h1 className="font-display font-bold text-3xl text-[#873415]">Change password</h1>
                <p className="font-serif italic text-sm text-[#6D4C41] leading-relaxed">
                  Lost trails are found by looking within. Choose a new passage to secure your journey.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <PwInput
                  icon={Lock}
                  label="New Password"
                  placeholder="••••••••"
                  show={showPw}
                  onToggle={() => setShowPw((v) => !v)}
                  reg={register("password", {
                    required: "New password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                  })}
                  error={errors.password?.message}
                />
                <PwInput
                  icon={Shield}
                  label="Confirm Password"
                  placeholder="••••••••"
                  show={showCPw}
                  onToggle={() => setShowCPw((v) => !v)}
                  reg={register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === pw || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                />
                {apiError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
                    <p className="font-body text-xs text-red-600">{apiError}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#873415] text-white font-display font-bold text-base rounded-xl flex items-center justify-center gap-3 hover:bg-[#6d2a11] transition-colors disabled:opacity-60 shadow-[0_4px_14px_rgba(135,52,21,0.35)]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating…
                    </>
                  ) : (
                    <><Shield size={17} /> Update My Record</>
                  )}
                </button>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[1px] text-[#A08060] text-center leading-relaxed">
                  By updating, you verify your identity as the keeper of these heritage logs.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}