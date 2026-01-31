import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  }
  return `${m}m`;
}

export function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function getFrameUrl(videoName: string, filename: string): string {
  return `/data/frames/${videoName}/${filename}`;
}

/**
 * Resolve `frame:filename.jpg` references in markdown to actual image URLs.
 * Converts `![Figure: desc](frame:filename.jpg)` → `![Figure: desc](/data/frames/videoName/filename.jpg)`
 */
export function resolveFrameRefs(markdown: string, videoName: string): string {
  return markdown.replace(
    /\(frame:([^)]+)\)/g,
    (_match, filename) => `(/data/frames/${videoName}/${filename})`
  );
}
