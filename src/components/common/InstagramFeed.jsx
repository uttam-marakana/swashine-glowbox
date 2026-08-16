import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { company, instagramFeed } from "@/data/company";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

/** Only /p/CODE or /reel/CODE — never profile URL */
function toEmbedSrc(url) {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    const match = u.pathname.match(/\/(p|reel)\/([^/?#]+)/i);
    if (!match) return null;
    const type = match[1].toLowerCase();
    const code = match[2];
    // Official embed (captioned=false keeps a bit less footer noise on some posts)
    return `https://www.instagram.com/${type}/${code}/embed`;
  } catch {
    return null;
  }
}

function isReel(url) {
  return /\/reel\//i.test(url || "");
}

export default function InstagramFeed({ className = "" }) {
  const items = (instagramFeed || [])
    .map((item) => ({
      id: item.id,
      url: item.url,
      embedSrc: toEmbedSrc(item.url),
      reel: isReel(item.url),
    }))
    .filter((item) => item.embedSrc);

  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [items.length]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-ig-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!items.length) {
    return (
      <section className={className}>
        <div
          className={`${glass} rounded-3xl p-10 text-center max-w-lg mx-auto`}
        >
          <Instagram className="mx-auto mb-3 text-brand-400" size={28} />
          <p className="text-zinc-400 text-sm">
            Add <strong className="text-zinc-300">post or reel</strong> links in{" "}
            <code className="text-brand-400">instagramFeed</code> (not the
            profile URL).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="text-center mb-10">
        <span
          className={`inline-flex items-center gap-2 ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
        >
          <Instagram size={14} /> Instagram
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">Follow the glow</h2>
        <p className="text-zinc-400 mt-3 text-sm max-w-md mx-auto">
          Posts &amp; reels from{" "}
          <a
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:underline"
          >
            Instagram
          </a>
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canLeft}
          className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md text-white ${
            canLeft
              ? "opacity-100 hover:bg-black/80"
              : "opacity-30 pointer-events-none"
          }`}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canRight}
          className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md text-white ${
            canRight
              ? "opacity-100 hover:bg-black/80"
              : "opacity-30 pointer-events-none"
          }`}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-1
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:px-12"
        >
          {items.map((post, i) => (
            <motion.div
              key={post.id}
              data-ig-card
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.25) }}
              className={`snap-center shrink-0 w-[min(86vw,300px)] ${glass} rounded-2xl overflow-hidden`}
            >
              {/*
                MEDIA-ONLY WINDOW
                Instagram always paints likes/comments in the iframe.
                We crop with a fixed viewport + taller iframe so only the media shows.
              */}
              <div className="relative w-full h-[420px] sm:h-[460px] overflow-hidden bg-black">
                <iframe
                  title={`Instagram ${post.reel ? "reel" : "post"} ${post.id}`}
                  src={post.embedSrc}
                  // Taller than viewport; shifted up slightly to hide top chrome,
                  // bottom of wrapper cuts off likes / comments / "View more"
                  className="absolute left-0 w-full border-0 pointer-events-auto
                    top-[-12px] h-[560px] sm:h-[600px]"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                  allowFullScreen
                  scrolling="no"
                />
                {/* Soft fade over residual bottom chrome if any leaks */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="px-3 py-2.5 flex items-center justify-between gap-2 border-t border-white/5">
                <span className="text-[11px] text-zinc-500">
                  {post.reel ? "Reel" : "Post"}
                </span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-brand-400 hover:underline shrink-0"
                >
                  Open on Instagram →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <a
          href={company.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${glass} px-6 py-3 rounded-full text-sm font-medium text-zinc-200 hover:text-brand-400 hover:border-brand-400/30 transition`}
        >
          <Instagram size={16} />
          View full profile
        </a>
      </div>
    </section>
  );
}
