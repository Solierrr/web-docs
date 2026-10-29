export type DocumentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "note"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "link"; text: string; href: string }
  | { type: "divider" };

export interface DocumentSection {
  id: string;
  title: string;
  blocks: DocumentBlock[];
}

export interface DocumentContent {
  id: string;
  title: string;
  description: string;
  version: string | null;
  updatedAt: string | null;
  sections: DocumentSection[];
}

export interface DocumentCategory {
  id: string;
  documents: string[];
}
