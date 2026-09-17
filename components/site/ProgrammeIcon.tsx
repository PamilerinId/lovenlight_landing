import type { ProgrammeIconName } from "@/content/site";

/**
 * 1.5px single-stroke line icons from the prototype (24-unit viewBox).
 * Colour comes from `currentColor` so the CSR card can render them white.
 */
const PATHS: Record<ProgrammeIconName, React.ReactNode> = {
  bowl: (
    <>
      <path d="M4 11h16" />
      <path d="M5 11a7 7 0 0 1 14 0" />
      <path d="M3 15h18" />
      <path d="M6 19h12" />
    </>
  ),
  book: (
    <>
      <path d="M4 19V6a2 2 0 0 1 2-2h5v15H6a2 2 0 0 0-2 2z" />
      <path d="M20 19V6a2 2 0 0 0-2-2h-5v15h5a2 2 0 0 1 2 2z" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20V10" />
      <path d="M12 10c0-4 3-6 7-6 0 4-3 6-7 6z" />
      <path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" />
      <path d="M6 20h12" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M17 3l1 1" />
      <path d="M19 7h1.5" />
    </>
  ),
  buildings: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V11l4-3 4 3v10" />
      <path d="M13 21V8l6-3v16" />
      <path d="M8 14h1" />
      <path d="M8 17h1" />
    </>
  ),
  briefcase: (
    <>
      <path d="M8 12h.01" />
      <path d="M4 8h16" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 16h8" />
      <path d="M12 12h4" />
    </>
  ),
};

export function ProgrammeIcon({
  name,
  className,
}: {
  name: ProgrammeIconName;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
