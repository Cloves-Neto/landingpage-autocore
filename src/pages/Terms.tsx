import { Link } from "react-router-dom";
import logo from "@/assets/autocore-logo.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex h-16 items-center justify-between px-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AutoCore" className="h-8 w-8 rounded-lg object-contain" />
          <span className="font-display text-xl font-bold text-foreground">AutoCore</span>
        </Link>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Entrar</Link>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-invert">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: 24 de julho de 2026</p>

        <div className="space-y-6 text-secondary-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Aceitação</h2>
            <p>Ao criar uma conta no AutoCore você concorda integralmente com estes Termos de Uso e com a Política de Privacidade. Se não concordar, não utilize o serviço.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Uso do serviço</h2>
            <p>O AutoCore é um sistema de gestão para oficinas mecânicas. Você se compromete a usá-lo apenas para fins lícitos, mantendo seus dados de acesso em sigilo e sendo responsável por toda atividade realizada na sua conta.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Assinatura e pagamento</h2>
            <p>Planos são cobrados de forma recorrente conforme a modalidade escolhida (mensal ou anual). Cancelamentos podem ser feitos a qualquer momento e passam a valer no próximo ciclo de cobrança.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Dados e propriedade</h2>
            <p>Você mantém a propriedade de todos os dados cadastrados. O AutoCore atua como operador dos dados e os utiliza somente para prestar o serviço, conforme a LGPD.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Limitação de responsabilidade</h2>
            <p>O AutoCore é fornecido "como está". Não nos responsabilizamos por perdas indiretas decorrentes do uso do sistema. Fazemos backups periódicos, mas recomendamos exportações regulares dos seus dados.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Encerramento</h2>
            <p>Podemos suspender contas que violem estes termos. Você pode encerrar sua conta a qualquer momento pelo painel de configurações.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Contato</h2>
            <p>Dúvidas sobre estes termos: <a className="text-primary hover:underline" href="mailto:suporte@autocore.app">suporte@autocore.app</a>.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
