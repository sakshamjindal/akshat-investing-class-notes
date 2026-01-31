"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { getFrameUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface FrameCarouselProps {
  videoName: string;
  frameFiles: string[];
  onFrameClick: (index: number) => void;
}

export function FrameCarousel({ videoName, frameFiles, onFrameClick }: FrameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (frameFiles.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        No frames available
      </div>
    );
  }

  const prev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : frameFiles.length - 1));
  const next = () => setCurrentIndex((i) => (i < frameFiles.length - 1 ? i + 1 : 0));

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-muted group"
        onClick={() => onFrameClick(currentIndex)}
      >
        <Image
          src={getFrameUrl(videoName, frameFiles[currentIndex])}
          alt={`Frame ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {frameFiles.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {frameFiles.length}
        </span>
        <div className="flex gap-1.5">
          {frameFiles.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
