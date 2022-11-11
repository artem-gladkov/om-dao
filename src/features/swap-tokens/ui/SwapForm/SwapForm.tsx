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
import { TokenAddButton } from "../../../add-token-to-metamask";

export interface SwapFormProps {
  className?: string;
}

export const SwapForm: FC<SwapFormProps> = observer(
  ({ className, ...otherProps }) => {
    const {
      ethereumStore: { signer },
    } = useEthereumStore();

    const [
      { onSwap, swapStatus, isSwapping, sourceContract, destinationContract },
    ] = useState(() => new SwapFormStore(signer));
    const navigate = useNavigate();

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
  }
);
