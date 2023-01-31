import { FC } from "react";
import { Project } from "./Project";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";

export const WaitingProjects: FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CR]} symbol={TOKEN_SYMBOLS.CR} href={TOKEN_HREF[TOKEN_SYMBOLS.CR]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONS]} symbol={TOKEN_SYMBOLS.CONS} href={TOKEN_HREF[TOKEN_SYMBOLS.CONS]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONT]} symbol={TOKEN_SYMBOLS.CONT} href={TOKEN_HREF[TOKEN_SYMBOLS.CONT]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CHAI]} symbol={TOKEN_SYMBOLS.CHAI} href={TOKEN_HREF[TOKEN_SYMBOLS.CHAI]} />
    </div>
  );
};
