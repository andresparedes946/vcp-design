"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whatsapp, whatsappHref } from "@/lib/site";
import { useSiteReady } from "./Preloader";

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Acceso directo a WhatsApp. Fijo, siempre visible, con el mensaje de
 * presupuesto ya escrito para que el contacto empiece con contexto.
 */
export function WhatsAppFab() {
  const ready = useSiteReady();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[120] sm:bottom-8 sm:right-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.4, y: 28 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Pulso: dos anillos desfasados, muy tenues. */}
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-signal/25 [animation:fab-pulse_3.2s_ease-out_infinite]" />
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-signal/20 [animation:fab-pulse_3.2s_ease-out_infinite_1.6s]" />

        <AnimatePresence>
          {open && (
            <motion.span
              key="tooltip"
              role="tooltip"
              className="glass absolute right-[calc(100%+0.85rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2.5 text-[0.8rem] font-medium text-chrome shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:block"
              initial={{ opacity: 0, x: 14, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 14, scale: 0.92 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              {whatsapp.tooltip}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escribir por WhatsApp — ${whatsapp.tooltip}`}
          data-cursor="CHAT"
          onHoverStart={() => setOpen(true)}
          onHoverEnd={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-signal/30 bg-gradient-to-br from-[#1c3a2e] to-[#0d1b16] text-signal shadow-[0_0_0_1px_rgba(52,211,153,0.12),0_10px_34px_-8px_rgba(52,211,153,0.45)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_14px_46px_-6px_rgba(52,211,153,0.7)] sm:h-16 sm:w-16"
        >
          <WhatsAppGlyph className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 sm:h-7 sm:w-7" />
        </motion.a>
      </motion.div>
    </div>
  );
}
