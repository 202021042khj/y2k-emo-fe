import { sceneId } from "@/constants/love";
import type { Device } from "@/types/love";

/** Scene 01: black screen, the title types itself out, feelings load to 72%. */
export default function ColdOpenSection({ device }: { device: Device }) {
  const titleId = `${sceneId(device, "open")}-title`;

  return (
    <section
      id={sceneId(device, "open")}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative flex h-svh snap-start flex-col items-center justify-center bg-love-void px-5 text-center"
    >
      <h1
        id={titleId}
        className="love-chrome love-type font-display text-[76px] leading-[0.92] font-black tracking-[-0.04em] md:text-[120px] md:leading-[0.9] lg:text-[160px] xl:text-[200px]"
      >
        love
        <br className="md:hidden" />
        .exe
      </h1>

      <p className="mt-10 flex items-center gap-3 font-film text-[15px] text-love-cyan md:mt-14 md:text-lg">
        <span>&gt; loading feelings</span>
        <span aria-hidden className="relative hidden h-3 w-40 border border-love-cyan/60 md:block">
          <span className="love-load absolute inset-y-0 left-0 w-[72%] bg-love-cyan" />
        </span>
        <span>72%</span>
      </p>
      <p className="mt-3 max-w-72 font-film text-[15px] text-love-paper/70 md:max-w-none md:text-lg">
        a short film about the 2000s, in three objects
      </p>

      <p aria-hidden className="absolute bottom-20 font-film text-sm font-bold tracking-[0.04em] text-love-pink md:bottom-24">
        scroll to play ▶
      </p>
    </section>
  );
}
