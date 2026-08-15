import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/company";

const galleryItems = products.flatMap((p) => {
  const imgs =
    p.gallery && p.gallery.length ? p.gallery : p.image ? [p.image] : [];
  return imgs.map((src, i) => ({
    src,
    title: p.name,
    type: p.category,
    slug: p.slug,
    key: `${p.id}-${i}`,
  }));
});

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Gallery() {
  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Product Gallery
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Real Swashine Glowbox product photos across all sizes
          </p>
        </motion.div>

        {galleryItems.length === 0 ? (
          <div
            className={`${glass} rounded-3xl p-12 text-center text-zinc-500`}
          >
            No product images yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
              >
                <Link
                  to={`/products/${item.slug}`}
                  className={`block aspect-square ${glassCard} overflow-hidden relative group`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
                    <div className="font-semibold text-sm line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-brand-400">{item.type}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
