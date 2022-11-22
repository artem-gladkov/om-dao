import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

import styles from "./Wallet.module.scss";

export interface WalletProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  image: { src: string; alt?: string };
}

export const Wallet: FC<WalletProps> = ({
  name,
  image,
  className,
  ...otherProps
}) => {
  return (
    <button
      key={name}
      className={classNames(styles.wallet, className)}
      {...otherProps}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.image}>
        <img {...image} />
      </div>
    </button>
  );
};
