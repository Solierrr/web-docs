import { useParams } from "react-router-dom";
import { Surface } from "@solaria.network/web-lib";
import { useDocuments } from "@/config/content/content";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import DocsToc from "@@/layout/docs-toc/DocsToc";
import { DocumentSection } from "./DocumentPage.reusable";

export default function DocumentPage() {
  const { id = "" } = useParams();
  const documents = useDocuments();
  const content = documents[id];
  if (!content) return <NotFoundPage />;

  return (
    <Surface className="min-w-0 flex-1" contentClassName="overflow-clip!">
      <div className="mx-auto flex w-full justify-center gap-12 px-6 py-12 lg:px-12">
        <article className="min-w-0 max-w-operational-copy flex-1">
          <h1 className="sr-only">{content.title}</h1>
          {content.sections.map((section) => (
            <DocumentSection key={section.id} section={section} />
          ))}
        </article>
        <DocsToc sections={content.sections} />
      </div>
    </Surface>
  );
}
