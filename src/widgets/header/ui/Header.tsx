import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Header.module.scss";
import { Logo, Nav } from "../../../shared/ui";
import { WalletConnectButton } from "../../../features/connect-wallet/ui/WalletConnectButton";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../entities";
import { Wallet } from "../../../features/show-wallet";
import { observer } from "mobx-react-lite";
import { SmallBalance } from "../../../features/show-balance";

export interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = observer(() => {
  const {
    ethereumStore: { hasSigner },
  } = useEthereumStore();

  return (
    <header className={styles.header}>
      <div className="container mx-auto gap-4 flex flex-col xl:flex-row justify-between items-center ">
        <Logo />
        {hasSigner && <Nav />}
        <div
          className={classNames(styles.actions, {
            [styles.hasSigner]: hasSigner,
          })}
        >
          {hasSigner ? (
            <>
              <SmallBalance
                tokenSymbol={TOKEN_SYMBOLS.STOMD}
                text={"OM DAO (Staked) Баланс:"}
              />
              <Wallet />
            </>
          ) : (
            <WalletConnectButton />
          )}
        </div>
      </div>
    </header>
  );
});
