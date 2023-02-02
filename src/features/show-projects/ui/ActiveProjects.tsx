import { FC } from "react";
import { Project } from "./Project";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";


export const ActiveProjects: FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.TIGR]} symbol={TOKEN_SYMBOLS.TIGR} href={TOKEN_HREF[TOKEN_SYMBOLS.TIGR]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.LED]} symbol={TOKEN_SYMBOLS.LED} href={TOKEN_HREF[TOKEN_SYMBOLS.LED]} />
      {/* <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONT]} symbol={TOKEN_SYMBOLS.CONT} href={TOKEN_HREF[TOKEN_SYMBOLS.CONT]} /> */}
    </div>
  );
};
