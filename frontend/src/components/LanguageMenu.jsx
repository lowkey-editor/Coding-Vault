import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { languages } from "../data/languages";

const EASE = [0.16, 1, 0.3, 1];

export const LanguageMenu = ({ open, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    if (window.__lenis) window.__lenis.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      if (window.__lenis) window.__lenis.start();
    };
  }, [open, onClose]);

  const pick = (slug) => {
    onClose();
    navigate(`/language/${slug}#basics`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] bg-ink flex flex-col"
          data-testid="language-menu-overlay"
        >
          <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-line">
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-dim" data-testid="language-menu-title">
              07 Languages — pick yours
            </span>
            <button
              onClick={onClose}
              data-testid="language-menu-close"
              aria-label="Close language menu"
              className="group flex items-center gap-2 font-jetbrains text-xs uppercase tracking-[0.25em] text-dim hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Close
              <X size={16} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto" data-lenis-prevent>
            {languages.map((lang, i) => {
              const Icon = lang.iconComponent;
              return (
                <motion.button
                  key={lang.slug}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.55, ease: EASE }}
                  onClick={() => pick(lang.slug)}
                  data-testid={`language-menu-${lang.slug}`}
                  className="group w-full flex items-center gap-6 md:gap-10 px-6 md:px-12 py-6 md:py-8 border-b border-line text-left hover:bg-surface transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-jetbrains text-xs text-dim w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon size={26} className="text-dim group-hover:text-accent transition-colors duration-300 shrink-0" />
                  <span className="font-clash font-medium text-2xl md:text-4xl text-cream tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                    {lang.name}
                  </span>
                  <span className="hidden md:inline font-cormorant italic text-lg text-dim ml-auto mr-4">
                    {lang.tagline}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-dim opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 shrink-0 ml-auto md:ml-0"
                  />
                </motion.button>
              );
            })}
          </div>
          <div className="px-6 md:px-12 py-5 border-t border-line">
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-dim">
              Takes you straight to the basics chapter
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
