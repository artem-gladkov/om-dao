import { FC } from "react";
import { Project } from "./Project";

import TigrImg from "../../../app/images/tokens/omdwtigr.webp";
import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";


export const ActiveProjects: FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.TIGR]} symbol={TOKEN_SYMBOLS.TIGR} img={TigrImg} href={TOKEN_HREF[TOKEN_SYMBOLS.TIGR]} />
    </div>
  );
};
