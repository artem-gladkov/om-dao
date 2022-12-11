import { FC } from "react";
import { TigrForm } from "../../features/buy-tigr";
import { CRForm } from "../../features/buy-cr";
import { CONSForm } from "../../features/buy-cons";
import { useParams } from "react-router";

export const ProjectPage: FC = () => {
  const params = useParams();
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {params.symbol === 'omdwTigr' ? <TigrForm /> : null}
      {params.symbol === 'omdwCRB' ? <CRForm /> : null}
      {params.symbol === 'omdwCons' ? <CONSForm /> : null}
    </div>
  );
};
