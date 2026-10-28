"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import ChromeTitle from "@/components/common/love/ChromeTitle";
import FrameScrubCanvas from "@/components/common/love/FrameScrubCanvas";
import { sceneId } from "@/constants/love";
import type { Callout, Device, OrbitObject } from "@/types/love";

interface OrbitSceneProps {
  device: Device;
  object: OrbitObject;
  /** Override the anchor id, when one page shows the same object twice */
  anchor?: string;
  /** Link to the object's detail page, shown under the title */
  detailHref?: string;
  detailLabel?: string;
  /** Extra overlay content, e.g. the heart's error dialog */
  children?: React.ReactNode;
}

/**
 * Pinned scrubbed scene: the frames advance with scroll through 250vh, and
 * callouts appear at set points. Used for the 360° orbits and the detail-page action shots.
 */
export default function OrbitScene({ device, object, anchor, detailHref, detailLabel, children }: OrbitSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const id = anchor ?? sceneId(device, object.key);
  const titleId = `${id}-title`;

  return (
    <section
      ref={ref}
      id={id}
      data-scene
      data-device={device}
      aria-labelledby={titleId}
      className="relative h-[250vh] snap-start"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-love-void">
        <FrameScrubCanvas
          sequence={object.frames}
          progress={scrollYProgress}
          fit={device === "mobile" ? 1.95 : "cover"}
        />

        <div className="absolute top-18 left-5 md:top-24 md:left-18">
          <p className="font-film text-sm font-bold tracking-[0.04em] text-love-pink">{object.label}</p>
          <ChromeTitle id={titleId} className="mt-1 max-w-60 text-[30px] leading-[1.05] md:max-w-none md:text-[64px] md:leading-none">
            {object.title}
          </ChromeTitle>
          {detailHref && (
            <Link
              href={detailHref}
              className="love-focus mt-3 inline-flex min-h-11 items-center gap-2 font-film text-sm font-bold tracking-[0.04em] text-love-cyan hover:text-love-paper md:mt-4"
            >
              {detailLabel} ▶
            </Link>
          )}
        </div>

        <ul className="absolute inset-x-5 bottom-34 flex flex-col gap-2 md:contents">
          {object.callouts.map((callout) => (
            <CalloutItem key={callout.text} callout={callout} progress={scrollYProgress} />
          ))}
        </ul>

        {children}

        <p className="absolute inset-x-5 bottom-18 text-center md:bottom-22">
          <span className="bg-love-void/72 px-3.5 py-1.5 font-film text-[17px] leading-[1.9] text-love-paper [box-decoration-break:clone] md:text-[28px]">
            {object.subtitle}
          </span>
        </p>
      </div>
      {/* Lets scroll snapping rest at the end of the orbit, too */}
      <div aria-hidden className="absolute bottom-0 h-px w-full snap-end" />
    </section>
  );
}

function CalloutItem({ callout, progress }: { callout: Callout; progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(progress, [callout.at, callout.at + 0.05], [0, 1]);

  return (
    <motion.li
      style={{ "--x": callout.left, "--y": callout.top, opacity: reduceMotion ? 1 : opacity } as CSSProperties}
      className="flex items-start gap-2.5 font-film text-[13px] text-love-paper md:absolute md:items-center md:text-sm md:top-(--y) md:left-(--x)"
    >
      <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full md:mt-0 bg-love-cyan shadow-[0_0_8px_#3df2ff]" />
      <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-love-cyan/80 md:mt-0 md:w-14" />
      <span className="bg-love-void/72 px-2 py-1 leading-snug">{callout.text}</span>
    </motion.li>
  );
}
