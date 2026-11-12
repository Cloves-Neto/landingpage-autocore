import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Barra superior contínua de progresso de leitura/scroll com física de mola (Framer Motion).
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-gradient-to-r from-primary via-[hsl(var(--brand-cyan))] to-primary shadow-[0_0_12px_rgba(0,163,255,0.8)]"
    />
  );
}

