import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, MenuItem, MenuList } from "@solaria.network/web-lib";
import { SUPPORTED, isSupportedLanguage, rememberLanguage } from "@/config/i18n/languages";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation("docs");
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = container.current;
    root?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
    function outside(event: PointerEvent) {
      if (!root?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function select(language: string) {
    if (isSupportedLanguage(language)) {
      void i18n.changeLanguage(language);
      rememberLanguage(language);
    }
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-label={t("header.language")}
        title={t("header.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="docs-languages"
        className="flex h-9 cursor-pointer items-center-safe gap-1 rounded-small px-2 transition-colors hover:bg-operational-hover focus-visible:outline-2 focus-visible:outline-operational-ink"
        onClick={() => setOpen((current) => !current)}>
        <Icon name="globe" size={20} />
        <Icon name="chevronDown" size={20} className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <MenuList
          id="docs-languages"
          role="listbox"
          aria-label={t("header.language")}
          className="absolute right-0 z-50 mt-1 min-w-40"
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            event.preventDefault();
            const options = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'));
            const current = options.indexOf(document.activeElement as HTMLElement);
            options[(current + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length]?.focus();
          }}>
          {SUPPORTED.map((language) => (
            <MenuItem key={language} role="option" selected={i18n.language === language} onSelect={() => select(language)}>
              {t(`languages.${language}`)}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </div>
  );
}
