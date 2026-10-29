import { useTranslation } from "react-i18next";
import { ActionLink, StatusPage } from "@solaria.network/web-lib";

export default function NotFoundPage() {
  const { t } = useTranslation("docs");

  return (
    <StatusPage
      code="404"
      title={t("notFound.title")}
      message={t("notFound.message")}
      actions={<ActionLink to="/" content={t("notFound.action")} description={t("notFound.actionDescription")} variant="primary" />}
    />
  );
}
