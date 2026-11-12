import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CarFront,
  Package,
  Calendar,
  Wallet,
  Lock,
  Plus,
  Bell,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import AutoCoreLogo from "@/components/landing/AutoCoreLogo";

const sidebarNav = [
  { label: "Início", icon: LayoutDashboard, active: true },
  { label: "Ordens de Serviço", icon: ClipboardList, badge: "14" },
  { label: "Clientes", icon: Users },
  { label: "Veículos", icon: CarFront },
  { label: "Estoque", icon: Package, alert: true },
  { label: "Agendamentos", icon: Calendar, badge: "6" },
  { label: "Financeiro", icon: Wallet },
];

const remindersFeed = [
  {
    title: "Revisão 10.000 km • Honda Civic (ABC-1D23)",
    detail: "Lembrete automático enviado via WhatsApp para Juliana Silva",
    status: "Confirmado",
  },
  {
    title: "Troca de Óleo 5W30 • Toyota Corolla (BRA-2E19)",
    detail: "Retorno preventivo agendado para amanhã às 09:00",
    status: "Agendado",
  },
  {
    title: "Checkup de Freios • Fiat Strada (XYZ-9876)",
    detail: "Orçamento aprovado pelo cliente • Peças liberadas no pátio",
    status: "Aprovado",
  },
];

const monthlyBars = [
  { m: "Jan", v: 46 },
  { m: "Fev", v: 58 },
  { m: "Mar", v: 52 },
  { m: "Abr", v: 68 },
  { m: "Mai", v: 62 },
  { m: "Jun", v: 78 },
  { m: "Jul", v: 72 },
  { m: "Ago", v: 86 },
  { m: "Set", v: 80 },
  { m: "Out", v: 94, highlight: true },
];

export default function HeroAppShowcase() {
  const [reminderIdx, setReminderIdx] = useState(0);
  const [livePhase, setLivePhase] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => {
      setReminderIdx((prev) => (prev + 1) % remindersFeed.length);
    }, 3600);
    const t2 = setInterval(() => {
      setLivePhase((prev) => (prev + 1) % 2);
    }, 3200);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  const currentReminder = remindersFeed[reminderIdx];

  return (
    <div className="relative mx-auto w-full max-w-5xl select-none">
      {/* Moldura da Janela do Sistema AutoCore (Tema Azul Noturno) */}
      <div className="relative flex flex-col rounded-3xl border border-white/[0.12] bg-[#070A18] text-foreground shadow-[0_25px_90px_rgba(0,102,255,0.28)] overflow-hidden">
        {/* Barra Superior do Navegador */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-[#050711] border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90 inline-block" />
          </div>

          <div className="flex items-center gap-2 rounded-lg px-3.5 py-1 text-xs font-mono border bg-white/[0.03] border-white/10 text-muted-foreground">
            <Lock className="h-3 w-3 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>https://app.autocore.com.br/dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
              Online
            </span>
          </div>
        </div>

        {/* Corpo do ERP: Sidebar + Dashboard */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Off-White + Azul Noturno */}
          <aside className="w-16 sm:w-52 shrink-0 flex flex-col justify-between p-3 border-r bg-[#060814] border-white/[0.08]">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 px-2 py-1">
                <AutoCoreLogo className="h-7 w-7 shrink-0" />
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-black tracking-tight text-[#F5F5F2]">
                    AutoCore
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
                    Painel da Oficina
                  </span>
                </div>
              </div>

              <nav className="space-y-1" aria-label="Menu simulado do sistema">
                {sidebarNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors ${
                        item.active
                          ? "bg-primary/20 text-cyan-300 border border-primary/35 shadow-[0_0_16px_rgba(0,102,255,0.25)]"
                          : "text-muted-foreground/85"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="hidden sm:inline truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="hidden sm:inline-block rounded-full bg-white/10 px-1.5 py-0.2 text-[10px] font-semibold text-foreground/80">
                          {item.badge}
                        </span>
                      )}
                      {item.alert && (
                        <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="hidden sm:block rounded-xl p-3 text-[11px] border bg-white/[0.02] border-white/5 text-muted-foreground">
              <p className="font-semibold text-foreground">Oficina AutoCore</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Pátio em tempo real
              </p>
            </div>
          </aside>

          {/* Conteúdo Principal do Dashboard */}
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-hidden">
            {/* Cabeçalho + Ações Rápidas (DashboardQuickActions) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                  Visão Geral da Oficina
                </h3>
                <p className="text-xs text-muted-foreground">
                  Acompanhe pátio, estoque, agendamentos e lucro líquido em tempo real.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(0,102,255,0.4)]">
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Nova OS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-foreground/90">
                  <Calendar className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                  Agendar
                </span>
              </div>
            </div>

            {/* 4 KPI Cards (DashboardStatsGrid + DashboardFinancialCards) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-muted-foreground">Faturamento do Mês</span>
                <motion.p
                  key={livePhase}
                  initial={{ opacity: 0.7, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mt-1 text-lg sm:text-xl font-bold font-mono text-foreground"
                >
                  {livePhase === 0 ? "R$ 87.500" : "R$ 89.350"}
                </motion.p>
                <span className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" /> +14,2% vs mês anterior
                </span>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-3.5 shadow-[0_0_24px_rgba(0,102,255,0.12)]">
                <span className="text-[11px] text-cyan-200/80">Lucro Líquido Real</span>
                <motion.p
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-1 text-lg sm:text-xl font-bold font-mono text-emerald-400"
                >
                  {livePhase === 0 ? "R$ 32.100" : "R$ 33.420"}
                </motion.p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300">
                  <TrendingUp className="h-3 w-3" /> Margem 37,4%
                </span>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-muted-foreground">OS no Pátio</span>
                <p className="mt-1 text-lg sm:text-xl font-bold font-mono text-foreground">
                  14 ativas
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-300">
                  <Clock className="h-3 w-3" /> 3 aguardando peças
                </span>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-muted-foreground">Clientes Ativos</span>
                <p className="mt-1 text-lg sm:text-xl font-bold font-mono text-foreground">
                  1.248
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> 92% de retorno
                </span>
              </div>
            </div>

            {/* Banner de Lembretes Automáticos (DashboardRemindersCard) */}
            <div className="rounded-2xl border border-primary/25 bg-[#0A132B]/80 px-4 py-2.5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReminder.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/20 text-cyan-300">
                      <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {currentReminder.title}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {currentReminder.detail}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {currentReminder.status}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Grid Inferior: Gráfico de Receita + Estoque Crítico / Agendamentos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              {/* Gráfico de Faturamento Mensal */}
              <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground">
                    Evolução de Faturamento
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-primary/15 border border-primary/30 px-2 py-0.5 rounded-full">
                    Últimos 10 meses
                  </span>
                </div>

                <div className="h-28 flex items-end gap-2 pt-2 border-b border-white/[0.08] pb-2">
                  {monthlyBars.map((bar, idx) => {
                    const dynamicHeight =
                      bar.highlight && livePhase === 1 ? 98 : bar.v;
                    return (
                      <div
                        key={bar.m}
                        className="flex-1 flex flex-col items-center justify-end h-full gap-1"
                      >
                        <motion.div
                          animate={{
                            height: [
                              `${Math.max(25, dynamicHeight - 4)}%`,
                              `${dynamicHeight}%`,
                              `${Math.max(25, dynamicHeight - 4)}%`,
                            ],
                          }}
                          transition={{
                            duration: 3.6,
                            repeat: Infinity,
                            delay: idx * 0.12,
                            ease: "easeInOut",
                          }}
                          className={`w-full rounded-t-sm ${
                            bar.highlight
                              ? "bg-gradient-to-t from-primary to-cyan-400 shadow-[0_0_12px_rgba(0,102,255,0.6)]"
                              : "bg-primary/40"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-1.5">
                  {monthlyBars.map((bar) => (
                    <span
                      key={bar.m}
                      className={bar.highlight ? "text-cyan-300 font-bold" : ""}
                    >
                      {bar.m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estoque Crítico & Próximos Agendamentos */}
              <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                    Estoque Crítico
                  </span>
                  <span className="text-[10px] font-semibold text-amber-300">
                    Reposição
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: "Pastilha de Freio Diant.", qty: "2 un", pct: 22, critical: true },
                    { name: "Óleo 5W30 Sintético", qty: "5 un", pct: 48, critical: false },
                    { name: "Filtro de Ar Motor", qty: "8 un", pct: 68, critical: false },
                  ].map((item, idx) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted-foreground truncate">{item.name}</span>
                        <span
                          className={`font-mono font-semibold ${
                            item.critical ? "text-red-400" : "text-foreground"
                          }`}
                        >
                          {item.qty}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          animate={{
                            width: [`${item.pct - 5}%`, `${item.pct}%`, `${item.pct - 5}%`],
                          }}
                          transition={{
                            duration: 3.4,
                            repeat: Infinity,
                            delay: idx * 0.25,
                            ease: "easeInOut",
                          }}
                          className={`h-full rounded-full ${
                            item.critical
                              ? "bg-gradient-to-r from-red-500 to-amber-400"
                              : "bg-gradient-to-r from-primary to-cyan-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
