import { useState } from "react";
import { ShieldCheck, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511987654321";

export default function FinalCtaNewsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !question.trim()) return;

    const text = [
      `Olá! Tenho uma dúvida sobre os planos do AutoCore.`,
      `*Nome:* ${name.trim()}`,
      `*E-mail:* ${email.trim()}`,
      `*Dúvida:* ${question.trim()}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contato"
      aria-labelledby="cta-heading"
      className="relative py-20 md:py-28 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Glow Atmosférico */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="wrapper-container relative z-10">
        <div className="rounded-3xl border border-white/[0.08] bg-surface-1/90 p-8 sm:p-12 md:p-14 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Texto em Destaque à Esquerda */}
            <div className="lg:col-span-6 space-y-4">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground"
              >
                Ficou com alguma dúvida?{" "}
                <span className="text-gradient">Nosso time ajuda você a escolher</span>.
              </h2>

              <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed max-w-xl rounded-2xl border border-primary/25 bg-primary/[0.07] p-4">
                Se tiver alguma dúvida, entre em contato que nosso time te ajuda a escolher o
                melhor plano que se adeque às necessidades da sua oficina.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  Atendimento direto no WhatsApp
                </span>
                <span aria-hidden="true">•</span>
                <span>Sem compromisso</span>
                <span aria-hidden="true">•</span>
                <span>7 dias grátis</span>
              </div>
            </div>

            {/* Mini Form (Nome, E-mail, Dúvida) enviando para WhatsApp */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleSubmit}
                aria-label="Formulário de contato rápido para WhatsApp"
                className="space-y-3 rounded-2xl border border-white/[0.08] bg-black/35 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cta-name" className="block text-xs font-medium text-muted-foreground mb-1">
                      Nome
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#060916] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-email" className="block text-xs font-medium text-muted-foreground mb-1">
                      E-mail
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#060916] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cta-question" className="block text-xs font-medium text-muted-foreground mb-1">
                    Sua dúvida
                  </label>
                  <textarea
                    id="cta-question"
                    name="question"
                    rows={3}
                    required
                    placeholder="Conte sobre sua oficina ou qual plano você quer entender melhor..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#060916] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Enviar dúvida diretamente para o WhatsApp da equipe AutoCore"
                  className="btn-brand w-full rounded-xl px-6 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar dúvida no WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
