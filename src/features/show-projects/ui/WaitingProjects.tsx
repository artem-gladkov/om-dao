import { FC } from "react";
import { Project } from "./Project";

import CRImg from "../../../app/images/tokens/omdwcrb.webp";
import CONSImg from "../../../app/images/tokens/omdwcons.webp";
import CONTImg from "../../../app/images/tokens/omdwcont.webp";
import CHAIImg from "../../../app/images/tokens/omdwchai.webp";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";

export const WaitingProjects: FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CR]} symbol={TOKEN_SYMBOLS.CR} img={CRImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CR]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONS]} symbol={TOKEN_SYMBOLS.CONS} img={CONSImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CONS]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CONT]} symbol={TOKEN_SYMBOLS.CONT} img={CONTImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CONT]} />
      <Project title={TOKEN_TITLE[TOKEN_SYMBOLS.CHAI]} symbol={TOKEN_SYMBOLS.CHAI} img={CHAIImg} href={TOKEN_HREF[TOKEN_SYMBOLS.CHAI]} />
    </div>
  );
};
