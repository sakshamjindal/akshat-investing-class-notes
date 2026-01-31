import fs from "fs";
import path from "path";
import { SessionData } from "./types";

const sessionsDir = path.join(process.cwd(), "public/data/sessions");
const docsDir = path.join(process.cwd(), "public/data/docs");

export function getAllSessions(): SessionData[] {
  const files = fs.readdirSync(sessionsDir).filter((f) => f.endsWith("_session.json"));
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

export function getClassDoc(videoName: string): string | null {
  const filePath = path.join(docsDir, `${videoName}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getAllVideoNames(): string[] {
  const files = fs.readdirSync(sessionsDir).filter((f) => f.endsWith("_session.json"));
  return files.map((f) => f.replace("_session.json", ""));
}
