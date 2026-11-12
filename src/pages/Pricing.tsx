import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import { plans } from "@/components/landing/PlansSection";

const comparisonRows = [
  {
    feature: "Cadastro de clientes e veículos",
    starter: "Até 100 clientes",
    pro: "Ilimitado",
    premium: "Ilimitado",
  },
  {
    feature: "Funcionários e mecânicos",
    starter: "Até 2 usuários",
    pro: "Ilimitado",
    premium: "Ilimitado",
  },
  {
    feature: "Ordens de serviço e agendamentos",
    starter: true,
    pro: true,
    premium: true,
  },
  {
    feature: "Orçamentos e checklist digital com fotos",
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Estoque, compras e fornecedores",
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Caixa diário, Pix e fluxo financeiro",
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Comissões automáticas por mecânico",
    starter: false,
    pro: true,
    premium: true,
  },
  {
    feature: "DRE gerencial e relatórios completos",
    starter: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Gestão de devedores e cobrança",
    starter: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Lembretes automáticos via WhatsApp",
    starter: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Personalização (branding) da oficina",
    starter: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Atendimento e suporte",
    starter: "Por e-mail",
    pro: "Prioritário",
    premium: "Dedicado / Premium",
  },
];

function CellValue({ value, highlight = false }: { value: boolean | string; highlight?: boolean }) {
  if (typeof value === "string") {
    return (
      <span className={`text-xs sm:text-sm font-medium ${highlight ? "text-cyan-300" : "text-foreground/90"}`}>
        {value}
      </span>
    );
  }
  return value ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
      <Check className="h-3.5 w-3.5" aria-label="Incluído" />
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground/40">
      <Minus className="h-3.5 w-3.5" aria-label="Não incluído" />
    </span>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="lp min-h-screen overflow-x-hidden bg-background">
      <LandingNav />

      <main className="relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
          style={{ background: "hsl(var(--primary))" }}
          aria-hidden="true"
        />

        <div className="wrapper-container relative">
          {/* Cabeçalho do Comparativo logo no topo */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-[48px]">
              Comparativo completo dos <span className="text-gradient">planos</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Compare todos os recursos lado a lado e escolha o plano ideal para o ritmo da sua
              oficina. Comece com 7 dias grátis, sem fidelidade.
            </p>

            {/* Toggle Mensal / Anual */}
            <div
              role="radiogroup"
              aria-label="Periodicidade de cobrança dos planos"
              className="mt-7 relative inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-surface-1/90 p-1 backdrop-blur-md"
            >
              <button
                type="button"
                role="radio"
                aria-checked={!annual}
                onClick={() => setAnnual(false)}
                className={`relative z-10 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  !annual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {!annual && (
                  <motion.span
                    layoutId="pricing-billing-toggle"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}
                Mensal
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={annual}
                onClick={() => setAnnual(true)}
                className={`relative z-10 rounded-full px-5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  annual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {annual && (
                  <motion.span
                    layoutId="pricing-billing-toggle"
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

          {/* Tabela Comparativa Direta com Preços no Topo e Botões de Contratação no Rodapé */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-surface-1/85 backdrop-blur-md shadow-2xl">
              <table className="w-full min-w-[680px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="py-6 px-6 align-bottom text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[38%]">
                      Recursos da Plataforma
                    </th>
                    {plans.map((p) => {
                      const price = annual ? p.yearly : p.monthly;
                      return (
                        <th
                          key={p.name}
                          className={`py-6 px-4 text-center align-bottom w-[20.6%] ${
                            p.popular ? "bg-primary/[0.07]" : ""
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            {p.popular && (
                              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300 ring-1 ring-primary/40">
                                <Sparkles className="h-2.5 w-2.5" />
                                Mais escolhido
                              </span>
                            )}
                            <span className="text-base font-bold text-foreground">{p.name}</span>
                            <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-2xl font-bold tabular-nums text-foreground">
                                R$ {price}
                              </span>
                              <span className="text-[11px] font-normal text-muted-foreground">/mês</span>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.05]">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="transition-colors hover:bg-white/[0.02]">
                      <td className="py-3.5 px-6 text-xs sm:text-sm text-foreground/90 font-medium">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.starter} />
                      </td>
                      <td className="py-3.5 px-4 text-center bg-primary/[0.04]">
                        <CellValue value={row.pro} highlight />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-t border-white/[0.08] bg-white/[0.02]">
                    <td className="py-6 px-6 text-xs text-muted-foreground">
                      7 dias grátis • Sem fidelidade • Cancele quando quiser
                    </td>
                    {plans.map((p) => (
                      <td
                        key={p.name}
                        className={`py-6 px-4 text-center ${p.popular ? "bg-primary/[0.07]" : ""}`}
                      >
                        <Link
                          to={`/checkout?plan=${p.name}&billing=${annual ? "annual" : "monthly"}`}
                          className={`group inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            p.popular
                              ? "btn-brand"
                              : "border border-white/[0.12] bg-white/[0.04] text-foreground hover:border-primary/40 hover:bg-primary/15"
                          }`}
                        >
                          <span>Contratar {p.name}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
