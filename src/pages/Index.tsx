import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList, Wallet, Package, Users, UserCog,
  ArrowRight, Building2, FileStack, CarFront, Gauge,
  Wrench, TrendingUp, BellRing, CheckCircle2, Play, Pause, ShieldCheck,
} from "lucide-react";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import PlansSection from "@/components/landing/PlansSection";
import AppPreview, { type PreviewView } from "@/components/landing/AppPreview";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  SpotlightCard,
  InfiniteShowcaseReel,
} from "@/components/landing/motion";

const benefits = [
  {
    icon: ClipboardList,
    tag: "Pátio & Execução",
    title: "Ordens de serviço em tempo real",
    desc: "Controle todo o ciclo da OS — do checklist de entrada à entrega do veículo com histórico completo por placa.",
  },
  {
    icon: Wallet,
    tag: "Caixa & Lucro",
    title: "Financeiro e DRE integrados",
    desc: "Visualize faturamento, gastos, lucro líquido e fluxo de caixa atualizados automaticamente a cada baixa de OS.",
  },
  {
    icon: Package,
    tag: "Peças & Insumos",
    title: "Estoque inteligente com alertas",
    desc: "Acompanhe peças, pneus, óleos e receba avisos automáticos antes que itens críticos faltem no pátio.",
  },
  {
    icon: Users,
    tag: "CRM Automotivo",
    title: "Clientes, veículos e frotas",
    desc: "Histórico por placa, quilometragem e revisões preventivas centralizadas para fidelizar clientes.",
  },
  {
    icon: UserCog,
    tag: "Produtividade",
    title: "Equipe e comissões automáticas",
    desc: "Produtividade por mecânico e cálculo automático de comissões sobre peças e mão de obra sem planilhas.",
  },
  {
    icon: ShieldCheck,
    tag: "Gestão Segura",
    title: "Orçamentos em 1 clique",
    desc: "Transforme cotações aprovadas diretamente em ordens de serviço com reserva imediata de peças.",
  },
];

const steps = [
  {
    num: "01",
    badge: "Partida • 5 min",
    title: "Cadastre sua oficina",
    desc: "Configure dados da empresa, catálogo de serviços, boxes/elevadores e sua equipe técnica sem burocracia.",
    items: ["Dados e identidade da oficina", "Tabela de mão de obra e serviços", "Perfis de acesso por função"],
  },
  {
    num: "02",
    badge: "Cruzeiro • Pátio conectado",
    title: "Organize sua operação",
    desc: "Receba veículos por placa, gere orçamentos em segundos e acompanhe cada OS ligada diretamente ao estoque.",
    items: ["Checklist de entrada e fotos", "Reserva automática de peças", "Status do pátio em tempo real"],
  },
  {
    num: "03",
    badge: "Alta Rotação • Escala",
    title: "Acelere seus resultados",
    desc: "Acompanhe faturamento, DRE, fluxo de caixa e comissões calculadas ao vivo para decidir com segurança.",
    items: ["Fechamento de caixa e Pix", "Comissões automáticas da equipe", "Alertas de retorno preventivo"],
  },
];

const tabs: { key: PreviewView; label: string; desc: string }[] = [
  { key: "dashboard", label: "Dashboard", desc: "Os números do mês e indicadores de pátio em uma única visão." },
  { key: "os", label: "Ordens de serviço", desc: "Do orçamento à entrega, com status em tempo real." },
  { key: "estoque", label: "Estoque", desc: "Peças, pneus e produtos com alerta de estoque mínimo." },
  { key: "financeiro", label: "Financeiro", desc: "Recebimentos, gastos, comissões e lucro conectados." },
  { key: "clientes", label: "Clientes", desc: "Histórico completo por cliente, frota e veículo." },
];

const capabilities = [
  { icon: Building2, title: "Multi-perfil", label: "Oficinas independentes, centros automotivos e frotas" },
  { icon: FileStack, title: "Agilidade no balcão", label: "Orçamentos aprovados convertidos em OS em 1 clique" },
  { icon: CarFront, title: "Rastreabilidade", label: "Múltiplos veículos e histórico completo por placa" },
];

const reelItems = [
  {
    badge: "OS #1042 · Ao Vivo",
    tone: "primary" as const,
    title: "Revisão Completa · Gol 1.6",
    subtitle: "Elevador 02 • Mecânico: Rodrigo S.",
    metric: "R$ 1.980",
    status: "Em execução (75%)",
    icon: Wrench,
  },
  {
    badge: "Financeiro · Hoje",
    tone: "success" as const,
    title: "Fechamento de Caixa & Pix",
    subtitle: "14 OS faturadas • Margem líquida 36,8%",
    metric: "+ R$ 8.420",
    status: "Conciliado",
    icon: TrendingUp,
  },
  {
    badge: "Estoque Crítico",
    tone: "racing" as const,
    title: "Pastilha Diant. Cerâmica Bosch",
    subtitle: "Apenas 2 jogos restantes • Reposição sugerida",
    metric: "2 unid.",
    status: "Alerta de compra",
    icon: BellRing,
  },
  {
    badge: "Comissões",
    tone: "primary" as const,
    title: "Produtividade da Equipe",
    subtitle: "6 mecânicos ativos • 128 OS concluídas no mês",
    metric: "R$ 12.200",
    status: "Cálculo automático",
    icon: UserCog,
  },
  {
    badge: "Frota VIP",
    tone: "success" as const,
    title: "Transportes RG · 6 Veículos",
    subtitle: "Revisão preventiva de 40.000 km agendada",
    metric: "R$ 6.890",
    status: "Orçamento aprovado",
    icon: CheckCircle2,
  },
];

export default function Index() {
  const [tab, setTab] = useState<PreviewView>("dashboard");
  const [autoPlayTabs, setAutoPlayTabs] = useState(true);
  const activeTab = tabs.find((t) => t.key === tab)!;

  // Ciclo contínuo suave entre as abas da plataforma ("tipo vídeo passando"), pausável no hover/clique
  useEffect(() => {
    if (!autoPlayTabs) return;
    const id = window.setInterval(() => {
      setTab((prev) => {
        const idx = tabs.findIndex((t) => t.key === prev);
        return tabs[(idx + 1) % tabs.length].key;
      });
    }, 4800);
    return () => window.clearInterval(id);
  }, [autoPlayTabs]);

  return (
    <div className="lp min-h-screen overflow-x-hidden bg-background">
      <LandingNav />

      {/* ================= HERO (CENTRALIZADO ESTILO BETTER STACK / LINEAR) ================= */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Atmosfera luminosa + Grid técnico suave sem linhas divisórias */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] lp-grid-lines [mask-image:radial-gradient(ellipse_70%_65%_at_50%_15%,black,transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] lp-aurora" />

        <div className="wrapper-container relative">
          {/* Bloco de texto 100% centralizado */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            {/* Badge inspirado no velocímetro do logo AutoCore */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <Gauge className="h-3.5 w-3.5 text-racing animate-needle-idle" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-chrome">
                Alta Performance em Gestão Automotiva
              </span>
            </div>

            <h1 className="mt-6 text-balance text-[34px] font-bold leading-[1.06] tracking-tight text-foreground sm:text-[48px] md:text-[58px] lg:text-[64px]">
              <span className="text-chrome">Sua oficina sob controle.</span>
              <br />
              <span className="text-foreground/80">Pronta para </span>
              <span className="text-gradient">acelerar</span>
              <span className="text-racing">.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Clientes, ordens de serviço, estoque, vendas e financeiro conectados em tempo real.
              Precisão técnica para o pátio e clareza absoluta para quem pilota a oficina.
            </p>

            {/* Barra de ação centralizada */}
            <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <Link
                to="/signup"
                className="btn-brand group inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-semibold"
              >
                <span>Testar grátis por 7 dias</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="#recursos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-[15px] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.06] hover:text-foreground"
              >
                Conhecer a plataforma
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sem fidelidade
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span>Configuração em 5 minutos</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-primary">Suporte especializado</span>
            </div>
          </motion.div>

          {/* Palco Central do Produto (Mockup grande centralizado com feixes laterais) */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-14 max-w-5xl md:mt-16"
          >
            {/* Feixes de luz diagonais de palco inspirados na referência */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 lp-stage-glow blur-2xl"
            />
            <SpotlightCard tiltMax={2} className="rounded-2xl">
              <AppPreview view="dashboard" />
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ================= INFINITE SHOWCASE REEL ("TIPO VÍDEO PASSANDO") ================= */}
      <section className="relative py-14 md:py-16">
        <div className="wrapper-container">
          <div className="mb-7 flex flex-col items-center justify-center gap-2 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3.5 py-1 ring-1 ring-white/[0.07]">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Operação em Tempo Real • Passe o mouse para inspecionar
              </p>
            </div>
          </div>

          <InfiniteShowcaseReel speed={42} hoverSpeed={10}>
            {reelItems.map((item) => {
              const toneBadge =
                item.tone === "racing"
                  ? "bg-racing/15 text-racing ring-racing/30"
                  : item.tone === "success"
                    ? "bg-success/15 text-success ring-success/30"
                    : "bg-primary/15 text-primary ring-primary/30";

              return (
                <div
                  key={item.title}
                  className="group relative w-[280px] sm:w-[310px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-1/90 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${toneBadge}`}>
                      {item.badge}
                    </span>
                    <item.icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-2.5 truncate text-[13px] font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{item.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between pt-2 text-[11px]">
                    <span className="text-muted-foreground">{item.status}</span>
                    <span className="font-bold tabular-nums text-chrome">{item.metric}</span>
                  </div>
                </div>
              );
            })}
          </InfiniteShowcaseReel>

          {/* Destaques rápidos centralizados em grid */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="group flex flex-col items-center rounded-2xl border border-white/[0.06] bg-surface-1/50 p-5 text-center transition-all duration-300 hover:border-primary/30 hover:bg-surface-1"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/12 text-primary transition-transform duration-200 group-hover:scale-110">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= BENEFITS (ASYMMETRIC BENTO SHOWCASE) ================= */}
      <section id="beneficios" className="relative py-24 md:py-32">
        <div className="wrapper-container">
          <Reveal>
            <div className="section-header-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Ecossistema Integrado
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
                Menos planilhas. <span className="text-gradient">Mais comando</span> da oficina.
              </h2>
              <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                Cada módulo do AutoCore conversa com o outro. O que entra na ordem de serviço reflete
                instantaneamente no estoque, no financeiro e nas comissões — sem retrabalho.
              </p>
            </div>
          </Reveal>

          {/* Bento Grid Assimétrico (12 colunas no desktop) */}
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-6 lg:grid-cols-12">
            {/* BENTO 1 (Wide 7 cols): Ordens de Serviço + Pipeline Visual */}
            <RevealItem className="md:col-span-6 lg:col-span-7">
              <SpotlightCard
                tiltMax={2}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-8 transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary ring-1 ring-inset ring-primary/30">
                      <ClipboardList className="h-3.5 w-3.5" />
                      <span>Pátio & Execução</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/60">BENTO // 01</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground sm:text-2xl group-hover:text-chrome">
                    Ordens de serviço em tempo real
                  </h3>
                  <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
                    Controle todo o ciclo da OS — do checklist de entrada à entrega do veículo com histórico completo por placa e aprovação rápida.
                  </p>
                </div>

                {/* Mini UI Interativa do Pipeline de OS */}
                <div className="mt-7 rounded-2xl border border-white/[0.06] bg-background/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold text-foreground">OS #1042 • VW Gol 1.6 MSI (ABC-1D23)</span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-2 py-0.5 font-medium text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Elevador 02
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[
                      { step: "Checklist", done: true },
                      { step: "Orçamento", done: true },
                      { step: "Em execução", active: true },
                      { step: "Entrega", done: false },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`rounded-xl border px-2.5 py-2 text-center transition-colors ${
                          st.active
                            ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_20px_-6px_hsla(211,100%,50%,0.6)]"
                            : st.done
                            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                            : "border-white/[0.05] bg-white/[0.02] text-muted-foreground"
                        }`}
                      >
                        <p className="truncate text-[10px] font-semibold">{st.step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* BENTO 2 (5 cols): Financeiro & DRE + Gráfico Ao Vivo */}
            <RevealItem className="md:col-span-6 lg:col-span-5">
              <SpotlightCard
                tiltMax={2}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-8 transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                      <Wallet className="h-3.5 w-3.5" />
                      <span>Caixa & DRE</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/60">BENTO // 02</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground sm:text-2xl group-hover:text-chrome">
                    Financeiro conectado à OS
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Cada OS faturada alimenta automaticamente o fluxo de caixa, contas a receber e lucro líquido.
                  </p>
                </div>

                {/* Mini UI Financeiro */}
                <div className="mt-7 rounded-2xl border border-white/[0.06] bg-background/60 p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lucro líquido (mês)</p>
                      <p className="mt-0.5 text-xl font-bold text-gradient tabular-nums">R$ 32.100</p>
                    </div>
                    <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                      +12,4% vs mês ant.
                    </span>
                  </div>
                  <div className="mt-3 flex h-12 items-end gap-1.5">
                    {[42, 58, 48, 70, 62, 84, 76, 96].map((h, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-sm ${
                          idx >= 6
                            ? "bg-gradient-to-t from-primary to-[hsl(var(--brand-cyan))]"
                            : "bg-white/[0.12]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* BENTO 3 (4 cols): Estoque Inteligente com Medidor */}
            <RevealItem className="md:col-span-3 lg:col-span-4">
              <SpotlightCard
                tiltMax={3}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-7 transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                      <Package className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-racing/15 px-2.5 py-0.5 text-[10px] font-semibold text-racing ring-1 ring-racing/30">
                      Alerta Mínimo
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-foreground group-hover:text-chrome">
                    Estoque inteligente
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    Baixa automática por OS e avisos antes que peças de giro rápido faltem no pátio.
                  </p>
                </div>

                <div className="mt-6 space-y-2.5 rounded-2xl border border-white/[0.06] bg-background/60 p-3.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Pastilha Cerâmica</span>
                    <span className="font-semibold text-racing">2 un (Crítico)</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-racing to-primary" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-muted-foreground">Óleo 5W30 Sintético</span>
                    <span className="font-semibold text-emerald-400">24 un (OK)</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--brand-cyan))]" />
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* BENTO 4 (4 cols): Clientes, Placas e Frotas */}
            <RevealItem className="md:col-span-3 lg:col-span-4">
              <SpotlightCard
                tiltMax={3}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-7 transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                      <Users className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      CRM Automotivo
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-foreground group-hover:text-chrome">
                    Clientes, placas e frotas
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    Histórico completo por veículo, quilometragem e alertas de revisão preventiva para fidelização.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-background/60 p-3.5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Placa Mercosul</p>
                    <p className="mt-0.5 font-mono text-sm font-bold tracking-wider text-chrome">QXR • 2J87</p>
                    <p className="text-[11px] text-muted-foreground">Onix Turbo • 42.180 km</p>
                  </div>
                  <span className="rounded-lg bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    6 OS no histórico
                  </span>
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* BENTO 5 (4 cols): Equipe, Mecânicos e Comissões */}
            <RevealItem className="md:col-span-6 lg:col-span-4">
              <SpotlightCard
                tiltMax={3}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-7 transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                      <UserCog className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                      Zero Planilhas
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-foreground group-hover:text-chrome">
                    Equipe e comissões
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    Produtividade por mecânico e cálculo automático de comissões sobre peças e serviços.
                  </p>
                </div>

                <div className="mt-6 space-y-2 rounded-2xl border border-white/[0.06] bg-background/60 p-3.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Rodrigo S. (Líder)</span>
                    <span className="font-mono font-semibold text-emerald-400">R$ 3.480</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Carlos M. (Suspensão)</span>
                    <span className="font-mono font-semibold text-primary">R$ 2.910</span>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ================= HOW IT WORKS (ROAD TRIP MAP COM LINHAS CONECTORAS) ================= */}
      <section id="como-funciona" className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 lp-aurora opacity-50" />
        <div className="wrapper-container relative">
          <Reveal>
            <div className="section-header-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Rota de Implementação
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
                Comece hoje, em <span className="text-gradient">três passos</span>.
              </h2>
              <p className="mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground">
                Uma jornada guiada ponto a ponto para tirar sua oficina das planilhas e colocar o pátio no piloto automático.
              </p>
            </div>
          </Reveal>

          {/* Road Trip Map Timeline */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            {/* Estrada vertical central (Desktop) / Lateral esquerda (Mobile) */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-8 left-6 top-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-[hsl(var(--brand-cyan))] to-emerald-400 md:left-1/2"
            />
            {/* Linha tracejada sobreposta simulando pista / rota */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-8 left-6 top-8 w-px -translate-x-1/2 border-l border-dashed border-white/30 md:left-1/2"
            />

            <RevealGroup className="space-y-12 md:space-y-16">
              {steps.map((s, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <RevealItem key={s.num} className="relative">
                    <div
                      className={`flex flex-col pl-16 md:pl-0 ${
                        isEven ? "md:flex-row-reverse" : "md:flex-row"
                      } md:items-center`}
                    >
                      {/* Coluna do Card (Metade da largura no desktop) */}
                      <div className="w-full md:w-[calc(50%-2.75rem)]">
                        <SpotlightCard
                          tiltMax={3}
                          className="group relative rounded-3xl border border-white/[0.08] bg-surface-1/85 p-6 sm:p-8 transition-all duration-300 hover:border-primary/45 hover:bg-surface-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 font-mono text-[11px] font-semibold text-primary ring-1 ring-inset ring-primary/30">
                              CHECKPOINT {s.num}
                            </span>
                            <span className="text-[11px] font-medium text-muted-foreground">
                              {s.badge}
                            </span>
                          </div>

                          <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl group-hover:text-chrome">
                            {s.title}
                          </h3>
                          <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                            {s.desc}
                          </p>

                          <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                            {s.items.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </SpotlightCard>
                      </div>

                      {/* Nó / Pin Central da Rota (Road Checkpoint) + Braço Conector Horizontal */}
                      <div className="absolute left-6 top-8 flex -translate-x-1/2 items-center justify-center md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                        {/* Linha horizontal conectora do eixo central até o card (Desktop) */}
                        <span
                          aria-hidden
                          className={`hidden h-px w-11 bg-gradient-to-r from-primary/80 to-transparent md:block ${
                            isEven ? "absolute left-6" : "absolute right-6 rotate-180"
                          }`}
                        />
                        {/* Pin Luminoso */}
                        <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-primary/50 bg-background font-mono text-sm font-bold text-chrome shadow-[0_0_25px_-2px_hsla(211,100%,50%,0.65)]">
                          <span className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse" />
                          <span className="relative z-10">{s.num}</span>
                        </div>
                      </div>

                      {/* Espaçador do lado oposto no desktop para manter simetria da rota */}
                      <div className="hidden md:block md:w-[calc(50%-2.75rem)]" />
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT TABS (CENTRALIZADO + AUTO-PLAY REEL) ================= */}
      <section
        id="recursos"
        className="relative py-24 md:py-32"
        onMouseEnter={() => setAutoPlayTabs(false)}
        onMouseLeave={() => setAutoPlayTabs(true)}
      >
        <div className="wrapper-container">
          <Reveal>
            <div className="section-header-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Visão da Plataforma
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
                Tudo acontece em um <span className="text-gradient">único painel</span>.
              </h2>
              <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground">
                As mesmas telas que sua equipe usa no dia a dia — organizadas para dar velocidade a quem opera
                e visão estratégica a quem decide.
              </p>

              {/* Controles de Abas Centralizados */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-surface-1/80 p-1.5 backdrop-blur-md">
                {tabs.map((t) => {
                  const isActive = tab === t.key;
                  return (
                    <button
                      type="button"
                      key={t.key}
                      onClick={() => {
                        setTab(t.key);
                        setAutoPlayTabs(false);
                      }}
                      className={`relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="ResourceTabIndicator"
                          className="absolute inset-0 -z-10 rounded-xl bg-primary/20 ring-1 ring-inset ring-primary/40 shadow-[0_0_20px_-6px_hsla(211,100%,50%,0.5)]"
                          transition={{ type: "spring", stiffness: 360, damping: 28 }}
                        />
                      )}
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[13px] text-muted-foreground">
                <span>{activeTab.desc}</span>
                <span className="hidden text-muted-foreground/40 sm:inline">•</span>
                <button
                  type="button"
                  onClick={() => setAutoPlayTabs((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-white/[0.08] transition-colors hover:text-foreground"
                >
                  {autoPlayTabs ? (
                    <>
                      <Pause className="h-3 w-3 text-primary" />
                      <span>Tour automático ativo</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 text-muted-foreground" />
                      <span>Retomar tour</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-5xl">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 lp-stage-glow blur-2xl opacity-75"
              />
              <AppPreview
                view={tab}
                onSelectView={(v) => {
                  setTab(v);
                  setAutoPlayTabs(false);
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <PlansSection />

      {/* ================= FINAL CTA (PALCO IMPONENTE CENTRALIZADO) ================= */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="wrapper-container">
          <Reveal>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-surface-2/90 via-surface-1 to-background p-8 sm:p-14 md:p-20 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85)]">
              {/* Atmosfera Radial + Grade Técnica + Feixes de Luz */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 lp-grid-lines opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-28 left-1/2 h-[340px] w-[680px] -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-cyan))] to-transparent opacity-80"
              />

              {/* Conteúdo 100% Centralizado */}
              <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
                  <Gauge className="h-3.5 w-3.5 text-racing animate-needle-idle" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-chrome">
                    Pronto para acelerar
                  </span>
                </div>

                <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[48px]">
                  <span className="text-chrome">Sua oficina pode operar em outro nível</span>{" "}
                  <span className="text-gradient">a partir de hoje</span>
                  <span className="text-racing">.</span>
                </h2>

                <p className="mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
                  Centralize sua operação, acompanhe seus números ao vivo e tenha mais controle para crescer com segurança.
                </p>

                {/* Botões de Ação */}
                <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
                  <Link
                    to="/signup"
                    className="btn-brand group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-[15px] font-semibold"
                  >
                    <span>Começar 7 dias grátis</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="#planos"
                    className="inline-flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-4 text-[15px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    Comparar planos
                  </a>
                </div>

                {/* Pílulas de Garantias / Confiança */}
                <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    "7 dias de teste grátis",
                    "Sem cartão de crédito",
                    "Cancele quando quiser",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-[12px] font-medium text-muted-foreground backdrop-blur-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
