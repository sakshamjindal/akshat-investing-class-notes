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
