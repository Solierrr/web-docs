import type { ComponentType } from "react";
import { GitHubIcon } from "@solaria.network/web-lib";
import { IconMail, IconShieldCheck } from "@tabler/icons-react";

export const footerGlyphs: Record<string, ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  mail: IconMail,
  shieldCheck: IconShieldCheck,
};
