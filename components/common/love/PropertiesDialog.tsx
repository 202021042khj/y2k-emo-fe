import { cn } from "@/lib/utils";

interface PropertiesDialogProps {
  title: string;
  rows: readonly { label: string; value: string }[];
  okHref: string;
  playHref: string;
  className?: string;
}

/** Windows 2000-style file "properties" box, used as the spec sheet. */
export default function PropertiesDialog({ title, rows, okHref, playHref, className }: PropertiesDialogProps) {
  return (
    <div
      role="group"
      aria-label={title}
      className={cn(
        "border-2 border-white bg-[#c9cbd3] font-film text-love-void shadow-[6px_6px_0_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <p className="bg-linear-to-r from-[#1b1f6b] to-love-pink px-2.5 py-1.5 text-sm font-bold text-white">{title}</p>
      <dl className="flex flex-col gap-2 px-4.5 py-4 text-[13px] leading-snug md:text-sm">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[88px_1fr] gap-3 md:grid-cols-[100px_1fr]">
            <dt className="opacity-60">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-2.5 px-4.5 pb-4">
        {[
          { label: "ok", href: okHref },
          { label: "play", href: playHref },
        ].map((b) => (
          <a
            key={b.label}
            href={b.href}
            className="love-focus inline-flex min-h-11 items-center border border-love-void bg-[#dfe0e6] px-4.5 text-sm shadow-[inset_1px_1px_0_#fff] md:min-h-0 md:py-1.5"
          >
            {b.label}
          </a>
        ))}
      </div>
    </div>
  );
}
