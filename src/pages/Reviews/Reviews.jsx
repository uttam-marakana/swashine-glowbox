import { motion } from "framer-motion";
import { reviews, company } from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Reviews() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Customer reviews
          </h1>
          <p className="text-zinc-400 mt-4">
            What buyers say about Swashine Glowbox.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`${glassCard} p-8`}
            >
              <div className="text-brand-400 mb-3">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>

              <p className="text-zinc-300 leading-relaxed mb-4">“{r.text}”</p>

              <div className="text-sm text-zinc-500">— {r.name}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="whatsapp"
            href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
              "Hi, I would like to share feedback about my Swashine order.",
            )}`}
          >
            Share your feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
