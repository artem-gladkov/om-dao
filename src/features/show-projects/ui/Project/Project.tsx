import { FC, useCallback } from "react";

import { IProjectViewProps, ProjectView } from "./ProjectView";
import { useNavigate } from "react-router";
import { TOKEN_SYMBOLS } from "../../../../entities";
import { PATHS } from "../../../../router";

export interface IProjectProps extends Omit<IProjectViewProps, "onClick"> {}

export const Project: FC<IProjectProps> = ({ symbol, ...otherProps }) => {
  const navigate = useNavigate();

  const onClickProject = useCallback(() => {
    navigate({
      pathname: PATHS.ROOT,
      search: `tokenA=${TOKEN_SYMBOLS["OMD"]}&tokenB=${symbol}`,
    });
  }, [symbol]);

  return (
    <ProjectView onClick={onClickProject} symbol={symbol} {...otherProps} />
  );
};
