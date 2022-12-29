import { FC } from "react";
import { Project } from "./Project";

import TigrImg from "../../../app/images/tokens/omdwtigr.webp";

import ConsImg from "../../../app/images/tokens/omdwcons.webp";
import CRImg from "../../../app/images/tokens/omdwcrb.webp";
import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";

export interface IProjectsProps {}

export const Projects: FC<IProjectsProps> = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.TIGR]} symbol={TOKEN_SYMBOLS.TIGR} img={TigrImg} href={TOKEN_HREF[TOKEN_SYMBOLS.TIGR]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONS]} symbol={TOKEN_SYMBOLS.CONS} img={ConsImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CONS]}/>
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CR]} symbol={TOKEN_SYMBOLS.CR} img={CRImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CR]}/>
    </div>
  );
};
