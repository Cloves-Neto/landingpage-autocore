import { motion } from "framer-motion";

const brands = [
  { name: "Bosch", spec: "Sistemas & Injeção" },
  { name: "Motul", spec: "Lubrificantes Premium" },
  { name: "Mahle", spec: "Componentes de Motor" },
  { name: "Castrol", spec: "Fluidos de Alta Performance" },
  { name: "Tecfil", spec: "Filtros Automotivos" },
  { name: "Nakata", spec: "Suspensão & Direção" },
  { name: "Monroe", spec: "Amortecedores" },
];

export default function TrustLogos() {
  return (
    <section className="relative py-12 border-y border-white/[0.05] bg-surface-1/40 backdrop-blur-sm">
      <div className="wrapper-container">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          Confiado por mais de 1.200 oficinas e centros automotivos em todo o Brasil
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 md:gap-x-16">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center transition-all duration-300"
            >
              <span className="font-display text-base font-bold tracking-wider text-muted-foreground/60 transition-colors duration-200 group-hover:text-chrome">
                {b.name}
              </span>
              <span className="text-[10px] text-muted-foreground/40 transition-colors duration-200 group-hover:text-primary">
                {b.spec}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

