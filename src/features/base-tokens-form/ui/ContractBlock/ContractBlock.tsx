import { FC, useCallback } from "react";
import classNames from "classnames";

import styles from "./ContractBlock.module.scss";
import { Contract } from "@ethersproject/contracts";
import { Input } from "../../../../shared/ui";
import { Token } from "../../../../entities";

export interface ContractBlockProps {
  title: string;
  token: { symbol: string; image?: string; name: string; balance: string };
  contract: Contract;
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
  contract,
  title,
  className,
  ...otherProps
}) => {
  const handleChangeSwapAmount = useCallback((value: string) => {
    onChangeAmount && onChangeAmount(value);
  }, []);

  return (
    <div className={classNames(styles.swapBlock, className)} {...otherProps}>
      <div className={styles.header}>
        <div>{title}</div>
        <div>Текущий баланс: {balance}</div>
      </div>
      <div className={styles.body}>
        <Token img={image} symbol={symbol} />
        <Input
          value={amount}
          onChange={handleChangeSwapAmount}
          readOnly={readonlyAmount}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.tokenName}>{name}</div>
      </div>
    </div>
  );
};
