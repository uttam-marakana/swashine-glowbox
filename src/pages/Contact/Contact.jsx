import { motion } from "framer-motion";
import { company } from "@/data/company";
import ContactForm from "@/components/forms/ContactForm/ContactForm";
import Button from "@/components/common/Button";

export default function Contact() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="text-5xl font-bold mt-3">Contact Us</h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Send an inquiry — it is saved to our system. For the fastest reply,
            use WhatsApp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-xl font-semibold mb-6">Send an Inquiry</h2>
            <ContactForm />
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <div className="text-brand-400 text-sm mb-2">📍 Address</div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {company.address}
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <div className="text-brand-400 text-sm mb-2">
                📞 Phone / WhatsApp
              </div>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                className="text-lg font-medium hover:text-brand-400 transition"
              >
                {company.phone}
              </a>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <div className="text-brand-400 text-sm mb-2">✉️ Email</div>
              <a
                href={`mailto:${company.email}`}
                className="hover:text-brand-400 transition"
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
