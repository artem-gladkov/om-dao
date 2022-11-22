import { FC } from "react";
import { Projects } from "../../features/show-projects";

export interface IProjectsPageProps {}

export const ProjectsPage: FC<IProjectsPageProps> = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 mx-auto text-center">Проекты</h1>
      <Projects />
    </div>
  );
};
