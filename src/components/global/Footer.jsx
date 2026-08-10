import { Link } from 'react-router-dom';
import { company } from '@/data/company';
import logo from '@/assets/images/logo-swashine.png';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="Swashine Glowbox" className="h-12 w-auto object-contain" />
          </Link>
          <p className="text-sm text-zinc-500">Premium LED Illuminated Displays<br />Made in Rajkot, Gujarat</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-zinc-400">
            <Link to="/products" className="block hover:text-white">Products</Link>
            <Link to="/custom" className="block hover:text-white">Custom Orders</Link>
            <Link to="/about" className="block hover:text-white">About Us</Link>
            <Link to="/contact" className="block hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <a href={`https://wa.me/${company.whatsapp}`} className="text-lg hover:text-brand-400 flex items-center gap-2">
            {company.phone}
          </a>
          <p className="mt-2 text-sm text-zinc-500">{company.email}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <a href={company.instagram} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-pink-400">
            @swashine_glowbox
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-600 mt-12">
        © {new Date().getFullYear()} Swastik Industries • All Rights Reserved • Made with ❤️ in Gujarat
      </div>
    </footer>
  );
}
