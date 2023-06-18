import {FC, useTransition} from "react";
import classNames from "classnames";

import styles from "./SourceContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { BaseContractInfo, FullContractInfo } from "../../types";
import {useTranslation} from "react-i18next";

export interface SourceContractProps {
  fullContractInfo: BaseContractInfo;
  amount: string;
  onChangeAmount: (value: string) => void;
  exchangeRate?: string;
  className?: string;
  maxCount?: string;
}

export const SourceContract: FC<SourceContractProps> = ({
  className,
  onChangeAmount,
  amount,
  fullContractInfo,
  exchangeRate,
  maxCount,
  ...otherProps
}) => {
  const {t} = useTranslation()

  return (
    <div
      className={classNames(styles.sourceContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title={t("common.form.youGive")}
        token={fullContractInfo}
        amount={amount}
        onChangeAmount={onChangeAmount}
        exchangeRate={exchangeRate}
        maxCount={maxCount}
      />
    </div>
  );
};
