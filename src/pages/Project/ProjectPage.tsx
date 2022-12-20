import { FC, useEffect } from "react";
import { TigrForm } from "../../features/buy-tigr";
import { CRFormLaunch } from "../../features/buy-cr-launch";
import { useParams } from "react-router";
import { useRootStore } from "../../app/use-root-store";

export const ProjectPage: FC = () => {
  const params = useParams();
  const { setRefCode } = useRootStore();

  useEffect(() => {
    if (params.refcode) {
      localStorage.setItem("refcode", params.refcode);
      setRefCode(params.refcode);
    }
  });
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {params.symbol === "omdwTigr" && <TigrForm />}
      {params.symbol === "omdwCRB" && <CRFormLaunch />}
    </div>
  );
};
