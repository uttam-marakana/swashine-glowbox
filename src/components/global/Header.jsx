import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company, navLinks } from "@/data/company";
import Button from "@/components/common/Button";
import logo from "@/assets/images/logo-swashine.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      // Always show near top
      if (y < 80) {
        setVisible(true);
      } else if (delta > 8) {
        // scrolling down
        setVisible(false);
        setOpen(false);
      } else if (delta < -8) {
        // scrolling up
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-brand-500/20 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Swashine Glowbox"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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

        <div className="flex items-center gap-3">
          <Button
            variant="whatsapp"
            href={`https://wa.me/${company.whatsapp}`}
            className="hidden md:inline-flex text-sm py-2.5"
          >
            <Phone size={16} /> WhatsApp
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-2xl"
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-zinc-900 border-t border-zinc-800"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block text-lg hover:text-brand-400"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}`}
                className="w-full mt-4"
              >
                Contact on WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
