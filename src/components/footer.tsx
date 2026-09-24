import Link from "next/link";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="Aclimação Preciosa — início">
              <Brand />
            </Link>
            <p>
              Um olhar atento para os lugares e as pessoas
              <br />
              que fazem a Aclimação acontecer.
            </p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <Link href="/negocios">Negócios</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/lugares">Lugares</Link>
            <Link href="/participe">Participe</Link>
            <Link href="/participe#sobre">Sobre o projeto</Link>
            <Link href="/participe#contato">Contato</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aclimação Preciosa</span>
          <span>Aclimação · São Paulo</span>
        </div>
      </div>
    </footer>
  );
}
