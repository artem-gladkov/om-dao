import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../entities";
import { observer } from "mobx-react-lite";
import { TigrFormStore } from "../model";
import { SWAP_STATUS_LABELS } from "../../swap-tokens";
import { TokenAddButton } from "../../add-token-to-metamask";

export const TigrForm: FC = observer(() => {
  const {
    ethereumStore: { signer },
  } = useEthereumStore();

  const [store] = useState(() => new TigrFormStore(signer));
  const {
    isLoading,
    sourceContract,
    destinationContract,
    onSubmit,
    calculateDestinationAmount,
    swapStatus,
  } = store;

  return (
    <>
      <BaseTokensForm
        title={`Покупка ${TOKEN_SYMBOLS.TIGR}`}
        onSubmit={onSubmit}
        sourceContract={sourceContract}
        destinationContract={destinationContract}
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
