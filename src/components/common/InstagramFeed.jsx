import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.25) }}
              className={`${glass} group flex min-w-0 flex-col overflow-hidden rounded-2xl`}
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
                className="block relative w-full aspect-[4/5] overflow-hidden bg-black"
                aria-label={`Open ${post.reel ? "reel" : "post"} on Instagram`}
              >
                <iframe
                  title={`Instagram ${post.reel ? "reel" : "post"} ${post.id}`}
                  src={post.embedSrc}
                  className="absolute left-0 w-full border-0 pointer-events-none"
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
                <div className="absolute inset-0 pointer-events-none bg-black/5 group-hover:bg-transparent transition duration-300" />
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
