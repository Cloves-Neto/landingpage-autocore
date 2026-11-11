import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Revelação ao rolar a página (fade-in + leve subida).
 * - <Reveal>: anima um único bloco.
 * - <RevealGroup> + <RevealItem>: anima os filhos em sequência (stagger).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial em px (padrão 20). */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Intervalo entre filhos em segundos (padrão 0.1). */
  stagger?: number;
}

export function RevealGroup({ children, className, stagger = 0.1 }: RevealGroupProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

