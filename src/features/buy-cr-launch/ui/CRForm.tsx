import { FC, useEffect, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS, useEthereumStore} from "../../../entities";
import { observer } from "mobx-react-lite";
import { CRFormLaunchStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";
import { useProvider, useSigner } from "wagmi";

export const CRFormLaunch: FC = observer(() => {
  
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { ethereumStore: { refCode } } = useEthereumStore();
  
  const [store] = useState(() => new CRFormLaunchStore(signer || (provider as any), refCode));
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
