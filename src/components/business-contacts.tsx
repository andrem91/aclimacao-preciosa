"use client";

import { useState } from "react";
import { buttonStyles } from "@/components/styles";
import { Phone, MessageCircle, Globe, Mail, Copy } from "lucide-react";
import type { Establishment } from "@/types/content";

const networks = {
  instagram: {
    name: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17.5 6.5h.01",
  },
  youtube: {
    name: "YouTube",
    path: "M21 7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3z M10 8l6 4-6 4z",
  },
  linkedin: {
    name: "LinkedIn",
    path: "M4 9v11 M4 4v.01 M10 20V9 M10 14a5 5 0 0 1 10 0v6",
  },
  facebook: {
    name: "Facebook",
    path: "M14 22V12h4l1-4h-5V6c0-2 1-3 3-3h2V0h-3c-4 0-6 2-6 6v2H6v4h4v10",
  },
  tiktok: { name: "TikTok", path: "M14 3v13a5 5 0 1 1-5-5 M14 3c0 4 3 6 7 6" },
} as const;

function webUrl(value?: string) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.includes(":") ? value : `https://${value}`);
    return ["https:", "http:"].includes(url.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
}

export function BusinessContacts({
  item,
  label = "Contatos do negócio",
  appearance = "buttons",
  layout = "business",
}: {
  layout?: "business" | "panel";
  appearance?: "buttons" | "links";
  label?: string;
  item: Pick<
    Establishment,
    "phone" | "whatsapp" | "website" | "email" | "socialLinks"
  >;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const contactLink =
    "inline-flex min-h-11 min-w-0 items-center gap-2.5 text-emerald hover:underline [&_span]:wrap-anywhere";
  const iconLink =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-emerald hover:bg-[#e5ebe0]";
  const website = webUrl(item.website);
  const phone = item.phone?.replace(/[^+\d]/g, "");
  const whatsapp = item.whatsapp?.replace(/\D/g, "");
  const email = item.email?.trim();
  const socials = Object.entries(networks).flatMap(([platform, network]) => {
    const url = webUrl(
      item.socialLinks?.find((link) => link.platform === platform)?.url,
    );
    return url ? [{ platform, ...network, href: url.href }] : [];
  });
  if (!phone && !whatsapp && !website && !email && !socials.length) return null;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email!);
      setCopyStatus("E-mail copiado.");
    } catch {
      setCopyStatus(
        "Não foi possível copiar. Selecione o endereço para copiá-lo.",
      );
    }
  }

  return (
    <section
      className={
        layout === "business"
          ? "order-0 grid w-full gap-3.5 rounded-lg border border-line bg-surface p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:has-[+section]:mb-6 md:has-[+section]:border-b md:has-[+section]:pb-6"
          : "mt-6 grid gap-[18px] border-t border-line pt-[22px]"
      }
      aria-label={label}
    >
      <h2 className="text-[26px]">Contato</h2>
      {(whatsapp || phone) && (
        <div className={appearance === "links" ? "grid gap-3" : "grid gap-2.5"}>
          {whatsapp && (
            <a
              className={
                appearance === "buttons"
                  ? `${buttonStyles("outline")} w-full`
                  : contactLink
              }
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
          )}
          {phone && (
            <a
              className={
                appearance === "buttons"
                  ? `${buttonStyles("outline")} w-full`
                  : contactLink
              }
              href={`tel:${phone}`}
              title={item.phone}
            >
              <Phone size={18} aria-hidden="true" />
              {appearance === "buttons" && "Ligar "}
              <span>{item.phone}</span>
            </a>
          )}
        </div>
      )}
      {(website || email) && (
        <div className="grid gap-2">
          {website && (
            <a
              className={contactLink}
              href={website.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar site: ${website.hostname}`}
            >
              <Globe size={19} aria-hidden="true" />
              <span>{website.hostname.replace(/^www\./, "")}</span>
            </a>
          )}
          {email && (
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <a className={contactLink} href={`mailto:${email}`}>
                <Mail size={19} aria-hidden="true" />
                <span>{email}</span>
              </a>
              <button
                className={iconLink}
                type="button"
                onClick={copyEmail}
                aria-label="Copiar e-mail"
                title="Copiar e-mail"
              >
                <Copy size={18} aria-hidden="true" />
              </button>
              <span className="text-sm" role="status">
                {copyStatus}
              </span>
            </div>
          )}
        </div>
      )}
      {!!socials.length && (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="w-full text-sm">Redes sociais</span>
          {socials.map((network) => (
            <a
              className={iconLink}
              key={network.platform}
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={network.name}
              title={network.name}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={network.path} />
              </svg>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
