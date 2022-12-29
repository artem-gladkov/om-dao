import { FC, MouseEvent } from "react";
import { Token } from "../../../../entities";
import { Button, Panel } from "../../../../shared/ui";

export interface IProjectViewProps {
  symbol: string;
  img: string;
  href: string;
  title: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ProjectView: FC<IProjectViewProps> = ({
  symbol,
  img,
  href,
  title,
  onClick,
}) => {
  return (
    <Panel>
      <Token className="justify-center mb-4" img={img} symbol={symbol} title={title} />
      <div
        className="grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4"
      >
        <Button onClick={onClick} >
          Купить {symbol}
        </Button>
        <Button onClick={() => {
          window.open(href, "_blank");
          }} title="О проекте"
        >О проекте</Button>
      </div>
    </Panel>
  );
};
