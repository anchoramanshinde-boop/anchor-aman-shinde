import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SEO from "../components/SEO";
import heroImage from "../assets/background.webp";
import aboutImage from "../assets/about.webp";
import wheelOfFortune from "../assets/gallery-wheel-of-fortune.webp";
import folkDance from "../assets/gallery-folk-dance.webp";
import cutout from "../assets/gallery-cutout.webp";
import crowdMic from "../assets/gallery-crowd-mic.webp";
import schoolEvent from "../assets/gallery-school-event.webp";

// Drop new photos in here — { src: import("../assets/your-file.webp"), alt: "..." }
const photos = [
  { src: heroImage, alt: "Aman Shinde hosting a live event on stage" },
  { src: aboutImage, alt: "Aman Shinde at an event venue" },
  { src: wheelOfFortune, alt: "Aman Shinde running the Wheel of Fortune game at a sangeet" },
  { src: folkDance, alt: "Aman Shinde performing a dance number for the couple" },
  { src: cutout, alt: "Life-size cutout of Aman Shinde welcoming guests at a wedding reception" },
  { src: crowdMic, alt: "Aman Shinde engaging the crowd on the mic" },
  { src: schoolEvent, alt: "Aman Shinde hosting a school annual day event" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % photos.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="bg-gray-50 pt-24 pb-16 px-6 md:px-16">
      <SEO
        title="Wedding & Event Gallery"
        description="Photos from live events hosted by wedding anchor Aman Shinde — sangeet nights, weddings, corporate galas and celebrity shows across Delhi, Gwalior, Indore and beyond."
        path="/gallery"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h3 className="text-sm font-semibold text-yellow-500 uppercase mb-2">Portfolio</h3>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#201c16]">
          Explore My Work
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          A curated look at the stages, the crowds, and the celebrations I've hosted — click any photo to take a closer look.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto columns-2 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative mb-4 md:mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-gray-200 shadow-sm cursor-zoom-in"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn size={20} />
              </span>
            </div>
            <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-left">
              {photo.alt}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-yellow-500 transition"
            >
              <X size={32} />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length));
                  }}
                  className="absolute left-4 md:left-8 text-white/80 hover:text-yellow-500 transition p-2"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((a) => (a === null ? a : (a + 1) % photos.length));
                  }}
                  className="absolute right-4 md:right-8 text-white/80 hover:text-yellow-500 transition p-2"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={photos[active].src}
              alt={photos[active].alt}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {photos.length > 1 && (
              <span className="absolute bottom-6 text-white/70 text-sm tracking-wide">
                {active + 1} / {photos.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
