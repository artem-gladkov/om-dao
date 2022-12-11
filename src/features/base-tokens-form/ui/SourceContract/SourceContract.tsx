import { FC } from "react";
import classNames from "classnames";

import styles from "./SourceContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { BaseContractInfo, FullContractInfo } from "../../types";

export interface SourceContractProps {
  fullContractInfo: BaseContractInfo;
  amount: string;
  onChangeAmount: (value: string) => void;
  className?: string;
}

export const SourceContract: FC<SourceContractProps> = ({
  className,
  onChangeAmount,
  amount,
  fullContractInfo,
  ...otherProps
}) => {
  return (
    <div
      className={classNames(styles.sourceContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title="Вы отдаете"
        token={fullContractInfo}
        amount={amount}
        onChangeAmount={onChangeAmount}
      />
    </div>
  );
};
