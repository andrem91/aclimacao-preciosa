import { pageContainer } from "@/components/styles";
import Link from "next/link";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="bg-paper pt-12">
      <div className={pageContainer}>
        <div className="block pb-[27px] md:flex md:justify-between md:gap-[30px] md:pb-[37px]">
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
            className="mt-[25px] grid grid-cols-2 gap-x-5 gap-y-[13px] text-sm md:mt-0 md:gap-x-[45px] md:gap-y-[11px]"
            aria-label="Navegação do rodapé"
          >
            <Link className="hover:underline" href="/negocios">
              Negócios
            </Link>
            <Link className="hover:underline" href="/eventos">
              Eventos
            </Link>
            <Link className="hover:underline" href="/lugares">
              Lugares
            </Link>
            <Link className="hover:underline" href="/participe">
              Participe
            </Link>
            <Link className="hover:underline" href="/participe#sobre">
              Sobre o projeto
            </Link>
            <Link className="hover:underline" href="/participe#contato">
              Contato
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-x-3.5 gap-y-1.5 border-t border-line py-[21px] text-xs text-[#687064] md:flex-nowrap md:gap-3.5">
          <span>© {new Date().getFullYear()} Aclimação Preciosa</span>
          <span className="w-full md:w-auto">Aclimação · São Paulo</span>
        </div>
      </div>
    </footer>
  );
}
