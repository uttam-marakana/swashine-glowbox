import { Link } from "react-router-dom";
import { company, footerLinks } from "@/data/company";
import logo from "@/assets/images/logo-swashine.png";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
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
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-zinc-400">
            {footerLinks.map((l) => (
              <Link key={l.path} to={l.path} className="block hover:text-white">
                {l.label}
              </Link>
            ))}
            <Link to="/dealers" className="block hover:text-white">
              Dealers
            </Link>
            <Link to="/how-it-works" className="block hover:text-white">
              How it works
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            className="text-lg hover:text-brand-400"
          >
            {company.phone}
          </a>
          <p className="mt-2 text-sm text-zinc-500">{company.email}</p>
          <p className="mt-3 text-xs text-zinc-600 leading-relaxed">
            {company.address}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <a
            href={company.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-400 hover:text-pink-400"
          >
            @swashine_glowbox
          </a>
        </div>
      </div>
      <div className="flex align-center justify-center text-center text-xs text-zinc-600 mt-12">
        <p>© {new Date().getFullYear()} Swastik Industries</p>
        <p>All Rights Reserved</p>
        <p>Made with ❤️ in Gujarat</p>
      </div>
    </footer>
  );
}
