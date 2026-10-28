"use client";

import { motion, useReducedMotion } from "motion/react";
import ChromeTitle from "@/components/common/love/ChromeTitle";
import FileList from "@/components/common/love/FileList";
import { sceneId } from "@/constants/love";
import type { Chapter, Device } from "@/types/love";

/** Chapter card. The one glitch cut on the page happens as each chapter comes on screen. */
export default function ChapterSection({ device, chapter }: { device: Device; chapter: Chapter }) {
  const reduceMotion = useReducedMotion();
  const titleId = `${sceneId(device, chapter.key)}-title`;

  return (
    <section
      id={sceneId(device, chapter.key)}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative h-svh snap-start overflow-hidden bg-love-void px-5 pt-22 md:px-16 md:pt-32 xl:px-30"
    >
      {/* Static slices behind the title, as in the design */}
      <span aria-hidden className="absolute top-36 -left-5 h-6 w-full bg-love-cyan/35 md:top-45 md:-left-10 md:h-9" />
      <span aria-hidden className="absolute top-44 left-8 hidden h-2.5 w-full bg-love-pink/35 md:top-[232px] md:block" />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0], x: [0, -36, 24, 0] }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.36, times: [0, 0.2, 0.7, 1], ease: "linear" }}
          className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
        >
          <span className="absolute top-[30%] h-10 w-full bg-love-cyan/60" />
          <span className="absolute top-[34%] left-6 h-3 w-full bg-love-pink/70" />
          <span className="absolute top-[58%] -left-8 h-6 w-full bg-love-pink/40" />
        </motion.div>
      )}

      <div className="relative grid gap-8 md:grid-cols-[1fr_minmax(0,560px)] md:gap-10 xl:gap-16">
        <div>
          <p className="font-film text-sm font-bold tracking-[0.04em] text-love-pink">{chapter.label}</p>
          <ChromeTitle id={titleId} className="mt-1 text-[64px] leading-[0.95] font-black md:text-[88px] xl:text-[120px]">
            {chapter.title.split(".").map((part, i, all) => (
              <span key={part} className="inline-block">
                {part}
                {i < all.length - 1 && "."}
              </span>
            ))}
          </ChromeTitle>
          <p className="mt-6 max-w-[56ch] font-film text-[15px] leading-[1.6] text-love-paper md:mt-10 md:text-lg">
            {chapter.body}
          </p>
        </div>
        <div className="font-film text-[15px] leading-normal md:pt-40 md:text-lg">
          <FileList files={chapter.files} />
        </div>
      </div>

      {chapter.checkerboard && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-12 h-10 bg-[conic-gradient(#ff2e88_25%,transparent_0_50%,#ff2e88_0_75%,transparent_0)] bg-size-[40px_40px] md:bottom-14 md:h-16 md:bg-size-[64px_64px]"
        />
      )}
    </section>
  );
}
