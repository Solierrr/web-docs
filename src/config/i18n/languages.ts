import SupportedLanguages from "./supported.enum";

export const SUPPORTED = Object.values(SupportedLanguages);
export const DEFAULT: SupportedLanguages = SupportedLanguages.PTBR;

const languageCookieName = "solaria_language";

export function isSupportedLanguage(value: string | undefined): value is SupportedLanguages {
  return !!value && (SUPPORTED as string[]).includes(value);
}

export function normalizeLanguage(value: string | undefined): SupportedLanguages | undefined {
  const lower = value?.toLowerCase();
  return SUPPORTED.find((language) => language.toLowerCase() === lower) ?? SUPPORTED.find((language) => language.split("-")[0] === lower?.split("-")[0]);
}

function cookieLanguage(): SupportedLanguages | undefined {
  const value = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${languageCookieName}=`))
    ?.slice(languageCookieName.length + 1);
  return SUPPORTED.find((language) => language === value);
}

export function detectLanguage(): SupportedLanguages {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferred = browserLanguages.map(normalizeLanguage).find(Boolean);
  return cookieLanguage() ?? preferred ?? DEFAULT;
}

export function rememberLanguage(language: SupportedLanguages) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${languageCookieName}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}
