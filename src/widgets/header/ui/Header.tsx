import React, { FC, useMemo } from "react";
import classNames from "classnames";

import styles from "./Header.module.scss";
import { Container, Logo, Nav } from "../../../shared/ui";
import { WalletConnectButton } from "../../../features/connect-wallet/ui/WalletConnectButton";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../entities";
import { Wallet } from "../../../features/show-wallet";
import { observer } from "mobx-react-lite";
import { SmallBalance } from "../../../features/show-balance";

export interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = observer(
  ({ className, ...otherProps }) => {
    const {
      ethereumStore: { hasSigner },
    } = useEthereumStore();

    return (
      <header className={classNames(styles.header, className)} {...otherProps}>
        <Container className={styles.body}>
          <Logo />
          {hasSigner && <Nav />}
          <div className={styles.actions}>
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
        </Container>
      </header>
    );
  }
);
