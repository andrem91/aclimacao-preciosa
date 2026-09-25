import {
  pageContainer,
  emptyState,
  eyebrow,
  buttonStyles,
} from "@/components/styles";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className={`${pageContainer} ${emptyState} my-[65px]`}>
      <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
        404 · Um desvio no caminho
      </p>
      <h1 className="mx-auto my-5 max-w-[650px] text-[31px] md:text-[40px]">
        Essa descoberta ainda não está aqui.
      </h1>
      <p className="mx-auto my-5 max-w-[60ch]">
        A página não existe ou não está publicada. Que tal explorar o bairro por
        outro caminho?
      </p>
      <Link href="/" className={buttonStyles()}>
        Voltar ao início
      </Link>
    </div>
  );
}
