import { FC } from "react";
import { Button, Panel } from "../../../shared/ui";
import { Token, TOKEN_SYMBOLS, TOKEN_TITLE } from "../../../entities";
import { useNavigate } from "react-router";
import { IReferralProject } from "../../../entities/referral-project";

export interface IReferralProjectProps {
  project: IReferralProject;
}

export const ReferralProject: FC<IReferralProjectProps> = ({
  project: { symbol, amount },
}) => {
  const navigate = useNavigate();
  const onClickShowTransactions = () => {
    navigate(`${symbol}`);
  };

  return (
    <Panel className="space-y-4 flex flex-col justify-center items-center">
      <Token symbol={symbol} title={TOKEN_TITLE[symbol as TOKEN_SYMBOLS]} />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-center w-full">
        <p className="mr-4">Сумма: {parseInt(amount, 10)}$</p>
        <Button onClick={onClickShowTransactions}>Транзакции</Button>
      </div>
    </Panel>
  );
};
