import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import AutoCoreLogo from "@/components/landing/AutoCoreLogo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function LandingFooter() {
  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé do AutoCore"
      className="relative overflow-hidden bg-background pt-16 pb-12 border-t border-white/[0.06]"
    >
      {/* Glow de fundo sutil */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/15 blur-[140px]" aria-hidden="true" />

      {/* TUDO LIMITADO NO WRAPPER-CONTAINER */}
      <div className="wrapper-container relative z-10 space-y-12">
        {/* PARTE 1: GRID PRINCIPAL DE INFORMAÇÕES E CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Lado Esquerdo: Chamada de Impacto e Ações */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <AutoCoreLogo className="h-9 w-9 shrink-0" />
              <span className="text-xl font-black tracking-tight">
                <span className="text-[#F5F5F2]">Auto</span>
                <span className="text-gradient">Core</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Pronto para colocar sua oficina em <span className="text-gradient">outro nível</span>?
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A plataforma completa para gerenciar ordens de serviço, agendamentos, estoque e fluxo de caixa sem complicação.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/checkout?plan=Pro&billing=annual"
                aria-label="Ir para o checkout e iniciar período de teste grátis por 7 dias"
                className="btn-brand inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-[0_0_25px_rgba(0,102,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Testar 7 dias grátis</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href="#recursos"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-white hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Ver Demonstração</span>
              </a>
            </div>
          </div>

          {/* Lado Direito: 4 Colunas Limpas */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            {/* Bloco 1: Localização */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Localização
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>São Paulo, SP</span>
                </p>
                <p className="text-slate-400">Curitiba • Belo Horizonte</p>
                <p className="text-emerald-400 font-medium pt-1">Atendimento Nacional</p>
              </div>
            </div>

            {/* Bloco 2: Contato */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Contato
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <a
                    href="https://wa.me/5511987654321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    (11) 98765-4321
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <a
                    href="mailto:contato@autocore.app"
                    className="hover:text-white transition-colors break-all"
                  >
                    contato@autocore.app
                  </a>
                </p>
              </div>
            </div>

            {/* Bloco 3: Redes Sociais com Ícones Reais */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Redes Sociais
              </p>
              <ul className="space-y-2.5 text-muted-foreground">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <div className="grid h-5 w-5 place-items-center rounded-md bg-white/5 text-primary">
                      <InstagramIcon className="h-3 w-3" />
                    </div>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <div className="grid h-5 w-5 place-items-center rounded-md bg-white/5 text-cyan-400">
                      <YoutubeIcon className="h-3 w-3" />
                    </div>
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <div className="grid h-5 w-5 place-items-center rounded-md bg-white/5 text-primary">
                      <LinkedinIcon className="h-3 w-3" />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Bloco 4: Links Úteis */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Links Úteis
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="/#beneficios" className="hover:text-white transition-colors">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="/#recursos" className="hover:text-white transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white transition-colors">
                    Comparar Planos
                  </Link>
                </li>
                <li>
                  <a href="/#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white transition-colors">
                    Acessar Conta
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAIXA INFERIOR COM COPYRIGHT E STATUS */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 AutoCore Software LTDA. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Infraestrutura em nuvem 100% operacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
