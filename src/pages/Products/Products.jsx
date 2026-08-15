import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  products,
  company,
  orderNotes,
  sizeFilters,
  priceFilters,
} from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Products() {
  const [sizeFilter, setSizeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSize = sizeFilter === "all" || p.sizeKey === sizeFilter;
      const matchPrice = priceFilter === "all" || p.priceRange === priceFilter;
      return matchSize && matchPrice;
    });
  }, [sizeFilter, priceFilter]);

  const getQuoteUrl = (name) =>
    `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
      `Hi, I am interested in ${name}. Please share pricing and details.`,
    )}`;

  const chip = (active) =>
    active
      ? "bg-brand-500 text-black"
      : `${glass} text-zinc-300 hover:bg-white/[0.08]`;

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
          className="text-center mb-12"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Product Range
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Our Premium Glowboxes
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Manufacturer direct from Rajkot • Heavy duty aluminium frames •
            Custom sizes available
          </p>
        </motion.div>

        {/* Filters */}
        <div className={`${glass} rounded-3xl p-5 md:p-6 mb-10 space-y-4`}>
          <div>
            <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Filter by Size
            </div>
            <div className="flex flex-wrap gap-2">
              {sizeFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setSizeFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${chip(
                    sizeFilter === f.key,
                  )}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Filter by Price
            </div>
            <div className="flex flex-wrap gap-2">
              {priceFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setPriceFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${chip(
                    priceFilter === f.key,
                  )}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            Showing {filtered.length} of {products.length} products
            {(sizeFilter !== "all" || priceFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSizeFilter("all");
                  setPriceFilter("all");
                }}
                className="ml-3 text-brand-400 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            className={`${glass} rounded-3xl py-20 text-center text-zinc-400`}
          >
            <p className="text-lg mb-4">No products match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSizeFilter("all");
                setPriceFilter("all");
              }}
              className="text-brand-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${glassCard} overflow-hidden flex flex-col`}
              >
                <Link to={`/products/${p.slug}`} className="block">
                  <div className="h-52 bg-black/20 flex items-center justify-center relative overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <span className="text-6xl">💡</span>
                    )}
                    {p.badge && (
                      <span className="absolute top-4 right-4 bg-brand-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-brand-400 mb-1">
                    {p.category}
                  </div>
                  <Link to={`/products/${p.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-brand-400 transition">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="text-sm text-zinc-500 mb-1">
                    Size: <span className="text-white">{p.size}</span>
                  </div>
                  <div className="text-sm text-brand-400/90 mb-3">
                    {p.priceLabel}
                  </div>
                  {p.note && (
                    <div className="text-xs text-amber-500/80 mb-3">
                      {p.note}
                    </div>
                  )}
                  <div className="mt-auto flex gap-2">
                    <Link to={`/products/${p.slug}`} className="">
                      <Button
                        variant="secondary"
                        className="w-full text-sm py-2.5"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      href={getQuoteUrl(p.name)}
                      className="flex-1 text-sm py-2.5"
                    >
                      Quote
                    </Button>
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
          className={`${glass} rounded-[2rem] mt-20 p-8 max-w-3xl mx-auto`}
        >
          <h3 className="text-xl font-semibold mb-4 text-brand-400">
            Order Notes
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {orderNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">~</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 mt-4">
            * Price ranges are approximate. Final quote depends on print, finish
            and quantity.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
