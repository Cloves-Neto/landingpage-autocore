import LandingNav from "@/components/landing/LandingNav";
import HeroShowcase from "@/components/landing/HeroShowcase";
import TrustLogos from "@/components/landing/TrustLogos";
import ModernBentoGrid from "@/components/landing/ModernBentoGrid";
import FeatureGrid from "@/components/landing/FeatureGrid";
import PlansSection from "@/components/landing/PlansSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaNewsletter from "@/components/landing/FinalCtaNewsletter";
import LandingFooter from "@/components/landing/LandingFooter";
import { Reveal, ScrollProgress } from "@/components/landing/motion";

export default function Index() {
  return (
    <div className="lp min-h-screen overflow-x-hidden bg-background selection:bg-primary/30 selection:text-white">
      <ScrollProgress />

      {/* Link de salto semântico para navegação por teclado e áudio (A11y) */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Pular para o conteúdo principal
      </a>

      {/* 1. Header Fixo com Navegação Semântica */}
      <LandingNav />

      {/* Conteúdo Principal com Tag Semântica Main */}
      <main id="conteudo-principal" tabIndex={-1} role="main" className="focus:outline-none">
        {/* 2. Hero Section com Ícone de Aceleração, Arco Luminoso e Mockup do Dashboard */}
        <HeroShowcase />

        {/* 3. Logos de Prova Social com Marcas Automotivas */}
        <Reveal y={24}>
          <TrustLogos />
        </Reveal>

        {/* 4. Bento Grid de 4 Cartões Assimétricos com Microinterações Vivas */}
        <Reveal y={28}>
          <ModernBentoGrid />
        </Reveal>

        {/* 5. Grid Simétrico de Recursos (6 Módulos com Ícones Iluminados) */}
        <Reveal y={28}>
          <FeatureGrid />
        </Reveal>

        {/* 6. Planos & Preços (Alternância Mensal/Anual e Acesso ao Checkout) */}
        <PlansSection id="planos" />

        {/* 7. Perguntas Frequentes (FAQ Acordeon Interativo) */}
        <Reveal y={28}>
          <FaqSection />
        </Reveal>

        {/* 8. Estágio Final com Mini Form para WhatsApp */}
        <Reveal y={28}>
          <FinalCtaNewsletter />
        </Reveal>
      </main>

      {/* 9. Rodapé Moderno em 4 Colunas */}
      <Reveal y={20}>
        <LandingFooter />
      </Reveal>
    </div>
  );
}
