import { useTranslation } from "react-i18next";
import { Canvas, GroupAction, OrganicLogo, SurfaceGroup } from "@solaria.network/web-lib";
import { categories, useDocuments } from "@/config/content/content";
import { getDocumentGlyph } from "@/features/document/document.utils";

export default function HomePage() {
  const { t } = useTranslation("docs");
  const documents = useDocuments();

  return (
    <main className="flex-1">
      <section aria-labelledby="home-title" className="relative isolate flex min-h-80 items-center justify-between gap-8 overflow-hidden rounded-surface bg-orange p-8 md:p-16">
        <Canvas variant="grid" backgroundColor="var(--color-white)" style={{ filter: "grayscale(1) invert(1) brightness(5)", mixBlendMode: "screen", maskImage: "none" }} />
        <div className="relative max-w-136">
          <h1 id="home-title" className="mb-4 text-title font-extra-bold leading-tight tracking-tight text-operational-ink md:text-display">
            {t("home.title")}
          </h1>
          <p className="text-label font-semi-bold leading-8 text-operational-ink">{t("home.description")}</p>
        </div>
        <div aria-hidden="true" className="pointer-events-none relative hidden flex-none rounded-surface bg-white p-8 md:block">
          <OrganicLogo paused width={6} decorative />
        </div>
      </section>
      <section aria-label={t("home.documents")} className="grid grid-cols-1 gap-x-8 gap-y-10 pt-10 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="min-w-0">
            <h2 className="mb-2 px-4 text-sidebar font-extra-bold leading-6 text-operational-muted">{t(`categories.${category.id}`)}</h2>
            <SurfaceGroup>
              {category.documents.map((id) => {
                const Glyph = getDocumentGlyph(id);
                return (
                  <GroupAction
                    key={id}
                    to={`/documentos/${id}`}
                    label={documents[id].title}
                    content={documents[id].title}
                    detail={documents[id].description}
                    glyph={<Glyph size={20} stroke={1.75} aria-hidden="true" />}
                  />
                );
              })}
            </SurfaceGroup>
          </article>
        ))}
      </section>
    </main>
  );
}
