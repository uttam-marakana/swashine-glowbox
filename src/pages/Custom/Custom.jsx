import { useState } from 'react';
import { motion } from 'framer-motion';
import { company } from '@/data/company';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function Custom() {
  const [width, setWidth] = useState(24);
  const [height, setHeight] = useState(36);
  const [quote, setQuote] = useState(null);

  const calculate = () => {
    const area = width * height;
    const estimated = Math.round(4500 * (area / 864));
    setQuote({ size: `${width}" × ${height}"`, price: `₹${estimated.toLocaleString('en-IN')}` });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Custom Size Calculator</h1>
          <p className="text-zinc-400">Get instant estimated pricing for your exact requirements</p>
        </motion.div>
        <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Input label="Width (inches)" type="number" value={width} onChange={(e) => setWidth(+e.target.value || 24)} />
            <Input label="Height (inches)" type="number" value={height} onChange={(e) => setHeight(+e.target.value || 36)} />
          </div>
          <Button onClick={calculate} className="w-full text-lg py-4">Calculate Price</Button>
          {quote && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-green-900/20 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="text-brand-400 text-sm mb-1">ESTIMATED PRICE</div>
              <div className="text-3xl font-bold mb-1">{quote.size}</div>
              <div className="text-5xl font-bold mb-4">{quote.price}</div>
              <p className="text-sm text-zinc-400 mb-6">Approximate quote. Final pricing depends on materials & finish.</p>
              <Button variant="secondary" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Custom Glowbox: ${quote.size} → ${quote.price}`)}`}>
                Confirm on WhatsApp →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
