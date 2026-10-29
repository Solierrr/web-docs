import { IconCalendarEvent, IconCookie, IconFileText, IconShieldLock, type TablerIcon } from "@tabler/icons-react";
import type { DocumentBlock, DocumentContent } from "./document.d";

const slug = /^[a-z0-9-]+$/;
const safeHref = /^(https:\/\/|mailto:|\/(?!\/)|#)/;
const textBlocks = ["paragraph", "heading", "note", "link"];

const glyphs: Record<string, TablerIcon> = {
  privacy: IconShieldLock,
  terms: IconFileText,
  cookies: IconCookie,
  "google-calendar": IconCalendarEvent,
};

export function getDocumentGlyph(id: string): TablerIcon {
  return glyphs[id] ?? IconFileText;
}

function validateBlock(block: DocumentBlock) {
  if (!block || typeof block !== "object" || !("type" in block)) throw new Error("Bloco inválido");
  if (block.type === "divider") return;
  if (block.type === "list") {
    const validItems = Array.isArray(block.items) && block.items.every((item) => typeof item === "string");
    if (!validItems || (block.ordered !== undefined && typeof block.ordered !== "boolean")) throw new Error("Lista inválida");
    return;
  }
  if (!textBlocks.includes(block.type) || typeof block.text !== "string") throw new Error("Bloco inválido");
  if (block.type === "link" && (typeof block.href !== "string" || !safeHref.test(block.href))) throw new Error("Link inválido");
}

export function validateDocument(value: unknown): DocumentContent {
  if (!value || typeof value !== "object") throw new Error("Documento inválido");
  const content = value as DocumentContent;
  const validMetadata =
    slug.test(content.id) &&
    typeof content.title === "string" &&
    typeof content.description === "string" &&
    Array.isArray(content.sections) &&
    (content.version === null || typeof content.version === "string") &&
    (content.updatedAt === null || typeof content.updatedAt === "string");
  if (!validMetadata) throw new Error("Metadados inválidos");

  const ids = new Set<string>();
  for (const section of content.sections) {
    if (!slug.test(section.id) || ids.has(section.id) || typeof section.title !== "string" || !Array.isArray(section.blocks)) throw new Error("Seção inválida");
    ids.add(section.id);
    section.blocks.forEach(validateBlock);
  }
  return content;
}
