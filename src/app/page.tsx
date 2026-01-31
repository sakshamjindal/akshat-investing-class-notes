import { getAllSessions } from "@/lib/data";
import { SessionCard } from "@/components/session-card";
import { BookOpen } from "lucide-react";

export default function HomePage() {
  const sessions = getAllSessions();

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
