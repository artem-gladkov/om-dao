import { FC } from "react";
import classNames from "classnames";

import styles from "./DestinationContract.module.scss";
import { ContractBlock } from "../ContractBlock";
import { FullContractInfo } from "../../types";

export interface DestinationContractProps {
  className?: string;
  fullContractInfo: FullContractInfo;
  amount: string;
}

export const DestinationContract: FC<DestinationContractProps> = ({
  className,
  amount,
  fullContractInfo: { contract, ...restContractProps },
  ...otherProps
}) => {
  return (
    <div
      className={classNames(styles.destinationContract, className)}
      {...otherProps}
    >
      <ContractBlock
        title="Вы получаете"
        token={restContractProps}
        readonlyAmount
        amount={amount}
      />
    </div>
  );
};
