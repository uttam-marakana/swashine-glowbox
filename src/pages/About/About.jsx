import { motion } from "framer-motion";
import { company, warrantyPoints, features } from "@/data/company";
import { Zap, RefreshCw, Shield, Ruler } from "lucide-react";

const iconMap = { Zap, RefreshCw, Shield, Ruler };

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function About() {
  return (
    <div className="pt-28 pb-20 relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero row */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm tracking-widest uppercase mb-5`}
            >
              Swastik Industries
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-2 mb-6">
              Crafted with Pride in{" "}
              <span className="text-brand-400">Rajkot, Gujarat</span>
            </h1>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Swashine Glowbox by Swastik Industries is a premium manufacturer
              of LED illuminated display systems. We specialize in custom sizes
              with easy poster replacement technology. Proudly Made in India.
            </p>
            <div
              className={`${glass} rounded-2xl p-5 space-y-3 text-sm text-zinc-300`}
            >
              <div>📍 {company.address}</div>
              <div>📞 {company.phone}</div>
              <div>✉️ {company.email}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${glassCard} p-8 md:p-10`}
          >
            <h3 className="text-2xl font-semibold mb-6">Our Promise</h3>
            <ul className="space-y-4">
              {[
                "Heavy-duty Aluminium Frame",
                "Tool-free Poster Change",
                "1 Year SMPS Warranty",
                "Custom Size Specialist",
                "Manufacturer Direct Pricing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-zinc-200"
                >
                  <span className="w-7 h-7 rounded-full bg-brand-500/15 border border-brand-400/25 flex items-center justify-center text-brand-400 text-xs shrink-0">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-sm text-zinc-500">Public Face</div>
              <div className="font-semibold text-lg mt-1">
                {company.founder.name}
              </div>
              <div className="text-sm text-zinc-400">
                {company.founder.role}
              </div>
              {company.founder.bio && (
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {company.founder.bio}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap;
              return (
                <div key={f.title} className={`${glassCard} p-6`}>
                  <div className="w-11 h-11 rounded-2xl bg-brand-500/15 border border-brand-400/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h4 className="font-semibold mb-2">{f.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Warranty / quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Quality & warranty
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {warrantyPoints.map((w) => (
              <div key={w.title} className={`${glassCard} p-6`}>
                <h3 className="font-semibold mb-2 text-brand-400">{w.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Brand line */}
        <div
          className={`${glass} rounded-[2rem] mt-20 p-8 md:p-12 text-center`}
        >
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
            Brand
          </p>
          <h3 className="text-2xl md:text-3xl font-bold">
            {company.name}{" "}
            <span className="text-zinc-500 font-normal text-lg">
              by {company.parent}
            </span>
          </h3>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            {company.tagline}. {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}
