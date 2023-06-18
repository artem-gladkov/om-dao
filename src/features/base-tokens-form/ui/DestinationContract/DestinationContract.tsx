import { FC } from "react";
import classNames from "classnames";

import styles from "./DestinationContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { BaseContractInfo, FullContractInfo } from "../../types";
import {useTranslation} from "react-i18next";

export interface DestinationContractProps {
  className?: string;
  fullContractInfo: BaseContractInfo;
  amount: string;

  exchangeRate?: string;
  maxCount?: string;
}

export const DestinationContract: FC<DestinationContractProps> = ({
  className,
  amount,
  fullContractInfo,
  exchangeRate,
  maxCount,
  ...otherProps
}) => {
  const {t} = useTranslation()

  return (
    <div
      className={classNames(styles.destinationContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title={t("common.form.youGet")}
        token={fullContractInfo}
        readonlyAmount
        amount={amount}
        exchangeRate={exchangeRate}
        maxCount={maxCount}
      />
    </div>
  );
};
