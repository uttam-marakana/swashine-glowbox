import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-brand-500 hover:bg-brand-600 text-black disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'border border-white/50 hover:border-brand-400 text-white disabled:opacity-50',
  whatsapp: 'bg-green-500 hover:bg-green-600 text-white disabled:opacity-50',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all active:scale-[0.98]';
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
