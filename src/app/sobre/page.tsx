import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { pageContainer, textLink } from "@/components/styles";

export const metadata = {
  title: "Sobre o projeto",
  description:
    "Conheça a origem e o propósito do Aclimação Preciosa, o guia de negócios, eventos e lugares do bairro.",
};

export default function AboutPage() {
  return (
    <div className={`${pageContainer} min-h-[65vh] pb-16 md:pb-20`}>
      <PageIntro
        eyebrow="Sobre o projeto"
        title="Por que o Aclimação Preciosa existe"
        description="Um guia para aproximar moradores, comerciantes e visitantes do bairro."
      />
      <div className="max-w-[67ch] space-y-5 text-lg text-muted">
        <p>
          Muita gente atravessa a Aclimação sem parar. O Aclimação Preciosa
          nasceu de moradores e comerciantes que querem mudar isso: fazer do
          bairro um lugar de encontro, e não só de passagem.
        </p>
        <p>
          Aqui você encontra os negócios locais, a agenda de eventos e os
          lugares que contam a história do bairro. O nome vem das ruas batizadas
          com pedras preciosas, como Topázio, Safira, Rubi e Esmeralda.
        </p>
        <Link href="/participe" className={textLink}>
          Quero participar <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
