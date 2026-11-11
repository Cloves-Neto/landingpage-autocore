import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Children, useRef, useState, type ReactNode } from "react";

/**
 * Carrossel infinito tipo "vídeo passando".
 * - Rola continuamente (ease linear) duplicando o conteúdo para um loop sem emendas.
 * - mousein: desacelera suavemente até quase parar (leitura); mouseout: retoma a velocidade.
 * - Fade lateral nas bordas via `.mask-fade-x`.
 * - `prefers-reduced-motion`: fica estático.
 */

interface InfiniteShowcaseReelProps {
  items?: ReactNode[];
  children?: ReactNode;
  /** Velocidade em px/s (padrão 40). */
  speed?: number;
  /** Velocidade em px/s durante hover (opcional; se omitido usa hoverFactor). */
  hoverSpeed?: number;
  /** Fração da velocidade mantida no hover (padrão 0.15). */
  hoverFactor?: number;
  /** Direção da rolagem. */
  direction?: "left" | "right";
  /** Espaço entre itens em px (padrão 20). */
  gap?: number;
  className?: string;
  itemClassName?: string;
}

export default function InfiniteShowcaseReel({
  items,
  children,
  speed = 40,
  hoverSpeed,
  hoverFactor = 0.15,
  direction = "left",
  gap = 20,
  className = "",
  itemClassName = "",
}: InfiniteShowcaseReelProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const resolvedItems = items ?? Children.toArray(children);
  const effectiveHoverFactor =
    hoverSpeed !== undefined && speed > 0 ? hoverSpeed / speed : hoverFactor;

  const x = useMotionValue(0);
  // Fator de velocidade suavizado por spring -> desaceleração/aceleração orgânica
  const factor = useSpring(1, { stiffness: 60, damping: 20 });

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || reduce || resolvedItems.length === 0) return;

    factor.set(hovered ? effectiveHoverFactor : 1);

    // Metade da largura = uma cópia completa da lista (+ gap da emenda)
    const loopWidth = (track.scrollWidth + gap) / 2;
    if (loopWidth <= 0) return;

    const step = (speed * factor.get() * delta) / 1000;
    let next = x.get() + (direction === "left" ? -step : step);

    if (next <= -loopWidth) next += loopWidth;
    if (next > 0) next -= loopWidth;
    x.set(next);
  });

  const loop = [...resolvedItems, ...resolvedItems];

  return (
    <div
      className={`relative overflow-hidden mask-fade-x ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div ref={trackRef} className="flex w-max" style={{ x, gap }}>
        {loop.map((item, i) => (
          <div
            key={i}
            className={`shrink-0 ${itemClassName}`}
            // Cópia duplicada é decorativa: oculta para leitores de tela
            aria-hidden={i >= resolvedItems.length || undefined}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

