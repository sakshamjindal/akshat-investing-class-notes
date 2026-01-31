"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SessionData } from "@/lib/types";
import { formatDuration, formatTimestamp } from "@/lib/utils";
import { ChunkTimeline } from "./chunk-timeline";
import { FrameCarousel } from "./frame-carousel";
import { FrameLightbox } from "./frame-lightbox";
import { NotesPanel } from "./notes-panel";
import { ChunkNav } from "./chunk-nav";

interface SessionViewerProps {
  session: SessionData;
  classDoc: string | null;
}

export function SessionViewer({ session, classDoc }: SessionViewerProps) {
  const [activeChunkIndex, setActiveChunkIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("notes");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxFrameIndex, setLightboxFrameIndex] = useState(0);

  const chunk = session.chunks[activeChunkIndex];

  const goToPrev = useCallback(() => {
    setActiveChunkIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveChunkIndex((i) => Math.min(session.chunks.length - 1, i + 1));
  }, [session.chunks.length]);

  const handleFrameClick = (index: number) => {
    setLightboxFrameIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sessions
            </Link>
            <div className="text-right">
              <h1 className="font-semibold text-lg">{session.title}</h1>
              <div className="flex items-center gap-2 justify-end text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(session.duration_seconds)}
                <Layers className="h-3.5 w-3.5 ml-2" />
                {session.chunks.length} chunks
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4">
        {/* Chunk Timeline */}
        <div className="mb-4">
          <ChunkTimeline
            chunks={session.chunks}
            activeIndex={activeChunkIndex}
            onSelect={setActiveChunkIndex}
          />
        </div>

        {/* Time range badge */}
        <div className="mb-4">
          <Badge variant="outline" className="text-sm">
            {formatTimestamp(chunk.start)} &ndash; {formatTimestamp(chunk.end)}
          </Badge>
        </div>

        {/* Main content: Frames + Notes */}
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          {/* Left: Frames */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FrameCarousel
              videoName={session.video_name}
              frameFiles={chunk.frame_files}
              onFrameClick={handleFrameClick}
            />
          </div>

          {/* Right: Notes */}
          <div className="min-h-[60vh]">
            <NotesPanel
              extraction={chunk.extraction}
              transcript={chunk.transcript}
              classDoc={classDoc}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-8">
          <ChunkNav
            activeIndex={activeChunkIndex}
            totalChunks={session.chunks.length}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        </div>
      </div>

      {/* Lightbox */}
      <FrameLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        videoName={session.video_name}
        frameFiles={chunk.frame_files}
        currentIndex={lightboxFrameIndex}
        onIndexChange={setLightboxFrameIndex}
      />
    </div>
  );
}
