import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Gauge,
} from "lucide-react";
import HeroAppShowcase from "@/components/landing/HeroAppShowcase";

export default function HeroShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 24 });

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Grids & Atmospheric Radial Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[880px] lp-grid-lines [mask-image:radial-gradient(ellipse_70%_65%_at_50%_15%,black,transparent)] opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] lp-aurora opacity-70" aria-hidden="true" />

      <div className="wrapper-container relative z-10">
        {/* Header Hero 100% Centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Texto Small com Ícone de Aceleração (Exclusivo da Hero) */}
          <div
            role="status"
            aria-label="Gestão Inteligente para Oficinas"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Gauge className="h-4 w-4 text-[hsl(var(--brand-cyan))] animate-pulse" aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-chrome">
              Gestão Inteligente para Oficinas
            </span>
          </div>

          {/* Headline Imponente */}
          <h1 id="hero-heading" className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[68px]">
            Tecnologia que <span className="text-gradient">acelera o crescimento</span>{" "}
            da sua oficina<span className="text-primary">.</span>
          </h1>

          {/* Subtítulo Claro */}
          <p className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
            Controle total de ordens de serviço, pátio, estoque, vendas e financeiro em tempo real.
            Desenvolvido para oficinas que não aceitam limites.
          </p>

          {/* Botões Duplos estilo RichPath com navegação por teclado e labels descritivos */}
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            <Link
              to="/checkout?plan=Pro&billing=annual"
              aria-label="Ir para o checkout e começar teste gratuito do AutoCore por 7 dias"
              className="btn-brand group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold shadow-[0_0_35px_-4px_hsla(211,100%,50%,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>Começar 7 dias grátis</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href="#demonstracao-ao-vivo"
              aria-label="Ver simulação da plataforma AutoCore em tempo real"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer shadow-lg"
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary">
                <Play className="h-3 w-3 fill-current ml-0.5" aria-hidden="true" />
              </div>
              <span>Ver demonstração</span>
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Sem taxa de adesão
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Setup em 5 minutos
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Suporte humanizado
            </span>
          </div>
        </motion.div>

        {/* EFEITO HORIZONTE LUMINOSO (ARC GLOW CURVO ESTILO RICHPATH) */}
        <div id="demonstracao-ao-vivo" ref={showcaseRef} className="relative mx-auto mt-12 max-w-5xl">
          {/* Arco brilhante curvado atrás do topo da janela de PC */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-8 h-32 w-[90%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-xl opacity-75"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-1 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[hsl(var(--brand-cyan))] to-transparent opacity-90 shadow-[0_0_20px_#00A3FF]"
          />

          {/* NOVO SHOWCASE DA PLATAFORMA EM JANELA DE PC VIVA COM PARALLAX SUAVE */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={reduce ? undefined : { y: smoothY }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroAppShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
