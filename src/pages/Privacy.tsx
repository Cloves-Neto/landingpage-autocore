import { Link } from "react-router-dom";
import logo from "@/assets/autocore-logo.png";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex h-16 items-center justify-between px-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AutoCore" className="h-8 w-8 rounded-lg object-contain" />
          <span className="font-display text-xl font-bold text-foreground">AutoCore</span>
        </Link>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Entrar</Link>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: 24 de julho de 2026</p>

        <div className="space-y-6 text-secondary-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Dados que coletamos</h2>
            <p>Coletamos dados fornecidos por você no cadastro (nome, e-mail, telefone, CNPJ), dados operacionais lançados na plataforma (clientes, veículos, ordens de serviço, financeiro) e dados técnicos de uso (logs, IP, navegador).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Como usamos</h2>
            <p>Utilizamos seus dados exclusivamente para operar o AutoCore, prestar suporte, emitir cobranças, melhorar o produto e cumprir obrigações legais.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Compartilhamento</h2>
            <p>Não vendemos seus dados. Compartilhamos apenas com processadores necessários à operação do serviço (hospedagem, autenticação, pagamento), sempre sob contrato de confidencialidade.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Segurança</h2>
            <p>Aplicamos criptografia em trânsito, isolamento por oficina (RLS), controle de acesso por função e proteção contra senhas vazadas conforme HIBP.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Seus direitos (LGPD)</h2>
            <p>Você pode solicitar acesso, correção, exportação ou exclusão dos seus dados a qualquer momento pelo e-mail <a className="text-primary hover:underline" href="mailto:suporte@autocore.app">suporte@autocore.app</a>.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Retenção</h2>
            <p>Mantemos seus dados enquanto a conta estiver ativa. Após o cancelamento, os dados são mantidos por até 90 dias e depois excluídos, exceto quando houver obrigação legal de retenção.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Cookies</h2>
            <p>Utilizamos apenas cookies essenciais para autenticação e funcionamento da aplicação.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
