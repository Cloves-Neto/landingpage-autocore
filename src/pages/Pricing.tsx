import PlansSection from "@/components/landing/PlansSection";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Pricing() {
  return (
    <div className="lp min-h-screen overflow-x-hidden bg-background">
      <LandingNav />

      <section className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[130px]"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div className="lp-container relative pb-4 pt-20 text-center md:pt-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Planos</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-[34px] font-semibold leading-[1.1] text-foreground md:text-[46px]">
            Planos para cada oficina.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Comece com 7 dias grátis, sem cartão de crédito. Mude de plano quando quiser.
          </p>
        </div>
      </section>

      <PlansSection id="planos" />

      <LandingFooter />
    </div>
  );
}
