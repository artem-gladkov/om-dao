import { FC, useCallback, useState } from "react";
import classNames from "classnames";

import styles from "./BaseTokensForm.module.scss";
import { TOKEN_SYMBOLS, useEthereumStore } from "../../../../entities";
import { BaseTokensFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { SourceContract } from "../SourceContract";
import { DestinationContract } from "../DestinationContract";
import { BaseTokensFormSubmitData } from "../../types";
import { Contract } from "@ethersproject/contracts";
import { Button, Loader } from "../../../../shared/ui";
import { Arrow } from "../../../../shared/ui/Arrow";
import { TokenAddButton } from "../../../add-token-to-metamask";

export interface BaseTokensFormProps {
  title: string;
  onSubmit: (data: BaseTokensFormSubmitData) => void;
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
    canRearrangeContracts = false,
    ...otherProps
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

    const onSubmitForm = () => {
      onSubmit({ sourceAmount, destinationAmount, isRearranged });
    };

    return (
      <div className={classNames(styles.swapForm, className)} {...otherProps}>
        {isInitialized ? (
          <>
            <div className={styles.wrapper}>
              {isLoading ? (
                <Loader text={loadingText} />
              ) : (
                <>
                  <h2 className={styles.title}>{title}</h2>
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
                    disabled={isDisabledSubmitButton}
                  >
                    Совершить сделку
                  </Button>
                </>
              )}
            </div>
            <TokenAddButton
              full
              text={"Добавить токен OMD в MetaMask"}
              tokenSymbol={TOKEN_SYMBOLS.OMD}
            />
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
);
