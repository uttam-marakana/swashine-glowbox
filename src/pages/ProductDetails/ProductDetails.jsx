import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, company, orderNotes } from '@/data/company';
import Button from '@/components/common/Button';
import BeforeAfter from '@/components/common/BeforeAfter';
import Product360Viewer from '@/components/common/Product360Viewer';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset thumbnail when product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-brand-400 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  // Gallery: use gallery array, fallback to single image
  const gallery = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : (product.image ? [product.image] : []);

  const hasGallery = gallery.length > 0;
  const mainSrc = hasGallery ? gallery[activeIndex] : null;

  const quoteUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    `Hi Swashine, I am interested in *${product.name}* (${product.size}). Please share pricing and details.`
  )}`;

  const prevImage = () => setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const nextImage = () => setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-400 mb-8 transition">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ===== LEFT: Main image + Thumbnails ===== */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Primary image */}
            <div className="relative bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden aspect-[4/5] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex + (mainSrc || 'empty')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {mainSrc ? (
                    <img
                      src={mainSrc}
                      alt={`${product.name} - view ${activeIndex + 1}`}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-center p-10">
                      <div className="text-8xl mb-4">💡</div>
                      <div className="text-brand-400 font-semibold">{product.name}</div>
                      <div className="text-zinc-500 text-sm mt-1">{product.size}</div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {product.badge && (
                <span className="absolute top-5 right-5 bg-brand-500 text-black text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  {product.badge}
                </span>
              )}

              {/* Prev / Next arrows when multiple images */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails – click swaps primary image */}
            {gallery.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {gallery.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition ${
                      activeIndex === i
                        ? 'border-brand-500 ring-2 ring-brand-500/30'
                        : 'border-zinc-700 hover:border-zinc-500'
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
              <p className="text-xs text-zinc-500 mt-2 text-center">
                {activeIndex + 1} / {gallery.length} — click thumbnail to swap main image
              </p>
            )}
          </motion.div>

          {/* ===== RIGHT: Details ===== */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="text-xs text-brand-400 font-semibold tracking-widest uppercase mb-2">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{product.name}</h1>
            <div className="text-xl text-zinc-300 mb-2">Size: <span className="text-white font-medium">{product.size}</span></div>
            <div className="text-lg text-brand-400 mb-6">{product.priceLabel}</div>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <Check size={18} className="text-brand-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.includes && (
              <div className="mb-8 p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                <div className="text-sm text-zinc-500 mb-1">Includes</div>
                <div className="font-medium">{product.includes}</div>
                {product.note && <div className="text-sm text-amber-500/90 mt-2">{product.note}</div>}
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-10">
              <Button href={quoteUrl} variant="whatsapp" className="text-base px-8 py-4">
                <MessageCircle size={18} /> Get Quote on WhatsApp
              </Button>
              <Button href="/custom" variant="secondary" className="text-base px-8 py-4">
                Custom Size Calculator
              </Button>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-brand-400 mb-3 uppercase tracking-wider">Order Notes</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                {orderNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-400">~</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 360° Viewer */}
        <Product360Viewer
          className="mt-24"
          frames={gallery}
          productName={product.name}
        />

        {/* Before / After with upload */}
        <BeforeAfter
          className="mt-24"
          title="Before & After"
          description="Toggle OFF / ON, or upload your own photos to preview how this glowbox looks lit vs unlit."
          defaultOffSrc={mainSrc}
          defaultOnSrc={mainSrc}
        />

        {/* Specs */}
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            {[
              ['Product', product.name],
              ['Category', product.category],
              ['Size', product.size],
              ['Price Range', product.priceLabel],
              ['Type', product.type],
              ['Includes', product.includes || '—'],
              ['Warranty', '1 Year on SMPS'],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex justify-between px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-950/50'}`}
              >
                <span className="text-zinc-500">{label}</span>
                <span className="text-white font-medium text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">More Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-brand-500/40 transition group"
                >
                  <div className="h-36 bg-zinc-800 flex items-center justify-center">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="text-4xl">💡</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-brand-400">{p.category}</div>
                    <div className="font-medium text-sm mt-1 line-clamp-1 group-hover:text-brand-400 transition">{p.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">{p.size}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
