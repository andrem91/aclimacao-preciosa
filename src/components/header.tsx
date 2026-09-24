"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
const links = [
  ["/", "Início"],
  ["/negocios", "Negócios"],
  ["/eventos", "Eventos"],
  ["/lugares", "Lugares"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Link
          href="/"
          aria-label="Aclimação Preciosa — início"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              aria-current={active(url) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small header-join" href="/participe">
          Participe <ArrowUpRight size={15} />
        </Link>
        <button
          ref={trigger}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="Navegação mobile"
        >
          {[...links, ["/participe", "Participe"]].map(([url, label]) => (
            <Link
              key={url}
              href={url}
              aria-current={active(url) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
