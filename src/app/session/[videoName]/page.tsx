import { notFound } from "next/navigation";
import { getSession, getClassDoc, getAllVideoNames } from "@/lib/data";
import { SessionViewer } from "@/components/session-viewer";

export function generateStaticParams() {
  return getAllVideoNames().map((videoName) => ({ videoName }));
}

interface PageProps {
  params: Promise<{ videoName: string }>;
}

export default async function SessionPage({ params }: PageProps) {
  const { videoName } = await params;
  const session = getSession(videoName);

  if (!session) {
    notFound();
  }

  const classDoc = getClassDoc(videoName);

  return <SessionViewer session={session} classDoc={classDoc} />;
}
