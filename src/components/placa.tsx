import type { ReactNode } from "react";

const sizes = {
  small: "px-3 py-2 text-xs",
  medium: "px-4 py-3 text-sm",
  large: "px-5 py-4 text-base md:text-xl",
};

/** Referência às placas de rua de São Paulo, com quebra para endereços longos. */
export function Placa({
  children,
  size = "medium",
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
}) {
  return (
    <span
      className={`inline-block max-w-full rounded bg-placa font-sans leading-relaxed font-bold tracking-wide text-white uppercase outline outline-white/80 -outline-offset-4 wrap-anywhere ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
