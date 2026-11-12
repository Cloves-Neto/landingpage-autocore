import {
  Camera,
  ClipboardList,
  Package,
  TrendingUp,
  UserCog,
  CarFront,
} from "lucide-react";
import { SpotlightCard } from "@/components/landing/motion";

const features = [
  {
    icon: Camera,
    title: "Checklist Digital com Fotos",
    desc: "Vistoria rápida na entrada do veículo com registro fotográfico e assinatura do cliente pelo celular.",
  },
  {
    icon: ClipboardList,
    title: "Gestão de OS em Tempo Real",
    desc: "Acompanhe cada etapa da ordem de serviço, do orçamento à entrega das chaves sem gargalos no pátio.",
  },
  {
    icon: Package,
    title: "Controle de Estoque & Peças",
    desc: "Baixa automática na OS, alertas de estoque mínimo e histórico de compras com fornecedores.",
  },
  {
    icon: TrendingUp,
    title: "Caixa & DRE Automático",
    desc: "Visualize fluxo de caixa diário, entradas por Pix e cartão, despesas e margem de lucro por serviço.",
  },
  {
    icon: UserCog,
    title: "Comissões da Equipe",
    desc: "Produtividade por mecânico e cálculo automático de comissões sobre mão de obra e peças sem planilhas.",
  },
  {
    icon: CarFront,
    title: "Histórico Completo por Placa",
    desc: "CRM automotivo com quilometragem, histórico de serviços passados e lembretes de revisão preventiva.",
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="recursos"
      aria-labelledby="recursos-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.05] bg-surface-1/30"
    >
      <div className="wrapper-container">
        {/* Cabeçalho Centralizado Sem Badges */}
        <div className="section-header-center">
          <h2 id="recursos-heading" className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
            Recursos projetados para o <span className="text-gradient">futuro do seu pátio</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            A tecnologia mais avançada da gestão automotiva reunida em uma interface intuitiva e rápida.
          </p>
        </div>

        {/* Grid de 6 Cartões Simétricos estilo RichPath com tags semânticas e acessibilidade */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de recursos da plataforma">
          {features.map((f, idx) => (
            <SpotlightCard
              key={f.title}
              tiltMax={3}
              role="listitem"
              aria-labelledby={`feature-title-${idx}`}
              tabIndex={0}
              className="group rounded-3xl border border-white/[0.07] bg-surface-1/80 p-7 sm:p-8 flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-primary/40 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="space-y-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-[0_0_20px_rgba(0,102,255,0.25)]" aria-hidden="true">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 id={`feature-title-${idx}`} className="text-lg sm:text-xl font-bold text-foreground group-hover:text-chrome transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
