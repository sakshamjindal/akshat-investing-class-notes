"use client";

import { SessionChunk } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ChunkTimelineProps {
  chunks: SessionChunk[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ChunkTimeline({ chunks, activeIndex, onSelect }: ChunkTimelineProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {chunks.map((chunk, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            i === activeIndex
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {formatTimestamp(chunk.start)}
        </button>
      ))}
    </div>
  );
}
