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
}

export const ContractBlock: FC<ContractBlockProps> = ({
  token: { symbol, image, name, balance },
  amount,
  onChangeAmount,
  readonlyAmount = false,
  title,
  className,
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
      <div className="grid grid-cols-2 gap-4">
        <Token img={image} symbol={symbol} />
        <Input
          value={amount}
          onChange={handleChangeSwapAmount}
          readOnly={readonlyAmount}
        />
      </div>
      <div>{name}</div>
    </div>
  );
};
