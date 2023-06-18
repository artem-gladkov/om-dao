import { ITabProps, Tabs } from "../../../shared/ui";
import { FC, FunctionComponent, useMemo, useState } from "react";
import { TProjectsPageTabs } from "../types";
import { ActiveProjects } from "./ActiveProjects";
import { WaitingProjects } from "./WaitingProjects";
import { ArchiveProjects } from "./ArchiveProjects";
import { useTranslation } from "react-i18next";

const COMPONENT_BY_ACTIVE_TAB: Record<TProjectsPageTabs, FunctionComponent> = {
  activeProjects: ActiveProjects,
  waitListing: WaitingProjects,
  archive: ArchiveProjects,
};

export const AllProjects: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] =
    useState<TProjectsPageTabs>("activeProjects");

  const Component = COMPONENT_BY_ACTIVE_TAB[activeTab];

  const tabs: ITabProps[] = useMemo(() => {
    return [
      {
        label: t("common.projectsPage.active"),
        key: "activeProjects",
      },
      {
        label: t("common.projectsPage.waiting"),
        key: "waitListing",
      },
      {
        label: t("common.projectsPage.archive"),
        key: "archive",
        disabled: true,
        title: "Нет архивных проектов",
      },
    ];
  }, [t]);

  return (
    <div>
      <Tabs
        className="mb-4"
        activeKey={activeTab}
        onChange={(key: string) => setActiveTab(key as TProjectsPageTabs)}
        items={tabs}
      />
      <Component />
    </div>
  );
};
