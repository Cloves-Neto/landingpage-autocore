import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

/**
 * Card interativo (mousein / mouseout):
 * - Luz radial azul que segue o cursor (spotlight).
 * - Inclinação 3D suave conforme a posição do mouse (tilt).
 * - Filete de borda Vermelho Racing <-> Azul Elétrico ao passar o mouse.
 * Respeita `prefers-reduced-motion` (desliga o tilt).
 */

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima em graus (padrão 4). Use 0 para desligar. */
  maxTilt?: number;
  /** Alias de maxTilt para conveniência. */
  tiltMax?: number;
  /** Raio da luz em px (padrão 320). */
  radius?: number;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export default function SpotlightCard({
  children,
  className = "",
  maxTilt,
  tiltMax,
  radius = 320,
  ...props
}: SpotlightCardProps) {
  const reduce = useReducedMotion();
  const resolvedTilt = tiltMax ?? maxTilt ?? 4;

  // Posição do mouse em px (para a luz) e normalizada -0.5..0.5 (para o tilt)
  const mx = useMotionValue(-radius);
  const my = useMotionValue(-radius);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const tilt = reduce ? 0 : resolvedTilt;
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [tilt, -tilt]), SPRING);
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-tilt, tilt]), SPRING);

  const spotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, hsla(199, 100%, 60%, 0.14), transparent 65%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    nx.set(x / rect.width - 0.5);
    ny.set(y / rect.height - 0.5);
  }

  function handleLeave() {
    nx.set(0);
    ny.set(0);
    mx.set(-radius);
    my.set(-radius);
  }

  return (
    <motion.div
      {...props}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", ...SPRING }}
      className={`group relative overflow-hidden rounded-2xl lp-card ${className}`}
    >
      {/* Filete de borda em gradiente (aparece no hover) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background: "linear-gradient(135deg, hsla(357,100%,56%,0.55), hsla(211,100%,50%,0.15) 45%, hsla(199,100%,55%,0.55))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Luz que segue o cursor */}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

