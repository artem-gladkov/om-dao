import { FC, MouseEvent } from "react";
import { Token } from "../../../../entities";
import { Button, Panel } from "../../../../shared/ui";

export interface IProjectViewProps {
  symbol: string;
  img: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ProjectView: FC<IProjectViewProps> = ({
  symbol,
  img,
  onClick,
}) => {
  return (
    <Panel>
      <Token className="justify-center mb-4" img={img} symbol={symbol} />
      <Button onClick={onClick} full>
        Купить {symbol}
      </Button>
    </Panel>
  );
};
