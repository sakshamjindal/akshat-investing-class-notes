"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotesPanelProps {
  extraction: string;
  transcript: string;
  classDoc: string | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NotesPanel({
  extraction,
  transcript,
  classDoc,
  activeTab,
  onTabChange,
}: NotesPanelProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="h-full flex flex-col">
      <TabsList className="w-full justify-start shrink-0">
        <TabsTrigger value="notes">Extracted Notes</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        {classDoc && <TabsTrigger value="doc">Full Class Doc</TabsTrigger>}
      </TabsList>

      <TabsContent value="notes" className="flex-1 overflow-y-auto mt-4">
        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{extraction}</ReactMarkdown>
        </div>
      </TabsContent>

      <TabsContent value="transcript" className="flex-1 overflow-y-auto mt-4">
        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {transcript}
        </div>
      </TabsContent>

      {classDoc && (
        <TabsContent value="doc" className="flex-1 overflow-y-auto mt-4">
          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-table:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{classDoc}</ReactMarkdown>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
