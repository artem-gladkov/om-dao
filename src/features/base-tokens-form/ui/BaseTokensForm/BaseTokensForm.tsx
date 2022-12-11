import { FC, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./BaseTokensForm.module.scss";
import {
  TOKEN_ABI,
  TOKEN_ADDRESS,
  TOKEN_SYMBOLS,
  useEthereumStore,
} from "../../../../entities";
import { BaseTokensFormStore } from "../../model";
import { observer } from "mobx-react-lite";
import { SourceContract } from "../SourceContract";
import { DestinationContract } from "../DestinationContract";
import { BaseContractInfo, BaseTokensFormSubmitData } from "../../types";
import { Contract } from "@ethersproject/contracts";
import { Button, Loader } from "../../../../shared/ui";
import { Arrow } from "../../../../shared/ui";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useSigner,
} from "wagmi";
import { BaseTokenInfo } from "../../../../entities/token/types";
import { is } from "date-fns/locale";

export interface BaseTokensFormProps {
  title: string;
  onSubmit: (data: BaseTokensFormSubmitData) => Promise<void>;
  sourceContractSymbol: TOKEN_SYMBOLS;
  destinationContractSymbol: TOKEN_SYMBOLS;
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
    sourceContractSymbol,
    destinationContractSymbol,
    className,
    isLoading,
    loadingText,
    onSubmit,
    calculateDestinationAmount,
    canRearrangeContracts,
    disableSubmitButton,
    disabledText,
  }) => {
    const [sourceAmount, setSourceAmount] = useState("0");

    const [isRearranged, setIsRearranged] = useState(false);

    const toggleIsRearranged = useCallback(() => {
      setIsRearranged((prevState) => !prevState);
    }, [setIsRearranged]);

    const onChangeSwapAmount = useCallback(
      (value: string) => {
        const validatePattern = /(^\d*\.?\d{0,6}$)/u;
        const isValid = validatePattern.test(value);

        if (isValid) {
          const isStartWithDot = value.startsWith(".");

          if (isStartWithDot) {
            const pattern = /^\.(?<float>\d{0,6})$/;

            const newSourceAmount = value.replace(pattern, (...props) => {
              const groups = props.pop();
              let result = "0.";

              if (groups.float !== undefined) {
                result += groups.float;
              }

              return result;
            });

            setSourceAmount(newSourceAmount);
          } else {
            const pattern = /(?<int>\d+)(?<dot>\.?)(?<float>\d{0,6})/;

            const newSourceAmount = value.replace(pattern, (...props) => {
              const groups = props.pop();
              let result = "";

              if (groups.int !== undefined) {
                result += Number(groups.int).toString();
              }

              if (groups.dot !== undefined) {
                result += groups.dot;
              }

              if (groups.float !== undefined) {
                result += groups.float;
              }

              return result;
            });

            setSourceAmount(newSourceAmount);
          }
        }
      },
      [setSourceAmount]
    );

    const destinationAmount = useMemo(() => {
      return calculateDestinationAmount
        ? calculateDestinationAmount(sourceAmount, isRearranged)
        : sourceAmount;
    }, [sourceAmount, calculateDestinationAmount, isRearranged]);

    const { data: sourceData } = useBaseTokenInfo(sourceContractSymbol, true);

    const { data: destinationData } = useBaseTokenInfo(
      destinationContractSymbol,
      true
    );

    const isInitialized = !!sourceData && !!destinationData;

    const isDisabledSubmitButton = !sourceAmount || Number(sourceAmount) < 1;

    const onSubmitForm = useCallback(async () => {
      await onSubmit({ sourceAmount, destinationAmount, isRearranged });
    }, [onSubmit, sourceAmount, destinationAmount, isRearranged]);

    return (
      <div className="grid grid-cols-1 gap-4 w-full h-max">
        <h2>{title}</h2>
        {isInitialized ? (
          <>
            {isLoading ? (
              <Loader text={loadingText} />
            ) : (
              <>
                <SourceContract
                  fullContractInfo={sourceData}
                  amount={sourceAmount}
                  onChangeAmount={onChangeSwapAmount}
                />
                {canRearrangeContracts && (
                  <Arrow
                    onClick={toggleIsRearranged}
                    className={styles.buttonRearrange}
                  />
                )}
                <DestinationContract
                  fullContractInfo={destinationData}
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

const useBaseTokenInfo = (
  tokenSymbol: TOKEN_SYMBOLS,
  watch: boolean = false
): { data: BaseContractInfo | undefined; isLoading: boolean } => {
  const [result, setResult] = useState<BaseContractInfo | undefined>();
  const { address } = useAccount();
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address,
    token: TOKEN_ADDRESS[tokenSymbol],
    watch,
  });

  const { data: name, isLoading: isLoadingName } = useContractRead({
    address: TOKEN_ADDRESS[tokenSymbol],
    abi: TOKEN_ABI[tokenSymbol],
    functionName: "name",
  });

  const isLoading = !balance || !name;

  useEffect(() => {
    console.log(balance, name, tokenSymbol);
    if (isLoading) return;

    (async () => {
      const image = undefined;

      setResult({
        name: name as string,
        decimals: balance.decimals.toString(),
        symbol: tokenSymbol,
        balance: balance.formatted,
        image,
      });
    })();
  }, [isLoading]);

  return {
    data: result,
    isLoading,
  };
};
