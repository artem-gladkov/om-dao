import { FC } from "react";
import { TigrForm } from "../../features/buy-tigr";
import { useParams } from "react-router";

export const ProjectPage: FC = () => {
  const {} = useParams();
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <TigrForm />
    </div>
  );
};
