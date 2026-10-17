import type { ServiceIconName } from "@/lib/content";

// Simple line icons (24×24, stroke), one per service. Paths adapted from Lucide (ISC license).
const paths: Record<ServiceIconName, string> = {
  microscope:
    "M6 18h8 M3 22h18 M14 22a7 7 0 1 0 0-14h-1 M9 14h2 M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
  heart:
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  egg: "M12 22c4.4 0 7-3.1 7-7.5C19 9.5 16 2 12 2S5 9.5 5 14.5C5 18.9 7.6 22 12 22Z",
  flask: "M9 2v6L4 18a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3L15 8V2 M8 2h8 M7 14h10",
  dna: "M2 15c6.7-6 13.3 0 20-6 M9 22c1.8-2 2.5-4 2.8-6 M15 2c-1.8 2-2.5 4-2.8 6 M17 6l-2.5-2.5 M14 8l-1-1 M7 18l2.5 2.5 M3.5 14.5l.5.5 M20 9l.5.5 M6.5 12.5l1 1 M16.5 10.5l1 1 M10 16l1.5 1.5",
  baby: "M9 12h.01 M15 12h.01 M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5 M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
  snowflake: "M2 12h20 M12 2v20 M20 16l-4-4 4-4 M4 8l4 4-4 4 M16 4l-4 4-4-4 M8 20l4-4 4 4",
  scope: "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  stethoscope:
    "M11 2v2 M5 2v2 M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1 M8 15a6 6 0 0 0 12 0v-3 M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  hospital: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M12 8v8 M8 12h8",
  calendar:
    "M8 2v4 M16 2v4 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M3 10h18 M12 18s-3-1.6-3-3.5a1.5 1.5 0 0 1 3-.5 1.5 1.5 0 0 1 3 .5c0 1.9-3 3.5-3 3.5Z",
};

/** A service's icon in a rounded square. `className` sets its size and background. Decorative: the title next to it says what it is. */
export const ServiceIcon = ({ name, className = "size-12 bg-peach" }: { name: ServiceIconName; className?: string }) => (
  <span className={`grid shrink-0 place-items-center rounded-2xl text-brand-strong ${className}`}>
    <svg
      className="size-1/2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  </span>
);
