import Link from "next/link";

/** Sits in the empty middle of the top letterbox bar, above the decorative overlay. */
export default function BackLinkSection({ exe }: { exe: string }) {
  return (
    <nav aria-label="Back" className="fixed inset-x-0 top-0 z-60 flex h-12 items-center justify-center md:h-14">
      <Link
        href="/"
        className="love-focus inline-flex min-h-11 items-center font-film text-sm font-bold tracking-[0.04em] text-love-chrome hover:text-love-paper"
      >
        ◀ love.exe / {exe}
      </Link>
    </nav>
  );
}
