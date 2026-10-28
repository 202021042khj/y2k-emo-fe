export type Device = "desktop" | "mobile";

export type SceneKey = "open" | "phone" | "y2k" | "cd" | "emo" | "heart" | "credits";

export interface FrameSequence {
  /** Public folder holding 001.webp … NNN.webp */
  folder: string;
  count: number;
  poster: string;
  alt: string;
}

export interface Callout {
  text: string;
  /** Orbit progress (0–1) at which the callout appears */
  at: number;
  /** Desktop position as % of the 16:9 stage */
  left: string;
  top: string;
}

export interface OrbitObject {
  key: SceneKey;
  label: string;
  title: string;
  subtitle: string;
  frames: FrameSequence;
  callouts: readonly Callout[];
}

export interface FileEntry {
  name: string;
  description: string;
  year: string;
}

export interface Chapter {
  key: SceneKey;
  label: string;
  title: string;
  body: string;
  files: readonly FileEntry[];
  /** Show the emo checkerboard band */
  checkerboard?: boolean;
}

export type ObjectSlug = "phone" | "cd" | "heart";

export interface DetailShot {
  /** Public path of the macro still */
  image: string;
  alt: string;
  caption: string;
  note: string;
}

export interface ObjectDetail {
  slug: ObjectSlug;
  object: OrbitObject;
  /** Windows-style "properties" rows */
  properties: readonly { label: string; value: string }[];
  details: readonly [DetailShot, DetailShot];
  action: FrameSequence;
  actionSubtitle: string;
  next: ObjectSlug;
}

/** Shared props for the object detail Desktop/Mobile pages */
export interface ObjectDetailPageProps {
  detail: ObjectDetail;
  next: ObjectDetail;
}
