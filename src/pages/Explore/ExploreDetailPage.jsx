import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Bookmark, BookmarkCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AppContext";

// Storytelling data per slug
const STORIES = {
  "newari-community": {
    type: "ETHNIC COMMUNITY",
    title: "Newari Community",
    subtitle: "The Heartbeat of the Kathmandu Valley",
    location: "Kathmandu Valley",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    pullQuote: "Every courtyard is a temple. Every festival a chapter. Every meal a ritual.",
    sections: [
      {
        heading: "Who Are the Newars?",
        body: "The Newars are the original inhabitants of the Kathmandu Valley, Nepal's cultural and economic heartland. For over a thousand years, they built the valley's iconic pagoda temples, brick-lined courtyards, and elaborate water systems — all of which still stand today as living monuments to their ingenuity.",
        image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
      },
      {
        heading: "A Culture Written in Wood and Stone",
        body: "Newari woodcarving is not decoration — it is theology. Every deity, floral motif, and mythical creature carved into the struts of a pagoda temple tells a sacred story. The craft reached its zenith during the Malla period (1201–1768 AD) and continues today in the workshops of Patan and Bhaktapur.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      },
      {
        heading: "The Festival Calendar",
        body: "The Newari year is structured around festivals — Indra Jatra, Biska Jatra, Mohani, Sithi Nakha, and dozens more. Each one involves elaborate processions, living goddess traditions, and communal feasting that pull the entire community into a shared ritual space.",
      },
      {
        heading: "Food as Sacred Language",
        body: "Samay Baji — the quintessential Newari feast — is not just food. It is a ritual offering, a family bonding ceremony, and a historical document. The beaten rice, dried meats, boiled eggs, and spiced vegetables have remained essentially unchanged for centuries.",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
      },
    ],
    relatedItems: [
      { title: "Paubha Sacred Painting", to: "/explore/paubha-painting", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
      { title: "Biska Jatra Festival",   to: "/explore/biska-jatra",    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80" },
      { title: "Samay Baji Feast",       to: "/explore/samay-baji",     image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
    ],
  },
  "thakali-kitchen": {
    type: "FOOD EXPERIENCE",
    title: "Thakali Kitchen Experience",
    subtitle: "Mountain Hospitality on a Plate",
    location: "Mustang",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&q=85",
    pullQuote: "A Thakali meal is not served — it is offered. There is a difference.",
    sections: [
      {
        heading: "The Thakali People of Mustang",
        body: "The Thakali people have inhabited the Kali Gandaki Valley for centuries, developing a unique culture at the crossroads of Tibetan and Hindu influences. Their traditional occupation as traders along the ancient salt route gave them a cosmopolitan sophistication rare in mountain communities.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      },
      {
        heading: "The Famous Thakali Set",
        body: "Dal bhat in the Thakali tradition is elevated to an art form. Served with multiple vegetable preparations, pickles, and the distinctive Mustang apple cider, the Thakali set reflects the valley's unique ecology and the community's mastery of preservation techniques developed for long mountain winters.",
      },
      {
        heading: "Hospitality as Culture",
        body: "The Thakali concept of hospitality — Dhikur — extends beyond the meal to a community-based mutual support system. Guests are considered sacred, and the kitchen is the spiritual centre of the home.",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
      },
    ],
    relatedItems: [
      { title: "Hidden Village of Phu",  to: "/explore/village-phu",    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80" },
      { title: "Monastery Sounds",       to: "/explore/monastery-sounds", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
    ],
  },
};

// Default story for slugs without specific content
const DEFAULT_STORY = (slug) => ({
  type: "HERITAGE",
  title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
  subtitle: "A Living Heritage Story",
  location: "Nepal",
  readTime: "4 min read",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
  pullQuote: "Nepal reveals everything, if you know how to ask.",
  sections: [
    {
      heading: "The Story",
      body: "This is one of Nepal's many living heritage traditions — a thread in the rich tapestry of culture, craft, and community that makes this country unlike anywhere else on earth.",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    },
  ],
  relatedItems: [],
});

export default function ExploreDetailPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);

  const story = STORIES[slug] || DEFAULT_STORY(slug);

  const handleSave = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    setBookmarked(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Full-width hero image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-mono text-xs uppercase tracking-wider hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={14}/> Back
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-mono text-xs uppercase tracking-wider hover:bg-white/30 transition-colors"
        >
          {bookmarked ? <BookmarkCheck size={14}/> : <Bookmark size={14}/>}
          {bookmarked ? "Saved" : "Save"}
        </button>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-3"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-white/60">
              {story.type}
            </span>
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-white leading-tight">
              {story.title}
            </h1>
            <p className="font-serif italic text-lg text-white/80">{story.subtitle}</p>
            <div className="flex items-center gap-4 text-white/60">
              <div className="flex items-center gap-1.5">
                <MapPin size={13}/>
                <span className="font-body text-sm">{story.location}</span>
              </div>
              <span className="font-mono text-xs">{story.readTime}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-l-4 border-primary pl-6"
        >
          <p className="font-serif italic text-2xl text-ink leading-relaxed">
            {story.pullQuote}
          </p>
        </motion.blockquote>

        {/* Sections */}
        {story.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="font-display font-bold text-3xl text-ink">{section.heading}</h2>
            <p className="font-body text-base text-ink-muted leading-loose">{section.body}</p>

            {section.image && (
              <div className="overflow-hidden">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Save CTA */}
        <div className="border border-[#E8E2D8] bg-[#F5F0E8] p-8 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display font-bold text-lg text-ink">Save this story</p>
            <p className="font-body text-sm text-ink-muted">Add to your collection and revisit anytime.</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider transition-colors
              ${bookmarked
                ? "bg-green-600 text-white"
                : "bg-primary text-white hover:bg-primary-light"
              }`}
          >
            {bookmarked ? <><BookmarkCheck size={14}/> Saved</> : <><Bookmark size={14}/> Save to Collection</>}
          </button>
        </div>
      </div>

      {/* Related */}
      {story.relatedItems.length > 0 && (
        <section className="border-t border-[#E8E2D8] py-16 px-6 lg:px-20" style={{ background: "#F0EAD8" }}>
          <div className="max-w-screen-xl mx-auto space-y-8">
            <h2 className="font-display font-bold text-3xl text-ink">Continue Exploring</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {story.relatedItems.map((rel, i) => (
                <Link key={i} to={rel.to}
                  className="group bg-white border border-[#E8E2D8] overflow-hidden hover:-translate-y-0.5 transition-all duration-300 shadow-card">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <p className="font-display font-bold text-sm text-ink group-hover:text-primary transition-colors">
                      {rel.title}
                    </p>
                    <ArrowRight size={14} className="text-copper flex-shrink-0"/>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}