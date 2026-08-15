import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-black disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-white/50 hover:border-brand-400 text-white disabled:opacity-50",
  whatsapp: "bg-green-500 hover:bg-green-600 text-white disabled:opacity-50",
};

function isExternal(href) {
  if (!href) return false;
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.includes("wa.me/")
  );
}

function isWhatsApp(href) {
  if (!href) return false;
  return href.includes("wa.me") || href.includes("whatsapp.com");
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  href,
  type = "button",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all active:scale-[0.98]";
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  // Internal routes → same tab
  if (href && !isExternal(href)) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex"
      >
        <Link to={href} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // WhatsApp / external → new tab
  if (href) {
    const openNewTab = isWhatsApp(href) || isExternal(href);
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        {...(openNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
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
