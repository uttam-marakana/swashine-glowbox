import { motion } from 'framer-motion';
import { company } from '@/data/company';
import Button from '@/components/common/Button';

export default function Contact() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-4">
          Ready to Light Up Your Space?
        </motion.h1>
        <p className="text-xl text-zinc-400 mb-12">Speak directly with our team on WhatsApp for the fastest response.</p>
        <Button variant="whatsapp" href={`https://wa.me/${company.whatsapp}`} className="text-xl px-14 py-5">
          Message us on WhatsApp
        </Button>
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-brand-400 mb-2">📍 Address</div>
            <div className="text-sm">{company.address}</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-brand-400 mb-2">📞 Phone / WhatsApp</div>
            <div className="text-lg font-medium">{company.phone}</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="text-brand-400 mb-2">✉️ Email</div>
            <div>{company.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
