import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/autocore-logo.png";

const links = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Recursos", href: "#recursos" },
  { label: "Planos", href: "#planos" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "lp-nav-glass shadow-[0_10px_36px_-14px_rgba(0,102,255,0.22)]"
          : "bg-gradient-to-b from-background/60 via-background/20 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="wrapper-container flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="relative grid place-items-center rounded-lg bg-white/[0.04] p-1 ring-1 ring-white/[0.08] transition-all duration-300 group-hover:ring-primary/40 group-hover:shadow-[0_0_20px_-4px_hsla(211,100%,50%,0.45)]">
            <img src={logo} alt="AutoCore" className="h-6 w-6 rounded-sm object-contain" />
          </div>
          <span className="text-[18px] font-bold tracking-tight">
            <span className="text-chrome">Auto</span>
            <span className="text-gradient">Core</span>
          </span>
        </Link>

        <nav
          onMouseLeave={() => setHoveredHref(null)}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 backdrop-blur-md md:flex"
        >
          {links.map((l) => {
            const isHovered = hoveredHref === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredHref(l.href)}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15 ring-1 ring-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Entrar
          </Link>
          <Link
            to="/signup"
            className="btn-brand group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold"
          >
            <span>Testar grátis</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden lp-nav-glass md:hidden"
          >
            <div className="wrapper-container flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="rounded-lg lp-hairline px-4 py-2.5 text-center text-sm font-medium text-foreground"
                >
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  className="btn-brand rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
                >
                  Testar grátis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
