import { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Lock,
  Sparkles,
  Building2,
  Mail,
  Calendar,
} from "lucide-react";
import {
  executeAsaasSandboxSubscription,
  SandboxTransactionResult,
} from "@/lib/asaasSandbox";

const APP_LOGIN_URL =
  import.meta.env.VITE_APP_LOGIN_URL || "http://localhost:8080/login";

interface PlanItem {
  name: "Starter" | "Pro" | "Premium";
  monthly: number;
  yearly: number;
  desc: string;
  features: string[];
}

interface AsaasSandboxCheckoutModalProps {
  plans: PlanItem[];
  initialPlanName: "Starter" | "Pro" | "Premium";
  initialAnnual: boolean;
  onClose: () => void;
}

export default function AsaasSandboxCheckoutModal({
  plans,
  initialPlanName,
  initialAnnual,
  onClose,
}: AsaasSandboxCheckoutModalProps) {
  const [selectedPlanName, setSelectedPlanName] = useState<"Starter" | "Pro" | "Premium">(
    initialPlanName
  );
  const [annual, setAnnual] = useState(initialAnnual);
  const [billingType, setBillingType] = useState<"CREDIT_CARD" | "PIX" | "BOLETO">("CREDIT_CARD");

  // Dados da oficina / cliente
  const [name, setName] = useState("AutoCore Performance Center");
  const [cpfCnpj, setCpfCnpj] = useState("11.222.333/0001-81");
  const [email, setEmail] = useState("devops@madintelligence.tec.br");
  const [mobilePhone, setMobilePhone] = useState("(11) 98765-4321");
  const [postalCode, setPostalCode] = useState("04571-010");
  const [addressNumber, setAddressNumber] = useState("1500");

  // Dados do cartão
  const [holderName, setHolderName] = useState("AUTOCORE PERFORMANCE");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiryMonth, setExpiryMonth] = useState("08");
  const [expiryYear, setExpiryYear] = useState("2029");
  const [ccv, setCcv] = useState("123");

  const [loading, setLoading] = useState(false);
  const [txResult, setTxResult] = useState<SandboxTransactionResult | null>(null);
  const [countdown, setCountdown] = useState(4);

  const activePlan = plans.find((p) => p.name === selectedPlanName) || plans[1];
  const currentPrice = annual ? activePlan.yearly : activePlan.monthly;

  useEffect(() => {
    if (!txResult) return;
    setCountdown(4);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = APP_LOGIN_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [txResult]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await executeAsaasSandboxSubscription({
        planName: selectedPlanName,
        billingCycle: annual ? "yearly" : "monthly",
        value: currentPrice,
        billingType,
        customer: {
          name,
          cpfCnpj,
          email,
          mobilePhone,
          postalCode,
          addressNumber,
        },
        creditCard:
          billingType === "CREDIT_CARD"
            ? {
                holderName,
                number: cardNumber,
                expiryMonth,
                expiryYear,
                ccv,
              }
            : undefined,
      });
      setTxResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#070B19] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,102,255,0.22)] my-8 max-h-[92vh] overflow-y-auto">
        {/* Topo com apenas a badge Teste Simulado */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              <span>Teste Simulado</span>
            </span>
            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {txResult ? "Sua oficina está pronta!" : "Finalizar assinatura"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {txResult
                ? "Assinatura confirmada e ambiente liberado para acesso imediato."
                : "Ative seu acesso ao AutoCore e comece a gerenciar seu pátio agora."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {txResult ? (
          <div className="mt-6 space-y-6">
            {/* Card de Sucesso Limpo e Amigável */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] p-6 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-foreground">
                  Pagamento e assinatura confirmados!
                </h4>
                <p className="text-xs text-muted-foreground">
                  Seja bem-vindo ao <strong className="text-foreground">AutoCore Plano {txResult.planName}</strong>.
                </p>
              </div>
            </div>

            {/* Resumo Bonitinho para o Cliente */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Plano escolhido
                </span>
                <span className="font-semibold text-foreground">
                  Plano {txResult.planName} ({txResult.billingCycle === "yearly" ? "Anual" : "Mensal"}) • R$ {txResult.value},00/mês
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  Oficina credenciada
                </span>
                <span className="font-medium text-foreground">{name}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  E-mail de acesso
                </span>
                <span className="font-mono text-primary">{email}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Próxima renovação
                </span>
                <span className="font-medium text-foreground">
                  {new Date(`${txResult.nextDueDate}T12:00:00`).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            {/* Redirecionamento Automático para o Login */}
            <div className="space-y-3 pt-1">
              <a
                href={APP_LOGIN_URL}
                className="btn-brand w-full rounded-xl py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Acessar Painel da Oficina Agora</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-center text-[11px] text-muted-foreground">
                Redirecionando automaticamente para a tela de login em{" "}
                <strong className="text-primary">{countdown}s</strong>...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="mt-5 space-y-5">
            {/* Resumo e Troca Rápida de Plano */}
            <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Plano Selecionado
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <h4 className="text-lg font-bold text-foreground">Plano {activePlan.name}</h4>
                    <span className="text-lg font-bold text-primary">R$ {currentPrice}</span>
                    <span className="text-xs text-muted-foreground">/mês</span>
                  </div>
                </div>

                <div className="flex gap-1 rounded-xl bg-black/40 p-1 border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setAnnual(false)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      !annual ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnual(true)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      annual ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Anual (-20%)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {plans.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPlanName(p.name)}
                    className={`rounded-xl border py-2 px-2.5 text-left transition-all ${
                      selectedPlanName === p.name
                        ? "border-primary bg-primary/20 text-foreground"
                        : "border-white/10 bg-black/20 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-xs font-bold">{p.name}</p>
                    <p className="text-[11px] text-primary font-semibold">
                      R$ {annual ? p.yearly : p.monthly}/mês
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dados da Oficina */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                1. Dados da Oficina
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-muted-foreground">Nome da Oficina / Razão Social</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">CNPJ ou CPF</label>
                  <input
                    required
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">E-mail de Acesso</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">WhatsApp</label>
                  <input
                    required
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                2. Forma de Pagamento
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "CREDIT_CARD" as const, label: "Cartão de Crédito", icon: CreditCard },
                  { id: "PIX" as const, label: "PIX", icon: QrCode },
                  { id: "BOLETO" as const, label: "Boleto", icon: FileText },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setBillingType(m.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                      billingType === m.id
                        ? "border-primary bg-primary/15 text-foreground"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <m.icon className="h-4 w-4 text-primary" />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {billingType === "CREDIT_CARD" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="col-span-2">
                    <label className="text-muted-foreground">Número do Cartão</label>
                    <input
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground">Validade</label>
                    <input
                      required
                      value={`${expiryMonth}/${expiryYear}`}
                      onChange={(e) => {
                        const [m, y] = e.target.value.split("/");
                        setExpiryMonth(m || "08");
                        setExpiryYear(y || "2029");
                      }}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground">CVV</label>
                    <input
                      required
                      value={ccv}
                      onChange={(e) => setCcv(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botão de Finalizar */}
            <div className="space-y-3 border-t border-white/[0.08] pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-brand w-full rounded-xl py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processando sua assinatura...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Confirmar Assinatura • R$ {currentPrice},00/mês</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Pagamento 100% seguro processado via Asaas • Liberação imediata</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
