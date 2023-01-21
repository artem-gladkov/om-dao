import { FC } from "react";
import { Project } from "./Project";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";

export interface IProjectsProps {}

export const Projects: FC<IProjectsProps> = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.TIGR]} symbol={TOKEN_SYMBOLS.TIGR} href={TOKEN_HREF[TOKEN_SYMBOLS.TIGR]} />
    </div>
  );
};
