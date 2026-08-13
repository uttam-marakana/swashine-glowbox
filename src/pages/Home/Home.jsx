import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { company, features, products, stats, useCases } from '@/data/company';
import Button from '@/components/common/Button';
import BeforeAfter from '@/components/common/BeforeAfter';
import { Zap, RefreshCw, Shield, Ruler } from 'lucide-react';

const iconMap = { Zap, RefreshCw, Shield, Ruler };

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur px-5 py-2 rounded-full text-sm border border-brand-500/30">
              <span>🇮🇳</span>
              <span>Made in Gujarat • Manufacturer Direct</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter">
              LIGHT UP<br />YOUR <span className="text-brand-400">BRAND</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg">
              Premium LED Glowboxes with tool-free poster change. Perfect for retail, temples, restaurants & exhibitions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/products">Explore Products</Button>
              <Button variant="secondary" href={`https://wa.me/${company.whatsapp}?text=Hi%20Swashine%2C%20I%20want%20a%20quote`}>
                Get Quote on WhatsApp
              </Button>
            </div>
            <div className="flex gap-8 text-sm pt-2">
              <span className="flex items-center gap-2 text-green-400">✔ Custom Sizes</span>
              <span className="flex items-center gap-2 text-green-400">✔ 1 Year Warranty</span>
              <span className="flex items-center gap-2 text-green-400">✔ Fast Delivery</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 glow flex flex-col items-center justify-center p-10">
              <div className="text-7xl mb-6">💡</div>
              <div className="text-2xl font-bold text-brand-400">Arch Glowbox</div>
              <div className="text-zinc-500 mt-2">24 × 36 in • Premium</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-bold text-brand-400">{s.value}</div>
              <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">
            Why Swashine Glowbox?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-brand-500/40 transition">
                  <Icon className="w-10 h-10 text-brand-400 mb-5" />
                  <h4 className="text-xl font-semibold mb-3">{f.title}</h4>
                  <p className="text-zinc-400 text-sm">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Bestsellers</span>
              <h2 className="text-4xl font-bold mt-2">Featured Products</h2>
            </div>
            <Link to="/products" className="text-brand-400 hover:underline text-sm font-medium">View all products →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.badge).slice(0, 4).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden hover:border-brand-500/40 transition group">
                <Link to={`/products/${p.slug}`}>
                  <div className="h-44 bg-zinc-800 flex items-center justify-center">
                    {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" /> : <span className="text-5xl">💡</span>}
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-brand-400">{p.category}</div>
                    <h3 className="font-semibold mt-1 group-hover:text-brand-400 transition">{p.name}</h3>
                    <div className="text-sm text-zinc-500 mt-1">{p.size}</div>
                    <div className="text-sm text-zinc-400 mt-2">{p.priceLabel}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After with image upload */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">See the Difference</span>
          </motion.div>
          <BeforeAfter
            title="Before & After"
            description="Upload OFF and ON photos of any glowbox or print to compare lighting side by side."
          />
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">Perfect For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((u, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-brand-500/30 transition">
                <h4 className="font-semibold text-lg mb-2">{u.title}</h4>
                <p className="text-sm text-zinc-400">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Light Up Your Space?</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">Get a custom quote on WhatsApp or explore our full product range.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/products" className="text-lg px-10 py-4">View All Products</Button>
          <Button variant="whatsapp" href={`https://wa.me/${company.whatsapp}`} className="text-lg px-10 py-4">WhatsApp Us</Button>
        </div>
      </section>
    </>
  );
}
