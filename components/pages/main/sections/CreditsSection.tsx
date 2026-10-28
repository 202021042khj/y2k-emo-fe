import ChromeTitle from "@/components/common/love/ChromeTitle";
import { CREDITS, sceneId } from "@/constants/love";
import type { Device } from "@/types/love";

/** Scene 07: end credits, "fin." and a replay link back to the cold open. */
export default function CreditsSection({ device }: { device: Device }) {
  const titleId = `${sceneId(device, "credits")}-title`;

  return (
    <section
      id={sceneId(device, "credits")}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative flex h-svh snap-start flex-col items-center justify-center gap-10 bg-love-void px-5 text-center md:gap-14"
    >
      <h2 id={titleId} className="sr-only">
        Credits
      </h2>
      <dl className="flex flex-col gap-4.5 font-film md:gap-5.5">
        {CREDITS.map((c) => (
          <div key={c.role} className="flex flex-col gap-1">
            <dt className="text-sm font-bold tracking-[0.04em] text-love-pink">{c.role}</dt>
            <dd className="text-[15px] text-love-paper md:text-lg">{c.name}</dd>
          </div>
        ))}
      </dl>
      <ChromeTitle as="p" className="text-[76px] leading-none font-black md:text-[120px]">
        fin.
      </ChromeTitle>
      <a
        href={`#${sceneId(device, "open")}`}
        className="love-focus inline-flex min-h-11 items-center gap-2.5 border border-love-paper/60 px-5.5 font-film text-sm font-bold tracking-[0.04em] text-love-paper hover:border-love-paper"
      >
        ↺ replay
      </a>
    </section>
  );
}
