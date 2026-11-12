import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Maximize2,
  Sun,
  Moon,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  QrCode,
  CreditCard,
  Banknote,
  Send,
  Sparkles,
  TrendingUp,
  Wallet,
  CarFront,
  Calendar,
  Lock,
  ArrowUpRight,
  Trash2,
  Check,
} from "lucide-react";
import logo from "@/assets/autocore-logo.png";

// Interface para as Ordens de Serviço
interface DemoWorkOrder {
  id: string;
  plate: string;
  vehicle: string;
  owner: string;
  service: string;
  amount: number;
  status: "aguardando_pecas" | "em_execucao" | "pronto";
}

// Interface para as Movimentações de Caixa
interface DemoCashTransaction {
  id: string;
  description: string;
  amount: number;
  type: "entrada" | "saida";
  method: "PIX" | "CARTAO" | "DINHEIRO";
  date: string;
}

// Interface para os Agendamentos
interface DemoAppointment {
  id: string;
  client: string;
  vehicle: string;
  plate: string;
  service: string;
  time: string;
  status: "pendente" | "confirmado";
}

const DEFAULT_ORDERS: DemoWorkOrder[] = [
  {
    id: "OS-1040",
    plate: "ABC-1D23",
    vehicle: "Honda Civic 2.0",
    owner: "João da Silva",
    service: "Revisão Geral & Freios",
    amount: 1850,
    status: "pronto",
  },
  {
    id: "OS-1041",
    plate: "BRA-2E19",
    vehicle: "Toyota Corolla 1.8",
    owner: "Maria Oliveira",
    service: "Troca de Óleo & Filtros",
    amount: 490,
    status: "em_execucao",
  },
  {
    id: "OS-1042",
    plate: "XYZ-9876",
    vehicle: "Fiat Strada 1.4",
    owner: "Transportadora Rápida",
    service: "Suspensão Dianteira & Amortecedores",
    amount: 2450,
    status: "aguardando_pecas",
  },
];

const DEFAULT_TRANSACTIONS: DemoCashTransaction[] = [
  {
    id: "TX-1",
    description: "OS-1040: Honda Civic (Baixa)",
    amount: 1850,
    type: "entrada",
    method: "PIX",
    date: "14:32",
  },
  {
    id: "TX-2",
    description: "Compra de Peças (Distribuidora)",
    amount: 620,
    type: "saida",
    method: "CARTAO",
    date: "11:15",
  },
  {
    id: "TX-3",
    description: "OS-1039: Vw Gol (Revisão)",
    amount: 780,
    type: "entrada",
    method: "CARTAO",
    date: "09:40",
  },
];

const DEFAULT_APPOINTMENTS: DemoAppointment[] = [
  {
    id: "AG-1",
    client: "Juliana Silva",
    vehicle: "Honda Civic",
    plate: "ABC-1D23",
    service: "Revisão dos 10.000 km",
    time: "Hoje às 15:30",
    status: "confirmado",
  },
  {
    id: "AG-2",
    client: "Carlos Eduardo",
    vehicle: "Toyota Corolla",
    plate: "BRA-2E19",
    service: "Troca de Óleo e Filtros",
    time: "Amanhã às 09:00",
    status: "pendente",
  },
  {
    id: "AG-3",
    client: "Roberto Mendes",
    vehicle: "Jeep Renegade",
    plate: "JEP-4F82",
    service: "Checkup de Freios 30 Dias",
    time: "Sexta às 14:00",
    status: "pendente",
  },
];

export default function InteractivePcDemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Tema da janela simulada: 'dark' (fundo azul escuro) ou 'light' (fundo branco puro)
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<"os" | "caixa" | "agenda" | "dre">("os");
  const [isMaximized, setIsMaximized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados dos Mocks com persistência em localStorage
  const [orders, setOrders] = useState<DemoWorkOrder[]>(() => {
    try {
      const saved = localStorage.getItem("autocore_demo_orders");
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [transactions, setTransactions] = useState<DemoCashTransaction[]>(() => {
    try {
      const saved = localStorage.getItem("autocore_demo_transactions");
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const [appointments, setAppointments] = useState<DemoAppointment[]>(() => {
    try {
      const saved = localStorage.getItem("autocore_demo_appointments");
      return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
    } catch {
      return DEFAULT_APPOINTMENTS;
    }
  });

  // Modal para adicionar nova OS
  const [showNewOsForm, setShowNewOsForm] = useState(false);
  const [newPlate, setNewPlate] = useState("");
  const [newVehicle, setNewVehicle] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newService, setNewService] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // Disparo de toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sincronizar com localStorage
  useEffect(() => {
    try {
      localStorage.setItem("autocore_demo_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("autocore_demo_transactions", JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem("autocore_demo_appointments", JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  // Reset para dados iniciais
  const handleResetData = () => {
    setOrders(DEFAULT_ORDERS);
    setTransactions(DEFAULT_TRANSACTIONS);
    setAppointments(DEFAULT_APPOINTMENTS);
    try {
      localStorage.removeItem("autocore_demo_orders");
      localStorage.removeItem("autocore_demo_transactions");
      localStorage.removeItem("autocore_demo_appointments");
    } catch (e) {
      console.error(e);
    }
    triggerToast("Estado original do app restaurado!");
  };

  // Ciclar status da OS
  const handleCycleOsStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (o.status === "aguardando_pecas") return { ...o, status: "em_execucao" };
        if (o.status === "em_execucao") return { ...o, status: "pronto" };
        return { ...o, status: "aguardando_pecas" };
      })
    );
    triggerToast("Status da OS atualizado com sucesso!");
  };

  // Adicionar nova OS
  const handleCreateOs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate || !newVehicle || !newAmount) return;

    const newOs: DemoWorkOrder = {
      id: `OS-${1050 + orders.length}`,
      plate: newPlate.toUpperCase(),
      vehicle: newVehicle,
      owner: newOwner || "Cliente Balcão",
      service: newService || "Revisão Mecânica",
      amount: parseFloat(newAmount) || 350,
      status: "em_execucao",
    };

    setOrders((prev) => [newOs, ...prev]);
    setShowNewOsForm(false);
    setNewPlate("");
    setNewVehicle("");
    setNewOwner("");
    setNewService("");
    setNewAmount("");
    triggerToast(`OS ${newOs.id} criada e salva no localStorage!`);
  };

  // Simular recebimento de pagamento no Caixa
  const handleReceivePayment = (order: DemoWorkOrder, method: "PIX" | "CARTAO" | "DINHEIRO") => {
    const newTx: DemoCashTransaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      description: `Baixa ${order.id}: ${order.vehicle}`,
      amount: order.amount,
      type: "entrada",
      method,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setTransactions((prev) => [newTx, ...prev]);
    // Marca a OS como pronta
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "pronto" } : o))
    );
    triggerToast(`Recebimento de R$ ${order.amount.toFixed(2)} registrado via ${method}!`);
  };

  // Confirmar agendamento / WhatsApp
  const handleConfirmAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "confirmado" } : a))
    );
    triggerToast("Lembrete WhatsApp enviado e confirmado pelo cliente!");
  };

  // Cálculos de Caixa e Lucro
  const totalEntradas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalSaidas = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + t.amount, 0);
  const saldoCaixa = totalEntradas - totalSaidas;
  const margemLucro = totalEntradas > 0 ? ((saldoCaixa / totalEntradas) * 100).toFixed(1) : "0.0";

  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        {/* Janela de PC Flutuante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex flex-col rounded-2xl shadow-[0_25px_90px_rgba(0,102,255,0.35)] border overflow-hidden transition-all duration-300 ${isMaximized ? "w-full h-full rounded-none" : "w-full max-w-5xl h-[88vh] max-h-[780px]"
            } ${isDark
              ? "bg-[#070A18] border-white/[0.12] text-foreground"
              : "bg-[#FFFFFF] border-slate-200 text-slate-900"
            }`}
        >
          {/* BARRA SUPERIOR DE JANELA DE PC (MAC/WINDOWS WINDOW CONTROLS) */}
          <div
            className={`flex items-center justify-between px-4 py-2.5 border-b select-none ${isDark ? "bg-[#050711] border-white/[0.08]" : "bg-[#F1F5F9] border-slate-200"
              }`}
          >
            {/* Controles de Janela */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar demonstração"
                className="h-3 w-3 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setIsMaximized(false)}
                aria-label="Minimizar janela"
                className="h-3 w-3 rounded-full bg-amber-500/90 hover:bg-amber-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setIsMaximized((v) => !v)}
                aria-label="Maximizar janela"
                className="h-3 w-3 rounded-full bg-emerald-500/90 hover:bg-emerald-600 transition-colors"
              />
            </div>

            {/* URL Simulada de Navegador */}
            <div
              className={`hidden sm:flex items-center gap-2 rounded-lg px-3.5 py-1 text-xs font-mono max-w-sm truncate border ${isDark
                  ? "bg-white/[0.03] border-white/10 text-muted-foreground"
                  : "bg-white border-slate-300 text-slate-600"
                }`}
            >
              <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>https://app.autocore.com.br/demonstracao-ao-vivo</span>
            </div>

            {/* Alternância de Modo Escuro/Claro & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                aria-label={isDark ? "Mudar para modo claro (fundo branco)" : "Mudar para modo escuro (fundo azul)"}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-colors ${isDark
                    ? "border-white/15 bg-white/5 text-chrome hover:bg-white/10"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
              >
                {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-primary" />}
                <span className="hidden xs:inline">{isDark ? "Fundo Claro" : "Fundo Azul Noturno"}</span>
              </button>

              <button
                type="button"
                onClick={handleResetData}
                title="Restaurar dados padrão do localStorage"
                className={`p-1.5 rounded-lg border transition-colors ${isDark
                    ? "border-white/15 bg-white/5 text-muted-foreground hover:text-foreground"
                    : "border-slate-300 bg-white text-slate-600 hover:text-slate-900"
                  }`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`p-1.5 rounded-lg border transition-colors ${isDark
                    ? "border-white/15 bg-white/5 text-muted-foreground hover:text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:text-black"
                  }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CORPO DO APLICATIVO SIMULADO (SIDEBAR + CONTEÚDO PRINCIPAL) */}
          <div className="flex flex-1 overflow-hidden">
            {/* SIDEBAR DO ERP AUTOCORE */}
            <aside
              className={`w-16 sm:w-56 shrink-0 flex flex-col justify-between p-3 border-r select-none transition-colors ${isDark ? "bg-[#060814] border-white/[0.08]" : "bg-[#F8FAFC] border-slate-200"
                }`}
            >
              <div className="space-y-4">
                {/* Logo da Marca */}
                <div className="flex items-center gap-2.5 px-2 py-1">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/40">
                    <img src={logo} alt="AutoCore" className="h-5 w-5 object-contain" />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-sm font-bold tracking-tight">AutoCore</span>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
                      ERP Oficina
                    </span>
                  </div>
                </div>

                {/* Itens de Navegação (As 4 Telas dos Cards) */}
                <nav className="space-y-1">
                  {[
                    { id: "os", label: "Ordens de Serviço", icon: CarFront, badge: orders.length },
                    { id: "caixa", label: "Caixa & Pagamentos", icon: Wallet },
                    { id: "agenda", label: "Agendamentos & Avisos", icon: Calendar, badge: appointments.filter(a => a.status === "pendente").length },
                    { id: "dre", label: "DRE & Lucratividade", icon: TrendingUp },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${isActive
                            ? isDark
                              ? "bg-primary/20 text-cyan-300 border border-primary/30 shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                              : "bg-primary text-white shadow-md"
                            : isDark
                              ? "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                              : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <tab.icon className="h-4 w-4 shrink-0" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </div>
                        {tab.badge !== undefined && tab.badge > 0 && (
                          <span
                            className={`hidden sm:inline-block rounded-full px-1.5 py-0.2 text-[10px] font-bold ${isActive
                                ? "bg-white/20 text-white"
                                : isDark
                                  ? "bg-white/10 text-muted-foreground"
                                  : "bg-slate-300 text-slate-800"
                              }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Status do LocalStorage no Rodapé da Sidebar */}
              <div
                className={`hidden sm:block rounded-xl p-2.5 text-[10px] border ${isDark
                    ? "bg-white/[0.02] border-white/5 text-muted-foreground"
                    : "bg-white border-slate-200 text-slate-500"
                  }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LocalStorage Ativo</span>
                </div>
                <p className="leading-snug">
                  Suas alterações persistem neste navegador.
                </p>
              </div>
            </aside>

            {/* ÁREA DE CONTEÚDO PRINCIPAL DA TELA SELECIONADA */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 relative">
              {/* TOAST FLUTUANTE DE FEEDBACK */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="absolute top-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/90 text-emerald-300 px-4 py-2.5 text-xs font-semibold shadow-2xl backdrop-blur-md"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ========================================================
                  TELA 1: ORDENS DE SERVIÇO (PÁTIO)
                  ======================================================== */}
              {activeTab === "os" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Ordens de Serviço do Pátio</h2>
                      <p className="text-xs text-muted-foreground">
                        Clique no status para avançar a OS ou crie um novo atendimento.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowNewOsForm(true)}
                      className="btn-brand inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Nova Ordem de Serviço</span>
                    </button>
                  </div>

                  {/* FORMULÁRIO DE NOVA OS */}
                  {showNewOsForm && (
                    <motion.form
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleCreateOs}
                      className={`rounded-2xl border p-4 space-y-3 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-slate-50 border-slate-300"
                        }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Cadastrar Veículo no Pátio</span>
                        <button
                          type="button"
                          onClick={() => setShowNewOsForm(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <input
                          required
                          placeholder="Placa (ex: BRA-2026)"
                          value={newPlate}
                          onChange={(e) => setNewPlate(e.target.value)}
                          className={`rounded-xl border p-2.5 outline-none focus:border-primary ${isDark ? "bg-black/40 border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"
                            }`}
                        />
                        <input
                          required
                          placeholder="Veículo (ex: Civic 2.0)"
                          value={newVehicle}
                          onChange={(e) => setNewVehicle(e.target.value)}
                          className={`rounded-xl border p-2.5 outline-none focus:border-primary ${isDark ? "bg-black/40 border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"
                            }`}
                        />
                        <input
                          required
                          type="number"
                          placeholder="Valor (R$)"
                          value={newAmount}
                          onChange={(e) => setNewAmount(e.target.value)}
                          className={`rounded-xl border p-2.5 outline-none focus:border-primary ${isDark ? "bg-black/40 border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"
                            }`}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn-brand rounded-xl px-4 py-2 text-xs font-semibold"
                        >
                          Salvar OS no LocalStorage
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* LISTA DE ORDENS DE SERVIÇO */}
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${isDark
                            ? "bg-white/[0.02] border-white/10 hover:border-primary/40"
                            : "bg-white border-slate-200 hover:border-primary shadow-sm"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary font-bold">
                            <CarFront className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{o.vehicle}</span>
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary/15 text-primary font-semibold">
                                {o.plate}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {o.owner} • {o.service}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                          <span className="font-mono font-bold text-sm">
                            R$ {o.amount.toFixed(2)}
                          </span>

                          {/* Botão Interativo de Status com Feedback */}
                          <button
                            type="button"
                            onClick={() => handleCycleOsStatus(o.id)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all ${o.status === "pronto"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : o.status === "em_execucao"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              }`}
                          >
                            {o.status === "pronto" && "✓ Pronto p/ Entrega"}
                            {o.status === "em_execucao" && "⚙ Em Execução"}
                            {o.status === "aguardando_pecas" && "⏳ Aguardando Peças"}
                          </button>

                          {/* Ação Rápida de Recebimento no Caixa */}
                          {o.status === "pronto" && (
                            <button
                              type="button"
                              onClick={() => handleReceivePayment(o, "PIX")}
                              className="btn-brand rounded-xl px-2.5 py-1 text-[11px] font-semibold"
                            >
                              Baixar no Caixa
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TELA 2: CAIXA & PAGAMENTOS (RECEBIMENTO RÁPIDO)
                  ======================================================== */}
              {activeTab === "caixa" && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Caixa & Recebimento Rápido</h2>
                    <p className="text-xs text-muted-foreground">
                      Conecte métodos de recebimento e realize conciliação instantânea da oficina.
                    </p>
                  </div>

                  {/* Resumo do Caixa */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`rounded-2xl border p-4 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200"}`}>
                      <span className="text-xs text-muted-foreground">Saldo Líquido</span>
                      <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
                        R$ {saldoCaixa.toFixed(2)}
                      </p>
                    </div>
                    <div className={`rounded-2xl border p-4 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200"}`}>
                      <span className="text-xs text-muted-foreground">Total de Entradas</span>
                      <p className="text-xl font-bold font-mono text-cyan-300 mt-1">
                        + R$ {totalEntradas.toFixed(2)}
                      </p>
                    </div>
                    <div className={`rounded-2xl border p-4 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200"}`}>
                      <span className="text-xs text-muted-foreground">Total de Saídas</span>
                      <p className="text-xl font-bold font-mono text-red-400 mt-1">
                        - R$ {totalSaidas.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Lista de Movimentações */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold">Últimas Movimentações Sincronizadas</h3>
                    {transactions.map((t) => (
                      <div
                        key={t.id}
                        className={`rounded-2xl border p-3.5 flex items-center justify-between text-xs ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`grid h-8 w-8 place-items-center rounded-lg font-bold ${t.type === "entrada"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {t.method === "PIX" ? (
                              <QrCode className="h-4 w-4" />
                            ) : t.method === "CARTAO" ? (
                              <CreditCard className="h-4 w-4" />
                            ) : (
                              <Banknote className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{t.description}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {t.date} • Método: {t.method}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`font-mono font-bold text-sm ${t.type === "entrada" ? "text-emerald-400" : "text-red-400"
                            }`}
                        >
                          {t.type === "entrada" ? "+" : "-"} R$ {t.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TELA 3: AGENDAMENTOS & LEMBRETES AUTOMÁTICOS
                  ======================================================== */}
              {activeTab === "agenda" && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Agendamentos & Lembretes</h2>
                    <p className="text-xs text-muted-foreground">
                      Dispare lembretes via WhatsApp para confirmação automática de retorno dos clientes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div
                        key={a.id}
                        className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{a.client}</span>
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-semibold">
                                {a.plate}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {a.vehicle} • {a.service} • <strong>{a.time}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border ${a.status === "confirmado"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              }`}
                          >
                            {a.status === "confirmado" ? "✓ Confirmado via WhatsApp" : "⏳ Lembrete Pendente"}
                          </span>

                          {a.status === "pendente" && (
                            <button
                              type="button"
                              onClick={() => handleConfirmAppointment(a.id)}
                              className="btn-brand rounded-xl px-3 py-1 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <Send className="h-3 w-3" />
                              <span>Disparar WhatsApp</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TELA 4: DRE & LUCRATIVIDADE (GRÁFICO REATIVO)
                  ======================================================== */}
              {activeTab === "dre" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">DRE & Lucratividade em Tempo Real</h2>
                      <p className="text-xs text-muted-foreground">
                        Gráfico calculado ao vivo conforme as receitas e despesas salvas no seu navegador.
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      +{margemLucro}% Margem Líquida
                    </span>
                  </div>

                  {/* Gráfico Reativo */}
                  <div className={`rounded-2xl border p-5 ${isDark ? "bg-black/40 border-white/10" : "bg-white border-slate-200"}`}>
                    <div className="flex justify-between items-center text-xs mb-4">
                      <span className="font-bold">Evolução Mensal (Comparativo de Caixa)</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          Entradas
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          Despesas
                        </span>
                      </div>
                    </div>

                    {/* Barras do Gráfico */}
                    <div className="h-36 flex items-end gap-3 pt-4 border-b border-white/10 pb-2">
                      {[
                        { mes: "Jan", rec: 60, desp: 25 },
                        { mes: "Fev", rec: 55, desp: 20 },
                        { mes: "Mar", rec: 70, desp: 30 },
                        { mes: "Abr", rec: 65, desp: 25 },
                        { mes: "Mai", rec: 80, desp: 35 },
                        {
                          mes: "Jun (Atual)",
                          rec: Math.min(100, Math.max(30, (totalEntradas / 3000) * 100)),
                          desp: Math.min(80, Math.max(15, (totalSaidas / 3000) * 100)),
                          active: true,
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <div className="w-full flex items-end justify-center gap-1 h-full">
                            <motion.div
                              animate={{ height: `${item.rec}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`w-1/2 rounded-t-md ${item.active
                                  ? "bg-gradient-to-t from-primary to-cyan-400 shadow-[0_0_12px_rgba(0,102,255,0.6)]"
                                  : isDark
                                    ? "bg-primary/50"
                                    : "bg-primary/40"
                                }`}
                            />
                            <motion.div
                              animate={{ height: `${item.desp}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="w-1/2 rounded-t-md bg-red-400/60"
                            />
                          </div>
                          <span
                            className={`text-[10px] font-mono mt-1 ${item.active ? "font-bold text-cyan-300" : "text-muted-foreground"
                              }`}
                          >
                            {item.mes}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

