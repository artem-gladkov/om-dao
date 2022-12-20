import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { TigrFormStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";

import {useRootStore} from "../../../app/use-root-store";
export const TigrForm: FC = observer(() => {
    const rootStore = useRootStore()

  const [store] = useState(() => new TigrFormStore(rootStore));
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus } = store;

  return (
    <>
      <BaseTokensForm
        title={`Покупка ${TOKEN_SYMBOLS.TIGR}`}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.TIGR}
        calculateDestinationAmount={calculateDestinationAmount}
        loadingText={SWAP_STATUS_LABELS[swapStatus]}
        isLoading={isLoading}
      />
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.TIGR} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.TIGR}
      />
    </>
  );
});
