import { motion } from "framer-motion";
import { faqs, company } from "@/data/company";
import FaqList from "@/components/common/FaqList";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

export default function Faq() {
  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Frequently asked questions
          </h1>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            Quick answers about sizes, pricing, delivery and warranty.
          </p>
        </motion.div>

        <div className={`${glass} rounded-3xl p-4 md:p-6`}>
          <FaqList items={faqs} />
        </div>

        <div className={`${glass} rounded-[2rem] mt-12 p-8 text-center`}>
          <p className="text-zinc-400 text-sm mb-4">Still have a question?</p>
          <Button variant="whatsapp" href={`https://wa.me/${company.whatsapp}`}>
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
