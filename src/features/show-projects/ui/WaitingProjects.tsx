import { FC } from "react";
import { Project } from "./Project";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";

export const WaitingProjects: FC = () => {
  const buttonName: string = "Посмотреть";
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project buttonName={buttonName} title={TOKEN_TITLE[TOKEN_SYMBOLS.CR]} symbol={TOKEN_SYMBOLS.CR} href={TOKEN_HREF[TOKEN_SYMBOLS.CR]} />
      <Project buttonName={buttonName} title={TOKEN_TITLE[TOKEN_SYMBOLS.CONS]} symbol={TOKEN_SYMBOLS.CONS} href={TOKEN_HREF[TOKEN_SYMBOLS.CONS]} />
      <Project buttonName={buttonName} title={TOKEN_TITLE[TOKEN_SYMBOLS.CONT]} symbol={TOKEN_SYMBOLS.CONT} href={TOKEN_HREF[TOKEN_SYMBOLS.CONT]} />
      <Project buttonName={buttonName} title={TOKEN_TITLE[TOKEN_SYMBOLS.DELC]} symbol={TOKEN_SYMBOLS.DELC} href={TOKEN_HREF[TOKEN_SYMBOLS.DELC]} />
    </div>
  );
};
