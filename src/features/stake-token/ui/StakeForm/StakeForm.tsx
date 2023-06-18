import React, { FC, useState } from "react";
import { StakeFormStore } from "../../model";
import { TOKEN_SYMBOLS } from "../../../../entities";
import { observer } from "mobx-react-lite";
import { BaseTokensForm } from "../../../base-tokens-form";
import { useRootStore } from "../../../../app/use-root-store";
import { useTranslation } from "react-i18next";

export interface StakeFormProps {
  className?: string;
}

export const StakeForm: FC<StakeFormProps> = observer(({ className }) => {
  const { t } = useTranslation();
  const rootStore = useRootStore();

  const [{ onStake, status, isStaking, isStakeDisabled }] = useState(
    () => new StakeFormStore(rootStore)
  );

  return (
    <BaseTokensForm
      title={t("common.stakeToken", { symbol: "OMD" })}
      onSubmit={onStake}
      sourceContractSymbol={TOKEN_SYMBOLS.OMD}
      destinationContractSymbol={TOKEN_SYMBOLS.STOMD}
      isLoading={isStaking}
      swapStatus={status}
      disableSubmitButton={isStakeDisabled}
      disabledText={
        isStakeDisabled
          ? "Нельзя застейкать токен так как еще не установлена дата выплаты дивидендов или она уже просрочена"
          : ""
      }
      mode="stake"
    />
  );
});
