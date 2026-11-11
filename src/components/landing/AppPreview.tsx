import {
  LayoutDashboard, ClipboardList, Package, Wallet, Users,
  Search, Bell, ArrowUpRight, Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Scanline } from "@/components/landing/motion";

export type PreviewView = "dashboard" | "os" | "estoque" | "financeiro" | "clientes";

const NAV: { key: PreviewView; label: string; icon: any }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "os", label: "Ordens de serviço", icon: ClipboardList },
  { key: "clientes", label: "Clientes", icon: Users },
  { key: "estoque", label: "Estoque", icon: Package },
  { key: "financeiro", label: "Financeiro", icon: Wallet },
];

const CHART = [38, 52, 44, 61, 49, 72, 58, 80, 66, 91, 74, 88];

function Metric({
  label,
  value,
  delta,
  accent,
  alert,
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
  alert?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl lp-card p-3 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.04]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={`mt-1.5 text-sm font-semibold sm:text-base ${
          alert ? "text-racing" : accent ? "text-gradient" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {delta && (
        <p className="mt-0.5 flex items-center gap-0.5 text-[10px] text-success">
          <ArrowUpRight className="h-2.5 w-2.5" />
          {delta}
        </p>
      )}
    </div>
  );
}

function Chip({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "primary" | "success" | "warning" | "racing";
}) {
  const tones = {
    muted: "bg-white/[0.06] text-muted-foreground",
    primary: "bg-primary/15 text-primary ring-1 ring-inset ring-primary/30",
    success: "bg-success/15 text-success ring-1 ring-inset ring-success/25",
    warning: "bg-warning/15 text-warning ring-1 ring-inset ring-warning/25",
    racing: "bg-racing/15 text-racing ring-1 ring-inset ring-racing/30",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${tones[tone]}`}>
      {tone === "racing" && <span className="h-1.5 w-1.5 rounded-full bg-racing animate-pulse" />}
      {children}
    </span>
  );
}

function Row({
  cells,
  tones,
}: {
  cells: string[];
  tones?: (undefined | "primary" | "success" | "warning" | "muted" | "racing")[];
}) {
  return (
    <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.7fr] items-center gap-2 border-t border-white/[0.05] px-3 py-2 text-[11px] transition-colors duration-200 hover:bg-primary/[0.06]">
      {cells.map((c, i) =>
        tones?.[i] ? (
          <div key={i}>
            <Chip tone={tones[i]!}>{c}</Chip>
          </div>
        ) : (
          <div
            key={i}
            className={i === 0 ? "truncate font-medium text-foreground" : "truncate text-muted-foreground"}
          >
            {c}
          </div>
        )
      )}
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl lp-card">
      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.7fr] gap-2 bg-white/[0.02] px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        {head.map((h) => (
          <div key={h} className="truncate">
            {h}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Faturamento do mês" value="R$ 87.500" delta="12,4%" />
        <Metric label="Lucro líquido" value="R$ 32.100" delta="8,1%" accent />
        <Metric label="OS em pátio" value="34" />
        <Metric label="Clientes ativos" value="1.248" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl lp-card p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-foreground">Faturamento · últimos 12 meses</p>
            <Chip tone="primary">+12,4%</Chip>
          </div>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {CHART.map((v, i) => {
              const isRecent = i >= CHART.length - 3;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${v}%` }}
                  transition={{ duration: 0.55, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex-1 rounded-sm transition-opacity hover:opacity-100 ${
                    isRecent
                      ? "bg-gradient-to-t from-primary/60 to-[hsl(var(--brand-cyan))] shadow-[0_0_12px_hsla(211,100%,50%,0.35)]"
                      : "bg-white/[0.12] hover:bg-primary/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="rounded-xl lp-card p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-foreground">Estoque crítico</p>
            <Chip tone="racing">Alerta</Chip>
          </div>
          <div className="mt-3 space-y-2.5">
            {[
              ["Pastilha de freio diant.", 2, 24, true],
              ["Óleo 5W30 sintético", 4, 55, false],
              ["Filtro de ar esportivo", 6, 72, false],
            ].map(([n, q, w, critical]) => (
              <div key={n as string}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="truncate text-muted-foreground">{n}</span>
                  <span className={critical ? "font-semibold text-racing" : "text-foreground"}>{q} un</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      critical
                        ? "bg-gradient-to-r from-racing to-primary"
                        : "bg-gradient-to-r from-primary to-[hsl(var(--brand-cyan))]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Table head={["Ordem de serviço", "Veículo", "Status", "Valor"]}>
        <Row
          cells={["Gol 1.6 · Revisão completa", "ABC-1D23", "Em execução", "R$ 1.240"]}
          tones={[undefined, undefined, "primary", undefined]}
        />
        <Row
          cells={["Onix Turbo · Troca de pneus", "QXR-2J87", "Concluída", "R$ 2.180"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["HB20 · Sistema de freios", "MNO-4T12", "Urgente", "R$ 860"]}
          tones={[undefined, undefined, "racing", undefined]}
        />
      </Table>
    </div>
  );
}

function OsView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Abertas" value="34" />
        <Metric label="Em execução" value="12" accent />
        <Metric label="Aguardando peça" value="5" alert />
        <Metric label="Concluídas no mês" value="128" delta="18%" />
      </div>
      <Table head={["Ordem de serviço", "Cliente", "Status", "Total"]}>
        <Row
          cells={["OS #1042 · Suspensão", "Marcos Lima", "Em execução", "R$ 1.980"]}
          tones={[undefined, undefined, "primary", undefined]}
        />
        <Row
          cells={["OS #1041 · Alinhamento 3D", "Ana Souza", "Concluída", "R$ 320"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["OS #1040 · Kit Embreagem", "Transportes RG", "Aguardando peça", "R$ 3.450"]}
          tones={[undefined, undefined, "racing", undefined]}
        />
        <Row
          cells={["OS #1039 · Revisão 20k", "Carla Menezes", "Concluída", "R$ 1.120"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["OS #1038 · Ar-condicionado", "Diego Ferraz", "Em execução", "R$ 640"]}
          tones={[undefined, undefined, "primary", undefined]}
        />
      </Table>
    </div>
  );
}

function EstoqueView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Itens cadastrados" value="642" />
        <Metric label="Valor em estoque" value="R$ 54.300" accent />
        <Metric label="Abaixo do mínimo" value="9" alert />
        <Metric label="Entradas no mês" value="87" />
      </div>
      <Table head={["Peça", "Marca", "Situação", "Qtd"]}>
        <Row
          cells={["Pneu 195/55 R16", "Michelin", "Em estoque", "16"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["Pastilha diant. cerâmica", "Bosch", "Crítico", "2"]}
          tones={[undefined, undefined, "racing", undefined]}
        />
        <Row
          cells={["Óleo 5W30 Sintético", "Castrol", "Em estoque", "24"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["Bateria 60Ah EFB", "Moura", "Crítico", "1"]}
          tones={[undefined, undefined, "racing", undefined]}
        />
        <Row
          cells={["Filtro de óleo", "Tecfil", "Em estoque", "38"]}
          tones={[undefined, undefined, "success", undefined]}
        />
      </Table>
    </div>
  );
}

function FinanceiroView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Faturamento" value="R$ 87.500" delta="12,4%" />
        <Metric label="Gastos" value="R$ 43.200" />
        <Metric label="Comissões" value="R$ 12.200" />
        <Metric label="Lucro líquido" value="R$ 32.100" accent />
      </div>
      <div className="rounded-xl lp-card p-3">
        <p className="text-[11px] font-medium text-foreground">Entradas x saídas (tempo real)</p>
        <div className="mt-4 flex h-20 items-end gap-2">
          {[64, 40, 78, 52, 86, 46, 92, 58].map((v, i) => (
            <div key={i} className="flex flex-1 items-end gap-1 h-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-[hsl(var(--brand-cyan))]"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${v * 0.55}%` }}
                transition={{ duration: 0.5, delay: i * 0.04 + 0.05 }}
                className="flex-1 rounded-sm bg-white/[0.12]"
              />
            </div>
          ))}
        </div>
      </div>
      <Table head={["Recebimento", "Forma", "Situação", "Valor"]}>
        <Row
          cells={["OS #1042 · Marcos Lima", "Pix", "Recebido", "R$ 1.980"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["OS #1040 · Transportes RG", "Cartão 3x", "Em aberto", "R$ 3.450"]}
          tones={[undefined, undefined, "warning", undefined]}
        />
        <Row
          cells={["OS #1039 · Carla Menezes", "Dinheiro", "Recebido", "R$ 1.120"]}
          tones={[undefined, undefined, "success", undefined]}
        />
      </Table>
    </div>
  );
}

function ClientesView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Clientes ativos" value="1.248" />
        <Metric label="Veículos" value="1.836" />
        <Metric label="Retornos no mês" value="212" accent />
        <Metric label="Ticket médio" value="R$ 684" delta="6,2%" />
      </div>
      <Table head={["Cliente", "Veículo principal", "Situação", "Última OS"]}>
        <Row
          cells={["Marcos Lima", "Gol 1.6 · ABC-1D23", "Ativo", "12/07"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["Ana Souza", "Onix · QXR-2J87", "Ativo", "09/07"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["Transportes RG", "Frota · 6 veículos", "Frota VIP", "04/07"]}
          tones={[undefined, undefined, "primary", undefined]}
        />
        <Row
          cells={["Carla Menezes", "HB20 · MNO-4T12", "Ativo", "28/06"]}
          tones={[undefined, undefined, "success", undefined]}
        />
        <Row
          cells={["Diego Ferraz", "Corolla · PLK-9C55", "Revisão próxima", "21/06"]}
          tones={[undefined, undefined, "racing", undefined]}
        />
      </Table>
    </div>
  );
}

const VIEWS: Record<PreviewView, () => JSX.Element> = {
  dashboard: DashboardView,
  os: OsView,
  estoque: EstoqueView,
  financeiro: FinanceiroView,
  clientes: ClientesView,
};

export default function AppPreview({
  view = "dashboard",
  onSelectView,
}: {
  view?: PreviewView;
  onSelectView?: (view: PreviewView) => void;
}) {
  const Body = VIEWS[view];
  const active = NAV.find((n) => n.key === view)!;

  return (
    <div className="relative overflow-hidden rounded-2xl lp-panel lp-shadow glow-blue">
      {/* Scanline infinito periódico ("tipo vídeo ao vivo") */}
      <Scanline />

      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.015] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-racing/75" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        <div className="ml-3 hidden flex-1 items-center justify-between rounded-md border border-white/[0.05] bg-black/30 px-3 py-1 sm:flex">
          <span className="text-[10px] text-muted-foreground">
            https://app.autocore.com.br/<span className="text-primary">{active.key}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
            <Radio className="h-2.5 w-2.5 animate-pulse" />
            Sincronizado ao vivo
          </span>
        </div>
      </div>

      <div className="flex" style={{ background: "hsl(var(--surface-1))" }}>
        {/* Sidebar */}
        <aside className="hidden w-44 shrink-0 border-r border-white/[0.06] p-3 md:block">
          <div className="flex items-center gap-2 px-1 pb-3">
            <span className="grid h-5 w-5 place-items-center rounded bg-gradient-to-br from-primary to-racing text-[10px] font-bold text-white shadow-[0_0_12px_hsla(211,100%,50%,0.5)]">
              A
            </span>
            <span className="text-[11px] font-bold tracking-tight">
              <span className="text-chrome">Auto</span>
              <span className="text-gradient">Core</span>
            </span>
          </div>
          <nav className="space-y-0.5">
            {NAV.map((n) => {
              const isActive = n.key === view;
              return (
                <button
                  type="button"
                  key={n.key}
                  onClick={() => onSelectView?.(n.key)}
                  className={`relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                  } ${onSelectView ? "cursor-pointer" : "cursor-default"}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="preview-sidebar-active"
                      className="absolute inset-0 rounded-md bg-primary/12 ring-1 ring-inset ring-primary/30"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  <n.icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10 truncate">{n.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-foreground">{active.label}</p>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary">
                ERP v2.6
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <div className="relative">
                <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-racing" />
              </div>
              <span className="h-5 w-5 rounded-full bg-gradient-to-tr from-primary/40 to-racing/40 ring-1 ring-white/15" />
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <Body />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
