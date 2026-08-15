import { motion } from "framer-motion";
import { company } from "@/data/company";
import ContactForm from "@/components/forms/ContactForm/ContactForm";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Contact() {
  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">Contact Us</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Send an inquiry — it is saved to our system. For the fastest reply,
            use WhatsApp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`lg:col-span-3 ${glassCard} p-8 md:p-10`}
          >
            <h2 className="text-xl font-semibold mb-6">Send an Inquiry</h2>
            <ContactForm />
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className={`${glassCard} p-6`}>
              <div className="text-brand-400 text-sm mb-2">📍 Address</div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {company.address}
              </p>
            </div>
            <div className={`${glassCard} p-6`}>
              <div className="text-brand-400 text-sm mb-2">
                📞 Phone / WhatsApp
              </div>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:text-brand-400 transition"
              >
                {company.phone}
              </a>
            </div>
            <div className={`${glassCard} p-6`}>
              <div className="text-brand-400 text-sm mb-2">✉️ Email</div>
              <a
                href={`mailto:${company.email}`}
                className="hover:text-brand-400 transition break-all"
              >
                {company.email}
              </a>
            </div>
            <Button
              variant="whatsapp"
              href={`https://wa.me/${company.whatsapp}`}
              className="w-full text-base py-4"
            >
              Chat on WhatsApp
            </Button>
            <p className="text-xs text-zinc-500 text-center">
              Typical response time: within a few hours during business days.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
