import {FC, useState} from "react";

import { TOKEN_SYMBOLS } from "../../../../entities";
import { SwapFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { BaseTokensForm } from "../../../base-tokens-form";
import { useSearchParams } from "react-router-dom";
import { calculateSwapDestinationAmount } from "../../lib";
import {useRootStore} from "../../../../app/use-root-store";
import {useTranslation} from "react-i18next";

export interface ISwapFormProps {}

export const SwapForm: FC<ISwapFormProps> = observer(() => {
  const { t } = useTranslation()
  const rootStore = useRootStore();
  const navigate = useNavigate();

  const [params] = useSearchParams([
    ["tokenA", TOKEN_SYMBOLS.USDT],
    ["tokenB", TOKEN_SYMBOLS.OMD],
  ]);

  const tokenASymbol = params.get("tokenA") as TOKEN_SYMBOLS;
  const tokenBSymbol = params.get("tokenB") as TOKEN_SYMBOLS;

  const [{ onSwap, swapStatus, isSwapping }] = useState(
    () => new SwapFormStore(rootStore, tokenASymbol, tokenBSymbol)
  );

  // useEffect(() => {
  //   if (swapStatus === SwapStatus.SUCCESS) {
  //     navigate(PATHS.STAKE);
  //   }
  // }, [swapStatus]);

  return (
    <BaseTokensForm
      title={t("common.swapTokens")}
      onSubmit={onSwap}
      sourceContractSymbol={tokenASymbol}
      destinationContractSymbol={tokenBSymbol}
      isLoading={isSwapping}
      swapStatus={swapStatus}
      calculateDestinationAmount={calculateSwapDestinationAmount}
      canRearrangeContracts
    />
  );
});
