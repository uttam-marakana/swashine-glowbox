import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function StickyWhatsApp() {
  const href = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Hi Swashine, I want to know more about your glowboxes.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold pl-4 pr-5 py-3.5 rounded-full shadow-lg shadow-green-500/30 transition hover:scale-105"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline text-sm">WhatsApp</span>
    </a>
  );
}
