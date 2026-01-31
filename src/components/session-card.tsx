import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers } from "lucide-react";
import { SessionData } from "@/lib/types";
import { formatDuration, getFrameUrl } from "@/lib/utils";

interface SessionCardProps {
  session: SessionData;
}

export function SessionCard({ session }: SessionCardProps) {
  const thumbnail = session.chunks[0]?.frame_files[0];
  const thumbnailUrl = thumbnail
    ? getFrameUrl(session.video_name, thumbnail)
    : null;

  return (
    <Link href={`/session/${session.video_name}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video bg-muted">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={session.title}
              fill
              loading="eager"
              priority
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No thumbnail
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg leading-tight mb-3 group-hover:text-primary transition-colors">
            {session.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(session.duration_seconds)}
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {session.chunks.length} chunks
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
