import { motion } from "framer-motion";
import { FileText, Download, MessageCircle } from "lucide-react";
import { catalogs, company } from "@/data/company";
import Button from "@/components/common/Button";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Catalogs() {
  const requestCatalog = (cat) => {
    const text =
      cat.whatsappNote || `Please send me the catalogue: ${cat.title}`;
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-10 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
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
            Downloads
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Product Catalogs
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Request our latest catalogues and price lists on WhatsApp. We will
            send PDF files directly to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {catalogs.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${glassCard} p-8 flex flex-col`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-400/20 flex items-center justify-center shrink-0">
                  <FileText className="text-brand-400" size={26} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    {cat.type} · {cat.pages}
                  </div>
                  <h3 className="text-xl font-semibold mt-1">{cat.title}</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-6 flex-1 leading-relaxed">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {cat.file ? (
                  <a
                    href={cat.file}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-500 text-black font-semibold text-sm hover:bg-brand-600 transition"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                ) : (
                  <Button
                    href={requestCatalog(cat)}
                    variant="whatsapp"
                    className="text-sm py-2.5"
                  >
                    <MessageCircle size={16} /> Request on WhatsApp
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`${glass} rounded-[2rem] mt-16 p-10 md:p-12 text-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
          <h3 className="relative text-2xl font-bold mb-3">
            Need a custom catalogue?
          </h3>
          <p className="relative text-zinc-400 mb-6 max-w-md mx-auto">
            Dealer packs, project-specific lists, or bulk pricing — message us
            and we will prepare it for you.
          </p>
          <div className="relative">
            <Button
              variant="whatsapp"
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                "Hi, I need a custom product catalogue / dealer price list.",
              )}`}
              className="text-base px-8 py-4"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
