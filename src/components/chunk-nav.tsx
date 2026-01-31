"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChunkNavProps {
  activeIndex: number;
  totalChunks: number;
  onPrev: () => void;
  onNext: () => void;
}

export function ChunkNav({ activeIndex, totalChunks, onPrev, onNext }: ChunkNavProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  return (
    <div className="flex items-center justify-between border-t pt-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={activeIndex === 0}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous Chunk
      </Button>
      <span className="text-sm text-muted-foreground">
        Chunk {activeIndex + 1} of {totalChunks}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={activeIndex === totalChunks - 1}
        className="gap-2"
      >
        Next Chunk
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
