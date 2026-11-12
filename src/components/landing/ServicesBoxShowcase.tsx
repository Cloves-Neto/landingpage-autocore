import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Package,
  QrCode,
  TrendingUp,
  Camera,
  MessageSquare,
  Layers,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import logo from "@/assets/autocore-logo.png";

const hubModules = [
  {
    id: "checklist",
    label: "Checklist",
    sub: "Fotos & Vistoria",
    icon: Camera,
    posClass: "top-6 left-4 sm:left-7",
    path: "M 95 55 L 155 55 L 185 155",
    pulseX: [95, 155, 185],
    pulseY: [55, 55, 155],
    eventText: "Vistoria inicial com 4 fotos vinculada à placa ABC-1D23",
  },
  {
    id: "os",
    label: "OS Digital",
    sub: "Pátio ao Vivo",
    icon: ClipboardList,
    posClass: "top-1/2 -translate-y-1/2 left-3 sm:left-5",
    path: "M 85 155 L 180 155",
    pulseX: [85, 135, 180],
    pulseY: [155, 155, 155],
    eventText: "OS #1042 aprovada • Mecânico atribuído automaticamente",
  },
  {
    id: "estoque",
    label: "Peças",
    sub: "Baixa Automática",
    icon: Package,
    posClass: "bottom-16 left-4 sm:left-7",
    path: "M 95 255 L 155 255 L 185 155",
    pulseX: [95, 155, 185],
    pulseY: [255, 255, 155],
    eventText: "Kit revisão reservado e baixado do estoque sem retrabalho",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    sub: "Avisos & Retorno",
    icon: MessageSquare,
    posClass: "top-6 right-4 sm:right-7",
    path: "M 305 55 L 245 55 L 215 155",
    pulseX: [305, 245, 215],
    pulseY: [55, 55, 155],
    eventText: "Notificação de veículo pronto enviada ao WhatsApp do cliente",
  },
  {
    id: "pix",
    label: "Caixa & Pix",
    sub: "Conciliação 0s",
    icon: QrCode,
    posClass: "top-1/2 -translate-y-1/2 right-3 sm:right-5",
    path: "M 315 155 L 220 155",
    pulseX: [315, 265, 220],
    pulseY: [155, 155, 155],
    eventText: "Pix de R$ 1.850,00 recebido e conciliado direto no Caixa",
  },
  {
    id: "dre",
    label: "Lucro Real",
    sub: "DRE & Comissões",
    icon: TrendingUp,
    posClass: "bottom-16 right-4 sm:right-7",
    path: "M 305 255 L 245 255 L 215 155",
    pulseX: [305, 245, 215],
    pulseY: [255, 255, 155],
    eventText: "Comissão calculada e margem líquida (+43,8%) atualizada no DRE",
  },
];

const highlights = [
  {
    icon: Camera,
    title: "Entrada & Checklist Instantâneo",
    description:
      "Registre a chegada de cada veículo sem perder tempo. Adicione fotos, avarias e assinatura digital direto pelo celular ou tablet no pátio.",
  },
  {
    icon: Layers,
    title: "Organização Adaptativa do Pátio",
    description:
      "Sua oficina cresce com controle total. Acompanhe cada Ordem de Serviço por etapa, mecânico responsável e peças aplicadas em segundos.",
  },
  {
    icon: Workflow,
    title: "Simples, Completo & Integrado",
    description:
      "Uma plataforma que se adapta à sua rotina — do orçamento aprovado no WhatsApp ao caixa conciliado via Pix, comissões e DRE em tempo real.",
  },
];

export default function ServicesBoxShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % hubModules.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const currentModule = hubModules[activeIdx];

  return (
    <section
      id="servicos-unificados"
      aria-labelledby="servicos-box-heading"
      className="relative py-20 md:py-28 border-t border-white/[0.05] bg-surface-1/20"
    >
      <div className="wrapper-container">
        {/* Cabeçalho Alinhado à Esquerda (Sem Badges) */}
        <div className="max-w-3xl">
          <h2
            id="servicos-box-heading"
            className="text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[44px]"
          >
            Oficina Inteligente. Um único espaço para{" "}
            <span className="text-gradient">organizar, executar e lucrar</span>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            Simplifique a forma como você gerencia o seu pátio. Centralize ordens de serviço,
            estoque de peças, agendamentos e financeiro em um único núcleo que sincroniza tudo em
            tempo real.
          </p>
        </div>

        {/* Grid em 2 Colunas: Hub Magnético Central (Esquerda) + Pilares (Direita) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* COLUNA ESQUERDA: Hub Magnético Central em Tempo Real */}
          <div className="lg:col-span-6">
            <div
              className="relative h-[390px] sm:h-[420px] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#060916] p-5 shadow-[0_24px_80px_-20px_rgba(0,102,255,0.3)] select-none"
              aria-label="Hub Magnético AutoCore sincronizando os 6 módulos da oficina em tempo real"
            >
              {/* Malha de fundo e iluminação radial */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 lp-grid-lines opacity-35"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-primary/20 blur-[75px]"
              />

              {/* Palco dos Feixes e Módulos */}
              <div className="relative h-[310px] w-full">
                {/* SVG de Feixes de Luz e Pulsos de Sincronização */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 400 310"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="beam-active" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#0066FF" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {hubModules.map((mod, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <g key={mod.id}>
                        {/* Trilha Base */}
                        <path
                          d={mod.path}
                          stroke={isActive ? "url(#beam-active)" : "rgba(255,255,255,0.08)"}
                          strokeWidth={isActive ? "2.2" : "1.2"}
                          strokeDasharray={isActive ? "none" : "4 4"}
                          className="transition-all duration-500"
                        />

                        {/* Pulso de Energia Viajando até o Núcleo Central */}
                        {isActive && (
                          <>
                            <motion.circle
                              r="4.5"
                              fill="#00E5FF"
                              initial={{ cx: mod.pulseX[0], cy: mod.pulseY[0], opacity: 0 }}
                              animate={{
                                cx: mod.pulseX,
                                cy: mod.pulseY,
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.circle
                              r="9"
                              fill="rgba(0, 229, 255, 0.28)"
                              initial={{ cx: mod.pulseX[0], cy: mod.pulseY[0], opacity: 0 }}
                              animate={{
                                cx: mod.pulseX,
                                cy: mod.pulseY,
                                opacity: [0, 0.9, 0.9, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* NÚCLEO CENTRAL AUTOCORE */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  {/* Anel de Radar Externo */}
                  <div className="absolute h-32 w-32 rounded-full border border-dashed border-primary/35 animate-[spin_28s_linear_infinite]" />
                  {/* Anel Pulsante */}
                  <motion.div
                    key={activeIdx}
                    initial={{ scale: 0.85, opacity: 0.7 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute h-24 w-24 rounded-full border border-cyan-400/50 bg-primary/10"
                  />
                  {/* Cubo / Emblema Central */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center justify-center h-20 w-20 rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-[#0E1B3D] to-[#060B19] shadow-[0_0_40px_rgba(0,102,255,0.65)] p-2.5"
                  >
                    <img
                      src={logo}
                      alt="Núcleo AutoCore"
                      className="h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(0,102,255,0.6)]"
                    />
                    <span className="mt-1 text-[9px] font-black uppercase tracking-widest text-white">
                      Auto<span className="text-cyan-400">Core</span>
                    </span>
                  </motion.div>
                </div>

                {/* 6 MÓDULOS PERIFÉRICOS CONECTADOS */}
                {hubModules.map((mod, idx) => {
                  const Icon = mod.icon;
                  const isActive = idx === activeIdx;
                  return (
                    <motion.button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        y: isActive ? -2 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`absolute z-20 flex items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition-colors duration-300 ${
                        mod.posClass
                      } ${
                        isActive
                          ? "border-cyan-400/60 bg-[#0D1E42]/95 text-white shadow-[0_0_25px_rgba(0,102,255,0.45)]"
                          : "border-white/10 bg-[#090E20]/85 text-muted-foreground hover:border-white/20 hover:text-foreground"
                      }`}
                    >
                      <div
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-colors ${
                          isActive
                            ? "bg-primary text-white shadow-[0_0_12px_rgba(0,102,255,0.8)]"
                            : "bg-white/[0.04] text-primary"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="pr-1">
                        <p className="text-xs font-bold leading-tight text-foreground">
                          {mod.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 hidden sm:block">
                          {mod.sub}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Barra Inferior de Evento Sincronizado em Tempo Real */}
              <div className="relative z-20 mt-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentModule.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-[#0A132C]/90 px-4 py-2.5 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="truncate text-xs font-medium text-foreground">
                        {currentModule.eventText}
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                      Sincronizado
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: 3 Destaques de Serviços */}
          <div className="lg:col-span-6 space-y-8">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-primary shadow-sm transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
