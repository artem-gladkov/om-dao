import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { DELCFormLaunchStore } from "../model";

import { TokenAddButton } from "../../add-token-to-metamask";
import { useAccount } from "wagmi";
import { useRootStore } from "../../../app/use-root-store";
import { useTranslation } from 'react-i18next';

export const DELCFormLaunch: FC = observer(() => {
  const { t } = useTranslation();
    const rootStore = useRootStore()
  const dcon = useAccount();
  const { refCode } = useRootStore();
  const [store] = useState(
    () => new DELCFormLaunchStore(rootStore, refCode, dcon.address)
  );
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus,maxCount,getupdateMaxCount } = store;

  return (
    <>
      <BaseTokensForm
        title={t("common.purchaseToken", { symbol: TOKEN_SYMBOLS.DELC })}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.DELC}
        calculateDestinationAmount={calculateDestinationAmount}
        swapStatus={swapStatus}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"   text={t("common.addToken", {
        symbol: TOKEN_SYMBOLS.DELC,
        walletName: "MetaMask",
      })}
        tokenSymbol={TOKEN_SYMBOLS.DELC}
      />
    </>
  );
});
