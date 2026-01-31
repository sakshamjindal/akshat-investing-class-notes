"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TopicSection as TopicSectionType } from "@/lib/types";
import { resolveFrameRefs, getFrameUrl } from "@/lib/utils";
import { FrameLightbox } from "./frame-lightbox";

interface TopicSectionProps {
  section: TopicSectionType;
  videoName: string;
}

export function TopicSectionComponent({ section, videoName }: TopicSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const resolvedContent = resolveFrameRefs(section.content, videoName);

  const openLightbox = useCallback((filename: string) => {
    const idx = section.frame_files.indexOf(filename);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  }, [section.frame_files]);

  return (
    <section id={`topic-${section.topic_id}`} className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight mb-6">{section.title}</h2>

      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children, node }) => {
              const hasImage = node?.children?.some(
                (child) => child.type === "element" && child.tagName === "img"
              );
              if (hasImage) {
                return <div className="p-wrap">{children}</div>;
              }
              return <p>{children}</p>;
            },
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") return null;
              const filename = src.split("/").pop() || "";
              const altText = alt || "";
              const isFigure = altText.startsWith("Figure:");
              const caption = isFigure ? altText.replace("Figure:", "").trim() : altText;

              return (
                <figure className="my-6 not-prose">
                  <button
                    onClick={() => openLightbox(filename)}
                    className="group relative w-full max-w-2xl overflow-hidden rounded-lg border bg-muted transition-all hover:shadow-lg hover:border-primary/50"
                  >
                    <Image
                      src={src}
                      alt={caption}
                      width={960}
                      height={540}
                      className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </button>
                  {caption && (
                    <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              );
            },
          }}
        >
          {resolvedContent}
        </ReactMarkdown>
      </div>

      {/* Transcript toggle placeholder — topics don't have per-section transcript,
          but we keep the pattern for future use */}

      <FrameLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        videoName={videoName}
        frameFiles={section.frame_files}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
