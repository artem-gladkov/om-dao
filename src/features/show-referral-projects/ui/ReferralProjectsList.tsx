import { IReferralProject } from "../../../entities/referral-project";
import { FC } from "react";
import { ReferralProject } from "./ReferralProject";
export interface IReferralProjectsList {
  projects: IReferralProject[];
}

export const ReferralProjectsList: FC<IReferralProjectsList> = ({
  projects,
}) => {
  const isEmpty = projects.length === 0;

  return (
    <>
      {isEmpty ? (
        <div>Пусто</div>
      ) : (
        projects.map((project) => <ReferralProject key={project.symbol} project={project} />)
      )}
    </>
  );
};
