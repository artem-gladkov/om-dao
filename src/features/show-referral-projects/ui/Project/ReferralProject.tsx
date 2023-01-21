import { FC, useCallback } from "react";

import { IProjectViewProps, ReferralProjectView } from "./ReferralProjectView";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../router";

export interface IProjectProps extends Omit<IProjectViewProps, "onClick"> {}

export const ReferralProject: FC<IProjectProps> = ({ symbol, ...otherProps }) => {
  const navigate = useNavigate();

  const onClickProject = useCallback(() => {
    navigate({
      pathname: `${PATHS.PROJECTS}/${symbol}`,
    });
  }, [symbol]);

  return (
    <ReferralProjectView onClick={onClickProject} symbol={symbol} {...otherProps} />
  );
};
