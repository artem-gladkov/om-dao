import { FC } from "react";
import classNames from "classnames";

import styles from "./DestinationContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { BaseContractInfo, FullContractInfo } from "../../types";

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
  return (
    <div
      className={classNames(styles.destinationContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title="Вы получаете"
        token={fullContractInfo}
        readonlyAmount
        amount={amount}
        exchangeRate={exchangeRate}
        maxCount={maxCount}
      />
    </div>
  );
};
