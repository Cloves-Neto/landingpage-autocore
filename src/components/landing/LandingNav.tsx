import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AutoCoreLogo from "@/components/landing/AutoCoreLogo";

const links = [
  { label: "Demonstração", href: "/#demonstracao-ao-vivo" },
  { label: "Benefícios", href: "/#beneficios" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Planos", href: "/#planos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/#contato" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? "lp-nav-glass shadow-[0_12px_40px_-12px_rgba(0,102,255,0.28)]"
        : "bg-gradient-to-b from-background/80 via-background/30 to-transparent backdrop-blur-md"
        }`}
    >
      <div className="wrapper-container flex h-20 items-center justify-between">
        {/* LOGO OFF-WHITE MAIOR COM PONTEIRO VERMELHO (SEM FUNDO E SEM EFEITOS) */}
        <Link
          to="/"
          aria-label="AutoCore - Ir para a página inicial"
          className="flex items-center gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <AutoCoreLogo className="h-10 w-10 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[22px] font-black tracking-tight leading-none">
              <span className="text-[#F5F5F2]">Auto</span>
              <span className="bg-gradient-to-r from-primary to-[hsl(var(--brand-cyan))] bg-clip-text text-transparent">
                Core
              </span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/75 mt-0.5">
              Gestão de Oficinas
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO LIMPA E ELEGANTE (SEM PILL) */}
        <nav
          role="navigation"
          aria-label="Navegação principal do site"
          className="hidden md:flex items-center gap-8 lg:gap-10"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-label={`Ir para a seção ${l.label}`}
              className="text-[14px] font-medium text-muted-foreground/85 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* AÇÃO EM DESTAQUE DA DIREITA (LOCK + ENTRAR) */}
        <div className="hidden items-center md:flex">
          <Link
            to="/login"
            aria-label="Acessar sua conta AutoCore"
            className="btn-brand group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[0_0_25px_rgba(0,102,255,0.35)]"
          >
            <Lock className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <span>Entrar</span>
          </Link>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={open}
          aria-controls="menu-mobile-principal"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* MENU MOBILE RETRATIL */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile-principal"
            role="region"
            aria-label="Menu móvel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden lp-nav-glass border-b border-white/[0.08] md:hidden"
          >
            <div className="wrapper-container flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  aria-label={`Ir para a seção ${l.label}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                <Link
                  to="/login"
                  aria-label="Entrar na conta AutoCore"
                  onClick={() => setOpen(false)}
                  className="btn-brand inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Entrar</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
