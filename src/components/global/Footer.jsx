import { useState } from "react";
import { Link } from "react-router-dom";
import { company, footerLinks } from "@/data/company";
import logo from "@/assets/images/logo-swashine.png";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <footer className="bg-black border-t border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src={logo}
                alt="Swashine Glowbox"
                className="h-24 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-zinc-500">
              Premium LED Illuminated Displays
              <br />
              Made in Rajkot, Gujarat
            </p>

            <p className="text-xs text-zinc-600 mt-3">Swastik Industries</p>
          </div>

          {/* Desktop Footer Menus */}
          <div className="hidden lg:block">
            <h4 className="font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-2 text-sm text-zinc-400">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/dealers"
                  className="block hover:text-white transition-colors"
                >
                  Dealers
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="block hover:text-white transition-colors"
                >
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="font-semibold mb-4">Contact</h4>

            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  className="text-lg hover:text-brand-400 transition-colors"
                >
                  {company.phone}
                </a>
              </li>

              <li>
                <p className="text-sm text-zinc-500">{company.email}</p>
              </li>

              <li>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {company.address}
                </p>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="font-semibold mb-4">Follow Us</h4>

            <ul>
              <li>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-400 hover:text-pink-400 transition-colors"
                >
                  @swashine_glowbox
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile & Tablet Accordion */}
          <div className="lg:hidden col-span-full divide-y divide-zinc-800">
            {/* Quick Links */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("quick-links")}
                className="flex w-full items-center justify-between py-4 text-left font-semibold"
                aria-expanded={openSection === "quick-links"}
              >
                <span>Quick Links</span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    openSection === "quick-links" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openSection === "quick-links"
                    ? "grid-rows-[1fr] opacity-100 pb-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-3 text-sm text-zinc-400">
                    {footerLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="block hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}

                    <li>
                      <Link
                        to="/dealers"
                        className="block hover:text-white transition-colors"
                      >
                        Dealers
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/how-it-works"
                        className="block hover:text-white transition-colors"
                      >
                        How it works
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("contact")}
                className="flex w-full items-center justify-between py-4 text-left font-semibold"
                aria-expanded={openSection === "contact"}
              >
                <span>Contact</span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    openSection === "contact" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openSection === "contact"
                    ? "grid-rows-[1fr] opacity-100 pb-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={`https://wa.me/${company.whatsapp}`}
                        className="text-lg hover:text-brand-400 transition-colors"
                      >
                        {company.phone}
                      </a>
                    </li>

                    <li>
                      <p className="text-sm text-zinc-500">{company.email}</p>
                    </li>

                    <li>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {company.address}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("follow-us")}
                className="flex w-full items-center justify-between py-4 text-left font-semibold"
                aria-expanded={openSection === "follow-us"}
              >
                <span>Follow Us</span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    openSection === "follow-us" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openSection === "follow-us"
                    ? "grid-rows-[1fr] opacity-100 pb-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul>
                    <li>
                      <a
                        href={company.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-zinc-400 hover:text-pink-400 transition-colors"
                      >
                        @swashine_glowbox
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-800 mt-10 pt-6">
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-x-6 text-center text-xs text-zinc-600">
            <li>© {new Date().getFullYear()} Swastik Industries</li>

            <li className="hidden sm:block" aria-hidden="true">
              •
            </li>
            <li>All Rights Reserved</li>

            <li className="hidden sm:block" aria-hidden="true">
              •
            </li>
            <li>Made with ❤️ in Gujarat</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
