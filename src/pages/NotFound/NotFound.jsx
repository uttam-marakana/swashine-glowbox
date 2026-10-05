import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Package, MessageCircle, ArrowLeft } from "lucide-react";
import { company } from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden flex items-center">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 right-0 w-[480px] h-[480px] rounded-full bg-brand-500/15 blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="page-container w-full">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="relative mb-8"
          >
            <motion.h1
              className="text-[7rem] sm:text-[9rem] md:text-[11rem] font-bold leading-none tracking-tighter select-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.95) 0%, rgba(245,158,11,0.6) 40%, rgba(255,255,255,0.15) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              404
            </motion.h1>

            {/* Soft pulse ring behind number */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-brand-400/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-4 mb-10"
          >
            <span
              className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-xs font-semibold tracking-widest uppercase`}
            >
              Page not found
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              This page lost its <span className="text-brand-400">glow</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              The link may be broken or the page was moved. Head back home or
              explore our LED glowboxes.
            </p>
          </motion.div>

          {/* Glass action card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className={`${glass} rounded-[2rem] p-6 sm:p-8`}
          >
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-6">
              <Button href="/" className="inline-flex items-center gap-2">
                <Home size={18} />
                Back to Home
              </Button>
              <Button
                href="/products"
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                <Package size={18} />
                View products
              </Button>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                  "Hi Swashine, I landed on a missing page and need help.",
                )}`}
                className="inline-flex items-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp us
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
              <Link
                to="/how-it-works"
                className="hover:text-brand-400 transition inline-flex items-center gap-1"
              >
                How it works
              </Link>
              <Link
                to="/custom"
                className="hover:text-brand-400 transition inline-flex items-center gap-1"
              >
                Custom size
              </Link>
              <Link
                to="/contact"
                className="hover:text-brand-400 transition inline-flex items-center gap-1"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="hover:text-brand-400 transition inline-flex items-center gap-1"
              >
                FAQ
              </Link>
            </div>
          </motion.div>

          {/* Back hint */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => window.history.back()}
            className={`mt-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-brand-400 transition ${glassHover} px-4 py-2 rounded-full`}
          >
            <ArrowLeft size={16} />
            Go back to previous page
          </motion.button>
        </div>
      </div>
    </div>
  );
}
