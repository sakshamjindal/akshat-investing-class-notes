"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GapItem {
  section: string;
  description: string;
  severity: string;
  suggestion: string;
}

interface GapsData {
  coverage_summary?: string;
  gaps?: GapItem[];
}

interface StrategyDocViewerProps {
  content: string;
  gaps: GapsData | null;
}

export function StrategyDocViewer({ content, gaps }: StrategyDocViewerProps) {
  const [showGaps, setShowGaps] = useState(false);

  const severityColor: Record<string, string> = {
    high: "destructive",
    medium: "default",
    low: "secondary",
  };

  return (
    <div className="space-y-6">
      {gaps && gaps.gaps && gaps.gaps.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Gap Analysis
                <Badge variant="secondary">{gaps.gaps.length} gaps</Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGaps(!showGaps)}
              >
                {showGaps ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            {gaps.coverage_summary && (
              <p className="text-sm text-muted-foreground">
                {gaps.coverage_summary}
              </p>
            )}
          </CardHeader>
          {showGaps && (
            <CardContent className="pt-0">
              <div className="space-y-3">
                {gaps.gaps.map((gap, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-3 text-sm space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          (severityColor[gap.severity] as "destructive" | "default" | "secondary") ||
                          "secondary"
                        }
                      >
                        {gap.severity}
                      </Badge>
                      <span className="font-medium">{gap.section}</span>
                    </div>
                    <p className="text-muted-foreground">{gap.description}</p>
                    {gap.suggestion && (
                      <p className="text-xs text-muted-foreground italic">
                        Suggestion: {gap.suggestion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm prose-h1:text-2xl prose-h1:border-b prose-h1:pb-2 prose-h2:text-xl prose-h2:mt-10 prose-h3:text-lg prose-h3:mt-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
