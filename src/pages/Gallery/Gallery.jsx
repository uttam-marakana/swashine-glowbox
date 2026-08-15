import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/company";

/** Flatten product galleries into gallery tiles */
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

export default function Gallery() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold mb-4">Product Gallery</h1>
          <p className="text-zinc-400 text-xl">
            Real Swashine Glowbox product photos across all sizes
          </p>
        </motion.div>

        {galleryItems.length === 0 ? (
          <p className="text-center text-zinc-500">No product images yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                  className="block aspect-square bg-zinc-900 rounded-3xl overflow-hidden relative border border-zinc-800 group"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
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
