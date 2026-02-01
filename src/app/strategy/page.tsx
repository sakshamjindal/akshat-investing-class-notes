import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { StrategyDocViewer } from "@/components/strategy-doc-viewer";

function getStrategyDoc(): string | null {
  const filePath = path.join(process.cwd(), "public/data/output/strategy_doc.md");
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

function getTemplate(): Record<string, unknown> | null {
  const filePath = path.join(process.cwd(), "public/data/output/template.json");
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getGaps(): Record<string, unknown> | null {
  const filePath = path.join(process.cwd(), "public/data/output/gaps.json");
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export default function StrategyPage() {
  const content = getStrategyDoc();
  const template = getTemplate();
  const gaps = getGaps();

  if (!content) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center text-muted-foreground">
          Strategy document not yet generated. Run the full pipeline first.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sessions
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Strategy Document
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive hedge fund strategy reference synthesized from all 19 class sessions.
          </p>
        </div>

        <StrategyDocViewer
          content={content}
          gaps={gaps as { coverage_summary?: string; gaps?: Array<{ section: string; description: string; severity: string; suggestion: string }> } | null}
        />
      </div>
    </main>
  );
}
