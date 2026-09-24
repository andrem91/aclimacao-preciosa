import { getEstablishments } from "@/lib/content";
import { PageIntro } from "@/components/ui";
import { EstablishmentGrid } from "@/components/filters";
export const metadata = {
  title: "Negócios",
  description: "Descubra negócios e serviços da Aclimação.",
};
export default function Page() {
  return (
    <div className="container listing-page">
      <PageIntro
        eyebrow="Negócios do bairro"
        title="Negócios da Aclimação"
        description="Da primeira xícara de café aos serviços do dia a dia. Descubra negócios e pessoas por perto."
      />
      <EstablishmentGrid items={getEstablishments()} />
    </div>
  );
}
