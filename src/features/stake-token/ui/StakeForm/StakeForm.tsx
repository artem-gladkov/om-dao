import React, { FC, useState } from "react";
import classNames from "classnames";

import styles from "./StakeForm.module.scss";
import { StakeFormStore } from "../../model";
import { useEthereumStore } from "../../../../entities";
import { observer } from "mobx-react-lite";
import { BaseTokensForm } from "../../../base-tokens-form";
import { STAKE_STATUS_LABELS } from "../../constants";

export interface StakeFormProps {
  className?: string;
}

export const StakeForm: FC<StakeFormProps> = observer(({ className }) => {
  const {
    ethereumStore: { signer },
  } = useEthereumStore();

  const [
    {
      sourceContract,
      destinationContract,
      onStake,
      status,
      isStaking,
      isStakeDisabled,
    },
  ] = useState(() => new StakeFormStore(signer));

  return (
    <BaseTokensForm
      className={classNames(styles.stakeForm, className)}
      title="Стейкинг OMD"
      onSubmit={onStake}
      sourceContract={sourceContract}
      destinationContract={destinationContract}
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
