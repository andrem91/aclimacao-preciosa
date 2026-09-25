import {
  pageContainer,
  emptyState,
  eyebrow,
  buttonStyles,
} from "@/components/styles";
import Link from "next/link";
export default function NotFound() {
  return (
    <div
      className={`${pageContainer} ${emptyState} my-[65px] [&_h1]:mx-auto [&_h1]:my-5 [&_h1]:max-w-[650px] [&_h1]:text-[31px] sm:[&_h1]:text-[40px]`}
    >
      <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
        404 · Um desvio no caminho
      </p>
      <h1>Essa descoberta ainda não está aqui.</h1>
      <p>
        A página não existe ou não está publicada. Que tal explorar o bairro por
        outro caminho?
      </p>
      <Link href="/" className={buttonStyles()}>
        Voltar ao início
      </Link>
    </div>
  );
}
