import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Barcode() {
  const bars = [8, 3, 2, 8, 12, 3, 2, 8, 4, 8, 4, 2, 10, 4, 8];

  return (
    <div className="flex items-end gap-[2px] opacity-90">
      {bars.map((w, i) => (
        <span
          key={i}
          style={{
            width: w,
            height: 48,
            background: "#44281F",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

function TicketCuts() {
  return (
    <>
      {[60, 150, 240, 330, 420].map((y) => (
        <div
          key={y}
          className="absolute -left-5 w-10 h-10 rounded-full bg-primary z-20"
          style={{ top: `${y}px` }}
        />
      ))}

      {[60, 150, 240, 330, 420].map((y) => (
        <div
          key={`r${y}`}
          className="absolute -right-5 w-10 h-10 rounded-full bg-primary z-20"
          style={{ top: `${y}px` }}
        />
      ))}
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-primary min-h-screen flex items-center justify-center px-8 py-10">

      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}

        className="relative w-full max-w-[1200px] h-[620px] rounded-[24px] overflow-hidden shadow-ledger bg-[#F8F5EE] paper-texture"

      >

        <TicketCuts />

        <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none"></div>

        <div className="grid grid-cols-[1fr_290px] h-full">

          {/* LEFT */}

          <div className="px-10 py-10 flex flex-col">

            <div>

              <p className="uppercase tracking-[3px] text-[10px] font-bold text-copper">

                ENTRY NO.042

              </p>

            </div>

            <div className="mt-8">

              <h1 className="text-[60px] font-black font-display leading-none text-primary tracking-[-2px]">

                KHOJ

              </h1>

              <p className="uppercase tracking-[4px] text-[10px] mt-2 text-[#6d4c41] font-bold">

                HERITAGE ARCHIVE SYSTEM

              </p>

            </div>

            <div className="mt-10">

              <h2 className="text-[46px] leading-none font-bold text-[#33231d]">

                Your Personal

                <span className="font-serif italic font-normal ml-2">

                  Cultural Ledger

                </span>

              </h2>

            </div>

            <div className="relative mt-8">

              <div className="h-[1px] bg-[#d7ccb3] w-full"></div>

              <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] text-copper text-sm">

                ★

              </div>

            </div>

            <div className="mt-8 max-w-lg">

              <p className="leading-8 text-[#5f524d] text-[17px]">

                Embark on a chronicled journey through the living history of
                Nepal.

                A scrapbook of artifacts, artisan stories and architectural
                whispers preserved for the digital nomad.

              </p>

            </div>

            <div className="mt-auto">

              <div className="border-t border-[#d7ccb3] pt-8 flex">

                <div className="flex-1">

                  <p className="uppercase tracking-[2px] text-[10px] text-[#9b8578] font-bold">

                    DATE OF DISCOVERY

                  </p>

                  <h3 className="text-copper font-black text-xl mt-1 uppercase">

                    15–19 AUGUST,2024

                  </h3>

                </div>

                <div className="w-px bg-[#d7ccb3] mx-8"></div>

                <div className="flex-1">

                  <p className="uppercase tracking-[2px] text-[10px] text-[#9b8578] font-bold">

                    LOCATION

                  </p>

                  <h3 className="text-copper font-black text-xl mt-1 uppercase">

                    NEPAL

                  </h3>

                </div>

              </div>

              <Link

                to="/explore"

                className="mt-10 inline-flex items-center gap-3 bg-primary hover:bg-primary-light transition-all text-white px-8 py-4 rounded-lg uppercase tracking-[2px] text-xs font-bold shadow-pin"

              >

                OPEN ARCHIVE

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative bg-[#f3efe6] border-l border-dashed border-[#d8ccb2] flex flex-col items-center py-8">

            <div className="absolute left-0 top-0 bottom-0 border-l border-dashed border-[#d7ccb3] opacity-50"></div>

            <div className="relative mt-3">

              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-16 h-4 bg-[#dbcdbd]/60 rotate-2"></div>

              <div className="bg-white p-3 pb-6 shadow-lg rotate-2">

                <img

                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"

                  alt=""

                  className="w-24 h-40 object-cover"

                />

                <p className="font-serif italic text-[10px] mt-2 text-center text-[#6d4c41]">

                  Bhumeshwari, Section IX

                </p>

              </div>

            </div>

            <div className="mt-16 text-center">

              <p className="uppercase tracking-[4px] text-[9px] text-[#8d7b6d]">

                ARCHIVAL CODE

              </p>

              <h2 className="text-copper text-3xl font-black mt-2">

                NP-2026

              </h2>

            </div>

            <div className="mt-8">

              <Barcode />

              <p className="font-mono text-[9px] tracking-[4px] mt-2 text-center">

                018113982024

              </p>

            </div>

            <div className="w-full mt-auto border-t border-[#d8ccb2] pt-6">

              <p className="uppercase tracking-[2px] text-[9px] text-center text-[#8d7b6d]">

                DIGITAL

              </p>

              <p className="uppercase tracking-[2px] text-[9px] text-center text-[#8d7b6d]">

                LIVING HERITAGE PASS

              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}