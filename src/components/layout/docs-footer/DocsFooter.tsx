import { useTranslation } from "react-i18next";
import { GroupAction, SurfaceGroup } from "@solaria.network/web-lib";
import footer from "@/content/footer.json";
import type { FooterLink } from "./DocsFooter.d";
import { footerGlyphs } from "./DocsFooter.utils";

const links = footer.links as FooterLink[];

export default function DocsFooter() {
  const { t } = useTranslation("docs");

  return (
    <footer className="mt-auto flex justify-center pt-8 pb-4">
      <nav aria-label={t("footer.navigation")}>
        <SurfaceGroup direction="horizontal">
          {links.map((link) => {
            const Glyph = footerGlyphs[link.icon];
            return (
              <GroupAction
                key={link.id}
                layout="icon"
                to={link.href}
                label={t(`footer.${link.id}`)}
                glyph={<Glyph size={20} />}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              />
            );
          })}
        </SurfaceGroup>
      </nav>
    </footer>
  );
}
