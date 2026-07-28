
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Map, Hammer } from "lucide-react";

const SLIDES = [
  {
    badge: "AI Feature 01",
    title: "AI Cultural\nCompass.",
    desc: "Navigate Nepal's living culture with purpose. Tell us your mood and interests, and the Compass finds 134 ethnic communities, crafts, foods, and festivals that speak to your soul.",
    primaryLabel: "Try the Compass",
    primaryTo: "/ai/compass",
    secondaryLabel: "Learn More",
    secondaryTo: "/about",
    Icon: Compass,
    accentImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    accentLabel: "Pashupatinath Temple",
    swatches: ["#4A90E2", "#FFFFFF", "#D85A30", "#2ECC71", "#F9BC50"],
  },
  {
    badge: "AI Feature 02",
    title: "Journey\nBuilder.",
    desc: "Tell us your duration, budget, and starting city. Our AI crafts a complete cultural itinerary — day by day, stop by stop — rooted in authentic Nepali heritage.",
    primaryLabel: "Build a Journey",
    primaryTo: "/ai/journey-builder",
    secondaryLabel: "See Example",
    secondaryTo: "/about",
    Icon: Map,
    accentImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    accentLabel: "Himalayan Trail",
    swatches: ["#873415", "#F9BC50", "#B7B9A2", "#2C1810", "#FFFFFF"],
  },
  {
    badge: "AI Feature 03",
    title: "Artisan\nWorkshops.",
    desc: "Book hands-on workshops directly with master craftspeople. Learn Thangka painting, Dhaka weaving, or Newari woodcarving from the people who carry these traditions.",
    primaryLabel: "Browse Workshops",
    primaryTo: "/workshops",
    secondaryLabel: "Meet Artisans",
    secondaryTo: "/artisans",
    Icon: Hammer,
    accentImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    accentLabel: "Patan Workshop",
    swatches: ["#2D6A4F", "#FFFFFF", "#A64B2A", "#F5F0E8", "#873415"],
  },
];

export default function AIFeaturesSection() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Sync active dot with scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActive(Math.min(idx, SLIDES.length - 1));
  };

  // Drag-to-scroll on desktop
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => { isDragging.current = false; };

  const goTo = (i) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: scrollRef.current.offsetWidth * i, behavior: "smooth" });
    setActive(i);
  };

  return (
    <section className="py-16 overflow-hidden" style={{ background: "#F2EDE4" }}>

      // Horizontal scroll container — snap
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging.current ? "grabbing" : "grab",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SLIDES.map((slide, i) => (
          <SlideCard key={i} slide={slide} />
        ))}
      </div>

      // Pagination — pill + dots (matches Image 2)
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 ${
              i === active
                ? "w-8 h-3 bg-primary rounded-full"
                : "w-3 h-3 bg-[#C8BC9E] rounded-full hover:bg-primary/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}

function SlideCard({ slide }) {
  const { badge, title, desc, primaryLabel, primaryTo, secondaryLabel, secondaryTo, Icon, accentImage, accentLabel, swatches } = slide;
  const lines = title.split("\n");

  return (
    <div
      className="flex-shrink-0 w-full snap-center px-6 lg:px-16"
      style={{ minWidth: "100%" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-stretch gap-0 overflow-hidden border border-[#E0D8C8] shadow-card"
        style={{ background: "#EDE8D8", borderRadius: 0 }}
      >

        // LEFT — content
        <div className="flex-1 p-8 lg:p-12 space-y-6 flex flex-col justify-center">

          // Badge
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest w-fit">
            {badge}
          </span>

          // Title
          <h2 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] text-primary">
            {lines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          // Description card — slightly recessed
          <div className="border border-[#D7CCB3] p-5" style={{ background: "#E5DFCF" }}>
            <p className="font-body text-sm leading-relaxed text-ink-muted">{desc}</p>
          </div>

          // Buttons
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={primaryTo}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors shadow-pin"
            >
              <Icon size={15} strokeWidth={1.5} />
              {primaryLabel}
            </Link>
            <Link
              to={secondaryTo}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D7CCB3] bg-white/60 text-ink font-display font-bold text-sm hover:bg-white transition-colors"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        // RIGHT — visual panel
        <div
          className="hidden sm:flex relative w-80 lg:w-96 flex-shrink-0 flex-col items-end justify-between p-8"
          style={{ background: "#F5EFE2" }}
        >
          // AI powered badge top right
          <div className="self-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EDE8D8] border border-[#D7CCB3] font-mono text-[10px] text-ink-muted uppercase tracking-widest">
              AI powered +
            </span>
          </div>

          // Polaroid card — rotated
          <div className="absolute top-10 right-8 w-44 bg-white shadow-ledger p-2 pb-8 rotate-2">
            <img
              src={accentImage}
              alt={accentLabel}
              className="w-full h-36 object-cover"
              loading="lazy"
              onError={e => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = "#A64B2A";
              }}
            />
            <p className="font-mono text-[9px] text-ink-light text-center mt-2 uppercase tracking-wider">
              {accentLabel}
            </p>
          </div>

          // Colour swatches bottom left
          <div className="absolute bottom-8 left-8 flex items-center gap-1 -rotate-12">
            {swatches.map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 border border-white/40 shadow-sm"
                style={{ background: color, marginTop: i % 2 === 0 ? 0 : 4 }}
              />
            ))}
          </div>

          // Dashed compass circle
          <div
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-dashed border-[#C8BC9E] flex items-center justify-center"
          >
            <Icon size={18} className="text-[#C8BC9E]" strokeWidth={1.5} />
          </div>
        </div>

      </motion.div>
    </div>
  );
}