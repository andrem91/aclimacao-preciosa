// Shared Tailwind recipes. Keep complete class names so the compiler can detect them.
export const pageContainer =
  "mx-auto w-[calc(100%-40px)] sm:w-[calc(100%-48px)] lg:w-[min(1120px,calc(100%-80px))]";
export const cardGrid =
  "grid grid-cols-1 gap-[34px] sm:grid-cols-3 sm:gap-[22px] lg:gap-[30px]";
export const eyebrow = "font-sans font-bold leading-[1.6] uppercase";
export const introCopy =
  "mt-5 max-w-[66ch] text-base leading-[1.9] text-muted sm:text-lg";
export const textLink =
  "inline-flex min-h-11 items-center gap-3 border-0 bg-transparent text-sm font-semibold text-emerald hover:underline hover:underline-offset-[5px]";
export const backLink =
  "my-[30px] inline-flex items-center gap-[9px] text-sm text-[#607063] hover:text-emerald";
export const detailHeading =
  "max-w-[950px] pt-0 pb-8 sm:pt-3.5 [&_h1]:mt-4 [&_h1]:text-4xl [&_h1]:leading-[1.2] sm:[&_h1]:text-[clamp(34px,4.2vw,55px)]";
export const relatedSection =
  "mt-10 border-t border-line pt-[35px] sm:mt-[65px] sm:pt-[55px]";
export const emptyState =
  "rounded bg-[#eceee5] px-5 py-[55px] text-center [&_p]:mx-auto [&_p]:my-5 [&_p]:max-w-[60ch]";
export const prose =
  "max-w-[67ch] [&_h2]:mb-5 [&_h2]:text-[30px] [&_p]:mb-5 [&_p]:text-base [&_p]:leading-[1.95] [&_p]:text-[#536052] [&_p+h2]:mt-10";
export const filterLabel = "grid min-w-0 gap-2 text-sm";
export const filterInput =
  "min-h-12 w-full rounded border border-line bg-white p-2.5 text-base";
export const formLabel = "flex min-w-0 flex-col gap-2 text-sm font-semibold";
export const formControl =
  "min-h-[45px] w-full rounded-[3px] border border-[#d9dfd2] bg-[#faf9f4] p-3 text-base font-normal text-ink placeholder:text-sm placeholder:text-[#7a8078]";
export const formTextarea = `${formControl} min-h-[110px] resize-y`;
export const resultSummary =
  "mt-8 mb-[22px] flex flex-wrap items-baseline gap-x-6 gap-y-3 [&_h2]:text-[28px] [&_span]:text-sm [&_a]:ml-auto [&_a]:text-sm [&_a]:text-emerald [&_a]:underline max-xs:[&_a]:ml-0";

export function buttonStyles(
  variant: "primary" | "cream" | "outline" = "primary",
  size: "regular" | "small" = "regular",
) {
  return [
    "inline-flex items-center justify-center rounded-[3px] border font-semibold transition-[background,transform] duration-200 hover:-translate-y-px",
    size === "small"
      ? "min-h-10 gap-[18px] px-[17px] py-[9px] text-sm"
      : "min-h-12 gap-[22px] px-[23px] py-[15px] text-base",
    variant === "cream"
      ? "border-transparent bg-paper text-[#164333] hover:bg-white"
      : variant === "outline"
        ? "flex-wrap border-emerald bg-transparent text-emerald hover:bg-[#e5ebe0]"
        : "border-transparent bg-emerald text-white hover:bg-[#08503b]",
  ].join(" ");
}

export const eventStateColor = {
  upcoming: "",
  ongoing: "",
  ended: "",
  cancelled: "text-[#8b3531]",
  postponed: "text-[#765621]",
};
