import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  company,
  features,
  products,
  stats,
  howItWorks,
  industries,
  warrantyPoints,
  caseStudies,
  faqs,
  sizeCompare,
  reviews,
  videoHighlights,
} from '@/data/company';
import Button from '@/components/common/Button';
import BeforeAfter from '@/components/common/BeforeAfter';
import FaqList from '@/components/common/FaqList';
import { Zap, RefreshCw, Shield, Ruler } from 'lucide-react';

const iconMap = { Zap, RefreshCw, Shield, Ruler };

/** Shared glass panel classes (iOS-style frosted glass) */
const glass =
  'bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]';
const glassHover =
  'hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300';
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Home() {
  const heroProduct =
    products.find((p) => p.badge === 'Popular' && p.image) ||
    products.find((p) => p.image);

  return (
    <>
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-brand-500/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full bg-brand-600/10 blur-[110px]" />
      </div>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div
              className={`inline-flex items-center gap-2 ${glass} px-5 py-2 rounded-full text-sm`}
            >
              <span>🇮🇳</span>
              <span className="text-zinc-200">Made in Gujarat • Manufacturer Direct</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter">
              LIGHT UP
              <br />
              YOUR{' '}
              <span className="text-brand-400 drop-shadow-[0_0_28px_rgba(251,191,36,0.35)]">
                BRAND
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed">
              Premium LED Glowboxes with tool-free poster change. Perfect for retail, temples,
              restaurants & exhibitions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/products">Explore Products</Button>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}?text=Hi%20Swashine%2C%20I%20want%20a%20quote`}
              >
                Get Quote on WhatsApp
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm pt-1">
              {['Custom Sizes', '1 Year Warranty', '5–6 Days Delivery'].map((t) => (
                <span
                  key={t}
                  className={`${glass} px-3 py-1.5 rounded-full text-green-400/90 text-xs font-medium`}
                >
                  ✔ {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div
              className={`w-full max-w-md aspect-square ${glassCard} flex items-center justify-center overflow-hidden p-8 relative`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
              {heroProduct?.image ? (
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="text-center p-8 relative">
                  <div className="text-7xl mb-4">💡</div>
                  <div className="text-brand-400 font-semibold text-lg">Swashine Glowbox</div>
                  <div className="text-zinc-500 text-sm mt-1">Premium LED Displays</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6">
        <div className={`max-w-6xl mx-auto ${glass} rounded-[2rem] px-6 py-10`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-brand-400">{s.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${glassCard} p-6`}
              >
                <div className="text-brand-400 font-bold text-sm mb-2">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Swashine Glowbox?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${glassCard} p-8`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-400/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{f.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                Bestsellers
              </span>
              <h2 className="text-4xl font-bold mt-2">Featured products</h2>
            </div>
            <Link to="/products" className="text-brand-400 hover:underline text-sm font-medium">
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
                  <div className="h-44 bg-black/20 flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
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
                    <p className="text-sm text-brand-400 mt-2">{p.priceLabel}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

            {/* Size compare */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Compare sizes</h2>
          <p className="text-zinc-400 text-center text-sm mb-10">
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
                        i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-white">{row.size}</td>
                      <td className="px-5 py-3.5 text-zinc-400">{row.bestFor}</td>
                      <td className="px-5 py-3.5 text-zinc-400">{row.type}</td>
                      <td className="px-5 py-3.5 text-brand-400">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Industries we serve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.a
                key={ind.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                  `Hi, I need a glowbox for: ${ind.query}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${glassCard} p-6 block`}
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
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Watch
            </span>
            <h2 className="text-4xl font-bold mt-2">See Swashine in action</h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Replace placeholders with your YouTube / Instagram embeds when ready.
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
                  <span className="text-xs text-brand-400 font-semibold uppercase">{v.tag}</span>
                  <h3 className="font-semibold mt-1">{v.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
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
          <div className={`${glass} rounded-[2rem] p-6 md:p-8`}>
            <BeforeAfter
              title="Before & After"
              description="Upload OFF and ON photos of any glowbox or print to compare lighting side by side."
            />
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Client work</h2>
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
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Quality & warranty</h2>
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
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="text-4xl font-bold">Customer reviews</h2>
            <Link to="/reviews" className="text-brand-400 text-sm hover:underline">
              All reviews →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className={`${glassCard} p-6`}>
                <div className="text-brand-400 text-sm mb-2">{'★'.repeat(r.rating)}</div>
                <p className="text-sm text-zinc-300 line-clamp-4 mb-3">“{r.text}”</p>
                <div className="text-xs text-zinc-500">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">FAQs</h2>
            <Link to="/faq" className="text-brand-400 text-sm hover:underline mt-2 inline-block">
              View all FAQs →
            </Link>
          </div>
          <div className={`${glass} rounded-3xl p-4 md:p-6`}>
            <FaqList items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`${glass} rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="relative text-3xl font-bold mb-3">Become a dealer</h2>
            <p className="relative text-zinc-400 mb-8 max-w-md mx-auto">
              Trade pricing and bulk supply across India. Partner with a Gujarat-based manufacturer.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Button href="/dealers">Dealer enquiry</Button>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                  'Hi, I want dealer / distributor pricing.'
                )}`}
              >
                WhatsApp trade
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Ready to light up your space?</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Get a custom quote on WhatsApp or explore our full product range.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
      </section>
    </>
  );
}