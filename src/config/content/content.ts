import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import manifest from "@/content/manifest.json";
import { DEFAULT } from "@/config/i18n/languages";
import type { DocumentCategory, DocumentContent } from "@/features/document/document.d";
import { validateDocument } from "@/features/document/document.utils";

const files = import.meta.glob("/src/content/*/*.json", { eager: true, import: "default" });

const byLanguage: Record<string, Record<string, DocumentContent>> = {};
for (const [path, value] of Object.entries(files)) {
  const language = path.match(/([^/]+)\.json$/)?.[1];
  if (!language) continue;
  const content = validateDocument(value);
  byLanguage[language] = { ...byLanguage[language], [content.id]: content };
}

export const categories: DocumentCategory[] = manifest.categories;

export const documentOrder: string[] = categories.flatMap((category) => category.documents);

export function getDocuments(language: string): Record<string, DocumentContent> {
  const fallback = byLanguage[DEFAULT];
  const translated = byLanguage[language] ?? {};
  return Object.fromEntries(documentOrder.map((id) => [id, translated[id] ?? fallback[id]]));
}

export function useDocuments(): Record<string, DocumentContent> {
  const { i18n } = useTranslation();
  return useMemo(() => getDocuments(i18n.language), [i18n.language]);
}
