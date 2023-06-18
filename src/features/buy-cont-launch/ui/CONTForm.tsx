import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { CONTFormLaunchStore } from "../model";

import { TokenAddButton } from "../../add-token-to-metamask";
import { useAccount } from "wagmi";
import { useRootStore } from "../../../app/use-root-store";
import { useTranslation } from 'react-i18next';

export const CONTFormLaunch: FC = observer(() => {
  const { t } = useTranslation();
    const rootStore = useRootStore()
  const dcon = useAccount();
  const { refCode } = useRootStore();
  const [store] = useState(
    () => new CONTFormLaunchStore(rootStore, refCode, dcon.address)
  );
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus,maxCount,getupdateMaxCount } = store;

  return (
    <>
      <BaseTokensForm
        title={t("common.purchaseToken", { symbol: TOKEN_SYMBOLS.CONT })}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.CONT}
        calculateDestinationAmount={calculateDestinationAmount}
        swapStatus={swapStatus}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"   text={t("common.addToken", {
        symbol: TOKEN_SYMBOLS.CONT,
        walletName: "MetaMask",
      })}
        tokenSymbol={TOKEN_SYMBOLS.CONT}
      />
    </>
  );
});
