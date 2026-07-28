// Footer — only implemented pages, seamless torn edge transition, no Journeys
import { Link } from "react-router-dom";

const LINKS = {
  Discover: [
    { label: "Explore", to: "/explore" },
    { label: "Workshops", to: "/workshops" },
    { label: "AI Compass", to: "/ai/compass" },
    { label: "Journey Builder", to: "/ai/journey-builder" },
    { label: "About", to: "/about" },
  ],
  Account: [
    { label: "My Profile", to: "/profile" },
    { label: "My Bookings", to: "/bookings" },
    { label: "Collections", to: "/collections" },
    { label: "Journal", to: "/journal" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "#" },
    { label: "Terms of Use", to: "#" },
    { label: "Cookie Policy", to: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      // Seamless torn edge — uses the sage background colour matching the section above
      // The SVG colour must match the section above the footer (sage #B7B9A2)
      <div style={{ background: "#B7B9A2", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", marginBottom: -1 }}
        >
          <path
            d="M0 48 L0 24
               Q24 6  48 18  Q72 30  96 18
               Q120 6 144 18 Q168 30 192 18
               Q216 6 240 18 Q264 30 288 18
               Q312 6 336 18 Q360 30 384 18
               Q408 6 432 18 Q456 30 480 18
               Q504 6 528 18 Q552 30 576 18
               Q600 6 624 18 Q648 30 672 18
               Q696 6 720 18 Q744 30 768 18
               Q792 6 816 18 Q840 30 864 18
               Q888 6 912 18 Q936 30 960 18
               Q984 6 1008 18 Q1032 30 1056 18
               Q1080 6 1104 18 Q1128 30 1152 18
               Q1176 6 1200 18 Q1224 30 1248 18
               Q1272 6 1296 18 Q1320 30 1344 18
               Q1368 6 1392 18 Q1416 30 1440 18
               L1440 48 Z"
            fill="#EBE2C8"
          />
        </svg>
      </div>

      // Footer body
      <footer style={{ background: "#EBE2C8" }} className="px-6 lg:px-16 pt-14 pb-10">
        <div className="max-w-screen-xl mx-auto">

          // Top row — logo + columns
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-[#D7CCB3]">

            // Brand
            <div className="flex-shrink-0 space-y-4">
              <Link to="/" className="font-display font-bold text-3xl text-primary tracking-tight">
                KHOJ
              </Link>
              <p className="font-body text-xs text-ink-muted leading-relaxed max-w-xs">
                An AI-powered cultural discovery platform connecting you to the living heritage of Nepal — crafts, food, festivals, music, and the communities that carry them.
              </p>
              // Barcode decoration
              <div className="flex items-end gap-0.5 mt-4 opacity-30">
                {[3,5,2,4,3,6,2,5,3,4,2,5,3,4,5,2,4,3].map((h, i) => (
                  <div key={i} style={{ width: 2, height: h * 4, background: "#59200F" }} />
                ))}
              </div>
            </div>

            // Nav columns
            <div className="flex-1 grid grid-cols-3 gap-8">
              {Object.entries(LINKS).map(([col, items]) => (
                <div key={col} className="space-y-4">
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                    {col}
                  </h3>
                  <ul className="space-y-2.5">
                    {items.map(({ label, to }) => (
                      <li key={label}>
                        <Link
                          to={to}
                          className="font-body text-sm text-ink-muted hover:text-primary transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          // Bottom row
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-ink-light uppercase tracking-widest">
              {year} KHOJ. Preserving Nepal's Living Heritage.
            </p>
            <p className="font-mono text-[10px] text-ink-light uppercase tracking-widest">
              Built with care in Kathmandu.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}