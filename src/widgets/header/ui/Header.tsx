import React, { FC } from "react";
import { Logo, Nav } from "../../../shared/ui";
import { WalletConnectButton } from "../../../features/connect-wallet/ui/WalletConnectButton";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../entities";
import { Wallet } from "../../../features/show-wallet";
import { observer } from "mobx-react-lite";
import { SmallBalance } from "../../../features/show-balance";

export const Header: FC = observer(() => {
  const {
    ethereumStore: { hasSigner },
  } = useEthereumStore();

  return (
    <header className="flex items-center h-max py-2">
      <div className="container mx-auto gap-4 flex flex-col xl:flex-row justify-between items-center px-4">
        <Logo />
        {hasSigner && <Nav />}
        <div className="flex items-center justify-self-center gap-4 lg:justify-self-start">
          {hasSigner ? (
            <>
              <SmallBalance
                tokenSymbol={TOKEN_SYMBOLS.STOMD}
                text="OM DAO (Staked) Баланс:"
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
