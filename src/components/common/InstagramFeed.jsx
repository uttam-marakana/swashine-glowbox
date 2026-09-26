import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { company, instagramFeed } from "@/data/company";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

/**
 * Convert an Instagram post/reel URL into
 * an official Instagram embed URL.
 *
 * Supported:
 * /p/CODE
 * /reel/CODE
 *
 * Profile URLs are intentionally ignored.
 */
function toEmbedSrc(url) {
  if (!url) return null;

  try {
    const u = new URL(url.trim());

    const match = u.pathname.match(/\/(p|reel)\/([^/?#]+)/i);

    if (!match) return null;

    const type = match[1].toLowerCase();
    const code = match[2];

    return `https://www.instagram.com/${type}/${code}/embed`;
  } catch {
    return null;
  }
}

/**
 * Detect whether an Instagram URL is a reel.
 */
function isReel(url) {
  return /\/reel\//i.test(url || "");
}

export default function InstagramFeed({ className = "" }) {
  /**
   * Prepare Instagram posts.
   *
   * profileName:
   * Custom name displayed in our own card header.
   *
   * url:
   * Original Instagram post/reel URL.
   */
  const items = (instagramFeed || [])
    .map((item) => ({
      id: item.id,
      url: item.url,
      profileName: item.profileName || item.username || "swashine_glowbox",
      embedSrc: toEmbedSrc(item.url),
      reel: isReel(item.url),
    }))
    .filter((item) => item.embedSrc);

  const trackRef = useRef(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  /**
   * Update carousel arrow states.
   */
  const updateArrows = () => {
    const el = trackRef.current;

    if (!el) return;

    setCanLeft(el.scrollLeft > 8);

    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  /**
   * Attach carousel scroll/resize listeners.
   */
  useEffect(() => {
    const el = trackRef.current;

    if (!el) return;

    updateArrows();

    el.addEventListener("scroll", updateArrows, {
      passive: true,
    });

    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);

      window.removeEventListener("resize", updateArrows);
    };
  }, [items.length]);

  useEffect(() => {
    if (!selectedPost) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPost(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedPost]);

  /**
   * Scroll one card at a time.
   */
  const scrollByCard = (direction) => {
    const el = trackRef.current;

    if (!el) return;

    const card = el.querySelector("[data-ig-card]");

    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;

    el.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  /**
   * Empty state.
   */
  if (!items.length) {
    return (
      <section className={className}>
        <div className={`${glass} w-full rounded-3xl p-5 sm:p-8`}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Follow the Glow with Swashine Glowbox
            </h2>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-400 hover:underline shrink-0"
            >
              Visit Instagram →
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-8 text-center">
            <Instagram className="mx-auto mb-3 text-brand-400" size={28} />
            <p className="text-zinc-400 text-sm">
              Add <strong className="text-zinc-300">post or reel</strong> links
              in <code className="text-brand-400">instagramFeed</code>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className={`${glass} min-w-0 rounded-3xl p-4 sm:p-6 lg:p-8`}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span
              className={`inline-flex items-center gap-2 ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
            >
              <Instagram size={14} />
              Instagram
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 leading-tight">
              Follow the Glow with Swashine Glowbox
            </h2>
          </div>

          <p className="text-zinc-400 text-sm shrink-0">
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

      {/* =========================================================
          CAROUSEL
      ========================================================= */}
      <div className="relative min-w-0">
        {/* -------------------------------------------------------
            PREVIOUS BUTTON
        ------------------------------------------------------- */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canLeft}
          className={`hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full
            items-center justify-center
            border border-white/10
            bg-black/60
            backdrop-blur-md
            text-white
            transition
            ${
              canLeft
                ? "opacity-100 hover:bg-black/80"
                : "opacity-30 pointer-events-none"
            }`}
          aria-label="Previous Instagram post"
        >
          <ChevronLeft size={20} />
        </button>

        {/* -------------------------------------------------------
            NEXT BUTTON
        ------------------------------------------------------- */}
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canRight}
          className={`hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 rounded-full
            items-center justify-center
            border border-white/10
            bg-black/60
            backdrop-blur-md
            text-white
            transition
            ${
              canRight
                ? "opacity-100 hover:bg-black/80"
                : "opacity-30 pointer-events-none"
            }`}
          aria-label="Next Instagram post"
        >
          <ChevronRight size={20} />
        </button>

        {/* -------------------------------------------------------
            SCROLL TRACK
        ------------------------------------------------------- */}
        <div
          ref={trackRef}
          className="
            flex
            min-w-0
            gap-4
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-2
            px-1
            sm:px-14
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map((post, i) => (
            <motion.div
              key={post.id}
              data-ig-card
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: Math.min(i * 0.05, 0.25),
              }}
              className="
                snap-center
                shrink-0
                w-[min(86vw,280px)]
                sm:w-[280px]
                rounded-2xl
                overflow-hidden
                bg-black
                border border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                group
              "
            >
              {/* =================================================
                  CUSTOM CARD HEADER
              ================================================= */}
              <div
                className="
                  h-12
                  px-4
                  flex
                  items-center
                  border-b
                  border-white/10
                  bg-white/[0.035]
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-zinc-100
                      truncate
                    "
                  >
                    {post.profileName}
                  </p>
                </div>
              </div>

              {/* =================================================
                  MEDIA WINDOW
              ================================================= */}
              <div
                className={`relative w-full ${
                  post.reel ? "aspect-[9/16]" : "aspect-[4/5]"
                } overflow-hidden bg-black`}
              >
                <iframe
                  title={`Instagram ${post.reel ? "reel" : "post"} ${post.id}`}
                  src={post.embedSrc}
                  className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-400"
                  aria-label={`Show Instagram ${post.reel ? "reel" : "post"} from ${
                    post.profileName
                  }`}
                />
              </div>

              {/* =================================================
                  CUSTOM CARD FOOTER
              ================================================= */}
              <div
                className="
                  h-10
                  px-3
                  flex
                  items-center
                  justify-between
                  gap-2
                  border-t
                  border-white/10
                  bg-black/40
                "
              >
                {/* Post type */}
                <span
                  className="
                    text-[11px]
                    text-zinc-500
                    font-medium
                  "
                >
                  {post.reel ? "Reel" : "Post"}
                </span>

                {/* Instagram link */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-[11px]
                    text-brand-400
                    hover:text-brand-300
                    hover:underline
                    shrink-0
                    transition
                  "
                >
                  Open on Instagram →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedPost(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Instagram ${selectedPost.reel ? "reel" : "post"} from ${
              selectedPost.profileName
            }`}
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
              <span className="min-w-0 truncate text-sm font-semibold text-zinc-100">
                {selectedPost.profileName}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close Instagram post"
                autoFocus
              >
                Close
              </button>
            </div>
            <div
              className={`relative mx-auto w-full max-w-[420px] flex-1 overflow-hidden bg-black ${
                selectedPost.reel ? "aspect-[9/16]" : "aspect-[4/5]"
              }`}
            >
              <iframe
                key={selectedPost.id}
                title={`Instagram ${selectedPost.reel ? "reel" : "post"} ${
                  selectedPost.id
                }`}
                src={selectedPost.embedSrc}
                className="absolute inset-0 h-full w-full border-0"
                style={{ objectFit: "contain" }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                scrolling="no"
              />
            </div>
            <a
              href={selectedPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-t border-white/10 px-4 py-3 text-center text-sm text-brand-400 transition hover:bg-white/5 hover:text-brand-300"
            >
              Open on Instagram
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
