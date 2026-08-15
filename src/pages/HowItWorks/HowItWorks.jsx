import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  howItWorks,
  installationTips,
  artworkGuidelines,
  company,
} from "@/data/company";
import Button from "@/components/common/Button";

export default function HowItWorks() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            Process
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">How it works</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            From size selection to delivery — simple steps to light up your
            space.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {howItWorks.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
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
            <div
              key={t.title}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950"
            >
              <h4 className="font-semibold mb-2">{t.title}</h4>
              <p className="text-sm text-zinc-400">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Artwork guidelines</h2>
        <div className="space-y-3 mb-14">
          {artworkGuidelines.map((g) => (
            <div
              key={g.title}
              className="flex gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              <div className="text-brand-400 font-semibold text-sm w-28 shrink-0">
                {g.title}
              </div>
              <p className="text-sm text-zinc-400">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
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
