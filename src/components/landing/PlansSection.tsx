import { useState } from "react";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SpotlightCard } from "@/components/landing/motion";
import AsaasSandboxCheckoutModal from "@/components/landing/AsaasSandboxCheckoutModal";

export const plans = [
  {
    name: "Starter" as const,
    monthly: 97,
    yearly: 77,
    desc: "Para oficinas que estão começando",
    features: [
      "Até 100 clientes", "Até 2 funcionários", "Agendamento", "Clientes e veículos",
      "Ordens de serviço", "Suporte por email",
    ],
    cta: "Começar agora",
    popular: false,
  },
  {
    name: "Pro" as const,
    monthly: 197,
    yearly: 157,
    desc: "Para oficinas em crescimento acelerado",
    features: [
      "Clientes ilimitados", "Funcionários ilimitados", "Orçamentos e checklists", "Ordens de serviço",
      "Estoque e compras", "Fornecedores", "Caixa e financeiro", "Suporte prioritário",
    ],
    cta: "Testar grátis por 7 dias",
    popular: true,
  },
  {
    name: "Premium" as const,
    monthly: 347,
    yearly: 277,
    desc: "Gestão completa e multi-pátio avançada",
    features: [
      "Tudo do Pro", "Dashboard avançado", "Relatórios completos", "Gestão de devedores",
      "Branding da oficina", "Lembretes automáticos", "Suporte premium",
    ],
    cta: "Começar agora",
    popular: false,
  },
];

export default function PlansSection({ id = "planos" }: { id?: string }) {
  const [annual, setAnnual] = useState(true);
  const [checkoutPlan, setCheckoutPlan] = useState<"Starter" | "Pro" | "Premium" | null>(null);

  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 lp-stage-glow opacity-50" />
      <div className="wrapper-container relative">
        <Reveal>
          <div className="section-header-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Planos & Investimento
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
              Um plano para cada <span className="text-gradient">ritmo de oficina</span>.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Comece sem fidelidade e escale sua operação conforme o volume do seu pátio cresce.
            </p>

            <div className="mt-7 relative inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-surface-1/90 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`relative z-10 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  !annual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {!annual && (
                  <motion.span
                    layoutId="billing-toggle"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}
                Mensal
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`relative z-10 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  annual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {annual && (
                  <motion.span
                    layoutId="billing-toggle"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}
                Anual{" "}
                <span className="ml-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--brand-cyan))]">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, idx) => {
            const isPopular = p.popular;
            return (
              <Reveal
                key={p.name}
                delay={0.06 * idx}
                className={isPopular ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <SpotlightCard
                  tiltMax={3}
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                    isPopular
                      ? "border border-primary/45 bg-surface-2 glow-blue lg:-translate-y-2"
                      : "border border-white/[0.07] bg-surface-1/70 hover:border-primary/30"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className={`text-xl font-bold ${isPopular ? "text-chrome" : "text-foreground"}`}>
                        {p.name}
                      </h3>
                      {isPopular && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary ring-1 ring-inset ring-primary/35">
                          <Sparkles className="h-3 w-3" />
                          Mais escolhido
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

                    <div className="mt-7 flex items-baseline gap-1.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={annual ? `${p.name}-yr` : `${p.name}-mo`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl font-bold leading-none tracking-tight text-foreground tabular-nums sm:text-[44px]"
                        >
                          R$ {annual ? p.yearly : p.monthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm text-muted-foreground">/mês</span>
                    </div>

                    {annual ? (
                      <p className="mt-2 text-xs text-primary">
                        Economia de R$ {(p.monthly - p.yearly) * 12}/ano no plano anual
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">Cobrado mensalmente • Sem fidelidade</p>
                    )}

                    <ul className="mt-7 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13px] text-secondary-foreground">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(p.name)}
                    className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 ${
                      isPopular
                        ? "btn-brand"
                        : "border border-white/[0.1] bg-white/[0.03] text-foreground hover:border-primary/40 hover:bg-primary/10"
                    }`}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      {checkoutPlan && (
        <AsaasSandboxCheckoutModal
          plans={plans}
          initialPlanName={checkoutPlan}
          initialAnnual={annual}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </section>
  );
}
