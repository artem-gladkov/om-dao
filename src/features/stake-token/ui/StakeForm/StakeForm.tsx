import React, { FC, useState } from "react";
import { StakeFormStore } from "../../model";
import { TOKEN_SYMBOLS } from "../../../../entities";
import { observer } from "mobx-react-lite";
import { BaseTokensForm } from "../../../base-tokens-form";
import { STAKE_STATUS_LABELS } from "../../constants";
import {useProvider, useSigner} from "wagmi";

export interface StakeFormProps {
  className?: string;
}

export const StakeForm: FC<StakeFormProps> = observer(({ className }) => {
  const { data: signer } = useSigner();
  const provider = useProvider()

  const [
    {
      onStake,
      status,
      isStaking,
      isStakeDisabled,
    },
  ] = useState(() => new StakeFormStore(signer || provider as any));

  return (
    <BaseTokensForm
      title="Стейкинг OMD"
      onSubmit={onStake}
      sourceContractSymbol={TOKEN_SYMBOLS.OMD}
      destinationContractSymbol={TOKEN_SYMBOLS.STOMD}
      isLoading={isStaking}
      loadingText={STAKE_STATUS_LABELS[status]}
      disableSubmitButton={isStakeDisabled}
      disabledText={
        isStakeDisabled
          ? "Нельзя застейкать токен так как еще не установлена дата выплаты дивидендов или она уже просрочена"
          : ""
      }
    />
  );
});
