import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageMenu } from "./LanguageMenu";
import { scrollToChapter } from "./ChapterNav";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goIndex = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToChapter("language-index-section"), 900);
    } else {
      scrollToChapter("language-index-section");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-ink transition-[border-color] duration-300 ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1600px] flex items-center justify-between px-6 md:px-12 py-5">
          <Link
            to="/"
            data-testid="nav-logo"
            aria-label="CodingVault home"
            className="group relative block overflow-hidden h-7 leading-7"
          >
            <span className="flex items-baseline gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-7">
              <span className="font-clash font-semibold text-lg tracking-tight text-cream">Coding</span>
              <span className="font-cormorant italic font-semibold text-xl text-accent">Vault</span>
            </span>
            <span
              aria-hidden="true"
              className="absolute top-7 left-0 flex items-baseline gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-7"
            >
              <span className="font-clash font-semibold text-lg tracking-tight text-accent">Coding</span>
              <span className="font-cormorant italic font-semibold text-xl text-cream">Vault</span>
            </span>
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <button
              onClick={goIndex}
              data-testid="nav-index-link"
              className="font-jetbrains text-xs uppercase tracking-[0.25em] text-dim hover:text-cream transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Index
            </button>
            <Link
              to="/quiz"
              data-testid="nav-quiz-link"
              className="font-jetbrains text-xs uppercase tracking-[0.25em] text-dim hover:text-cream transition-colors duration-300"
            >
              Find yours
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              data-testid="nav-languages-button"
              aria-label="Open language menu"
              className="group inline-flex items-center gap-2.5 font-jetbrains text-xs tracking-[0.25em] text-dim hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              07 LANGUAGES
              <span className="w-1.5 h-1.5 bg-line group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
            </button>
          </div>
        </nav>
      </header>
      <LanguageMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
