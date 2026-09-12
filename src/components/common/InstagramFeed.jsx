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
        <div
          className={`${glass} rounded-3xl p-10 text-center max-w-lg mx-auto`}
        >
          <Instagram className="mx-auto mb-3 text-brand-400" size={28} />

          <p className="text-zinc-400 text-sm">
            Add <strong className="text-zinc-300">post or reel</strong> links in{" "}
            <code className="text-brand-400">instagramFeed</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}
      <div className="text-center mb-10">
        <span
          className={`inline-flex items-center gap-2 ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
        >
          <Instagram size={14} />
          Instagram
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Follow the Glow with Swashine Glowbox
        </h2>

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

      {/* =========================================================
          CAROUSEL
      ========================================================= */}
      <div className="relative">
        {/* -------------------------------------------------------
            PREVIOUS BUTTON
        ------------------------------------------------------- */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canLeft}
          className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
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
          className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
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
            gap-4
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-2
            px-1
            sm:px-12
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
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  relative
                  w-full
                  aspect-[4/5]
                  overflow-hidden
                  bg-black
                "
                aria-label={`Open ${post.reel ? "reel" : "post"} on Instagram`}
              >
                {/*
                  The iframe contains Instagram's native UI.

                  Because Instagram is loaded inside a
                  cross-origin iframe, we cannot directly
                  hide its internal buttons with CSS.

                  Instead, we create a controlled viewport
                  and crop the iframe so the card primarily
                  displays the media.
                */}
                <iframe
                  title={`Instagram ${post.reel ? "reel" : "post"} ${post.id}`}
                  src={post.embedSrc}
                  className="
                    absolute
                    left-0
                    w-full
                    border-0
                    pointer-events-none
                  "
                  style={{
                    top: post.reel ? "-58px" : "-64px",

                    height: post.reel
                      ? "calc(100% + 120px)"
                      : "calc(100% + 130px)",
                  }}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />

                {/* -------------------------------------------------
                    MEDIA OVERLAY
                ------------------------------------------------- */}
                <div
                  className="
                    absolute
                    inset-0
                    pointer-events-none
                    bg-black/5
                    group-hover:bg-transparent
                    transition
                    duration-300
                  "
                />

                {/* -------------------------------------------------
                    REEL PLAY ICON
                ------------------------------------------------- */}
                {post.reel && (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      pointer-events-none
                    "
                  >
                    <div
                      className="
                        w-14
                        h-14
                        rounded-full
                        bg-white/90
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        shadow-2xl
                        opacity-90
                        group-hover:scale-110
                        transition-transform
                        duration-300
                      "
                    >
                      <span
                        className="
                          text-black
                          text-xl
                          ml-1
                        "
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------
                    HOVER BORDER
                ------------------------------------------------- */}
                <div
                  className="
                    absolute
                    inset-0
                    pointer-events-none
                    rounded-none
                    ring-1
                    ring-inset
                    ring-transparent
                    group-hover:ring-brand-400/30
                    transition
                    duration-300
                  "
                />
              </a>

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
    </section>
  );
}
