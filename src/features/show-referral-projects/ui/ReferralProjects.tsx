import { FC, useState } from "react";
import { useParams } from "react-router";
import { ReferralProjectsStore } from "../model";
import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared/ui";
import { ReferralProjectsList } from "./ReferralProjectsList";

export interface IProjectsProps {}

export const ReferralProjects: FC<IProjectsProps> = observer(
  function ReferralProjects() {
    const { refcode } = useParams();

    const [store] = useState(() => new ReferralProjectsStore(refcode));
    const { projectsWithAmount, isFetchingProjects } = store;

    return isFetchingProjects ? (
      <Loader className="!h-48" />
    ) : (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <ReferralProjectsList projects={projectsWithAmount} />
      </div>
    );
  }
);
