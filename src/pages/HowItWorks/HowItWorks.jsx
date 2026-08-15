import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  howItWorks,
  installationTips,
  artworkGuidelines,
  company,
} from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function HowItWorks() {
  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Process
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">How it works</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            From size selection to delivery — simple steps to light up your
            space.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {howItWorks.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${glassCard} p-8`}
            >
              <div className="text-brand-400 font-bold text-sm mb-2">
                STEP {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Installation tips</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {installationTips.map((t) => (
            <div key={t.title} className={`${glassCard} p-6`}>
              <h4 className="font-semibold mb-2">{t.title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Artwork guidelines</h2>
        <div className="space-y-3 mb-14">
          {artworkGuidelines.map((g) => (
            <div
              key={g.title}
              className={`flex gap-4 p-5 ${glass} rounded-2xl`}
            >
              <div className="text-brand-400 font-semibold text-sm w-28 shrink-0">
                {g.title}
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        <div
          className={`${glass} rounded-[2rem] p-8 flex flex-wrap gap-4 justify-center`}
        >
          <Button href="/custom">Custom size calculator</Button>
          <Button variant="whatsapp" href={`https://wa.me/${company.whatsapp}`}>
            WhatsApp us
          </Button>
          <Link
            to="/faq"
            className="text-brand-400 self-center text-sm hover:underline"
          >
            Read FAQs →
          </Link>
        </div>
      </div>
    </div>
  );
}
