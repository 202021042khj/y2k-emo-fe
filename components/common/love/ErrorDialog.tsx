import { cn } from "@/lib/utils";

interface ErrorDialogProps {
  title: string;
  message: string;
  waitHref: string;
  endHref: string;
  className?: string;
}

/** Windows 2000-style "not responding" box. The buttons are real links. */
export default function ErrorDialog({ title, message, waitHref, endHref, className }: ErrorDialogProps) {
  return (
    <div
      role="group"
      aria-label={`${title} dialog`}
      className={cn(
        "border-2 border-white bg-[#c9cbd3] font-film text-love-void shadow-[6px_6px_0_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex items-center bg-linear-to-r from-[#1b1f6b] to-love-pink px-2.5 py-1.5 text-sm font-bold tracking-[0.04em] text-white">
        <span className="flex-1">{title}</span>
        <span aria-hidden>✕</span>
      </div>
      <div className="flex flex-col gap-4.5 px-5 py-4.5">
        <p className="text-[15px] leading-normal whitespace-pre-line md:text-lg">{message}</p>
        <div className="flex gap-2.5">
          {[
            { label: "wait", href: waitHref },
            { label: "end now", href: endHref },
          ].map((b) => (
            <a
              key={b.label}
              href={b.href}
              className="love-focus inline-flex min-h-11 items-center border border-love-void bg-[#dfe0e6] px-4.5 text-sm shadow-[inset_1px_1px_0_#fff] active:shadow-[inset_-1px_-1px_0_#fff] md:min-h-0 md:py-1.5"
            >
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
