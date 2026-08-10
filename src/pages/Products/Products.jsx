import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, company, orderNotes, sizeFilters, priceFilters } from '@/data/company';
import Button from '@/components/common/Button';

export default function Products() {
  const [sizeFilter, setSizeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSize = sizeFilter === 'all' || p.sizeKey === sizeFilter;
      const matchPrice = priceFilter === 'all' || p.priceRange === priceFilter;
      return matchSize && matchPrice;
    });
  }, [sizeFilter, priceFilter]);

  const getQuoteUrl = (name) => {
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hi, I am interested in ${name}. Please share pricing and details.`)}`;
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Product Range</span>
          <h1 className="text-5xl font-bold mt-3">Our Premium Glowboxes</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Manufacturer direct from Rajkot • Heavy duty aluminium frames • Custom sizes available
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div>
            <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Filter by Size</div>
            <div className="flex flex-wrap gap-2">
              {sizeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSizeFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    sizeFilter === f.key
                      ? 'bg-brand-500 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Filter by Price</div>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setPriceFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    priceFilter === f.key
                      ? 'bg-brand-500 text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            Showing {filtered.length} of {products.length} products
            {(sizeFilter !== 'all' || priceFilter !== 'all') && (
              <button
                onClick={() => { setSizeFilter('all'); setPriceFilter('all'); }}
                className="ml-3 text-brand-400 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            <p className="text-lg mb-4">No products match your filters.</p>
            <button onClick={() => { setSizeFilter('all'); setPriceFilter('all'); }} className="text-brand-400 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-brand-500/40 transition group flex flex-col"
              >
                <Link to={`/products/${p.slug}`} className="block">
                  <div className="h-52 bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition" />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition">💡</span>
                    )}
                    {p.badge && (
                      <span className="absolute top-4 right-4 bg-brand-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-brand-400 mb-1">{p.category}</div>
                  <Link to={`/products/${p.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-brand-400 transition">{p.name}</h3>
                  </Link>
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{p.description}</p>
                  <div className="text-sm text-zinc-500 mb-1">Size: <span className="text-white">{p.size}</span></div>
                  <div className="text-sm text-brand-400/90 mb-3">{p.priceLabel}</div>
                  {p.note && <div className="text-xs text-amber-500/80 mb-3">{p.note}</div>}
                  <div className="mt-auto flex gap-2">
                    <Link to={`/products/${p.slug}`} className="flex-1">
                      <Button variant="secondary" className="w-full text-sm py-2.5">View Details</Button>
                    </Link>
                    <Button href={getQuoteUrl(p.name)} className="flex-1 text-sm py-2.5">Quote</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4 text-brand-400">Order Notes</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {orderNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">~</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 mt-4">* Price ranges are approximate. Final quote depends on print, finish and quantity.</p>
        </motion.div>
      </div>
    </div>
  );
}
