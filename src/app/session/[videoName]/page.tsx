import { notFound } from "next/navigation";
import { getSession, getTopicSession, getClassDocSession, getClassDoc, getAllVideoNames } from "@/lib/data";
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

  const topicSession = getTopicSession(videoName);
  const classDocSession = getClassDocSession(videoName);
  const classDoc = getClassDoc(videoName);

  return <SessionViewer session={session} topicSession={topicSession} classDocSession={classDocSession} classDoc={classDoc} />;
}
