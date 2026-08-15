import { motion } from "framer-motion";
import { faqs, company } from "@/data/company";
import FaqList from "@/components/common/FaqList";
import Button from "@/components/common/Button";

export default function Faq() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Frequently asked questions
          </h1>
          <p className="text-zinc-400 mt-4">
            Quick answers about sizes, pricing, delivery and warranty.
          </p>
        </motion.div>
        <FaqList items={faqs} />
        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm mb-4">Still have a question?</p>
          <Button variant="whatsapp" href={`https://wa.me/${company.whatsapp}`}>
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
