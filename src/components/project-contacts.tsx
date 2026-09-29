import { projectContact } from "@/lib/site";

export function ProjectContacts() {
  const links = [
    {
      value: projectContact.email,
      href: `mailto:${projectContact.email}`,
      label: projectContact.email,
    },
    {
      value: projectContact.instagram,
      href: projectContact.instagram,
      label: "Instagram",
    },
    {
      value: projectContact.whatsapp,
      href: `https://wa.me/${projectContact.whatsapp}`,
      label: "WhatsApp",
    },
  ].filter((link) => link.value);
  if (!links.length) return null;
  return (
    <div className="mt-4 text-sm">
      <p>Se preferir, fale com a gente:</p>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              className="text-emerald underline wrap-anywhere"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
