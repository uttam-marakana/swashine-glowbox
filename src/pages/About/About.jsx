import { motion } from 'framer-motion';
import { company } from '@/data/company';

export default function About() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-brand-400 text-sm tracking-widest uppercase">Swastik Industries</span>
            <h1 className="text-5xl font-bold leading-tight mt-3 mb-8">Crafted with Pride in Rajkot, Gujarat</h1>
            <p className="text-lg text-zinc-300 mb-8">
              Swashine Glowbox by Swastik Industries is a premium manufacturer of LED illuminated display systems. 
              We specialize in custom sizes with easy poster replacement technology. Proudly Made in India.
            </p>
            <div className="space-y-3 text-sm text-zinc-400">
              <div>📍 {company.address}</div>
              <div>📞 {company.phone}</div>
              <div>✉️ {company.email}</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800">
            <h3 className="text-2xl font-semibold mb-6">Our Promise</h3>
            <ul className="space-y-4">
              {['Heavy-duty Aluminium Frame', 'Tool-free Poster Change', '1 Year SMPS Warranty', 'Custom Size Specialist', 'Manufacturer Direct Pricing'].map((item) => (
                <li key={item} className="flex items-center gap-3"><span className="text-brand-400">✔</span> {item}</li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-zinc-700">
              <div className="text-sm text-zinc-500">Public Face</div>
              <div className="font-semibold text-lg">{company.founder.name}</div>
              <div className="text-sm text-zinc-400">{company.founder.role}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
