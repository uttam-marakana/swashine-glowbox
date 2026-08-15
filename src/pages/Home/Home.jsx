import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "@/data/company";
import Button from "@/components/common/Button";
import BeforeAfter from "@/components/common/BeforeAfter";
import FaqList from "@/components/common/FaqList";
import { Zap, RefreshCw, Shield, Ruler } from "lucide-react";

const iconMap = { Zap, RefreshCw, Shield, Ruler };

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur px-5 py-2 rounded-full text-sm border border-brand-500/30">
              <span>🇮🇳</span>
              <span>Made in Gujarat • Manufacturer Direct</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter">
              LIGHT UP
              <br />
              YOUR <span className="text-brand-400">BRAND</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg">
              Premium LED Glowboxes with tool-free poster change. Perfect for
              retail, temples, restaurants & exhibitions.
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
            <div className="flex flex-wrap gap-6 text-sm pt-2">
              <span className="flex items-center gap-2 text-green-400">
                ✔ Custom Sizes
              </span>
              <span className="flex items-center gap-2 text-green-400">
                ✔ 1 Year Warranty
              </span>
              <span className="flex items-center gap-2 text-green-400">
                ✔ 5–6 Days Delivery
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="w-full max-w-md aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl shadow-brand-500/10">
              <div className="text-center p-8">
                <div className="text-7xl mb-4">💡</div>
                <div className="text-brand-400 font-semibold text-lg">
                  Swashine Glowbox
                </div>
                <div className="text-zinc-500 text-sm mt-1">
                  Premium LED Displays
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold text-brand-400">
                {s.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >
                <div className="text-brand-400 font-bold text-sm mb-2">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Swashine Glowbox?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 hover:border-brand-500/40 transition"
                >
                  <Icon className="w-10 h-10 text-brand-400 mb-5" />
                  <h4 className="text-xl font-semibold mb-3">{f.title}</h4>
                  <p className="text-zinc-400 text-sm">{f.desc}</p>
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
                  className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden hover:border-brand-500/40 transition group"
                >
                  <div className="h-44 bg-zinc-800 flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-3"
                      />
                    ) : (
                      <span className="text-5xl">💡</span>
                    )}
                  </div>
                  <div className="p-5">
                    {p.badge && (
                      <span className="text-xs bg-brand-500 text-black font-bold px-2 py-0.5 rounded-full">
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
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Compare sizes</h2>
          <p className="text-zinc-400 text-center text-sm mb-10">
            Quick guide to pick the right format for your space.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full text-sm text-left min-w-[640px]">
              <thead className="bg-zinc-900 text-zinc-400">
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
                    className={
                      i % 2 === 0 ? "bg-zinc-950/80" : "bg-zinc-900/40"
                    }
                  >
                    <td className="px-5 py-3 font-medium text-white">
                      {row.size}
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{row.bestFor}</td>
                    <td className="px-5 py-3 text-zinc-400">{row.type}</td>
                    <td className="px-5 py-3 text-brand-400">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Industries we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-brand-500/40 transition block"
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
      <section className="py-24 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Watch
            </span>
            <h2 className="text-4xl font-bold mt-2">See Swashine in action</h2>
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
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
              >
                <div className="aspect-video bg-zinc-800 flex items-center justify-center text-4xl">
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
          <BeforeAfter
            title="Before & After"
            description="Upload OFF and ON photos of any glowbox or print to compare lighting side by side."
          />
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Client work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
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
          <h2 className="text-4xl font-bold text-center mb-12">
            Quality & warranty
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyPoints.map((w) => (
              <div
                key={w.title}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >
                <h3 className="font-semibold mb-2 text-brand-400">{w.title}</h3>
                <p className="text-sm text-zinc-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="py-24 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="text-4xl font-bold">Customer reviews</h2>
            <Link
              to="/reviews"
              className="text-brand-400 text-sm hover:underline"
            >
              All reviews →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
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

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">FAQs</h2>
            <Link
              to="/faq"
              className="text-brand-400 text-sm hover:underline mt-2 inline-block"
            >
              View all FAQs →
            </Link>
          </div>
          <FaqList items={faqs.slice(0, 5)} />
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-3">Become a dealer</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Trade pricing and bulk supply across India. Partner with a
            Gujarat-based manufacturer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/dealers">Dealer enquiry</Button>
            <Button
              variant="whatsapp"
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                "Hi, I want dealer / distributor pricing.",
              )}`}
            >
              WhatsApp trade
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to light up your space?
        </h2>
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
