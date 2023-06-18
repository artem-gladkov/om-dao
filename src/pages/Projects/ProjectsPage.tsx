import { FC } from "react";
import { AllProjects } from "../../features/show-projects";
import { useTranslation } from "react-i18next";

export const ProjectsPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="mb-4">{t("common.projects")}</h2>
      <AllProjects />
    </>
  );
};
