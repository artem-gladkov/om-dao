import { FC, useCallback } from "react";
import classNames from "classnames";

import { Input } from "../../../../shared/ui";
import { Token } from "../../../../entities";

export interface ContractBlockProps {
  title: string;
  token: { symbol: string; image?: string; name: string; balance: string };
  amount: string;
  onChangeAmount?: (value: string) => void;
  readonlyAmount?: boolean;
  className?: string;
  exchangeRate?: string;
  maxCount?: string;
}

export const ContractBlock: FC<ContractBlockProps> = ({
  token: { symbol, image, name, balance },
  amount,
  onChangeAmount,
  readonlyAmount = false,
  title,
  className,
  exchangeRate,
  maxCount,
}) => {
  const handleChangeSwapAmount = useCallback(
    (value: string) => {
      onChangeAmount && onChangeAmount(value);
    },
    [onChangeAmount]
  );

  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-4 border rounded-md p-4",
        className
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>{title}</div>
        <div>Текущий баланс: {balance}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 align-top">
        <Token img={image} symbol={symbol} />
        <div className="flex flex-col justify-end space-y-2 ">
          <Input
            value={amount}
            onChange={handleChangeSwapAmount}
            readOnly={readonlyAmount}
          />
          {maxCount && <p className="text-right">Максимум: {maxCount}</p>}
        </div>
      </div>
      <div>{name}</div>
      {exchangeRate && <div>Цена: {exchangeRate}</div>}
    </div>
  );
};
