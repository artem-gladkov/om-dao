import { FC } from "react";
import { Project } from "./Project";

export interface IProjectsProps {}

export const Projects: FC<IProjectsProps> = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/*<Project symbol="OMD" img="" />*/}
    </div>
  );
};
