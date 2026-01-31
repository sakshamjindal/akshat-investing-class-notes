"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFrameUrl } from "@/lib/utils";

interface FrameLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoName: string;
  frameFiles: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function FrameLightbox({
  open,
  onOpenChange,
  videoName,
  frameFiles,
  currentIndex,
  onIndexChange,
}: FrameLightboxProps) {
  if (frameFiles.length === 0) return null;

  const prev = () => onIndexChange(currentIndex > 0 ? currentIndex - 1 : frameFiles.length - 1);
  const next = () => onIndexChange(currentIndex < frameFiles.length - 1 ? currentIndex + 1 : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
        <div className="relative flex items-center justify-center min-h-[60vh]">
          <Image
            src={getFrameUrl(videoName, frameFiles[currentIndex])}
            alt={`Frame ${currentIndex + 1}`}
            width={1920}
            height={1080}
            className="max-h-[80vh] w-auto object-contain"
          />
          {frameFiles.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 h-10 w-10"
                onClick={prev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 h-10 w-10"
                onClick={next}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        <div className="text-center py-2 text-white/60 text-sm">
          {currentIndex + 1} of {frameFiles.length}
        </div>
      </DialogContent>
    </Dialog>
  );
}
