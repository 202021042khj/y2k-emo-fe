import Image from "next/image";
import ChromeTitle from "@/components/common/love/ChromeTitle";
import type { DetailShot, Device } from "@/types/love";
import { cn } from "@/lib/utils";

interface DetailShotSectionProps {
  device: Device;
  id: string;
  index: 1 | 2;
  shot: DetailShot;
}

/** Full-bleed macro still with a captioned note, left for the first detail and right for the second. */
export default function DetailShotSection({ device, id, index, shot }: DetailShotSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative h-svh snap-start overflow-hidden bg-love-void"
    >
      <Image src={shot.image} alt={shot.alt} fill sizes="100vw" className="object-cover" />
      <div
        className={cn(
          "absolute inset-x-5 bottom-17.5 flex flex-col gap-2 bg-love-void/78 px-4.5 py-4 md:inset-x-auto md:bottom-22.5 md:w-115 md:gap-2.5 md:px-6 md:py-5.5",
          index === 1 ? "md:left-18" : "md:right-18",
        )}
      >
        <p className="font-film text-sm font-bold tracking-[0.04em] text-love-pink">detail 0{index}</p>
        <ChromeTitle id={titleId} className="text-[32px] leading-none md:text-[48px]">
          {shot.caption}
        </ChromeTitle>
        <p className="font-film text-[15px] leading-[1.55] text-love-paper md:text-lg md:leading-[1.6]">{shot.note}</p>
      </div>
    </section>
  );
}
