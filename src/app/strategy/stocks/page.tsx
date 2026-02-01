import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { StrategyDocViewer } from "@/components/strategy-doc-viewer";

function getDoc(): string | null {
  const filePath = path.join(process.cwd(), "public/data/output/stocks_strategy.md");
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export default function StocksStrategyPage() {
  const content = getDoc();

  if (!content) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center text-muted-foreground">
          Stocks strategy document not yet generated.
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
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Stocks Portfolio Strategy
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive stock-only portfolio strategy — building, maintaining, and managing an equity portfolio.
          </p>
        </div>

        <StrategyDocViewer content={content} gaps={null} />
      </div>
    </main>
  );
}
