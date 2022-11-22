import { FC } from "react";
import { Projects } from "../../features/show-projects";

export interface IProjectsPageProps {}

export const ProjectsPage: FC<IProjectsPageProps> = () => {
  return (
    <>
      <h2 className="mb-4">Проекты</h2>
      <Projects />
    </>
  );
};
