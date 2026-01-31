"use client";

import { useState, useEffect } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOCEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TopicTOCProps {
  toc: TOCEntry[];
  variant?: "sidebar" | "mobile";
}

export function TopicTOC({ toc, variant = "sidebar" }: TopicTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("topic-", "");
          setActiveId(id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    toc.forEach((entry) => {
      const el = document.getElementById(`topic-${entry.topic_id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (topicId: string) => {
    const el = document.getElementById(`topic-${topicId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  if (variant === "mobile") {
    return (
      <div className="sticky top-[72px] z-10 bg-background/95 backdrop-blur border-b px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="gap-2 w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Topics
          </span>
          {mobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {mobileOpen && (
          <nav className="mt-2 pb-2 space-y-1">
            {toc.map((entry) => (
              <button
                key={entry.topic_id}
                onClick={() => handleClick(entry.topic_id)}
                className={cn(
                  "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                  activeId === entry.topic_id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {entry.title}
              </button>
            ))}
          </nav>
        )}
      </div>
    );
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Topics
      </h3>
      <ul className="space-y-1">
        {toc.map((entry) => (
          <li key={entry.topic_id}>
            <button
              onClick={() => handleClick(entry.topic_id)}
              className={cn(
                "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
                activeId === entry.topic_id
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {entry.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
