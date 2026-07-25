import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Social SVG icons (lucide-react 0.383 doesn't have Instagram/Facebook)
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
import { useState } from 'react'

const DISCOVER_LINKS = [
  { label: 'About Us',       to: '/about' },
  { label: 'Archives',       to: '/explore' },
  { label: 'Community',      to: '/explore?type=community' },
  { label: 'Journeys',       to: '/journeys' },
]
const LEGAL_LINKS = [
  { label: 'Privacy Policy',     to: '/privacy' },
  { label: 'Terms of Use',       to: '/terms' },
  { label: 'Responsible Travel', to: '/responsible-travel' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-cream-warm relative overflow-hidden">

      {/* Torn paper top edge */}
      <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
        <svg viewBox="0 0 1200 16" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 16 Q25 0 50 16 Q75 0 100 16 Q125 0 150 16 Q175 0 200 16 Q225 0 250 16 Q275 0 300 16 Q325 0 350 16 Q375 0 400 16 Q425 0 450 16 Q475 0 500 16 Q525 0 550 16 Q575 0 600 16 Q625 0 650 16 Q675 0 700 16 Q725 0 750 16 Q775 0 800 16 Q825 0 850 16 Q875 0 900 16 Q925 0 950 16 Q975 0 1000 16 Q1025 0 1050 16 Q1075 0 1100 16 Q1125 0 1150 16 Q1175 0 1200 16 Z"
            fill="#FFF9ED" />
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-20 pb-8">

        {/* ── Main Footer Grid ── */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-12">

          {/* Brand */}
          <div className="lg:max-w-sm space-y-6">
            <div>
              <h2 className="font-display font-extrabold text-7xl leading-none text-primary tracking-tight">
                KHOJ
              </h2>
              <p className="font-body text-base leading-relaxed text-primary opacity-80 mt-4 max-w-xs">
                Preserving the Living Heritage of Nepal through community-led exploration and intelligent documentation.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a href="#" aria-label="Instagram"
                className="text-primary hover:text-copper transition-colors">
                <InstagramIcon/>
              </a>
              <a href="#" aria-label="Facebook"
                className="text-primary hover:text-copper transition-colors">
                <FacebookIcon/>
              </a>
              <a href="#" aria-label="Email"
                className="text-primary hover:text-copper transition-colors">
                <MailIcon/>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="flex gap-16 lg:gap-24">
            {/* Discover */}
            <div className="space-y-6">
              <h5 className="font-mono font-bold text-sm uppercase tracking-[3px] text-primary">
                Discover
              </h5>
              <ul className="space-y-4">
                {DISCOVER_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to}
                      className="font-body text-lg text-sage-dark hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h5 className="font-mono font-bold text-sm uppercase tracking-[3px] text-primary">
                Legal
              </h5>
              <ul className="space-y-4">
                {LEGAL_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to}
                      className="font-body text-lg text-sage-dark hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4 max-w-[260px]">
              <h5 className="font-mono font-bold text-sm uppercase tracking-[3px] text-primary">
                Newsletter
              </h5>
              <p className="font-body text-sm text-sage-dark opacity-70 leading-relaxed">
                Stories, festivals & cultural finds — delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe}
                className="border-b-2 border-[rgba(74,93,78,0.3)] pb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email..."
                    className="flex-1 bg-transparent font-body text-base text-ink placeholder-gray-400 focus:outline-none"
                    required
                  />
                  <button type="submit"
                    className="text-primary hover:text-copper transition-colors flex-shrink-0">
                    <ArrowRight size={20}/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-[rgba(74,93,78,0.1)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 opacity-60">
          <p className="font-mono text-xs text-sage-dark">
            © 2026 KHOJ. Preserving the soul of Nepal.
          </p>
          <div className="flex items-center gap-8">
            <span className="font-mono text-xs text-sage-dark">Privacy Policy</span>
            <span className="font-mono text-xs text-sage-dark">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  )
}