import { Link } from "react-router-dom";
import logo from "@/assets/autocore-logo.png";

export default function LandingFooter() {
  return (
    <footer className="relative pb-12 pt-16">
      <div className="wrapper-container">
        <div className="rounded-3xl border border-white/[0.06] bg-surface-1/60 p-8 backdrop-blur-md sm:p-10">
          <div className="grid gap-10 text-center sm:text-left md:grid-cols-[1.4fr_1fr_1fr]">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2.5">
                <div className="grid place-items-center rounded-lg bg-white/[0.04] p-1 ring-1 ring-white/[0.08]">
                  <img src={logo} alt="AutoCore" className="h-6 w-6 rounded-sm object-contain" />
                </div>
                <span className="text-[17px] font-bold tracking-tight">
                  <span className="text-chrome">Auto</span>
                  <span className="text-gradient">Core</span>
                </span>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                Plataforma de gestão de alta performance para oficinas mecânicas. Operação, estoque e financeiro em um único lugar.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">Produto</p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                <li><a href="#beneficios" className="text-muted-foreground transition-colors hover:text-foreground">Benefícios</a></li>
                <li><a href="#recursos" className="text-muted-foreground transition-colors hover:text-foreground">Recursos</a></li>
                <li><Link to="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">Planos</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">Empresa</p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                <li><a href="mailto:suporte@autocore.app" className="text-muted-foreground transition-colors hover:text-foreground">Contato</a></li>
                <li><Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">Termos de Uso</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
            <p className="text-[12px] text-muted-foreground">© 2026 AutoCore. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-white/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistemas operacionais 100% online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
