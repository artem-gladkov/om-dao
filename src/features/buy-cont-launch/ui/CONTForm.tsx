import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { CONTFormLaunchStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";
import { useAccount } from "wagmi";
import { useRootStore } from "../../../app/use-root-store";

export const CONTFormLaunch: FC = observer(() => {
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
        title={`Покупка ${TOKEN_SYMBOLS.CONT}`}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.CONT}
        calculateDestinationAmount={calculateDestinationAmount}
        loadingText={SWAP_STATUS_LABELS[swapStatus]}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.CONT} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.CONT}
      />
    </>
  );
});
