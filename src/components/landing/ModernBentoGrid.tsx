import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Calendar,
  Users,
  ShieldCheck,
  Check,
  Bell,
  ArrowUpRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { SpotlightCard } from "@/components/landing/motion";

// Componente de Cursor Virtual Simulado
function VirtualCursor({
  x,
  y,
  isClicking,
}: {
  x: number | string;
  y: number | string;
  isClicking: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      animate={{ x, y }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative">
        <svg
          className="h-5 w-5 -rotate-12 drop-shadow-[0_2px_8px_rgba(0,102,255,0.7)]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5.5 3.5L18.5 11L12.5 13.5L9.5 19.5L5.5 3.5Z"
            fill="#0066FF"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Onda de Clique (Ripple) */}
        <AnimatePresence>
          {isClicking && (
            <motion.span
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -left-1 -top-1 h-5 w-5 rounded-full border-2 border-primary bg-primary/30"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ModernBentoGrid() {
  // ==========================================
  // ESTADO CARD 1: Pagamentos & Gateway
  // ==========================================
  const [payScene, setPayScene] = useState(0);
  const [payMethod, setPayMethod] = useState<"PIX" | "CARTAO">("PIX");
  const [cursorPay, setCursorPay] = useState({ x: 20, y: 140, click: false });

  useEffect(() => {
    const cycle = setInterval(() => {
      setPayScene((s) => (s + 1) % 4);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (payScene === 0) {
      setCursorPay({ x: 30, y: 155, click: false });
      const t1 = setTimeout(() => {
        setCursorPay({ x: 38, y: 70, click: true });
        setPayMethod("PIX");
      }, 900);
      return () => clearTimeout(t1);
    } else if (payScene === 1) {
      setCursorPay({ x: 120, y: 70, click: false });
      const t2 = setTimeout(() => {
        setCursorPay({ x: 120, y: 70, click: true });
        setPayMethod("CARTAO");
      }, 800);
      return () => clearTimeout(t2);
    } else if (payScene === 2) {
      setCursorPay({ x: 220, y: 135, click: false });
      const t3 = setTimeout(() => {
        setCursorPay({ x: 220, y: 135, click: true });
      }, 700);
      return () => clearTimeout(t3);
    } else {
      setCursorPay({ x: 280, y: 180, click: false });
    }
  }, [payScene]);

  // ==========================================
  // ESTADO CARD 2: Lembretes & Pop-ups de Agenda
  // ==========================================
  const [reminderIndex, setReminderIndex] = useState(0);
  const reminders = [
    {
      client: "Juliana Silva",
      vehicle: "Honda Civic",
      plate: "ABC-1D23",
      msg: "Lembrete de Revisão 10.000 km disparado via WhatsApp",
      status: "Confirmado pelo Cliente",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      client: "Carlos Eduardo",
      vehicle: "Toyota Corolla",
      plate: "BRA-2E19",
      msg: "Alerta preventivo: Troca de Óleo e Filtros em 3 dias",
      status: "Agendamento Criado",
      badgeColor: "bg-primary/20 text-sky-400 border-primary/30",
    },
    {
      client: "Roberto Mendes",
      vehicle: "Jeep Renegade",
      plate: "JEP-4F82",
      msg: "Retorno pós-serviço (Checkup de Freios 30 dias)",
      status: "Avaliação 5 Estrelas",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setReminderIndex((prev) => (prev + 1) % reminders.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [reminders.length]);

  // ==========================================
  // ESTADO CARD 3: Ordens de Serviço & Interação
  // ==========================================
  const [osScene, setOsScene] = useState(0);
  const [cursorOs, setCursorOs] = useState({ x: 200, y: 160, click: false });

  useEffect(() => {
    const cycle = setInterval(() => {
      setOsScene((s) => (s + 1) % 3);
    }, 3500);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (osScene === 0) {
      setCursorOs({ x: 260, y: 155, click: false });
      const t1 = setTimeout(() => {
        setCursorOs({ x: 260, y: 155, click: true });
      }, 1100);
      return () => clearTimeout(t1);
    } else if (osScene === 1) {
      setCursorOs({ x: 260, y: 95, click: false });
      const t2 = setTimeout(() => {
        setCursorOs({ x: 260, y: 95, click: true });
      }, 1000);
      return () => clearTimeout(t2);
    } else {
      setCursorOs({ x: 300, y: 190, click: false });
    }
  }, [osScene]);

  // ==========================================
  // ESTADO CARD 4: Fluxo de Caixa, DRE e Margem
  // ==========================================
  const [cashScene, setCashScene] = useState(0);
  const [cursorCash, setCursorCash] = useState({ x: 230, y: 35, click: false });

  useEffect(() => {
    const cycle = setInterval(() => {
      setCashScene((s) => (s + 1) % 4);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (cashScene === 0) {
      setCursorCash({ x: 230, y: 40, click: false });
    } else if (cashScene === 1) {
      setCursorCash({ x: 215, y: 40, click: true });
    } else if (cashScene === 2) {
      setCursorCash({ x: 180, y: 90, click: false });
    } else {
      setCursorCash({ x: 250, y: 150, click: false });
    }
  }, [cashScene]);

  return (
    <section id="beneficios" aria-labelledby="beneficios-heading" className="relative py-24 md:py-32">
      <div className="wrapper-container">
        {/* Cabeçalho de Seção Centralizado Sem Badges */}
        <div className="section-header-center">
          <h2 id="beneficios-heading" className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
            Tecnologia para a{" "}
            <span className="text-gradient">oficina de alta performance</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Módulos integrados criados para simplificar sua rotina, eliminar
            retrabalho e dar clareza absoluta a quem pilota a oficina.
          </p>
        </div>

        {/* 4 BENTO CARDS EM GRID ASSIMÉTRICO (ESTILO RICHPATH COM MICROINTERAÇÕES) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* =======================================================
              CARD 1 (Top Left, 6 colunas): Supports Any Payment Gateway
              ======================================================= */}
          <div className="md:col-span-6">
            <SpotlightCard
              tiltMax={3}
              role="region"
              aria-labelledby="card-pagamentos-heading"
              className="h-full rounded-3xl border border-white/[0.08] bg-surface-1/90 p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 id="card-pagamentos-heading" className="text-xl sm:text-2xl font-bold text-foreground">
                  Recebimento Rápido & Múltiplas Formas
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Conecte Pix, cartão de crédito, débito e boleto em um só fluxo
                  com baixa automática na Ordem de Serviço e no Caixa.
                </p>
              </div>

              {/* Mini UI de Pagamentos com Microinteração de Ponteiro e Cenas */}
              <div className="relative rounded-2xl border border-white/[0.07] bg-black/50 p-5 space-y-4 overflow-hidden">
                <VirtualCursor
                  x={cursorPay.x}
                  y={cursorPay.y}
                  isClicking={cursorPay.click}
                />

                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Formas aceitas na OS #1089
                  </span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Asaas Integrado
                  </span>
                </div>

                {/* Grid de Métodos de Pagamento */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "PIX", label: "PIX", icon: QrCode },
                    { id: "CARTAO", label: "Cartão", icon: CreditCard },
                    { id: "BOLETO", label: "Boleto", icon: Sparkles },
                    { id: "DEBITO", label: "Débito", icon: CreditCard },
                  ].map((m) => {
                    const isActive = payMethod === m.id;
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${isActive
                            ? "border-primary bg-primary/20 text-white shadow-[0_0_18px_rgba(0,102,255,0.45)] scale-[1.02]"
                            : "border-white/10 bg-white/[0.02] text-muted-foreground"
                          }`}
                      >
                        <m.icon
                          className={`h-5 w-5 mb-1 ${isActive ? "text-cyan-300" : "text-muted-foreground"
                            }`}
                        />
                        <span className="text-[11px] font-semibold">
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Simulação da Cena de Cobrança / Baixa */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs min-h-[58px] flex items-center justify-between">
                  {payScene === 0 && (
                    <motion.div
                      key="scene-0"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-muted-foreground">
                        Selecionando método Pix...
                      </span>
                    </motion.div>
                  )}

                  {payScene === 1 && (
                    <motion.div
                      key="scene-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between w-full"
                    >
                      <div>
                        <p className="font-mono text-cyan-300 font-bold">
                          QR Code Pix Gerado
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Valor: R$ 450,00 • Vencimento: 15 min
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                        Aguardando leitura
                      </span>
                    </motion.div>
                  )}

                  {payScene >= 2 && (
                    <motion.div
                      key="scene-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-300">
                            Pix Compensado: R$ 450,00
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            OS #1089 baixada • Caixa atualizado
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-emerald-400">
                        100% Automático
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* =======================================================
              CARD 2 (Top Right, 6 colunas): Automated Payment Scheduling
              ======================================================= */}
          <div className="md:col-span-6">
            <SpotlightCard
              tiltMax={3}
              role="region"
              aria-labelledby="card-agendamentos-heading"
              className="h-full rounded-3xl border border-white/[0.08] bg-surface-1/90 p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 id="card-agendamentos-heading" className="text-xl sm:text-2xl font-bold text-foreground">
                  Agendamentos & Lembretes Automáticos
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Lembretes automáticos de troca de óleo, revisão preventiva e
                  retorno pós-serviço disparados para os clientes.
                </p>
              </div>

              {/* Mini UI de Órbita com Linhas Conectoras de Circuito e Pop-ups */}
              <div className="relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-black/50 p-6">
                {/* Glow Central */}
                <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-primary/20 blur-2xl" />

                {/* SVG DE LINHAS CONECTORAS EM CIRCUITO (ESTILO RICHPATH) */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 400 220"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  {/* Linha Top-Left para o Centro */}
                  <path
                    d="M 60 45 H 150 V 110 H 165"
                    stroke="rgba(0,102,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Linha Bottom-Left para o Centro */}
                  <path
                    d="M 60 175 H 150 V 110 H 165"
                    stroke="rgba(0,102,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Linha Top-Right para o Centro */}
                  <path
                    d="M 340 45 H 250 V 110 H 235"
                    stroke="rgba(0,102,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Linha Bottom-Right para o Centro */}
                  <path
                    d="M 340 175 H 250 V 110 H 235"
                    stroke="rgba(0,102,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Partículas de Pulso de Dados Correndo nas Linhas */}
                  <motion.circle
                    r="3"
                    fill="#38BDF8"
                    animate={{
                      cx: [60, 150, 150, 175],
                      cy: [45, 45, 110, 110],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    r="3"
                    fill="#34D399"
                    animate={{
                      cx: [340, 250, 250, 225],
                      cy: [45, 45, 110, 110],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                  <motion.circle
                    r="3"
                    fill="#38BDF8"
                    animate={{
                      cx: [60, 150, 150, 175],
                      cy: [175, 175, 110, 110],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <motion.circle
                    r="3"
                    fill="#FBBF24"
                    animate={{
                      cx: [340, 250, 250, 225],
                      cy: [175, 175, 110, 110],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                  />
                </svg>

                {/* 4 Avatares com Foco Tecnológico */}
                <div
                  className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full border border-white/20 bg-cover bg-center shadow-lg ring-2 ring-primary/40"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80')",
                  }}
                  title="Juliana Silva (Civic)"
                >
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#070A14]" />
                </div>

                <div
                  className="absolute bottom-4 left-4 z-10 h-10 w-10 rounded-full border border-white/20 bg-cover bg-center shadow-lg ring-2 ring-primary/40"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80')",
                  }}
                  title="Roberto Mendes (Renegade)"
                >
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-sky-400 ring-2 ring-[#070A14]" />
                </div>

                <div
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full border border-white/20 bg-cover bg-center shadow-lg ring-2 ring-primary/40"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80')",
                  }}
                  title="Carlos Eduardo (Corolla)"
                >
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#070A14]" />
                </div>

                <div
                  className="absolute bottom-4 right-4 z-10 h-10 w-10 rounded-full border border-white/20 bg-cover bg-center shadow-lg ring-2 ring-primary/40"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80')",
                  }}
                  title="Mariana Pires (Strada)"
                >
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-[#070A14]" />
                </div>

                {/* Centro Concêntrico com Glow */}
                <div className="relative z-10 flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-2.5 rounded-full border border-primary/30" />
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], y: [-2, 2, -2] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-primary to-[hsl(var(--brand-cyan))] text-white shadow-[0_0_30px_rgba(0,102,255,0.7)]"
                  >
                    <Calendar className="h-7 w-7 text-white" />
                  </motion.div>
                </div>

                {/* Pop-up Dinâmico de Lembrete / WhatsApp da Cena */}
                <div className="absolute bottom-2.5 inset-x-4 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={reminderIndex}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="rounded-xl border border-white/10 bg-[#0A1022]/90 backdrop-blur-md p-2.5 shadow-xl flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary">
                          <Bell className="h-3.5 w-3.5 text-cyan-300" />
                        </div>
                        <div className="truncate">
                          <p className="text-[11px] font-semibold text-foreground truncate">
                            {reminders[reminderIndex].client} •{" "}
                            <span className="font-mono text-cyan-300">
                              {reminders[reminderIndex].plate}
                            </span>
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {reminders[reminderIndex].msg}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold border ${reminders[reminderIndex].badgeColor}`}
                      >
                        {reminders[reminderIndex].status}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* =======================================================
              CARD 3 (Bottom Left, 6 colunas): Payments Without Limits / OS
              ======================================================= */}
          <div className="md:col-span-6">
            <SpotlightCard
              tiltMax={3}
              role="region"
              aria-labelledby="card-os-heading"
              className="h-full rounded-3xl border border-white/[0.08] bg-surface-1/90 p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 id="card-os-heading" className="text-xl sm:text-2xl font-bold text-foreground">
                  Ordens de Serviço sem Gargalos
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Histórico completo por placa, rastreabilidade de peças,
                  checklists fotográficos e status da oficina ao vivo.
                </p>
              </div>

              {/* Mini UI de Lista de OS com Simulação de Ponteiro e Troca de Status */}
              <div className="relative rounded-2xl border border-white/[0.07] bg-black/50 p-4 space-y-2.5 overflow-hidden">
                <VirtualCursor
                  x={cursorOs.x}
                  y={cursorOs.y}
                  isClicking={cursorOs.click}
                />

                {/* Item 1: Honda Civic (Concluído) */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary font-bold">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        João da Silva
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Honda Civic 2.0 •{" "}
                        <span className="font-mono text-primary font-semibold">
                          ABC-1D23
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      Pronto p/ entrega
                    </span>
                    <p className="font-mono text-[11px] font-bold text-foreground mt-1">
                      R$ 1.850,00
                    </p>
                  </div>
                </div>

                {/* Item 2: Toyota Corolla (Em execução ativa) */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-400 font-bold">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Maria Oliveira
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Toyota Corolla 1.8 •{" "}
                        <span className="font-mono text-cyan-300 font-semibold">
                          BRA-2E19
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-primary/20 text-primary border-primary/30">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Em execução
                    </span>
                    <p className="font-mono text-[11px] font-bold text-foreground mt-1">
                      R$ 490,00
                    </p>
                  </div>
                </div>

                {/* Item 3: Fiat Strada (INTERATIVO COM O CURSOR MUDANDO STATUS) */}
                <div
                  className={`rounded-xl border p-3 flex items-center justify-between gap-3 text-xs transition-all duration-500 ${osScene >= 1
                      ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border-amber-500/20 bg-white/[0.02]"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`grid h-8 w-8 place-items-center rounded-lg font-bold transition-colors duration-300 ${osScene >= 1
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                        }`}
                    >
                      {osScene >= 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Transportadora Rápida
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Fiat Strada 1.4 •{" "}
                        <span className="font-mono text-primary font-semibold">
                          XYZ-9876
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <AnimatePresence mode="wait">
                      {osScene === 0 ? (
                        <motion.span
                          key="os-pending"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-amber-500/20 text-amber-400 border-amber-500/30"
                        >
                          Aguardando peças
                        </motion.span>
                      ) : (
                        <motion.span
                          key="os-approved"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold"
                        >
                          ✓ Peças Recebidas
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <p className="font-mono text-[11px] font-bold text-foreground mt-1">
                      R$ 2.450,00
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* =======================================================
              CARD 4 (Bottom Right, 6 colunas): Real-Time Expense & Lucro Tracking
              ======================================================= */}
          <div className="md:col-span-6">
            <SpotlightCard
              tiltMax={3}
              role="region"
              aria-labelledby="card-caixa-heading"
              className="h-full rounded-3xl border border-white/[0.08] bg-surface-1/90 p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 id="card-caixa-heading" className="text-xl sm:text-2xl font-bold text-foreground">
                  Controle de Fluxo de Caixa em Tempo Real
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Monitore cada receita e despesa no instante em que acontecem,
                  com DRE automático e margem calculada ao vivo.
                </p>
              </div>

              {/* Mini UI de Gráfico Profit & Loss (Estilo RichPath com Simulação de Pgto e Gráfico) */}
              <div className="relative rounded-2xl border border-white/[0.07] bg-black/50 p-5 overflow-hidden">
                <VirtualCursor
                  x={cursorCash.x}
                  y={cursorCash.y}
                  isClicking={cursorCash.click}
                />

                {/* Topo do Gráfico com Status Interativo de Pagamento */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-foreground">
                    Profit and Loss (DRE Mensal)
                  </span>

                  {/* Microinteração de Margem Variável */}
                  <motion.span
                    key={cashScene >= 2 ? "high" : "normal"}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[11px] font-bold flex items-center gap-1 rounded-full px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                  >
                    <ArrowUpRight className="h-3 w-3" />
                    {cashScene >= 2 ? "+42,4% Margem" : "+34,8% Margem"}
                  </motion.span>
                </div>

                {/* Tooltip Dinâmico Flutuante da Imagem de Referência */}
                <motion.div
                  animate={{
                    y: cashScene >= 2 ? [-3, 3, -3] : [0, 0, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`rounded-xl border p-3 mb-3 text-xs flex items-center justify-between transition-all duration-500 ${cashScene >= 2
                      ? "border-primary bg-[#081126] shadow-[0_0_20px_rgba(0,102,255,0.25)]"
                      : "border-white/10 bg-white/[0.03]"
                    }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        30 de Junho • Hoje
                      </span>
                      {cashScene === 0 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                          Aguardando Baixa
                        </span>
                      )}
                      {cashScene >= 1 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          ✓ Pago via Pix
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-emerald-300 font-mono">
                        {cashScene >= 2 ? "R$ 38.650,00" : "R$ 31.400,00"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Lucro Realizado
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground block">
                      Entradas:{" "}
                      <strong className="text-cyan-300 font-mono">
                        {cashScene >= 2 ? "+R$ 46.200" : "+R$ 38.950"}
                      </strong>
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Saídas:{" "}
                      <strong className="text-red-400 font-mono">
                        -R$ 7.550
                      </strong>
                    </span>
                  </div>
                </motion.div>

                {/* Barras do Gráfico de Jan a Dez (Estilo RichPath com Altura Dinâmica) */}
                <div className="h-24 flex items-end gap-2 pt-2 border-b border-white/10 pb-2">
                  {[
                    { m: "Jan", h1: 35, h2: 15 },
                    { m: "Fev", h1: 50, h2: 25 },
                    { m: "Mar", h1: 45, h2: 20 },
                    { m: "Abr", h1: 65, h2: 30 },
                    { m: "Mai", h1: 55, h2: 28 },
                    {
                      m: "Jun",
                      h1: cashScene >= 2 ? 96 : 65,
                      h2: 22,
                      highlight: true,
                    },
                    { m: "Jul", h1: 40, h2: 18 },
                    { m: "Ago", h1: 60, h2: 25 },
                    { m: "Set", h1: 50, h2: 20 },
                    { m: "Out", h1: 75, h2: 35 },
                    { m: "Nov", h1: 65, h2: 28 },
                    { m: "Dez", h1: 85, h2: 40 },
                  ].map((bar, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                    >
                      <motion.div
                        animate={{ height: `${bar.h1}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${bar.highlight
                            ? "bg-gradient-to-t from-primary to-[hsl(var(--brand-cyan))] shadow-[0_0_12px_rgba(0,102,255,0.6)]"
                            : "bg-white/15"
                          }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Legenda dos Meses */}
                <div className="flex justify-between text-[9px] font-mono text-muted-foreground pt-1.5 px-0.5">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>Mai</span>
                  <span className="text-cyan-300 font-bold">Jun (Hoje)</span>
                  <span>Set</span>
                  <span>Dez</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
