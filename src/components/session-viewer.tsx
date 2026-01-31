"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Layers, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SessionData } from "@/lib/types";
import { formatDuration, formatTimestamp } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChunkSection } from "./chunk-section";

interface SessionViewerProps {
  session: SessionData;
  classDoc: string | null;
}

export function SessionViewer({ session, classDoc }: SessionViewerProps) {
  const [classDocOpen, setClassDocOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="text-center flex-1 mx-4">
              <h1 className="font-semibold text-lg truncate">{session.title}</h1>
              <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(session.duration_seconds)}
                <span className="text-border">|</span>
                <Layers className="h-3.5 w-3.5" />
                {session.chunks.length} chunks
              </div>
            </div>
            {classDoc && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClassDocOpen(true)}
                className="gap-1.5 shrink-0"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Full Doc</span>
              </Button>
            )}
          </div>

          {/* Chunk nav pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
            {session.chunks.map((chunk, i) => (
              <a
                key={i}
                href={`#chunk-${i}`}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {formatTimestamp(chunk.start)}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* All chunks rendered as a scrollable document */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-12">
          {session.chunks.map((chunk, i) => (
            <div key={i}>
              <ChunkSection
                chunk={chunk}
                videoName={session.video_name}
                index={i}
              />
              {i < session.chunks.length - 1 && (
                <hr className="mt-12 border-border" />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Full Class Doc dialog */}
      {classDoc && (
        <Dialog open={classDocOpen} onOpenChange={setClassDocOpen}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Full Class Document</DialogTitle>
            </DialogHeader>
            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{classDoc}</ReactMarkdown>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
