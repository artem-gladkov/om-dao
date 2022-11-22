import { FC, useCallback, useState } from "react";

import styles from "./BaseTokensForm.module.scss";
import { useEthereumStore } from "../../../../entities";
import { BaseTokensFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { SourceContract } from "../SourceContract";
import { DestinationContract } from "../DestinationContract";
import { BaseTokensFormSubmitData } from "../../types";
import { Contract } from "@ethersproject/contracts";
import { Button, Loader } from "../../../../shared/ui";
import { Arrow } from "../../../../shared/ui";

export interface BaseTokensFormProps {
  title: string;
  onSubmit: (data: BaseTokensFormSubmitData) => Promise<void>;
  sourceContract: Contract;
  destinationContract: Contract;
  isLoading: boolean;
  loadingText?: string;
  className?: string;
  calculateDestinationAmount?: (
    sourceAmount: string,
    isRearranged: boolean
  ) => string;
  canRearrangeContracts?: boolean;
  disableSubmitButton?: boolean;
  disabledText?: string;
}

export const BaseTokensForm: FC<BaseTokensFormProps> = observer(
  ({
    title,
    sourceContract,
    destinationContract,
    className,
    isLoading,
    loadingText,
    onSubmit,
    calculateDestinationAmount,
    canRearrangeContracts,
    disableSubmitButton,
    disabledText,
  }) => {
    const {
      ethereumStore: { signer },
    } = useEthereumStore();

    const [
      {
        fullDestinationContractInfo,
        fullSourceContractInfo,
        sourceAmount,
        onChangeSwapAmount,
        isDisabledSubmitButton,
        onRearrangeContracts,
        destinationAmount,
        isRearranged,
        isInitialized,
        updateBalances,
      },
    ] = useState(
      () =>
        new BaseTokensFormStore(
          signer,
          sourceContract,
          destinationContract,
          calculateDestinationAmount
        )
    );

    const onSubmitForm = useCallback(async () => {
      await onSubmit({ sourceAmount, destinationAmount, isRearranged });
      await updateBalances();
    }, [onSubmit, sourceAmount, destinationAmount, isRearranged]);

    return (
      <div className="grid grid-cols-1 gap-4 w-full">
        <h2>{title}</h2>
        {isInitialized ? (
          <>
            {isLoading ? (
              <Loader text={loadingText} />
            ) : (
              <>
                <SourceContract
                  fullContractInfo={fullSourceContractInfo}
                  amount={sourceAmount}
                  onChangeAmount={onChangeSwapAmount}
                />
                {canRearrangeContracts && (
                  <Arrow
                    onClick={onRearrangeContracts}
                    className={styles.buttonRearrange}
                  />
                )}
                <DestinationContract
                  fullContractInfo={fullDestinationContractInfo}
                  amount={destinationAmount}
                />
                <Button
                  type="button"
                  onClick={onSubmitForm}
                  disabled={isDisabledSubmitButton || disableSubmitButton}
                  title={disabledText}
                >
                  Совершить сделку
                </Button>
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
);
