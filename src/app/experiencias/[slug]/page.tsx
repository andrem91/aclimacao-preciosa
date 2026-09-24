import { permanentRedirect, notFound } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (["oficina-de-ceramica", "degustacao-de-cafes-especiais"].includes(slug))
    permanentRedirect(`/eventos/${slug}`);
  notFound();
}
