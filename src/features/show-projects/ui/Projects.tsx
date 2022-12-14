import { FC } from "react";
import { Project } from "./Project";

import TigrImg from "../../../app/images/tokens/omdwtigr.webp";
// import CRImg from "../../../app/images/tokens/omdwcrb.webp";
import CONSImg from "../../../app/images/tokens/omdwcons.webp";
import { TOKEN_SYMBOLS } from "../../../entities";

export interface IProjectsProps {}

export const Projects: FC<IProjectsProps> = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project symbol={TOKEN_SYMBOLS.TIGR} img={TigrImg} />
      {/* <Project symbol={TOKEN_SYMBOLS.CR} img={CRImg} /> */}
      <Project symbol={TOKEN_SYMBOLS.CONS} img={CONSImg} />
    </div>
  );
};
