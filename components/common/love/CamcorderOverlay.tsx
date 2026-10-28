"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

import type { Device } from "@/types/love";

const pad = (n: number) => String(n).padStart(2, "0");

const toTimecode = (progress: number, totalFrames: number) => {
  const frame = Math.round(Math.min(1, Math.max(0, progress)) * totalFrames);
  const ff = frame % 24;
  const totalSeconds = Math.floor(frame / 24);
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(ff)}`;
};

/**
 * Letterbox bars with rec dot, scene counter, timecode and scrub bar.
 * Purely decorative: the scenes themselves carry the headings.
 */
interface CamcorderOverlayProps {
  device: Device;
  /** Number of scenes on this page */
  scenes: number;
  /** Running time at the end of the page, in frames at 24 fps */
  totalFrames: number;
  /** Center label; omit when the page renders its own link there */
  label?: string;
}

export default function CamcorderOverlay({ device, scenes, totalFrames, label }: CamcorderOverlayProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const progressWidth = useTransform(scrollYProgress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [scene, setScene] = useState(1);
  const lastFrame = useRef("");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const tc = toTimecode(v, totalFrames);
    if (tc !== lastFrame.current) {
      lastFrame.current = tc;
      setTimecode(tc);
    }
  });

  // Current scene = the last scene whose top has passed the middle of the screen
  useMotionValueEvent(scrollY, "change", () => {
    const nodes = document.querySelectorAll<HTMLElement>(`[data-scene][data-device="${device}"]`);
    let current = 1;
    nodes.forEach((node, i) => {
      if (node.getBoundingClientRect().top <= window.innerHeight / 2) current = i + 1;
    });
    setScene(current);
  });

  const total = pad(scenes);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 font-film text-sm font-bold tracking-[0.04em] text-love-paper">
      <div className="absolute inset-x-0 top-0 flex h-12 items-center bg-love-void px-4 md:h-14 md:px-10">
        <span className="flex items-center gap-2">
          <span className="love-blink size-2.5 rounded-full bg-love-pink shadow-[0_0_16px_#ff2e88]" />
          rec
        </span>
        <span className="hidden flex-1 text-center text-love-chrome md:block">{label}</span>
        <span className="ml-auto md:ml-0">
          {device === "desktop" ? "scene " : ""}
          {pad(scene)}/{total}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-12 items-center gap-3 bg-love-void px-4 md:h-14 md:gap-6 md:px-10">
        <span className="tabular-nums">{timecode}</span>
        <span className="relative h-1 flex-1 overflow-hidden rounded-xs bg-love-paper/20">
          <motion.span style={{ width: progressWidth }} className="absolute inset-y-0 left-0 rounded-xs bg-love-pink" />
        </span>
        <span className="hidden md:inline">1x ▶</span>
      </div>
    </div>
  );
}
