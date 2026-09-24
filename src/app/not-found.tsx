import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state not-found">
      <p className="eyebrow">404 · Um desvio no caminho</p>
      <h1>Essa descoberta ainda não está aqui.</h1>
      <p>
        A página não existe ou não está publicada. Que tal explorar o bairro por
        outro caminho?
      </p>
      <Link href="/" className="button">
        Voltar ao início
      </Link>
    </div>
  );
}
