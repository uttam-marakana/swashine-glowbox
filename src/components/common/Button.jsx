import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-brand-500 hover:bg-brand-600 text-black',
  secondary: 'border border-white/50 hover:border-brand-400 text-white',
  whatsapp: 'bg-green-500 hover:bg-green-600 text-white',
};

export default function Button({ children, variant = 'primary', className = '', onClick, href, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all active:scale-[0.98]';
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={href} target="_blank" rel="noreferrer" className={classes} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick} className={classes} {...props}>
      {children}
    </motion.button>
  );
}
