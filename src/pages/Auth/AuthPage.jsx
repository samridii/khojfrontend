import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { authAPI, getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";

function TornPaperBottom() {
  return (
    <svg
      viewBox="0 0 600 40"
      className="w-full block"
      style={{ marginTop: -1, display: "block" }}
      preserveAspectRatio="none"
    >
      <path
        d="M0 0 L0 50 L600 50 L600 0
           L575 30 L550 0 L525 30 L500 0
           L475 30 L450 0 L425 30 L400 0
           L375 30 L350 0 L325 30 L300 0
           L275 30 L250 0 L225 30 L200 0
           L175 30 L150 0 L125 30 L100 0
           L75 30 L50 0 L25 30 L0 0Z"
        fill="#EDE2CF"
      />
    </svg>
  );
}

function AuthInput({ label, type = "text", placeholder, reg, error, showToggle, show, onToggle }) {
  return (
    <div className="space-y-2">
      <label className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#5C4A3A] block">
        {label}
      </label>
      <div className="relative border-b border-[rgba(92,74,58,0.25)] focus-within:border-[#873415] transition-colors pb-1">
        <input
          type={showToggle ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          autoComplete={
            type === "password" ? "new-password"
            : type === "email" ? "email"
            : "off"
          }
          className="w-full bg-transparent py-2 pr-8 font-body text-sm text-[#3E2723] placeholder-[rgba(62,39,35,0.3)] focus:outline-none"
          {...reg}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[rgba(92,74,58,0.4)] hover:text-[#873415] transition-colors"
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 font-body text-[11px] text-red-500">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [showPw, setShowPw] = useState(false);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await authAPI.login({ email: data.email, password: data.password });
      onSuccess(res.data);
    } catch (err) {
      setApiError(getApiError(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AuthInput
        label="Username or Email"
        type="email"
        placeholder="email@heritage.com"
        reg={register("email", {
          required: "Email is required",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
        })}
        error={errors.email?.message}
      />
      <AuthInput
        label="Password"
        placeholder="••••••••"
        showToggle
        show={showPw}
        onToggle={() => setShowPw(v => !v)}
        reg={register("password", { required: "Password is required" })}
        error={errors.password?.message}
      />
      {apiError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200">
          <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
          <p className="font-body text-xs text-red-600">{apiError}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#873415] text-white font-mono font-bold text-sm uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-[#6d2a11] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ clipPath: "polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)" }}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in…
          </>
        ) : (
          <>Sign In <ArrowRight size={15} /></>
        )}
      </button>
      <div className="text-center">
        <Link
          to="/forgot-password"
          className="font-mono text-[10px] uppercase tracking-widest text-[rgba(92,74,58,0.55)] hover:text-[#873415] transition-colors"
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

function SignupForm({ onSuccess }) {
  const [showPw,   setShowPw]   = useState(false);
  const [showCPw,  setShowCPw]  = useState(false);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const pw = watch("password", "");

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await authAPI.register({
        name:     data.name,
        email:    data.email,
        password: data.password,
      });
      onSuccess(res.data);
    } catch (err) {
      setApiError(getApiError(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AuthInput
        label="Username"
        placeholder="Enter a unique username"
        reg={register("name", {
          required: "Name is required",
          minLength: { value: 2, message: "At least 2 characters" },
        })}
        error={errors.name?.message}
      />
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="email@khoj.np"
        reg={register("email", {
          required: "Email is required",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
        })}
        error={errors.email?.message}
      />
      <AuthInput
        label="Password"
        placeholder="••••••••"
        showToggle
        show={showPw}
        onToggle={() => setShowPw(v => !v)}
        reg={register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
        })}
        error={errors.password?.message}
      />
      <AuthInput
        label="Confirm Password"
        placeholder="••••••••"
        showToggle
        show={showCPw}
        onToggle={() => setShowCPw(v => !v)}
        reg={register("confirmPassword", {
          required: "Please confirm your password",
          validate: v => v === pw || "Passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />

      {/* Terms and Conditions checkbox */}
      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#873415] cursor-pointer flex-shrink-0"
            {...register("terms", {
              required: "You must agree to the Terms and Conditions",
            })}
          />
          <span className="font-body text-xs text-[#5C4A3A] leading-relaxed">
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-[#873415] underline underline-offset-2 hover:text-[#6d2a11] transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Terms and Conditions
            </Link>
          </span>
        </label>
        {errors.terms && (
          <p className="flex items-center gap-1 font-body text-[11px] text-red-500 pl-7">
            <AlertCircle size={10} /> {errors.terms.message}
          </p>
        )}
      </div>

      {apiError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200">
          <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
          <p className="font-body text-xs text-red-600">{apiError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#873415] text-white font-mono font-bold text-sm uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-[#6d2a11] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ clipPath: "polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)" }}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating account…
          </>
        ) : (
          <>Sign Up <ArrowRight size={15} /></>
        )}
      </button>

      <p className="font-body text-[11px] text-[rgba(92,74,58,0.55)] text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#873415] hover:underline underline-offset-2">
          Sign in here
        </Link>
      </p>
    </form>
  );
}

export default function AuthPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const isSignup = location.pathname === "/signup";
  const [tab, setTab] = useState(isSignup ? "signup" : "login");

  const handleSuccess = ({ user, token }) => {
    login({ user, token });
    navigate(location.state?.from || "/", { replace: true });
  };

  const switchTab = (t) => {
    setTab(t);
    navigate(t === "signup" ? "/signup" : "/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background image from public folder */}
      <img
        src="/auth-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle warm overlay to keep card readable */}
      <div className="absolute inset-0 bg-[#F0E8D5]/25" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Official Ledger sticker */}
        <div className="absolute -top-1 right-6 z-20">
          <div
            className="font-mono text-[9px] font-bold uppercase tracking-[3px] px-5 py-2 shadow-md"
            style={{
              background: "#C8B898",
              color: "#3E2723",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 95% 100%, 5% 100%, 0 70%)",
            }}
          >
            Official Ledger
          </div>
        </div>

        {/* Card */}
        <div
          className="overflow-hidden shadow-ledger"
          style={{
            background: "linear-gradient(135deg, #D8DDD0 0%, #C8CFC0 50%, #D0D5C8 100%)",
          }}
        >
          {/* Card content */}
          <div className="px-10 pt-12 pb-8 space-y-7">

            {/* Logo */}
            <div className="text-center space-y-1">
              <h1
                className="font-display font-bold tracking-[-1px]"
                style={{ fontSize: "2.6rem", color: "#2C1810" }}
              >
                KHOJ
              </h1>
              <p
                className="font-mono text-[9px] uppercase tracking-[4px] opacity-50"
                style={{ color: "#2C1810" }}
              >
                {tab === "login"
                  ? "Sign in to explore Nepal deeply"
                  : "Sign up to explore Nepal deeply"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-10 border-b border-[rgba(62,39,35,0.15)]">
              {["login", "signup"].map(t => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className={`pb-3 font-mono text-xs font-bold uppercase tracking-widest -mb-px border-b-2 transition-all ${
                    tab === t
                      ? "border-[#2C1810] text-[#2C1810]"
                      : "border-transparent text-[rgba(44,24,16,0.35)] hover:text-[rgba(44,24,16,0.6)]"
                  }`}
                >
                  {t === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Animated form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "signup" ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tab === "signup" ? -12 : 12 }}
                transition={{ duration: 0.22 }}
              >
                {tab === "login"
                  ? <LoginForm onSuccess={handleSuccess} />
                  : <SignupForm onSuccess={handleSuccess} />
                }
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Torn paper bottom edge — blends into page background cream */}
          <TornPaperBottom />
        </div>
      </motion.div>
    </div>
  );
}