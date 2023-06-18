import { FC, useCallback } from "react";

import { IProjectViewProps, ProjectView } from "./ProjectView";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../router";

export interface IProjectProps extends Omit<IProjectViewProps, "onClick"> {}

export const Project: FC<IProjectProps> = ({ symbol, ...otherProps }) => {
  const navigate = useNavigate();

  const onClickProject = useCallback(() => {
    navigate({
      pathname: `${PATHS.PROJECTS}/${symbol}`,
    });
  }, [navigate, symbol]);

  return (
    <ProjectView onClick={onClickProject} symbol={symbol} {...otherProps} />
  );
};
