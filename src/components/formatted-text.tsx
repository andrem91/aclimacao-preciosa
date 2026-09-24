import { Fragment } from "react";
import { safeWebUrl } from "@/lib/events";

// A small, safe formatting vocabulary. Raw HTML is always rendered as text.
function Inline({ text }: { text: string }) {
  const parts = text.split(
    /(\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g,
  );
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && safeWebUrl(link[2]))
      return (
        <a
          key={index}
          href={safeWebUrl(link[2])}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Inline text={link[1]} />
        </a>
      );
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={index}>{part.slice(1, -1)}</em>;
    return (
      <Fragment key={index}>
        {part.split("\n").map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </Fragment>
    );
  });
}
export function FormattedText({ text }: { text: string }) {
  return (
    <div className="formatted-text">
      {text
        .replaceAll("\r\n", "\n")
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, index) => {
          const lines = block.split("\n");
          if (lines.every((line) => /^[-*] /.test(line)))
            return (
              <ul key={index}>
                {lines.map((line, i) => (
                  <li key={i}>
                    <Inline text={line.slice(2)} />
                  </li>
                ))}
              </ul>
            );
          if (lines.every((line) => /^\d+\. /.test(line)))
            return (
              <ol key={index}>
                {lines.map((line, i) => (
                  <li key={i}>
                    <Inline text={line.replace(/^\d+\. /, "")} />
                  </li>
                ))}
              </ol>
            );
          if (/^#{1,3} [^\n]+$/.test(block))
            return (
              <h3 key={index}>
                <Inline text={block.replace(/^#{1,3} /, "")} />
              </h3>
            );
          return (
            <p key={index}>
              <Inline text={block} />
            </p>
          );
        })}
    </div>
  );
}
