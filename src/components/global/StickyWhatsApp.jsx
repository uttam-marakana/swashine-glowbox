import { MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";

export default function StickyWhatsApp() {
  const phoneNumber = company.phone.replace(/[^\d+]/g, "");
  const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Hi Swashine, I have an inquiry about your LED Glowboxes.",
  )}`;

  return (
    <>
      <div
        className="fixed bottom-0 inset-x-0 z-[55] flex items-center gap-2 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur-lg md:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={`tel:${phoneNumber}`}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-zinc-300 transition hover:text-white"
        >
          <Phone size={18} />
          Call Us
        </a>
        <div className="h-6 w-px bg-zinc-800" aria-hidden="true" />
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-500 active:scale-95"
        >
          <MessageCircle size={18} />
          WhatsApp Quote
        </a>
      </div>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-green-500 py-3.5 pl-4 pr-5 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-105 hover:bg-green-600 md:flex"
      >
        <MessageCircle size={22} />
        <span className="hidden text-sm sm:inline">WhatsApp</span>
      </a>
    </>
  );
}
