import { motion } from 'framer-motion';

const items = [
  { title: "Temple Arch Installation", type: "Religious" },
  { title: "Retail Showroom Display", type: "Retail" },
  { title: "Restaurant Menu Board", type: "Hospitality" },
  { title: "Jumbo Commercial Sign", type: "Commercial" },
  { title: "Boutique Store Glowbox", type: "Retail" },
  { title: "Corporate Reception", type: "Office" },
];

export default function Gallery() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Installation Gallery</h1>
          <p className="text-zinc-400 text-xl">Real projects powered by Swashine Glowbox</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden relative border border-zinc-800 group">
              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:scale-110 transition">💡</div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-brand-400">{item.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
