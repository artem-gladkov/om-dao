import { FC } from "react";

import { useEthereumStore } from "../../entities";
import { SwapForm } from "../../features/swap-tokens";
import { WalletConnectForm } from "../../features/connect-wallet";
import { observer } from "mobx-react-lite";

export interface ExchangePageProps {}

export const ExchangePage: FC<ExchangePageProps> = observer(() => {
  const {
    ethereumStore: { hasSigner },
  } = useEthereumStore();

  return (
    <main className="container mx-auto pt-8">
      {hasSigner ? (
        <div className="flex flex-col mx-auto max-w-xl w-full">
          <SwapForm />
        </div>
      ) : (
        <WalletConnectForm />
      )}
    </main>
  );
});
