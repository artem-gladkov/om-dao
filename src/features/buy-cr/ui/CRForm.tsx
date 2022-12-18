import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { CRFormStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";
import { useProvider, useSigner } from "wagmi";

export const CRForm: FC = observer(() => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const [store] = useState(() => new CRFormStore(signer || (provider as any)));
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus } = store;

  return (
    <>
      <BaseTokensForm
        title={`Покупка ${TOKEN_SYMBOLS.CR}`}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.CR}
        calculateDestinationAmount={calculateDestinationAmount}
        loadingText={SWAP_STATUS_LABELS[swapStatus]}
        isLoading={isLoading}
      />
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.CR} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.CR}
      />
    </>
  );
});
