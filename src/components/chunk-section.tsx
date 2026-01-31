"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SessionChunk } from "@/lib/types";
import { formatTimestamp, getFrameUrl } from "@/lib/utils";
import { FrameLightbox } from "./frame-lightbox";

interface ChunkSectionProps {
  chunk: SessionChunk;
  videoName: string;
  index: number;
}

export function ChunkSection({ chunk, videoName, index }: ChunkSectionProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (frameIndex: number) => {
    setLightboxIndex(frameIndex);
    setLightboxOpen(true);
  };

  return (
    <section id={`chunk-${index}`} className="scroll-mt-20">
      {/* Chunk header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          {index + 1}
        </div>
        <div>
          <h2 className="font-semibold text-lg">Chunk {index + 1}</h2>
          <Badge variant="outline" className="text-xs">
            {formatTimestamp(chunk.start)} &ndash; {formatTimestamp(chunk.end)}
          </Badge>
        </div>
      </div>

      {/* Frames grid */}
      {chunk.frame_files.length > 0 && (
        <div className="mb-6">
          <div className={`grid gap-3 ${
            chunk.frame_files.length === 1
              ? "grid-cols-1 max-w-2xl"
              : chunk.frame_files.length === 2
              ? "grid-cols-2"
              : "grid-cols-2 lg:grid-cols-3"
          }`}>
            {chunk.frame_files.map((file, i) => (
              <button
                key={file}
                onClick={() => openLightbox(i)}
                className="group relative aspect-video overflow-hidden rounded-lg border bg-muted transition-all hover:shadow-md hover:border-primary/50"
              >
                <Image
                  src={getFrameUrl(videoName, file)}
                  alt={`Frame ${i + 1} of chunk ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white font-medium">
                  {i + 1}/{chunk.frame_files.length}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extracted notes */}
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm prose-h1:text-xl prose-h2:text-lg prose-h3:text-base">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{chunk.extraction}</ReactMarkdown>
      </div>

      {/* Transcript toggle */}
      <div className="mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTranscript(!showTranscript)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showTranscript ? "Hide Transcript" : "Show Transcript"}
        </Button>
        {showTranscript && (
          <div className="mt-3 rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap max-h-96 overflow-y-auto">
            {chunk.transcript}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <FrameLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        videoName={videoName}
        frameFiles={chunk.frame_files}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
