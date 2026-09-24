import { PageIntro } from "@/components/ui";
import { ParticipationForm } from "@/components/participation-form";
export const metadata = {
  title: "Participe",
  description:
    "Faça parte do Aclimação Preciosa. Conheça as formas de contribuir com o guia.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const initial = tipo === "evento" || tipo === "lugar" ? tipo : "negocio";
  return (
    <div className="container listing-page">
      <PageIntro
        eyebrow="O próximo encontro começa com você"
        title="Faça parte do Aclimação Preciosa"
        description="Tem um negócio, conhece um lugar especial ou quer compartilhar uma história? O bairro também se revela pelo seu olhar."
      />
      <ParticipationForm key={initial} initial={initial} />
    </div>
  );
}
