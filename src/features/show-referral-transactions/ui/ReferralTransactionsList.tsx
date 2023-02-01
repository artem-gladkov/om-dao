import { FC } from "react";
import { IProjectTransaction } from "../../../entities/referral-project";
import { Panel } from "../../../shared/ui";
import { format } from "date-fns";

export interface IReferralTransactionsListProps {
  transactions: IProjectTransaction[];
}

export const ReferralTransactionsList: FC<IReferralTransactionsListProps> = ({
  transactions,
}) => {
  const isEmpty = transactions.length === 0;

  return (
    <>
      {isEmpty ? (
        <div>Пусто</div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <p>Хэш</p>
            <p>Номер блока</p>
            <p>Дата</p>
            <p>Сумма</p>
          </div>
          <div className="grid grid-cols-1 gap-4 ">
            {transactions.map(
              ({
                transactionHash,
                blockNumber,
                timestamp,
                args: { amount },
              }) => (
                <Panel className="grid grid-cols-4 gap-2" key={transactionHash}>
                  <p>{transactionHash.slice(0, 8)}...</p>
                  <p>{blockNumber}</p>
                  <p>{format(new Date(timestamp * 1000), "dd.MM.yyyy в  HH:mm")}</p>
                  <p>{amount / 1000000}</p>
                </Panel>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};
