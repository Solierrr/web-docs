import { Hyperlink } from "@solaria.network/web-lib";
import type { DocumentBlock, DocumentSection as SectionContent } from "@/features/document/document.d";

function DocumentBlockView({ block }: { block: DocumentBlock }) {
  switch (block.type) {
    case "heading":
      return <h3 className="mt-8 mb-4 text-operational-ink">{block.text}</h3>;
    case "paragraph":
    case "note":
      return <p className="mb-4 text-copy">{block.text}</p>;
    case "link":
      return (
        <div className="mb-4">
          <Hyperlink content={block.text} url={block.href} />
        </div>
      );
    case "divider":
      return <div role="separator" className="my-8" />;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={`mb-4 flex flex-col gap-2 pl-6 text-copy marker:text-orange ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, index) => (
            <li key={index} className="pl-2">
              {item}
            </li>
          ))}
        </List>
      );
    }
  }
}

export function DocumentSection({ section }: { section: SectionContent }) {
  return (
    <section id={section.id} className="mt-12 scroll-mt-6 first-of-type:mt-0">
      <h2 className="mb-4 text-operational-ink">
        <a href={`#${section.id}`} className="transition-colors duration-150 hover:text-orange-copper motion-reduce:transition-none">
          {section.title}
        </a>
      </h2>
      {section.blocks.map((block, index) => (
        <DocumentBlockView key={index} block={block} />
      ))}
    </section>
  );
}
