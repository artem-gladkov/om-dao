import { FC, FunctionComponent, useState } from "react";
import {
  ActiveProjects,
  ArchiveProjects,
  WaitingProjects,
} from "../../features/show-projects";
import { Tabs } from "../../shared/ui";
import { ITabProps } from "../../shared/ui/Tabs/Tab";

export interface IProjectsPageProps {}

type TProjectsPageTabs = "activeProjects" | "waitListing" | "archive";

const PROJECTS_PAGE_TABS: ITabProps[] = [
  {
    label: "Активные",
    key: "activeProjects",
  },
  {
    label: "Ожидают листинга",
    key: "waitListing",
  },
  {
    label: "Архив",
    key: "archive",
    disabled: true,
    title: "Нет архивных проектов"
  },
];

const COMPONENT_BY_ACTIVE_TAB: Record<TProjectsPageTabs, FunctionComponent> = {
  activeProjects: ActiveProjects,
  waitListing: WaitingProjects,
  archive: ArchiveProjects,
};

export const ProjectsPage: FC<IProjectsPageProps> = () => {
  const [activeTab, setActiveTab] =
    useState<TProjectsPageTabs>("activeProjects");

  const Component = COMPONENT_BY_ACTIVE_TAB[activeTab];

  return (
    <>
      <h2 className="mb-4">Проекты</h2>
      <Tabs
        className="mb-4"
        activeKey={activeTab}
        onChange={(key: string) => setActiveTab(key as TProjectsPageTabs)}
        items={PROJECTS_PAGE_TABS}
      />
      <Component />
    </>
  );
};
