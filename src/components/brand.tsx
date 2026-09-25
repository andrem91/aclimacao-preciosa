export function Brand() {
  return (
    <span className="inline-flex items-center gap-2.5 text-emerald">
      <svg
        className="w-[29px] sm:w-[26px] lg:w-[31px]"
        width="31"
        height="39"
        viewBox="0 0 32 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M9 1h14l8 11v16L22 39H10L1 28V12Z" fill="currentColor" />
        <path
          d="m9 1 7 19L1 12Zm14 0-7 19 15-8ZM1 28l15-8-6 19Z"
          fill="#46bea0"
        />
        <path d="m31 28-15-8 6 19Z" fill="#034735" />
        <path d="m9 1 7 19 7-19Z" fill="#198a68" />
      </svg>
      <span className="font-serif text-[25px] leading-[1.1] font-[650] tracking-[-0.05em] sm:text-[22px] lg:text-[25px]">
        Aclimação
        <small className="mt-1.5 block font-sans text-[11px] font-[650] tracking-[0.43em]">
          PRECIOSA
        </small>
      </span>
    </span>
  );
}
