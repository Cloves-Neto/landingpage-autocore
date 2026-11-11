import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import { plans } from "@/components/landing/PlansSection";
import AsaasSandboxCheckoutModal from "@/components/landing/AsaasSandboxCheckoutModal";

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<"Starter" | "Pro" | "Premium">("Pro");
  const [annual] = useState(true);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="lp min-h-screen overflow-x-hidden bg-background">
      <LandingNav />

      <section className="relative pt-28 pb-20">
        <div className="wrapper-container space-y-8">
          <div className="section-header-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Teste Simulado
            </span>
            <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Escolha o plano ideal para sua oficina
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Finalize sua assinatura e acesse imediatamente o painel de gestão AutoCore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl border border-white/10 bg-surface-1/80 p-6 flex flex-col justify-between space-y-5"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                  <p className="text-3xl font-bold text-foreground mt-4">
                    R$ {annual ? p.yearly : p.monthly}
                    <span className="text-xs font-normal text-muted-foreground">/mês</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(p.name);
                    setShowModal(true);
                  }}
                  className="btn-brand w-full rounded-xl py-3 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <AsaasSandboxCheckoutModal
          plans={plans}
          initialPlanName={selectedPlan}
          initialAnnual={annual}
          onClose={() => setShowModal(false)}
        />
      )}

      <LandingFooter />
    </div>
  );
}
