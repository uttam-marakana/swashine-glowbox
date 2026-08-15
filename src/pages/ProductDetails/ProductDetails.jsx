import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products, company, orderNotes, warrantyPoints } from "@/data/company";
import Button from "@/components/common/Button";
import BeforeAfter from "@/components/common/BeforeAfter";
import Product360Viewer from "@/components/common/Product360Viewer";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";

const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-4 text-center min-h-screen relative overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>

        <Link to="/products" className="text-brand-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [product.image]
        : [];

  const mainSrc = gallery.length > 0 ? gallery[activeIndex] : null;

  const quoteUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    `Hi Swashine, I am interested in *${product.name}* (${product.size}). Please share pricing and details.`,
  )}`;

  const prevImage = () =>
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));

  const nextImage = () =>
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-x-clip">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] max-w-[70vw] max-h-[70vw] rounded-full bg-brand-500/12 blur-[110px]" />

        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] max-w-[65vw] max-h-[65vw] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 min-w-0">
        {/* Back button */}
        <Link
          to="/products"
          className={`inline-flex max-w-full items-center gap-2 text-sm text-zinc-400 hover:text-brand-400 mb-8 transition ${glass} px-4 py-2 rounded-full`}
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span>Back to Products</span>
        </Link>

        {/* Main product section */}
        <div className="grid w-full min-w-0 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full min-w-0 max-w-full"
          >
            {/* Main image */}
            <div
              className={`relative w-full max-w-full ${glass} rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex + (mainSrc || "empty")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full min-w-0 min-h-0 flex items-center justify-center"
                >
                  {mainSrc ? (
                    <img
                      src={mainSrc}
                      alt={`${product.name} - view ${activeIndex + 1}`}
                      className="block max-w-full max-h-full w-full h-full object-contain p-3 sm:p-4"
                    />
                  ) : (
                    <div className="text-center p-6 sm:p-10 max-w-full min-w-0">
                      <div className="text-7xl sm:text-8xl mb-4">💡</div>

                      <div className="text-brand-400 font-semibold break-words">
                        {product.name}
                      </div>

                      <div className="text-zinc-500 text-sm mt-1 break-words">
                        {product.size}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Product badge */}
              {product.badge && (
                <span className="absolute top-3 right-3 sm:top-5 sm:right-5 max-w-[calc(100%-1.5rem)] bg-brand-500 text-black text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full z-10 truncate">
                  {product.badge}
                </span>
              )}

              {/* Gallery navigation */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 flex items-center justify-center text-white transition z-10 shrink-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 flex items-center justify-center text-white transition z-10 shrink-0"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 0 && (
              <div className="w-full min-w-0 max-w-full flex gap-3 mt-4 overflow-x-auto pb-2 overscroll-x-contain">
                {gallery.map((thumb, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition backdrop-blur-sm ${
                      activeIndex === i
                        ? "border-brand-500 ring-2 ring-brand-500/30"
                        : "border-white/10 hover:border-white/25"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={thumb}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {gallery.length > 1 && (
              <p className="px-2 text-xs text-zinc-500 mt-2 text-center break-words">
                {activeIndex + 1} / {gallery.length} — click thumbnail to swap
                main image
              </p>
            )}
          </motion.div>

          {/* RIGHT: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full min-w-0 max-w-full"
          >
            <div className="text-xs text-brand-400 font-semibold tracking-widest uppercase mb-2 break-words">
              {product.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3 break-words [overflow-wrap:anywhere]">
              {product.name}
            </h1>

            <div className="text-xl text-zinc-300 mb-2 break-words">
              Size:{" "}
              <span className="text-white font-medium">{product.size}</span>
            </div>

            <div className="text-lg text-brand-400 mb-6 break-words">
              {product.priceLabel}
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 break-words [overflow-wrap:anywhere]">
              {product.description}
            </p>

            {/* Key Features */}
            <div
              className={`${glassCard} w-full min-w-0 max-w-full p-5 sm:p-6 mb-8`}
            >
              <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">
                Key Features
              </h3>

              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-zinc-300 min-w-0"
                  >
                    <Check
                      size={18}
                      className="text-brand-400 mt-0.5 shrink-0"
                    />

                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Includes */}
            {product.includes && (
              <div
                className={`${glassCard} w-full min-w-0 max-w-full p-5 mb-8`}
              >
                <div className="text-sm text-zinc-500 mb-1">Includes</div>

                <div className="font-medium break-words [overflow-wrap:anywhere]">
                  {product.includes}
                </div>

                {product.note && (
                  <div className="text-sm text-amber-500/90 mt-2 break-words [overflow-wrap:anywhere]">
                    {product.note}
                  </div>
                )}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 w-full min-w-0">
              <Button
                href={quoteUrl}
                variant="whatsapp"
                className="w-full sm:w-auto max-w-full text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-4"
              >
                <MessageCircle size={18} className="shrink-0" />
                <span className="truncate">Get Quote on WhatsApp</span>
              </Button>

              <Button
                href="/custom"
                variant="secondary"
                className="w-full sm:w-auto max-w-full text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-4"
              >
                <span className="truncate">Custom Size Calculator</span>
              </Button>
            </div>

            {/* Order Notes */}
            <div
              className={`${glassCard} w-full min-w-0 max-w-full p-5 sm:p-6`}
            >
              <h3 className="text-sm font-semibold text-brand-400 mb-3 uppercase tracking-wider">
                Order Notes
              </h3>

              <ul className="space-y-2 text-sm text-zinc-400">
                {orderNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 min-w-0">
                    <span className="text-brand-400 shrink-0">~</span>

                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 360° Product Viewer */}
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <Product360Viewer
            className="mt-20 sm:mt-24"
            frames={gallery}
            productName={product.name}
          />
        </div>

        {/* Before & After */}
        <div
          className={`${glass} w-full min-w-0 max-w-full rounded-[2rem] p-4 sm:p-6 md:p-8 mt-20 sm:mt-24 overflow-hidden`}
        >
          <BeforeAfter
            title="Before & After"
            description="Toggle OFF / ON, or upload your own photos to preview how this glowbox looks lit vs unlit."
            defaultOffSrc={mainSrc}
            defaultOnSrc={mainSrc}
          />
        </div>

        {/* Warranty strip */}
        {warrantyPoints?.length > 0 && (
          <section className="mt-20 sm:mt-24 w-full min-w-0 max-w-full">
            <h2 className="text-2xl font-bold mb-6 text-center break-words">
              Quality & warranty
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {warrantyPoints.map((w) => (
                <div key={w.title} className={`${glassCard} min-w-0 p-5`}>
                  <h3 className="font-semibold text-brand-400 text-sm mb-1 break-words">
                    {w.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed break-words [overflow-wrap:anywhere]">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Specs */}
        <section className="mt-20 sm:mt-24 w-full max-w-3xl mx-auto min-w-0">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>

          <div
            className={`${glass} rounded-2xl overflow-hidden w-full max-w-full`}
          >
            {[
              ["Product", product.name],
              ["Category", product.category],
              ["Size", product.size],
              ["Price Range", product.priceLabel],
              ["Type", product.type],
              ["Includes", product.includes || "—"],
              ["Warranty", "1 Year on SMPS"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-4 px-4 sm:px-6 py-4 text-sm border-b border-white/5 ${
                  i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                }`}
              >
                <span className="text-zinc-500 min-w-0">{label}</span>

                <span className="text-white font-medium text-right min-w-0 break-words [overflow-wrap:anywhere]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <div className="mt-20 sm:mt-24 w-full min-w-0 max-w-full">
          <h2 className="text-2xl font-bold mb-8">More Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className={`${glassCard} min-w-0 max-w-full overflow-hidden group`}
                >
                  {/* Product image */}
                  <div className="aspect-[4/3] bg-black/25 flex items-center justify-center relative overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-1.5 md:p-2 group-hover:scale-[1.03] transition duration-500"
                      />
                    ) : (
                      <span className="text-5xl">💡</span>
                    )}

                    {/* Badge */}
                    {p.badge && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 max-w-[calc(100%-1rem)] bg-brand-500 text-black text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full z-10 truncate">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Product information */}
                  <div className="p-3 sm:p-4 min-w-0">
                    <div className="text-xs text-brand-400 truncate">
                      {p.category}
                    </div>

                    <div className="font-medium text-sm mt-1 line-clamp-2 break-words group-hover:text-brand-400 transition">
                      {p.name}
                    </div>

                    <div className="text-xs text-zinc-500 mt-1 break-words">
                      {p.size}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
