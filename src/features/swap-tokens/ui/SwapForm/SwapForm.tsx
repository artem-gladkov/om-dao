import { FC, useEffect, useState } from "react";

import { TOKEN_SYMBOLS, useEthereumStore } from "../../../../entities";
import { SwapFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { SwapStatus } from "../../types";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../router";
import { BaseTokensForm } from "../../../base-tokens-form";
import { SWAP_STATUS_LABELS } from "../../constants";
import { calculateSwapDestinationAmount } from "../../lib";
import { useSearchParams } from "react-router-dom";

export interface ISwapFormProps {}

export const SwapForm: FC<ISwapFormProps> = observer(() => {
  const navigate = useNavigate();

  const [params] = useSearchParams([
    ["tokenA", TOKEN_SYMBOLS.USDT],
    ["tokenB", TOKEN_SYMBOLS.OMD],
  ]);

  const {
    ethereumStore: { signer },
  } = useEthereumStore();

  const [
    { onSwap, swapStatus, isSwapping, sourceContract, destinationContract },
  ] = useState(
    () =>
      new SwapFormStore(
        signer,
        params.get("tokenA") as TOKEN_SYMBOLS,
        params.get("tokenB") as TOKEN_SYMBOLS
      )
  );

  useEffect(() => {
    if (swapStatus === SwapStatus.SUCCESS) {
      navigate(PATHS.STAKE);
    }
  }, [swapStatus]);

  return (
    <BaseTokensForm
      title="Обмен токенов"
      onSubmit={onSwap}
      sourceContract={sourceContract}
      destinationContract={destinationContract}
      isLoading={isSwapping}
      loadingText={SWAP_STATUS_LABELS[swapStatus]}
      calculateDestinationAmount={calculateSwapDestinationAmount}
      canRearrangeContracts
    />
  );
});
