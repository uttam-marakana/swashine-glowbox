import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { company } from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

/**
 * @param {{
 *   title: string,
 *   effectiveDate?: string,
 *   lastUpdated?: string,
 *   intro?: string,
 *   sections: { id: string, title: string, content: React.ReactNode }[],
 * }} props
 */
export default function PolicyPage({
  title,
  effectiveDate = "05 October 2026",
  lastUpdated = "05 October 2026",
  intro,
  sections = [],
}) {
  const [tocOpen, setTocOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="page-container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${glass} rounded-[2rem] p-8 md:p-12 text-center mb-10 md:mb-14`}
        >
          <span className="text-brand-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Policy
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-4">{title}</h1>
          <p className="text-sm text-zinc-500">
            Effective Date: {effectiveDate}
            <span className="mx-2 text-zinc-700">·</span>
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* TOC — desktop */}
          <aside className="hidden lg:block">
            <div className={`${glass} rounded-2xl p-5 sticky top-28`}>
              <div className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-4">
                On this page
              </div>
              <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left text-sm text-zinc-400 hover:text-brand-400 transition py-1.5 px-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-zinc-600 mr-1.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* TOC — mobile collapsible */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setTocOpen((o) => !o)}
              className={`${glass} w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium`}
            >
              On this page
              <ChevronDown
                size={18}
                className={`text-brand-400 transition ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {tocOpen && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`${glass} mt-2 rounded-2xl p-4 space-y-1`}>
                    {sections.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollTo(s.id)}
                        className="w-full text-left text-sm text-zinc-400 hover:text-brand-400 py-2 px-2"
                      >
                        {String(i + 1).padStart(2, "0")}. {s.title}
                      </button>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          <article className={`${glass} rounded-[2rem] p-6 md:p-10`}>
            {intro && (
              <div className="text-zinc-300 leading-[1.75] text-[16px] md:text-[17px] mb-10 space-y-4">
                {intro}
              </div>
            )}

            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-baseline gap-3">
                    <span className="text-brand-400 text-sm font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="text-zinc-400 leading-[1.75] text-[15px] md:text-[16px] space-y-3 prose-policy">
                    {s.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Contact block */}
            <div
              className={`${glass} rounded-2xl p-6 md:p-8 mt-14 text-center border-brand-500/20`}
            >
              <h3 className="text-xl font-bold mb-2">Need help?</h3>
              <p className="text-zinc-400 text-sm mb-5">
                Contact the Swashine team
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-300 mb-6">
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-brand-400 transition"
                >
                  <Phone size={16} className="text-brand-400" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 hover:text-brand-400 transition"
                >
                  <Mail size={16} className="text-brand-400" />
                  {company.email}
                </a>
              </div>
              <Button href="/contact">Contact us</Button>
              <p className="text-xs text-zinc-600 mt-6 leading-relaxed max-w-md mx-auto">
                Swashine — Swastik Industries
                <br />
                Gate 2, Pan Business Park, Behind Kishan Petrol Pump, Opp. Laxmi
                Hotel, Rajkot, Gujarat – 360022, India
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/** Small helpers for policy body markup */
export function P({ children }) {
  return <p className="text-zinc-400">{children}</p>;
}

export function Ul({ children }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 marker:text-brand-400/70">
      {children}
    </ul>
  );
}

export function Li({ children }) {
  return <li className="leading-relaxed">{children}</li>;
}

export function H3({ children }) {
  return (
    <h3 className="text-base font-semibold text-zinc-200 mt-5 mb-2">
      {children}
    </h3>
  );
}
