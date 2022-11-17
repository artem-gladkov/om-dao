import { FC, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./SmallBalance.module.scss";
import { observer } from "mobx-react-lite";
import { BalanceStore } from "../../model";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../../entities";

export interface SmallBalanceProps {
  tokenSymbol: TOKEN_SYMBOLS;
  text?: string;
  className?: string;
}

export const SmallBalance: FC<SmallBalanceProps> = observer(
  ({ tokenSymbol, text, className, ...otherProps }) => {
    const {
      ethereumStore: { signer },
    } = useEthereumStore();

    const [{ balance, updateBalance }] = useState(
      () => new BalanceStore({ tokenSymbol, signer })
    );

    useEffect(() => {
      document.addEventListener(`need-update-${tokenSymbol}`, updateBalance);

      return () => {
        document.removeEventListener(
          `need-update-${tokenSymbol}`,
          updateBalance
        );
      };
    }, [tokenSymbol]);

    return (
      <div
        className={classNames(styles.smallBalance, className)}
        {...otherProps}
      >
        {text || "Баланс:"} <span>{balance}</span>
      </div>
    );
  }
);
