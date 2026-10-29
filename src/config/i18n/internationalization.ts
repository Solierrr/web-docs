import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { uiTranslations } from "@solaria.network/web-lib";
import { DEFAULT, SUPPORTED, detectLanguage } from "./languages";

function namespacesFromGlob(modules: Record<string, unknown>) {
  const namespaces: Record<string, object> = {};
  for (const [path, content] of Object.entries(modules)) {
    const name = path.match(/([^/]+)\.json$/)?.[1];
    if (name) namespaces[name] = content as object;
  }
  return namespaces;
}

const ptBR = import.meta.glob("./locales/pt-BR/*.json", { eager: true, import: "default" });
const enUS = import.meta.glob("./locales/en-US/*.json", { eager: true, import: "default" });
const esES = import.meta.glob("./locales/es-ES/*.json", { eager: true, import: "default" });

const local: Record<string, object> = {
  "pt-BR": namespacesFromGlob(ptBR),
  "en-US": namespacesFromGlob(enUS),
  "es-ES": namespacesFromGlob(esES),
};
const library = uiTranslations as Record<string, object>;

i18n.use(initReactI18next).init({
  resources: Object.fromEntries(SUPPORTED.map((language) => [language, { ...library[language], ...local[language] }])),
  lng: detectLanguage(),
  fallbackLng: DEFAULT,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
