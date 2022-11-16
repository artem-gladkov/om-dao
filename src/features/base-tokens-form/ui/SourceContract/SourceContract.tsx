import { ChangeEvent, FC } from "react";
import classNames from "classnames";

import styles from "./SourceContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { FullContractInfo } from "../../types";

export interface SourceContractProps {
  fullContractInfo: FullContractInfo;
  amount: string;
  onChangeAmount: (value: string) => void;
  className?: string;
}

export const SourceContract: FC<SourceContractProps> = ({
  className,
  onChangeAmount,
  amount,
  fullContractInfo: { contract, ...restContractInfo },
  ...otherProps
}) => {
  return (
    <div
      className={classNames(styles.sourceContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title="Вы отдаете"
        token={restContractInfo}
        contract={contract}
        amount={amount}
        onChangeAmount={onChangeAmount}
      />
    </div>
  );
};
