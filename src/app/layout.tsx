import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: {
    default: "Aclimação Preciosa — descubra o bairro",
    template: "%s | Aclimação Preciosa",
  },
  description:
    "Lugares, eventos e negócios que fazem a Aclimação ser especial.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <a
          className="fixed -top-[100px] left-2.5 z-100 bg-white px-5 py-3 focus:top-2.5"
          href="#conteudo"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
