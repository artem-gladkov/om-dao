import { Tabs } from "../../../shared/ui";
import {FC, FunctionComponent, useState} from "react";
import {TProjectsPageTabs} from "../types";
import {ActiveProjects} from "./ActiveProjects";
import {WaitingProjects} from "./WaitingProjects";
import {ArchiveProjects} from "./ArchiveProjects";
import {PROJECTS_TABS} from "../constants";

const COMPONENT_BY_ACTIVE_TAB: Record<TProjectsPageTabs, FunctionComponent> = {
    activeProjects: ActiveProjects,
    waitListing: WaitingProjects,
    archive: ArchiveProjects,
};

export const AllProjects: FC = () => {
  const [activeTab, setActiveTab] =
    useState<TProjectsPageTabs>("activeProjects");

  const Component = COMPONENT_BY_ACTIVE_TAB[activeTab];

  return (
    <div>
      <Tabs
        className="mb-4"
        activeKey={activeTab}
        onChange={(key: string) => setActiveTab(key as TProjectsPageTabs)}
        items={PROJECTS_TABS}
      />
      <Component />
    </div>
  );
};
