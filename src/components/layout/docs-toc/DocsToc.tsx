import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconListDetails } from "@tabler/icons-react";
import type { DocumentSection } from "@/features/document/document.d";
import { useActiveSection } from "./DocsToc.utils";

interface DocsTocProps {
  sections: DocumentSection[];
}

export default function DocsToc({ sections }: DocsTocProps) {
  const { t } = useTranslation("docs");
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const current = useActiveSection(ids);
  if (sections.length < 2) return null;

  return (
    <nav aria-label={t("toc.title")} className="sticky top-6 hidden w-60 shrink-0 self-start xl:block">
      <h2 className="mb-4 flex items-center gap-2 text-sidebar font-semi-bold leading-6 text-operational-ink">
        <IconListDetails size={18} stroke={1.75} aria-hidden="true" />
        {t("toc.title")}
      </h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={current === section.id ? "location" : undefined}
              className="block py-1 pl-6 text-sidebar leading-6 text-operational-muted transition-colors duration-150 hover:text-operational-ink aria-[current=location]:font-semi-bold aria-[current=location]:text-orange-copper motion-reduce:transition-none">
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
