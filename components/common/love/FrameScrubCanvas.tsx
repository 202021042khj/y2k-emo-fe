"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import type { FrameSequence } from "@/types/love";
import { cn } from "@/lib/utils";

interface FrameScrubCanvasProps {
  sequence: FrameSequence;
  /** 0–1 scroll progress through the pinned range */
  progress: MotionValue<number>;
  /**
   * "cover" fills the stage. A number draws the frame that many times the
   * stage width, centered — used on phones so a 16:9 orbit isn't cropped to nothing.
   */
  fit?: "cover" | number;
  className?: string;
}

const frameUrl = (folder: string, index: number) => `${folder}/${String(index + 1).padStart(3, "0")}.webp`;

/**
 * Draws one frame of an image sequence per scroll position.
 *
 * - Frames load only once the canvas is near the viewport *and* rendered:
 *   the Desktop and Mobile trees both mount, so the hidden copy never downloads.
 * - The poster sits underneath and is all that shows with reduced motion.
 */
export default function FrameScrubCanvas({ sequence, progress, fit = "cover", className }: FrameScrubCanvasProps) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentRef = useRef(0);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames = framesRef.current;
    let img: HTMLImageElement | null = null;
    for (let offset = 0; offset < frames.length && !img; offset++) {
      img = frames[index - offset] ?? frames[index + offset] ?? null;
    }
    if (!img) return;

    const scale =
      fit === "cover"
        ? Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
        : (canvas.width * fit) / img.naturalWidth;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  };

  useMotionValueEvent(progress, "change", (value) => {
    const index = Math.round(Math.min(1, Math.max(0, value)) * (sequence.count - 1));
    if (index === currentRef.current) return;
    currentRef.current = index;
    draw(index);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    let cancelled = false;
    const frames: (HTMLImageElement | null)[] = new Array(sequence.count).fill(null);
    framesRef.current = frames;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(currentRef.current);
    };

    const load = async () => {
      // Every 4th frame first so scrubbing works early, then fill the gaps
      const all = Array.from({ length: sequence.count }, (_, i) => i);
      const order = [...all.filter((i) => i % 4 === 0), ...all.filter((i) => i % 4 !== 0)];
      for (let i = 0; i < order.length && !cancelled; i += 8) {
        await Promise.all(
          order.slice(i, i + 8).map(
            (index) =>
              new Promise<void>((resolve) => {
                const img = new window.Image();
                img.decoding = "async";
                img.onload = () => {
                  frames[index] = img;
                  if (index === 0 || index === currentRef.current) draw(currentRef.current);
                  resolve();
                };
                img.onerror = () => resolve();
                img.src = frameUrl(sequence.folder, index);
              }),
          ),
        );
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // display:none elements never intersect, so the hidden device tree stays idle
    const intersection = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          intersection.disconnect();
          void load();
        }
      },
      { rootMargin: "100% 0px" },
    );
    intersection.observe(canvas);

    return () => {
      cancelled = true;
      intersection.disconnect();
      resizeObserver.disconnect();
    };
    // draw only reads refs and the fixed `fit` prop; depending on it would reload every frame each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, reduceMotion]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={sequence.poster}
        alt={sequence.alt}
        fill
        sizes="100vw"
        className={fit === "cover" ? "object-cover" : "object-contain scale-[1.95]"}
      />
      {!reduceMotion && <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full bg-love-void" />}
    </div>
  );
}
