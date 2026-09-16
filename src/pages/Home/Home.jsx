import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  company,
  features,
  stats,
  howItWorks,
  industries,
  warrantyPoints,
  caseStudies,
  faqs,
  sizeCompare,
  reviews,
  videoHighlights,
} from "@/data/company";
import { listProductsPublic } from "@/services/productService";
import Button from "@/components/common/Button";
import BeforeAfter from "@/components/common/BeforeAfter";
import FaqList from "@/components/common/FaqList";
import InstagramFeed from "@/components/common/InstagramFeed";
import { Zap, RefreshCw, Shield, Ruler } from "lucide-react";

import Slider_img1 from "@/assets/images/hero-section/slider_img1.png";
import Slider_img2 from "@/assets/images/hero-section/slider_img2.png";

const iconMap = { Zap, RefreshCw, Shield, Ruler };

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;
const cardInteractive = `${glassCard} transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]`;

function useInViewOnce(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function useCountUp(target, enabled, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let start = null;
    let frame;
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.round(target * p));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);
  return value;
}

function parseStatValue(raw) {
  const s = String(raw);
  if (s.includes("–") || s.includes("-")) {
    return { kind: "range", num: 0, label: s };
  }
  const num = parseInt(s.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(num)) return { kind: "text", num: 0, label: s };
  if (s.includes("%")) return { kind: "percent", num, label: s };
  if (s.toLowerCase().includes("yr")) return { kind: "year", num, label: s };
  if (s.includes("+")) return { kind: "plus", num, label: s };
  return { kind: "num", num, label: s };
}

function formatStat(kind, n, fallback) {
  if (kind === "text" || kind === "range") return fallback;
  if (kind === "percent") return `${n}%`;
  if (kind === "year") return `${n} Yr`;
  if (kind === "plus") return `${n}+`;
  return String(n);
}

function StatCell({ value, label }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const parsed = parseStatValue(value);
  const n = useCountUp(parsed.num, inView);
  const display =
    parsed.kind === "range" || parsed.kind === "text"
      ? value
      : formatStat(parsed.kind, n, value);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-default rounded-2xl px-2 py-2"
    >
      <div className="text-3xl md:text-4xl font-bold text-brand-400 tabular-nums">
        {display}
      </div>
      <div className="text-sm text-zinc-500 mt-1">{label}</div>
    </motion.div>
  );
}

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef);
  const hoverPause = useRef(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      if (hoverPause.current) return;
      setActive((a) => (a + 1) % howItWorks.length);
    }, 4000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="py-12" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            Process
          </span>
          <h2 className="text-4xl font-bold mt-2">How it works</h2>
          <Link
            to="/how-it-works"
            className="text-brand-400 text-sm hover:underline mt-3 inline-block"
          >
            Installation & artwork guide →
          </Link>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          onMouseEnter={() => {
            hoverPause.current = true;
          }}
          onMouseLeave={() => {
            hoverPause.current = false;
          }}
        >
          {howItWorks.map((s, i) => (
            <motion.button
              type="button"
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`text-left p-6 rounded-3xl border backdrop-blur-xl transition duration-300 ${
                active === i
                  ? "bg-white/[0.08] border-brand-400/50 shadow-[0_0_40px_rgba(251,191,36,0.12)] -translate-y-1"
                  : "bg-white/[0.04] border-white/10 hover:border-brand-400/30"
              }`}
            >
              <div
                className={`font-bold text-sm mb-2 ${
                  active === i ? "text-brand-300" : "text-brand-400"
                }`}
              >
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {howItWorks.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Step ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                active === i
                  ? "w-8 bg-brand-400"
                  : "w-3 bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/custom">Start with size calculator</Button>
        </div>
      </div>
    </section>
  );
}

const HERO_SLIDES = [
  {
    id: 1,
    title: (
      <>
        LIGHT UP
        <br />
        YOUR{" "}
        <span className="text-brand-400 drop-shadow-[0_0_28px_rgba(251,191,36,0.35)]">
          BRAND
        </span>
      </>
    ),
    description:
      "Premium LED Glowboxes with tool-free poster change. Perfect for retail, temples, restaurants & exhibitions.",
    ctaLabel: "Explore Products",
    ctaTo: "/products",
    secondaryLabel: "Get Quote on WhatsApp",
    secondaryHref: `https://wa.me/${company.whatsapp}?text=Hi%20Swashine%2C%20I%20want%20a%20quote`,
    image: Slider_img1, // filled from products at runtime
    badge: "Made in Gujarat • Manufacturer Direct",
  },
  {
    id: 2,
    title: (
      <>
        CUSTOM SIZES
        <br />
        UP TO{" "}
        <span className="text-brand-400 drop-shadow-[0_0_28px_rgba(251,191,36,0.35)]">
          2 × 6 FT
        </span>
      </>
    ),
    description:
      "Order exact dimensions for your space. Aluminium frames, bright LED panels, and fast 5–6 day delivery.",
    ctaLabel: "Custom calculator",
    ctaTo: "/custom",
    secondaryLabel: "WhatsApp us",
    secondaryHref: `https://wa.me/${company.whatsapp}`,
    image: Slider_img2,
    badge: "Custom manufacturing",
  },
  {
    id: 3,
    title: (
      <>
        TOOL-FREE
        <br />
        POSTER{" "}
        <span className="text-brand-400 drop-shadow-[0_0_28px_rgba(251,191,36,0.35)]">
          CHANGE
        </span>
      </>
    ),
    description:
      "Swap graphics in seconds with the top-slot system. Ideal for menus, offers, and seasonal campaigns.",
    ctaLabel: "How it works",
    ctaTo: "/how-it-works",
    secondaryLabel: "View products",
    secondaryHref: null,
    secondaryTo: "/products",
    image: "",
    badge: "1 Year SMPS warranty",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [slide, setSlide] = useState(0);
  const pauseRef = useRef(false);

  useEffect(() => {
    listProductsPublic().then(setProducts);
  }, []);

  const slides = HERO_SLIDES.map((s, i) => {
    const img =
      products[i]?.image || products.find((p) => p.image)?.image || null;
    return { ...s, image: s.image || img };
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return;
      setSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[slide] || slides[0];

  const heroProduct =
    products.find((p) => p.badge === "Popular" && p.image) ||
    products.find((p) => p.image);

  const previewImage =
    heroProduct?.image || products.find((p) => p.image)?.image || null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-brand-500/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full bg-brand-600/10 blur-[110px]" />
      </div>

      {/* Hero Slider */}
      <section
        className="w-full relative overflow-hidden pt-20 md:pt-0"
        onMouseEnter={() => {
          pauseRef.current = true;
        }}
        onMouseLeave={() => {
          pauseRef.current = false;
        }}
      >
        {/* Desktop / laptop: full-bleed background image + left content */}
        <div className="hidden md:block relative min-h-[85vh] lg:min-h-screen">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === slide
                  ? "opacity-100 z-[1]"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {s.image ? (
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain object-right-center scale-95"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-[85vh] lg:min-h-screen flex items-center">
            <div className="max-w-xl space-y-6 w-full pt-28 lg:pt-32 pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div
                    className={`inline-flex items-center gap-2 ${glass} px-5 py-2 rounded-full text-sm`}
                  >
                    <span>🇮🇳</span>
                    <span className="text-zinc-200">{current.badge}</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tighter text-left">
                    {current.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-zinc-300 max-w-lg leading-relaxed text-left">
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button href={current.ctaTo}>{current.ctaLabel}</Button>
                    {current.secondaryHref ? (
                      <Button variant="whatsapp" href={current.secondaryHref}>
                        {current.secondaryLabel}
                      </Button>
                    ) : (
                      <Button variant="secondary" href={current.secondaryTo}>
                        {current.secondaryLabel}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-2 pt-4">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slide
                        ? "w-8 bg-brand-400"
                        : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: image on top, content below */}
        <div className="md:hidden">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-900">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === slide ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-zinc-900">
                    💡
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>

          <div className="px-4 sm:px-6 py-8 space-y-5 bg-zinc-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div
                  className={`inline-flex items-center gap-2 ${glass} px-4 py-1.5 rounded-full text-xs`}
                >
                  <span>🇮🇳</span>
                  <span className="text-zinc-200">{current.badge}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight">
                  {current.title}
                </h1>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {current.description}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button href={current.ctaTo} className="w-full sm:w-auto">
                    {current.ctaLabel}
                  </Button>
                  {current.secondaryHref ? (
                    <Button
                      variant="whatsapp"
                      href={current.secondaryHref}
                      className="w-full sm:w-auto"
                    >
                      {current.secondaryLabel}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      href={current.secondaryTo}
                      className="w-full sm:w-auto"
                    >
                      {current.secondaryLabel}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 pt-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-8 bg-brand-400" : "w-3 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — count-up + hover */}
      <section className="w-full py-8 md:py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`${glass} rounded-2xl md:rounded-[2rem] px-4 sm:px-6 py-8`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {stats.map((s) => (
                <StatCell key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — active step + auto-rotate */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <HowItWorksSection />
        </div>
      </section>

      {/* Features — interactive hover */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            Why Swashine Glowbox?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`${cardInteractive} p-6 md:p-8 group`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-400/20 flex items-center justify-center mb-5 transition duration-300 group-hover:scale-110 group-hover:bg-brand-500/25 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.25)]">
                    <Icon className="w-6 h-6 text-brand-400 transition group-hover:text-brand-300" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 group-hover:text-brand-300 transition">
                    {f.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="w-full py-10 md:py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                Bestsellers
              </span>
              <h2 className="text-4xl font-bold mt-2">Featured products</h2>
            </div>
            <Link
              to="/products"
              className="text-brand-400 hover:underline text-sm font-medium"
            >
              View all products →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.badge)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className={`${glassCard} overflow-hidden group`}
                >
                  <div className="aspect-[4/3] bg-black/20 flex items-center justify-center overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <span className="text-5xl">💡</span>
                    )}
                  </div>
                  <div className="p-5">
                    {p.badge && (
                      <span className="text-xs bg-brand-500/90 text-black font-bold px-2.5 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-semibold mt-2 group-hover:text-brand-400 transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{p.size}</p>
                    <p className="text-sm text-brand-400 mt-2">
                      {p.priceLabel}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Size compare */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Compare sizes
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-8">
            Quick guide to pick the right format for your space.
          </p>
          <div className={`${glass} rounded-3xl overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[640px]">
                <thead className="bg-white/[0.04] text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="px-5 py-4 font-medium">Size</th>
                    <th className="px-5 py-4 font-medium">Best for</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Price range</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCompare.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-white/5 ${
                        i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-white">
                        {row.size}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-400">
                        {row.bestFor}
                      </td>
                      <td className="px-5 py-3.5 text-zinc-400">{row.type}</td>
                      <td className="px-5 py-3.5 text-brand-400">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Industries we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.a
                key={ind.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                  `Hi, I need a glowbox for: ${ind.query}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${glassCard} p-6 gap-4 block`}
              >
                <div className="text-3xl mb-3">{ind.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{ind.title}</h3>
                <p className="text-sm text-zinc-400">{ind.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Video highlights */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Watch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1">
              See Swashine in action
            </h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Replace placeholders with your YouTube / Instagram embeds when
              ready.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videoHighlights.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${glassCard} overflow-hidden`}
              >
                <div className="aspect-video bg-black/30 flex items-center justify-center text-4xl">
                  ▶️
                </div>
                <div className="p-5">
                  <span className="text-xs text-brand-400 font-semibold uppercase">
                    {v.tag}
                  </span>
                  <h3 className="font-semibold mt-1">{v.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              See the Difference
            </span>
          </motion.div>
          <div
            className={`${glass} rounded-2xl md:rounded-[2rem] p-4 sm:p-6 md:p-8`}
          >
            <div className="w-full max-w-6xl flex justify-center">
              <BeforeAfter
                title="Before & After"
                description="Upload one photo, then toggle OFF / ON to preview unlit vs illuminated."
                defaultSrc={previewImage}
                defaultOffSrc={previewImage}
                defaultOnSrc={previewImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Client work
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {caseStudies.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${glassCard} p-8`}
              >
                <div className="text-xs text-brand-400 font-semibold uppercase mb-2">
                  {c.place}
                </div>
                <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-zinc-400">{c.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Quality & warranty
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {warrantyPoints.map((w) => (
              <div key={w.title} className={`${glassCard} p-6`}>
                <h3 className="font-semibold mb-2 text-brand-400">{w.title}</h3>
                <p className="text-sm text-zinc-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Customer reviews</h2>
            <Link
              to="/reviews"
              className="text-brand-400 text-sm hover:underline"
            >
              All reviews →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className={`${glassCard} p-6`}>
                <div className="text-brand-400 text-sm mb-2">
                  {"★".repeat(r.rating)}
                </div>
                <p className="text-sm text-zinc-300 line-clamp-4 mb-3">
                  “{r.text}”
                </p>
                <div className="text-xs text-zinc-500">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <InstagramFeed />
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-10 md:py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">FAQs</h2>
            <Link
              to="/faq"
              className="text-brand-400 text-sm hover:underline mt-2 inline-block"
            >
              View all FAQs →
            </Link>
          </div>
          <div className={`${glass} rounded-3xl p-4 md:p-6`}>
            <FaqList items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className={`${glass} rounded-2xl md:rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="relative text-3xl font-bold mb-3">
              Ready to light up your space?
            </h2>
            <p className="relative text-zinc-400 mb-8 max-w-md mx-auto">
              Get a custom quote on WhatsApp or explore our full product range.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Button href="/products" className="text-lg px-10 py-4">
                View all products
              </Button>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}`}
                className="text-lg px-10 py-4"
              >
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
