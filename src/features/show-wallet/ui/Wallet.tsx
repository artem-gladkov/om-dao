import { FC, useState } from "react";
import classNames from "classnames";
import metamaskImg from "../../../app/images/metamask.png";

import styles from "./Wallet.module.scss";
import { observer } from "mobx-react-lite";
import { useEthereumStore } from "../../../entities";
import { WalletStore } from "../model";

export interface WalletProps {
  className?: string;
}

export const Wallet: FC<WalletProps> = observer(({ className }) => {
  const {
    ethereumStore: { signer },
  } = useEthereumStore();
  const [{ address }] = useState(() => new WalletStore(signer));

  return (
    <div
      className={classNames(
        styles.wallet,
        className,
        "py-2 px-4 border rounded-md"
      )}
    >
      <img className={styles.image} src={metamaskImg} alt="Metamask" />
      <div className={styles.address}>{address}</div>
    </div>
  );
});
