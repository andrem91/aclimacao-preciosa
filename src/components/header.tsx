"use client";
import { pageContainer, buttonStyles } from "@/components/styles";

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
      className="sticky top-0 z-30 border-b border-line bg-paper"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div
        className={`${pageContainer} flex h-[76px] items-center justify-between gap-[18px] sm:h-[89px] lg:gap-6`}
      >
        <Link
          href="/"
          aria-label="Aclimação Preciosa — início"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav
          className="ml-auto mr-5 hidden items-center gap-[27px] self-stretch lg:flex"
          aria-label="Navegação principal"
        >
          {links.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              className="relative py-3 text-sm font-medium whitespace-nowrap hover:text-emerald aria-[current=page]:text-emerald aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-[5px] aria-[current=page]:after:h-px aria-[current=page]:after:bg-emerald"
              aria-current={active(url) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className={`${buttonStyles("primary", "small")} max-lg:hidden`}
          href="/participe"
        >
          Participe <ArrowUpRight size={15} />
        </Link>
        <button
          ref={trigger}
          type="button"
          className="flex size-11 items-center justify-center border-0 bg-transparent text-emerald lg:hidden"
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
          className={`pb-5 lg:hidden ${pageContainer}`}
          aria-label="Navegação mobile"
        >
          {[...links, ["/participe", "Participe"]].map(([url, label]) => (
            <Link
              key={url}
              href={url}
              className="flex min-h-12 items-center justify-between border-b border-line py-3 text-base font-medium hover:text-emerald aria-[current=page]:text-emerald"
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
