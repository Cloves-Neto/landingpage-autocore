import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  QrCode,
  RefreshCw,
  ShieldCheck,
  CalendarDays,
  Wallet,
  Loader2,
  Tag,
  Check,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AutoCoreLogo from "@/components/landing/AutoCoreLogo";
import { plans } from "@/components/landing/PlansSection";
import {
  onlyDigits,
  maskCpf,
  maskPhone,
  maskCep,
  maskCardNumber,
  maskCardExpiry,
  maskCvv,
  getPlanValidityPeriod,
  validateCustomerStep,
  validateCardStep,
  type CustomerStepData,
  type CardStepData,
} from "@/lib/checkoutMasks";

type PlanName = "Starter" | "Pro" | "Premium";
type PaymentMethod = "PIX" | "MERCADO_PAGO" | "CREDIT_CARD";

const COUPONS: Record<string, number> = {
  AUTOCORE20: 0.2,
  OFICINA10: 0.1,
  BEMVINDO15: 0.15,
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const initialPlanParam = searchParams.get("plan") as PlanName | null;
  const initialBillingParam = searchParams.get("billing");

  const [selectedPlanName, setSelectedPlanName] = useState<PlanName>(
    initialPlanParam && ["Starter", "Pro", "Premium"].includes(initialPlanParam)
      ? initialPlanParam
      : "Pro"
  );
  const [annual, setAnnual] = useState(initialBillingParam !== "monthly");

  // Multi-step: 1 = Dados do Contratante, 2 = Forma de Pagamento, 3 = Confirmado
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Dados do Contratante (UI mascarada)
  const [customer, setCustomer] = useState<CustomerStepData>({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [customerErrors, setCustomerErrors] = useState<
    Partial<Record<keyof CustomerStepData, string>>
  >({});

  // BuscaCEP / ViaCEP estado
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  // Forma de Pagamento
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CREDIT_CARD");
  const [card, setCard] = useState<CardStepData>({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [cardErrors, setCardErrors] = useState<
    Partial<Record<keyof CardStepData, string>>
  >({});
  const [sameBillingAddress, setSameBillingAddress] = useState(true);

  // Cupom & Totais
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Submissão
  const [submitting, setSubmitting] = useState(false);
  const [sanitizedPayload, setSanitizedPayload] = useState<Record<string, unknown> | null>(null);
  const [pixCopied, setPixCopied] = useState(false);

  const selectedPlan = plans.find((p) => p.name === selectedPlanName) ?? plans[1];
  const subtotalReais = annual ? selectedPlan.yearly : selectedPlan.monthly;
  const subtotalCents = Math.round(subtotalReais * 100);
  const discountRate = appliedCoupon ? COUPONS[appliedCoupon] ?? 0 : 0;
  const discountCents = Math.round(subtotalCents * discountRate);
  const totalCents = subtotalCents - discountCents;
  const validity = getPlanValidityPeriod();

  // Busca automática de endereço via API ViaCEP / BuscaCEP ao digitar 8 dígitos
  useEffect(() => {
    const cepDigits = onlyDigits(customer.cep);
    if (cepDigits.length !== 8) {
      setCepError(null);
      return;
    }

    let cancelled = false;
    async function fetchAddress() {
      setCepLoading(true);
      setCepError(null);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
        if (!res.ok) throw new Error("Erro ao consultar CEP");
        const data = await res.json();
        if (cancelled) return;

        if (data.erro) {
          setCepError("CEP não encontrado. Preencha o endereço manualmente.");
          return;
        }

        setCustomer((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: (data.uf || prev.state).toUpperCase(),
        }));
        setCustomerErrors((prev) => ({
          ...prev,
          cep: undefined,
          street: undefined,
          city: undefined,
          state: undefined,
        }));
      } catch {
        if (!cancelled) {
          setCepError("Não foi possível consultar o CEP automaticamente.");
        }
      } finally {
        if (!cancelled) setCepLoading(false);
      }
    }

    fetchAddress();
    return () => {
      cancelled = true;
    };
  }, [customer.cep]);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError("Cupom inválido. Tente AUTOCORE20 ou OFICINA10.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateCustomerStep(customer);
    setCustomerErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinishCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "CREDIT_CARD") {
      const errors = validateCardStep(card);
      setCardErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setSubmitting(true);

    // Payload CRU para o backend: somente números inteiros (centavos e dígitos) sem pontos ou traços
    const payload = {
      plan: selectedPlan.name,
      billingCycle: annual ? "ANNUAL" : "MONTHLY",
      autoRenewal: true,
      renewalType: "MONTHLY_AUTO_RENEWAL",
      validityStart: validity.start,
      validityEnd: validity.end,
      couponCode: appliedCoupon,
      subtotalCents,
      discountCents,
      totalCents,
      paymentMethod,
      sameBillingAddress,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        cpf: onlyDigits(customer.cpf),
        phone: onlyDigits(customer.phone),
        address: {
          cep: onlyDigits(customer.cep),
          street: customer.street.trim(),
          number: customer.number.trim(),
          complement: customer.complement.trim(),
          neighborhood: customer.neighborhood.trim(),
          city: customer.city.trim(),
          state: customer.state.trim().toUpperCase(),
        },
      },
      ...(paymentMethod === "CREDIT_CARD"
        ? {
          creditCard: {
            holderName: card.holderName.trim(),
            number: onlyDigits(card.cardNumber),
            expiry: onlyDigits(card.expiry),
            cvv: onlyDigits(card.cvv),
          },
        }
        : {}),
    };

    await new Promise((r) => setTimeout(r, 750));
    setSanitizedPayload(payload);
    setSubmitting(false);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatBRLFromCents = (cents: number) =>
    (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const pixCopyCode =
    "00020126580014BR.GOV.BCB.PIX0136autocore-assinatura-pix-sandbox5204000053039865802BR5916AutoCore Software6009Sao Paulo62070503***6304A1B2";

  return (
    <div className="lp min-h-screen bg-[#04060E] text-foreground selection:bg-primary/30 selection:text-white">
      {/* Glow Atmosférico sutil */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] lp-aurora opacity-60"
        aria-hidden="true"
      />

      <div className="wrapper-container relative z-10 py-8 md:py-12">
        {/* Topo Minimalista do Checkout */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.07]">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Voltar para a página inicial"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <AutoCoreLogo className="h-7 w-7 shrink-0" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Checkout
              </h1>
            </div>
          </div>

          {/* Indicador de Etapas */}
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold border ${step === 1
                  ? "border-primary/50 bg-primary/15 text-cyan-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                }`}
            >
              <span>1. Dados do Contratante</span>
            </span>
            <span className="text-muted-foreground/40">→</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold border ${step === 2
                  ? "border-primary/50 bg-primary/15 text-cyan-300"
                  : step === 3
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground"
                }`}
            >
              <span>2. Pagamento</span>
            </span>
          </div>
        </header>

        {/* Grid Split-Screen estilo do Modelo Anexo */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* COLUNA ESQUERDA: Formulário Multi-Step */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step-1"
                  onSubmit={handleNextStep}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-white/[0.08] bg-[#080D1F]/90 p-6 sm:p-8 shadow-2xl space-y-6"
                >
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                      Dados do contratante
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Preencha suas informações para liberar seu acesso ao AutoCore.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="sm:col-span-2">
                      <label htmlFor="ck-name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Nome completo
                      </label>
                      <input
                        id="ck-name"
                        type="text"
                        placeholder="Ex: João da Silva"
                        value={customer.name}
                        onChange={(e) => {
                          setCustomer({ ...customer, name: e.target.value });
                          setCustomerErrors({ ...customerErrors, name: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.name && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.name}</p>
                      )}
                    </div>

                    {/* E-mail */}
                    <div className="sm:col-span-2">
                      <label htmlFor="ck-email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        E-mail profissional
                      </label>
                      <input
                        id="ck-email"
                        type="email"
                        placeholder="joao@oficina.com.br"
                        value={customer.email}
                        onChange={(e) => {
                          setCustomer({ ...customer, email: e.target.value });
                          setCustomerErrors({ ...customerErrors, email: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.email && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.email}</p>
                      )}
                    </div>

                    {/* CPF com Máscara Visual */}
                    <div>
                      <label htmlFor="ck-cpf" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        CPF
                      </label>
                      <input
                        id="ck-cpf"
                        type="text"
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={customer.cpf}
                        onChange={(e) => {
                          setCustomer({ ...customer, cpf: maskCpf(e.target.value) });
                          setCustomerErrors({ ...customerErrors, cpf: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.cpf && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.cpf}</p>
                      )}
                    </div>

                    {/* Telefone com Máscara Visual */}
                    <div>
                      <label htmlFor="ck-phone" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Telefone / WhatsApp
                      </label>
                      <input
                        id="ck-phone"
                        type="text"
                        inputMode="numeric"
                        placeholder="(11) 99999-9999"
                        value={customer.phone}
                        onChange={(e) => {
                          setCustomer({ ...customer, phone: maskPhone(e.target.value) });
                          setCustomerErrors({ ...customerErrors, phone: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.phone}</p>
                      )}
                    </div>

                    {/* CEP com Busca Automática ViaCEP */}
                    <div>
                      <label htmlFor="ck-cep" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        CEP
                      </label>
                      <div className="relative">
                        <input
                          id="ck-cep"
                          type="text"
                          inputMode="numeric"
                          placeholder="00000-000"
                          value={customer.cep}
                          onChange={(e) => {
                            setCustomer({ ...customer, cep: maskCep(e.target.value) });
                            setCustomerErrors({ ...customerErrors, cep: undefined });
                          }}
                          className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                        />
                        {cepLoading && (
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-400 absolute right-3.5 top-3.5" />
                        )}
                      </div>
                      {customerErrors.cep && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.cep}</p>
                      )}
                      {cepError && <p className="mt-1 text-xs text-amber-400">{cepError}</p>}
                    </div>

                    {/* Bairro */}
                    <div>
                      <label htmlFor="ck-neighborhood" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Bairro
                      </label>
                      <input
                        id="ck-neighborhood"
                        type="text"
                        placeholder="Centro"
                        value={customer.neighborhood}
                        onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                    </div>

                    {/* Endereço */}
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-8">
                        <label htmlFor="ck-street" className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Endereço
                        </label>
                        <input
                          id="ck-street"
                          type="text"
                          placeholder="Rua, Avenida..."
                          value={customer.street}
                          onChange={(e) => {
                            setCustomer({ ...customer, street: e.target.value });
                            setCustomerErrors({ ...customerErrors, street: undefined });
                          }}
                          className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                        />
                        {customerErrors.street && (
                          <p className="mt-1 text-xs text-red-400">{customerErrors.street}</p>
                        )}
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="ck-number" className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Número
                        </label>
                        <input
                          id="ck-number"
                          type="text"
                          placeholder="123"
                          value={customer.number}
                          onChange={(e) => {
                            setCustomer({ ...customer, number: e.target.value });
                            setCustomerErrors({ ...customerErrors, number: undefined });
                          }}
                          className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                        />
                        {customerErrors.number && (
                          <p className="mt-1 text-xs text-red-400">{customerErrors.number}</p>
                        )}
                      </div>
                    </div>

                    {/* Cidade e Estado */}
                    <div>
                      <label htmlFor="ck-city" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Cidade
                      </label>
                      <input
                        id="ck-city"
                        type="text"
                        placeholder="São Paulo"
                        value={customer.city}
                        onChange={(e) => {
                          setCustomer({ ...customer, city: e.target.value });
                          setCustomerErrors({ ...customerErrors, city: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.city && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ck-state" className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Estado (UF)
                      </label>
                      <input
                        id="ck-state"
                        type="text"
                        maxLength={2}
                        placeholder="SP"
                        value={customer.state}
                        onChange={(e) => {
                          setCustomer({ ...customer, state: e.target.value.toUpperCase() });
                          setCustomerErrors({ ...customerErrors, state: undefined });
                        }}
                        className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                      />
                      {customerErrors.state && (
                        <p className="mt-1 text-xs text-red-400">{customerErrors.state}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-brand w-full rounded-full py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,102,255,0.4)]"
                  >
                    <span>Continuar para pagamento</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step-2"
                  onSubmit={handleFinishCheckout}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-white/[0.08] bg-[#080D1F]/90 p-6 sm:p-8 shadow-2xl space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground">
                        Forma de pagamento
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Escolha como deseja ativar sua assinatura do AutoCore.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-primary hover:text-cyan-300 transition-colors shrink-0"
                    >
                      ← Editar dados
                    </button>
                  </div>

                  {/* Opção 1: Pix */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("PIX")}
                      className={`w-full rounded-2xl border p-4 flex items-center justify-between text-left transition-all ${paymentMethod === "PIX"
                          ? "border-primary bg-primary/[0.06] shadow-[0_0_24px_rgba(0,102,255,0.18)]"
                          : "border-white/[0.08] bg-[#050814]/80 hover:border-white/20"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border ${paymentMethod === "PIX"
                              ? "border-primary bg-primary/20"
                              : "border-white/20"
                            }`}
                        >
                          {paymentMethod === "PIX" && (
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Pix Instantâneo</p>
                          <p className="text-[11px] text-muted-foreground">
                            Liberação imediata via QR Code ou Copia e Cola
                          </p>
                        </div>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400">
                        <QrCode className="h-4 w-4" />
                      </div>
                    </button>

                    {/* Opção 2: Carteira Digital Mercado Pago */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("MERCADO_PAGO")}
                      className={`w-full rounded-2xl border p-4 flex items-center justify-between text-left transition-all ${paymentMethod === "MERCADO_PAGO"
                          ? "border-primary bg-primary/[0.06] shadow-[0_0_24px_rgba(0,102,255,0.18)]"
                          : "border-white/[0.08] bg-[#050814]/80 hover:border-white/20"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full border ${paymentMethod === "MERCADO_PAGO"
                              ? "border-primary bg-primary/20"
                              : "border-white/20"
                            }`}
                        >
                          {paymentMethod === "MERCADO_PAGO" && (
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Carteira Digital Mercado Pago
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Use seu saldo ou cartões salvos no Mercado Pago
                          </p>
                        </div>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-500/15 text-sky-400">
                        <Wallet className="h-4 w-4" />
                      </div>
                    </button>

                    {/* Opção 3: Cartão de Crédito Expandível (Estilo do Modelo Anexo) */}
                    <div
                      className={`rounded-2xl border transition-all ${paymentMethod === "CREDIT_CARD"
                          ? "border-primary bg-primary/[0.05] shadow-[0_0_28px_rgba(0,102,255,0.2)]"
                          : "border-white/[0.08] bg-[#050814]/80 hover:border-white/20"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("CREDIT_CARD")}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full border ${paymentMethod === "CREDIT_CARD"
                                ? "border-primary bg-primary/20"
                                : "border-white/20"
                              }`}
                          >
                            {paymentMethod === "CREDIT_CARD" && (
                              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                            )}
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            Cartão de Crédito
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold">
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/90">VISA</span>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-amber-300">MASTER</span>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-300">ELO</span>
                        </div>
                      </button>

                      {paymentMethod === "CREDIT_CARD" && (
                        <div className="px-4 pb-5 pt-1 space-y-4 border-t border-white/[0.06]">
                          <div>
                            <label htmlFor="card-holder" className="block text-xs font-medium text-muted-foreground mb-1.5">
                              Nome impresso no cartão
                            </label>
                            <input
                              id="card-holder"
                              type="text"
                              placeholder="JOAO DA SILVA"
                              value={card.holderName}
                              onChange={(e) => {
                                setCard({ ...card, holderName: e.target.value.toUpperCase() });
                                setCardErrors({ ...cardErrors, holderName: undefined });
                              }}
                              className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                            />
                            {cardErrors.holderName && (
                              <p className="mt-1 text-xs text-red-400">{cardErrors.holderName}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="card-number" className="block text-xs font-medium text-muted-foreground mb-1.5">
                              Número do cartão
                            </label>
                            <div className="relative">
                              <input
                                id="card-number"
                                type="text"
                                inputMode="numeric"
                                placeholder="0000 0000 0000 0000"
                                value={card.cardNumber}
                                onChange={(e) => {
                                  setCard({ ...card, cardNumber: maskCardNumber(e.target.value) });
                                  setCardErrors({ ...cardErrors, cardNumber: undefined });
                                }}
                                className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                              />
                              <CreditCard className="h-4 w-4 text-muted-foreground/60 absolute right-3.5 top-3.5" />
                            </div>
                            {cardErrors.cardNumber && (
                              <p className="mt-1 text-xs text-red-400">{cardErrors.cardNumber}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="card-exp" className="block text-xs font-medium text-muted-foreground mb-1.5">
                                Validade
                              </label>
                              <input
                                id="card-exp"
                                type="text"
                                inputMode="numeric"
                                placeholder="MM/AA"
                                value={card.expiry}
                                onChange={(e) => {
                                  setCard({ ...card, expiry: maskCardExpiry(e.target.value) });
                                  setCardErrors({ ...cardErrors, expiry: undefined });
                                }}
                                className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                              />
                              {cardErrors.expiry && (
                                <p className="mt-1 text-xs text-red-400">{cardErrors.expiry}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="card-cvv" className="block text-xs font-medium text-muted-foreground mb-1.5">
                                CVV
                              </label>
                              <input
                                id="card-cvv"
                                type="text"
                                inputMode="numeric"
                                placeholder="123"
                                value={card.cvv}
                                onChange={(e) => {
                                  setCard({ ...card, cvv: maskCvv(e.target.value) });
                                  setCardErrors({ ...cardErrors, cvv: undefined });
                                }}
                                className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                              />
                              {cardErrors.cvv && (
                                <p className="mt-1 text-xs text-red-400">{cardErrors.cvv}</p>
                              )}
                            </div>
                          </div>

                          <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer select-none pt-1">
                            <input
                              type="checkbox"
                              checked={sameBillingAddress}
                              onChange={(e) => setSameBillingAddress(e.target.checked)}
                              className="h-4 w-4 rounded border-white/20 bg-[#050814] accent-primary"
                            />
                            <span>Endereço de cobrança igual aos dados do contratante</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botão Final de Pagamento */}
                  <div className="space-y-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-brand w-full rounded-full py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-[0_0_32px_rgba(0,102,255,0.45)] disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processando assinatura...</span>
                        </>
                      ) : (
                        <span>Pagar {formatBRLFromCents(totalCents)}</span>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                      <Lock className="h-3 w-3 text-emerald-400" />
                      <span>Pagamento seguro • Criptografia SSL 256-bit</span>
                    </p>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-emerald-500/35 bg-[#080D1F]/95 p-6 sm:p-8 shadow-2xl space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {paymentMethod === "PIX"
                          ? "QR Code Pix gerado com sucesso!"
                          : paymentMethod === "MERCADO_PAGO"
                            ? "Checkout Mercado Pago pronto!"
                            : "Assinatura confirmada!"}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Plano AutoCore {selectedPlan.name} • Vigência {validity.start} até{" "}
                        {validity.end}
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "PIX" && (
                    <div className="rounded-2xl border border-white/10 bg-[#050814] p-5 space-y-4">
                      <p className="text-xs text-muted-foreground">
                        Copie o código Pix abaixo para concluir a ativação instantânea:
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={pixCopyCode}
                          className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs font-mono text-cyan-300 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(pixCopyCode);
                            setPixCopied(true);
                            setTimeout(() => setPixCopied(false), 2500);
                          }}
                          className="btn-brand rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                        >
                          {pixCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{pixCopied ? "Copiado" : "Copiar"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {sanitizedPayload && (
                    <div className="rounded-2xl border border-white/[0.08] bg-[#050814] p-4 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                        Payload sanitizado para o backend (somente dígitos crus)
                      </p>
                      <pre className="max-h-52 overflow-auto text-[11px] font-mono text-muted-foreground leading-relaxed">
                        {JSON.stringify(sanitizedPayload, null, 2)}
                      </pre>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/login"
                      className="btn-brand rounded-xl px-6 py-3 text-sm font-semibold text-white inline-flex items-center gap-2"
                    >
                      <span>Acessar painel AutoCore</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                      Fazer nova simulação
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* COLUNA DIREITA: Summary (Resumo do Pedido) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-white/[0.08] bg-[#080D1F]/90 p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Resumo</h2>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#050814] p-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAnnual(false)}
                    className={`rounded-full px-2.5 py-1 font-medium transition-colors ${!annual ? "bg-primary/25 text-cyan-300" : "text-muted-foreground"
                      }`}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnual(true)}
                    className={`rounded-full px-2.5 py-1 font-medium transition-colors ${annual ? "bg-primary/25 text-cyan-300" : "text-muted-foreground"
                      }`}
                  >
                    Anual -20%
                  </button>
                </div>
              </div>

              {/* Card Visual do Plano Selecionado (Estilo Summary da Imagem Anexa) */}
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050814]">
                <div className="relative h-28 bg-gradient-to-br from-[#0B173B] via-[#070E24] to-[#0055FF]/30 p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                      Licença AutoCore ERP
                    </span>
                    <p className="text-2xl font-black tracking-tight text-white">
                      Plano {selectedPlan.name}
                    </p>
                  </div>
                  <AutoCoreLogo className="h-12 w-12 opacity-90" />
                </div>

                <div className="p-4 flex items-center justify-between border-t border-white/[0.06]">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      AutoCore {selectedPlan.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {annual ? "Ciclo anual • Cobrança mensal" : "Ciclo mensal • Sem fidelidade"}
                    </p>
                  </div>
                  <p className="text-sm font-bold font-mono text-foreground">
                    {formatBRLFromCents(subtotalCents)}
                  </p>
                </div>

                {/* Troca rápida de plano */}
                <div className="px-4 pb-3 flex items-center gap-1.5">
                  {plans.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setSelectedPlanName(p.name)}
                      className={`flex-1 rounded-lg py-1.5 text-[11px] font-semibold border transition-colors ${selectedPlanName === p.name
                          ? "border-primary/50 bg-primary/15 text-cyan-300"
                          : "border-white/5 bg-white/[0.02] text-muted-foreground hover:text-white"
                        }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informações de Vigência (30 dias) e Renovação Automática Mensal */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>
                    Vigência do plano:{" "}
                    <strong className="text-foreground">
                      {validity.start} até {validity.end}
                    </strong>{" "}
                    (30 dias)
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <RefreshCw className="h-4 w-4 shrink-0" />
                  <span>Renovação automática mensal • Cancele quando quiser</span>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Garantia incondicional de 7 dias grátis</span>
                </div>
              </div>

              {/* Área de Cupom de Desconto */}
              <div className="space-y-2 pt-2 border-t border-white/[0.07]">
                <label htmlFor="coupon-input" className="block text-xs font-medium text-muted-foreground">
                  Cupom de desconto{" "}
                  <span className="text-[10px] text-muted-foreground/70">
                    (ex: AUTOCORE20)
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground absolute left-3.5 top-3" />
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Digite seu cupom"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      disabled={Boolean(appliedCoupon)}
                      className="w-full rounded-xl border border-white/10 bg-[#050814] pl-9 pr-3 py-2.5 text-xs font-mono uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                    />
                  </div>
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    >
                      Aplicado ✕
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary/15 transition-colors"
                    >
                      Aplicar
                    </button>
                  )}
                </div>
                {couponError && <p className="text-[11px] text-amber-400">{couponError}</p>}
              </div>

              {/* Cálculo Subtotal, Desconto e Total */}
              <div className="space-y-2.5 pt-3 border-t border-white/[0.07] text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatBRLFromCents(subtotalCents)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto ({Math.round(discountRate * 100)}%)</span>
                    <span className="font-mono">-{formatBRLFromCents(discountCents)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.07]">
                  <div>
                    <span className="text-base font-bold text-foreground">Total</span>
                    <p className="text-[11px] text-muted-foreground">Renovação mensal</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-foreground">
                      {formatBRLFromCents(totalCents)}
                    </span>
                    <span className="text-xs text-muted-foreground">/mês</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
