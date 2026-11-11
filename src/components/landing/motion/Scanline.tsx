/**
 * Linha de luz ciano percorrendo um container (efeito "software ao vivo").
 * O container pai precisa ser `relative overflow-hidden`.
 */
export default function Scanline({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-x-0 h-1/3 animate-scanline"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsla(199, 100%, 60%, 0.08) 45%, hsla(199, 100%, 65%, 0.35) 50%, hsla(199, 100%, 60%, 0.08) 55%, transparent)",
        }}
      />
    </div>
  );
}

