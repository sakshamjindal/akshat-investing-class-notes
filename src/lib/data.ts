import fs from "fs";
import path from "path";
import { SessionData, TopicSessionData } from "./types";

const sessionsDir = path.join(process.cwd(), "public/data/sessions");

export function getAllSessions(): SessionData[] {
  const files = fs.readdirSync(sessionsDir).filter((f) => f.endsWith("_session.json") && !f.endsWith("_topic_session.json") && !f.endsWith("_class_doc_session.json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(sessionsDir, file), "utf-8");
    return JSON.parse(content) as SessionData;
  });
}

export function getSession(videoName: string): SessionData | null {
  const filePath = path.join(sessionsDir, `${videoName}_session.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as SessionData;
}

export function getTopicSession(videoName: string): TopicSessionData | null {
  const filePath = path.join(sessionsDir, `${videoName}_topic_session.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as TopicSessionData;
}

export function getClassDocSession(videoName: string): TopicSessionData | null {
  const filePath = path.join(sessionsDir, `${videoName}_class_doc_session.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as TopicSessionData;
}

export function getAllVideoNames(): string[] {
  const files = fs.readdirSync(sessionsDir).filter((f) => f.endsWith("_session.json") && !f.endsWith("_topic_session.json") && !f.endsWith("_class_doc_session.json"));
  return files.map((f) => f.replace("_session.json", ""));
}
