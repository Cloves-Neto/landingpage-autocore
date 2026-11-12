import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "O que é necessário para começar a usar o AutoCore na minha oficina?",
    a: "Apenas um dispositivo com navegador e conexão à internet (computador, notebook, tablet ou celular). Não há necessidade de instalar servidores locais ou configurar bancos de dados.",
  },
  {
    q: "Como funciona o período de teste gratuito de 7 dias?",
    a: "Você escolhe o plano ideal, conclui seu cadastro no checkout e utiliza o AutoCore por 7 dias grátis, sem taxa de adesão e sem fidelidade. Caso decida não continuar, basta cancelar antes do término.",
  },
  {
    q: "Posso cadastrar múltiplos mecânicos e calcular comissões?",
    a: "Sim. Nos planos Pro e Premium você tem usuários ilimitados, controle de permissões por cargo e cálculo automático de comissões diferenciadas para mão de obra e peças aplicadas em cada OS.",
  },
  {
    q: "O sistema funciona bem em tablets e celulares dentro do pátio?",
    a: "Perfeitamente. A interface responsiva permite realizar checklists com fotos, abrir ordens de serviço, consultar o estoque e atualizar o status do veículo diretamente ao lado do elevador.",
  },
  {
    q: "Meus dados, clientes e histórico de placas ficam seguros?",
    a: "Sim. Toda a operação roda em nuvem com criptografia SSL e backups automáticos diários. Somente você e sua equipe autorizada têm acesso ao histórico completo dos veículos e financeiro.",
  },
  {
    q: "Consigo enviar orçamentos e avisos pelo WhatsApp?",
    a: "Sim. O sistema facilita o envio de orçamentos, confirmações de agendamento e lembretes automáticos de revisão preventiva e veículo pronto direto para o WhatsApp do cliente.",
  },
  {
    q: "Como funciona o controle de estoque e baixa de peças?",
    a: "Ao adicionar peças em uma Ordem de Serviço ou concluir um atendimento, o estoque é atualizado automaticamente com alertas de reposição mínima e histórico de compras por fornecedor.",
  },
  {
    q: "Posso mudar de plano conforme minha oficina crescer?",
    a: "Sim. Você pode fazer upgrade ou downgrade entre os planos Starter, Pro e Premium a qualquer momento, mantendo todo o histórico de clientes, veículos e ordens de serviço intacto.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const leftFaqs = faqs.slice(0, 4);
  const rightFaqs = faqs.slice(4, 8);

  const renderItem = (faq: (typeof faqs)[number], idx: number) => {
    const isOpen = openIndex === idx;
    const questionId = `faq-q-${idx}`;
    const answerId = `faq-a-${idx}`;

    return (
      <div
        key={faq.q}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          isOpen
            ? "border-primary/45 bg-surface-2 shadow-[0_14px_40px_-16px_rgba(0,102,255,0.35)]"
            : "border-white/[0.08] bg-surface-1/80 hover:border-primary/30"
        }`}
      >
        <button
          type="button"
          id={questionId}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => toggle(idx)}
          className={`relative w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isOpen ? "bg-primary/[0.1]" : ""
          }`}
        >
          {/* Filete lateral luminoso quando ativo (estilo do modelo anexo) */}
          {isOpen && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-primary to-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.7)]"
            />
          )}

          <span
            className={`font-semibold text-sm sm:text-[15px] leading-snug transition-colors ${
              isOpen ? "text-cyan-300" : "text-foreground"
            }`}
          >
            {faq.q}
          </span>

          <span
            aria-hidden="true"
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors ${
              isOpen ? "text-cyan-300" : "text-muted-foreground"
            }`}
          >
            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-white/[0.06] bg-[#060916]/60">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.05]"
    >
      <div className="wrapper-container">
        {/* Cabeçalho Centralizado (Estilo do Modelo Anexo) */}
        <div className="section-header-center">
          <h2
            id="faq-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]"
          >
            Perguntas frequentes sobre o{" "}
            <span className="text-gradient">AutoCore</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Tire suas principais dúvidas sobre implantação, segurança, equipe e planos antes de
            começar na sua oficina.
          </p>
        </div>

        {/* Grid em 2 Colunas de Acordeons */}
        <div
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
          role="region"
          aria-label="Lista de perguntas e respostas frequentes"
        >
          <div className="space-y-4">
            {leftFaqs.map((faq, i) => renderItem(faq, i))}
          </div>
          <div className="space-y-4">
            {rightFaqs.map((faq, i) => renderItem(faq, i + leftFaqs.length))}
          </div>
        </div>
      </div>
    </section>
  );
}
