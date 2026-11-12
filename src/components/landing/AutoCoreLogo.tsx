interface AutoCoreLogoProps {
  className?: string;
}

/**
 * Logo vetorial AutoCore em Off-White com ponteiro vermelho racing, sem fundo e sem efeitos ao redor.
 */
export default function AutoCoreLogo({ className = "h-10 w-10" }: AutoCoreLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Arco do velocímetro em off-white */}
      <path
        d="M11 38C9.8 29.5 12.6 20.6 19.2 14.6C24.5 9.8 31.6 7.7 38.4 8.6"
        stroke="#F5F5F2"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="7 4.5"
        opacity="0.9"
      />
      {/* Faixa redline do velocímetro */}
      <path
        d="M42.5 9.6C47.5 11.1 51.9 14.3 54.8 18.7"
        stroke="#FF2E3B"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* Letra A estilizada em off-white */}
      <path
        d="M14 50L28.5 17H35.5L47.5 46H39.8L37 38.8H26.4L21.8 50H14ZM28.7 32.8H34.7L31.7 24.6L28.7 32.8Z"
        fill="#F5F5F2"
      />

      {/* Ponteiro diagonal de aceleração em vermelho */}
      <path
        d="M13.5 47.5L53.5 19.5L34.5 36.5L13.5 47.5Z"
        fill="#FF2E3B"
      />
    </svg>
  );
}
