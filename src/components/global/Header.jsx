import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company, navLinks } from "@/data/company";
import Button from "@/components/common/Button";
import logo from "@/assets/images/logo-swashine.png";

const glass =
  "bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y < 80) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
        setOpen(false);
      } else if (delta < -8) {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${glass} transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="Swashine Glowbox"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav — large screens only */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-brand-400 transition ${
                  location.pathname === link.path
                    ? "text-brand-400"
                    : "text-zinc-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="whatsapp"
              href={`https://wa.me/${company.whatsapp}`}
              className="hidden lg:inline-flex text-sm py-2.5"
            >
              <Phone size={16} /> WhatsApp
            </Button>

            {/* Hamburger — mobile + tablet */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-100 hover:bg-white/10 transition"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer overlay + panel (mobile + tablet) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[min(100%,20rem)] sm:w-80 lg:hidden
                bg-zinc-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl
                flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="text-sm font-semibold text-zinc-200">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3.5 rounded-2xl text-base font-medium transition ${
                        active
                          ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
                          : "text-zinc-300 hover:bg-white/[0.06] border border-transparent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-3">
                <Button
                  variant="whatsapp"
                  href={`https://wa.me/${company.whatsapp}`}
                  className="w-full"
                >
                  <Phone size={16} /> Contact on WhatsApp
                </Button>
                <p className="text-[11px] text-zinc-500 text-center">
                  {company.phone}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
