import { FC } from "react";
import { Project } from "./Project";

import TigrImg from "../../../app/images/tokens/omdwtigr.webp";
import { TOKEN_SYMBOLS } from "../../../entities";

export interface IProjectsProps {}

export const Projects: FC<IProjectsProps> = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project symbol={TOKEN_SYMBOLS.TIGR} img={TigrImg} />
    </div>
  );
};
