import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GroupAction, SurfaceGroup } from "@solaria.network/web-lib";
import { documentOrder, useDocuments } from "@/config/content/content";
import { getDocumentGlyph } from "@/features/document/document.utils";

interface DocsSidebarProps {
  home: boolean;
  open: boolean;
  close: () => void;
}

export default function DocsSidebar({ home, open, close }: DocsSidebarProps) {
  const { pathname } = useLocation();
  const { t } = useTranslation("docs");
  const documents = useDocuments();
  const current = pathname.replace(/\/$/, "");
  const visibility = open ? "block" : home ? "hidden" : "hidden md:block";

  return (
    <aside id="docs-navigation" className={`${visibility} w-full md:sticky md:top-6 md:w-docs-sidebar md:shrink-0 md:self-start`}>
      <nav aria-label={t("sidebar.navigation")}>
        <SurfaceGroup className="w-full" contentClassName="max-h-dvh overflow-y-auto scrollbar-none">
          {documentOrder.map((id) => {
            const Glyph = getDocumentGlyph(id);
            return (
              <GroupAction
                key={id}
                to={`/documentos/${id}`}
                active={current === `/documentos/${id}`}
                label={documents[id].title}
                content={documents[id].title}
                glyph={<Glyph size={20} stroke={1.75} aria-hidden="true" />}
                onClick={close}
              />
            );
          })}
        </SurfaceGroup>
      </nav>
    </aside>
  );
}
