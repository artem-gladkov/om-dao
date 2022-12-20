import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { CONSFormStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";
import { useRootStore } from "../../../app/use-root-store";

export const CONSForm: FC = observer(() => {
  const rootStore = useRootStore();

  const [store] = useState(() => new CONSFormStore(rootStore));
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus } = store;

  return (
    <>
      <BaseTokensForm
        title={`Покупка ${TOKEN_SYMBOLS.CONS}`}
        onSubmit={onSubmit}
        calculateDestinationAmount={calculateDestinationAmount}
        loadingText={SWAP_STATUS_LABELS[swapStatus]}
        isLoading={isLoading}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.CR}
      />
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.CONS} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.CONS}
      />
    </>
  );
});
