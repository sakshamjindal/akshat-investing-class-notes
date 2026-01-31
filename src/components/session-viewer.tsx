"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Layers, BookOpen, FileText } from "lucide-react";
import { SessionData, TopicSessionData } from "@/lib/types";
import { formatDuration, formatTimestamp } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChunkSection } from "./chunk-section";
import { TopicSectionComponent } from "./topic-section";
import { TopicTOC } from "./topic-toc";

type ActiveTab = "study" | "document";

interface SessionViewerProps {
  session: SessionData;
  topicSession: TopicSessionData | null;
  classDocSession: TopicSessionData | null;
  classDoc: string | null;
}

export function SessionViewer({ session, topicSession, classDocSession }: SessionViewerProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("study");

  const isTopicMode = topicSession !== null && topicSession.sections.length > 0;
  const hasClassDoc = classDocSession !== null && classDocSession.sections.length > 0;
  const showTabs = isTopicMode && hasClassDoc;

  const activeSession = activeTab === "document" && hasClassDoc ? classDocSession : topicSession;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="text-center flex-1 mx-4">
              <h1 className="font-semibold text-lg truncate">
                {isTopicMode ? topicSession.title : session.title}
              </h1>
              <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(isTopicMode ? topicSession.duration_seconds : session.duration_seconds)}
                <span className="text-border">|</span>
                {isTopicMode ? (
                  <>
                    <BookOpen className="h-3.5 w-3.5" />
                    {topicSession.sections.length} topics
                  </>
                ) : (
                  <>
                    <Layers className="h-3.5 w-3.5" />
                    {session.chunks.length} chunks
                  </>
                )}
              </div>
            </div>
            {/* Spacer to balance the back button */}
            <div className="w-[52px] shrink-0" />
          </div>

          {/* Tab switcher — only shown when both views are available */}
          {showTabs && (
            <div className="flex gap-1 mt-3 justify-center">
              <button
                onClick={() => setActiveTab("study")}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                  activeTab === "study"
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Study Notes
              </button>
              <button
                onClick={() => setActiveTab("document")}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                  activeTab === "document"
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <FileText className="h-3.5 w-3.5" />
                Class Document
              </button>
            </div>
          )}

          {/* Legacy chunk nav pills — only shown in chunk mode */}
          {!isTopicMode && (
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
          )}
        </div>
      </header>

      {/* Topic mode: sidebar TOC + topic sections */}
      {isTopicMode && activeSession ? (
        <>
          {/* Mobile TOC — rendered outside the grid */}
          <div className="lg:hidden">
            <TopicTOC toc={activeSession.toc} variant="mobile" />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
              {/* Desktop TOC sidebar */}
              <aside className="hidden lg:block">
                <TopicTOC toc={activeSession.toc} />
              </aside>

              {/* Topic sections */}
              <main>
                <div className="space-y-16">
                  {activeSession.sections.map((section, i) => (
                    <div key={section.topic_id}>
                      <TopicSectionComponent
                        section={section}
                        videoName={activeSession.video_name}
                      />
                      {i < activeSession.sections.length - 1 && (
                        <hr className="mt-16 border-border" />
                      )}
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </>
      ) : (
        /* Legacy chunk mode */
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
      )}
    </div>
  );
}
