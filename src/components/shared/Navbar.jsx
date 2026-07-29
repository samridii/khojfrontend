import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, BookmarkIcon, User, Menu, X, LogOut, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AppContext";

const NAV_LEFT = [
  { label: "Home",     to: "/" },
  { label: "Explore",  to: "/explore" },
   { label: "Journeys", to: "/ai/journey-builder" },
  { label: "Journal",  to: "/journal" },
];

const NAV_RIGHT = [
  { label: "Workshops", to: "/workshops" },
  { label: "About Us",  to: "/about" },
];

export default function Navbar() {
  const [scrolled,     setScrolled]  = useState(false);
  const [search,       setSearch]    = useState("");
  const [mobileOpen,   setMobile]    = useState(false);
  const [userMenuOpen, setUserMenu]  = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/explore?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={{ background: "rgba(235,226,200,0.92)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-center justify-between px-8 lg:px-16 h-20 max-w-screen-2xl mx-auto">

        {/* Left Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LEFT.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-display font-semibold text-xs uppercase tracking-wider transition-colors duration-200 pb-1
                 ${isActive ? "text-primary border-b-2 border-sage" : "text-primary hover:text-copper"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <div className="relative flex items-center justify-center w-14 h-14">
            <span className="absolute inset-0 rounded-full border-2 border-gold opacity-20 scale-110" />
            <span className="absolute inset-0 rounded-full border-2 border-copper opacity-30" />
            <span className="font-display font-bold text-2xl text-primary tracking-tight leading-none select-none">
              खोज
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[3px] text-ink-light mt-0.5 opacity-70">
            discover nepal
          </span>
        </Link>

        {/* Right Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_RIGHT.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-display font-semibold text-xs uppercase tracking-wider transition-colors duration-200
                 ${isActive ? "text-copper" : "text-primary hover:text-copper"}`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative ml-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="w-44 h-8 pl-4 pr-8 rounded-full border border-[#D7CCB3] bg-[rgba(226,218,191,0.3)] font-display text-xs text-ink placeholder-gray-400 focus:outline-none focus:border-copper transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <Search size={13} className="text-primary" />
            </button>
          </form>

          {/* Collections icon — redirects to login if not authenticated */}
          <Link
            to={isAuthenticated ? "/collections" : "/login"}
            className="text-primary hover:text-copper transition-colors"
          >
            <BookmarkIcon size={18} />
          </Link>

          {/* Auth section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu((v) => !v)}
                className="flex items-center gap-2 text-primary hover:text-copper transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="font-display font-semibold text-xs uppercase tracking-wider hidden xl:block">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>

              {/* User dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-48 bg-white border border-[#D7CCB3] rounded-xl shadow-card overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-[#F0EDE8]">
                      <p className="font-display font-bold text-sm text-ink">{user?.name}</p>
                      <p className="font-body text-xs text-ink-muted truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-ink hover:bg-[#F5F0E8] transition-colors"
                      >
                        <User size={15} className="text-copper" /> My Profile
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-ink hover:bg-[#F5F0E8] transition-colors"
                      >
                        <ClipboardList size={15} className="text-copper" /> My Bookings
                      </Link>
                      <Link
                        to="/collections"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-ink hover:bg-[#F5F0E8] transition-colors"
                      >
                        <BookmarkIcon size={15} className="text-copper" /> Collections
                      </Link>
                      <div className="border-t border-[#F0EDE8] mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 font-body text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click outside closes dropdown */}
              {userMenuOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile icon redirects to login when not authenticated */}
              <Link to="/login" className="text-primary hover:text-copper transition-colors">
                <User size={20} />
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-primary-light transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-primary" onClick={() => setMobile((v) => !v)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-cream-warm border-t border-[#D7CCB3]"
          >
            <nav className="flex flex-col p-6 gap-4">
              {[...NAV_LEFT, ...NAV_RIGHT].map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobile(false)}
                  className="font-display font-semibold text-sm uppercase tracking-wider text-primary hover:text-copper transition-colors"
                >
                  {label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setMobile(false)}
                    className="font-display font-semibold text-sm uppercase tracking-wider text-primary hover:text-copper transition-colors"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/bookings"
                    onClick={() => setMobile(false)}
                    className="font-display font-semibold text-sm uppercase tracking-wider text-primary hover:text-copper transition-colors"
                  >
                    My Bookings
                  </NavLink>
                </>
              )}

              <div className="pt-2 border-t border-[#D7CCB3]">
                {isAuthenticated ? (
                  <button
                    onClick={() => { handleLogout(); setMobile(false); }}
                    className="font-mono text-xs uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobile(false)}
                    className="px-5 py-2 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg inline-block"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}