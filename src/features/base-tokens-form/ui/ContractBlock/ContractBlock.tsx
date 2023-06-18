import { FC, useCallback } from "react";
import classNames from "classnames";

import { Input } from "../../../../shared/ui";
import { Token } from "../../../../entities";
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation()

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
        <div>{t("common.form.currentBalance")}: {balance}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 align-top">
        <Token symbol={symbol} />
        <div className="flex flex-col justify-end space-y-2 ">
          <Input
            value={amount}
            onChange={handleChangeSwapAmount}
            readOnly={readonlyAmount}
          />
          {maxCount && <p className="text-right">{t("common.form.max")}: {maxCount}</p>}
        </div>
      </div>
      <div>{name}</div>
      {exchangeRate && <div>{t("common.form.price")}: {exchangeRate}</div>}
    </div>
  );
};
