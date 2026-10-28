import Image from "next/image";
import Link from "next/link";
import ChromeTitle from "@/components/common/love/ChromeTitle";
import type { Device, ObjectDetail } from "@/types/love";

interface NextObjectSectionProps {
  device: Device;
  id: string;
  next: ObjectDetail;
}

/** Last scene: a trailer card for the next object, plus a way back to the film. */
export default function NextObjectSection({ device, id, next }: NextObjectSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative flex h-svh snap-start flex-col items-center justify-center gap-6 bg-love-void px-5 text-center md:gap-8"
    >
      <p className="font-film text-sm font-bold tracking-[0.04em] text-love-pink">next object</p>
      <ChromeTitle id={titleId} className="max-w-80 text-[44px] leading-[1.02] font-black md:max-w-none md:text-[72px] md:leading-none xl:text-[96px]">
        {next.object.title}
      </ChromeTitle>
      <div className="relative aspect-video w-full max-w-140 border md:max-w-120 xl:max-w-140 border-love-paper/40">
        <Image src={next.object.frames.poster} alt={next.object.frames.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
      </div>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
        <Link
          href={`/objects/${next.slug}`}
          className="love-focus inline-flex min-h-11 items-center justify-center bg-love-pink px-5.5 font-film text-sm font-bold tracking-[0.04em] text-love-void hover:bg-love-paper"
        >
          ▶ play next
        </Link>
        <Link
          href="/"
          className="love-focus inline-flex min-h-11 items-center justify-center border border-love-paper/60 px-5.5 font-film text-sm font-bold tracking-[0.04em] text-love-paper hover:border-love-paper"
        >
          ↺ back to love.exe
        </Link>
      </div>
    </section>
  );
}
