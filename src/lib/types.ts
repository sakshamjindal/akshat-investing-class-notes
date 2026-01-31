export interface SessionChunk {
  chunk_index: number;
  start: number;
  end: number;
  transcript: string;
  frame_files: string[];
  extraction: string;
}

export interface SessionData {
  video_name: string;
  title: string;
  duration_seconds: number;
  chunks: SessionChunk[];
  assembled_doc_filename?: string;
}

export interface TopicSection {
  topic_id: string;
  title: string;
  content: string;
  frame_files: string[];
  subsections: TopicSection[];
}

export interface TOCEntry {
  topic_id: string;
  title: string;
  level: number;
  children: TOCEntry[];
}

export interface TopicSessionData {
  video_name: string;
  title: string;
  duration_seconds: number;
  toc: TOCEntry[];
  sections: TopicSection[];
  assembled_doc_filename?: string;
}
