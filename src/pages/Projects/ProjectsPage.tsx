import { FC } from "react";
import { AllProjects } from "../../features/show-projects";

export const ProjectsPage: FC = () => (
  <>
    <h2 className="mb-4">Проекты</h2>
    <AllProjects />
  </>
);
