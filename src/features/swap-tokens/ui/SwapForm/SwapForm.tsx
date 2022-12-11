import { FC, useEffect, useState } from "react";

import {
  OMDAO_ABI,
  TOKEN_SYMBOLS,
  useEthereumStore,
} from "../../../../entities";
import { SwapFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { SwapStatus } from "../../types";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../router";
import { BaseTokensForm } from "../../../base-tokens-form";
import { SWAP_STATUS_LABELS } from "../../constants";
import { useSearchParams } from "react-router-dom";
import { calculateSwapDestinationAmount } from "../../lib";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export interface ISwapFormProps {}

export const SwapForm: FC<ISwapFormProps> = observer(() => {
  const navigate = useNavigate();

  const [params] = useSearchParams([
    ["tokenA", TOKEN_SYMBOLS.USDT],
    ["tokenB", TOKEN_SYMBOLS.OMD],
  ]);

  const tokenASymbol = params.get("tokenA") as TOKEN_SYMBOLS;
  const tokenBSymbol = params.get("tokenB") as TOKEN_SYMBOLS;

  const {
    ethereumStore: { signer },
  } = useEthereumStore();

  const [{ onSwap, swapStatus, isSwapping }] = useState(
    () => new SwapFormStore(signer, tokenASymbol, tokenBSymbol)
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
      sourceContractSymbol={tokenASymbol}
      destinationContractSymbol={tokenBSymbol}
      isLoading={isSwapping}
      loadingText={SWAP_STATUS_LABELS[swapStatus]}
      calculateDestinationAmount={calculateSwapDestinationAmount}
      canRearrangeContracts
    />
  );
});
