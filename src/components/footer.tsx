import { pageContainer } from "@/components/styles";
import Link from "next/link";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="bg-paper pt-12">
      <div className={pageContainer}>
        <div className="block pb-[27px] sm:flex sm:justify-between sm:gap-[30px] sm:pb-[37px]">
          <div>
            <Link href="/" aria-label="Aclimação Preciosa — início">
              <span className="inline-block origin-left scale-[0.86]">
                <Brand />
              </span>
            </Link>
            <p className="mt-3.5 text-xs leading-[1.9] text-muted">
              Um olhar atento para os lugares e as pessoas
              <br />
              que fazem a Aclimação acontecer.
            </p>
          </div>
          <nav
            className="mt-[25px] grid grid-cols-2 gap-x-5 gap-y-[13px] text-sm sm:mt-0 sm:gap-x-[45px] sm:gap-y-[11px] [&_a:hover]:underline"
            aria-label="Navegação do rodapé"
          >
            <Link href="/negocios">Negócios</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/lugares">Lugares</Link>
            <Link href="/participe">Participe</Link>
            <Link href="/participe#sobre">Sobre o projeto</Link>
            <Link href="/participe#contato">Contato</Link>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-x-3.5 gap-y-1.5 border-t border-line py-[21px] text-xs text-[#687064] sm:flex-nowrap sm:gap-3.5">
          <span>© {new Date().getFullYear()} Aclimação Preciosa</span>
          <span className="w-full sm:w-auto">Aclimação · São Paulo</span>
        </div>
      </div>
    </footer>
  );
}
