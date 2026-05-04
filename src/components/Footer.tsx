import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 md:py-8 md:px-8">
        <p className="text-sm text-zinc-400">
          Ghar+ makes premium student housing and everyday services simple, safe,
          and reliable.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <div>
            <p className="text-sm font-medium text-zinc-50">Need help choosing?</p>
            <p className="text-xs text-zinc-400">Talk to our support on WhatsApp.</p>
          </div>
          <a
            href={getWhatsAppLink("Hi Ghar+, I want to inquire about your listings.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-glow transition hover:bg-emerald-300 w-full sm:w-auto justify-center"
          >
            <MessageCircle size={16} />
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
