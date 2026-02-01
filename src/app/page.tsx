import fs from "fs";
import path from "path";
import Link from "next/link";
import { getAllSessions } from "@/lib/data";
import { SessionCard } from "@/components/session-card";
import { BookOpen, FileText, TrendingUp, Shield } from "lucide-react";

export default function HomePage() {
  const sessions = getAllSessions();
  const outputDir = path.join(process.cwd(), "public/data/output");
  const hasStrategyDoc = fs.existsSync(path.join(outputDir, "strategy_doc.md"));
  const hasStocksDoc = fs.existsSync(path.join(outputDir, "stocks_strategy.md"));
  const hasStocksOptionsDoc = fs.existsSync(path.join(outputDir, "stocks_options_strategy.md"));

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Class Notes</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Browse session recordings with extracted notes, frames, and transcripts.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {hasStrategyDoc && (
              <Link
                href="/strategy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <FileText className="h-4 w-4" />
                Full Strategy Document
              </Link>
            )}
            {hasStocksDoc && (
              <Link
                href="/strategy/stocks"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                Stocks Portfolio Strategy
              </Link>
            )}
            {hasStocksOptionsDoc && (
              <Link
                href="/strategy/stocks-options"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm font-medium"
              >
                <Shield className="h-4 w-4" />
                Stocks + Options Strategy
              </Link>
            )}
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No sessions found. Add session JSON files to public/data/sessions/.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard key={session.video_name} session={session} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
