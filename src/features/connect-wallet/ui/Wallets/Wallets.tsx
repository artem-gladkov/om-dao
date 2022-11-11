import { FC, HTMLProps } from "react";
import classNames from "classnames";
import MetamaskImg from "../../../../app/images/metamask.png";

import styles from "./Wallets.module.scss";
import { Wallet, WalletProps } from "..";

const WALLETS: WalletProps[] = [
  {
    name: "Metamask",
    image: { src: MetamaskImg, alt: "Значек Metamask в виде лисы" },
  },
];

export interface WalletsProps extends HTMLProps<HTMLDivElement> {
  onClickWallet: (event: any) => void;
}

export const Wallets: FC<WalletsProps> = ({
  className,
  onClickWallet,
  children,
  ...otherProps
}) => {
  return (
    <div className={classNames(styles.wallets, className)} {...otherProps}>
      {WALLETS.map(({ name, ...props }) => (
        <Wallet key={name} name={name} onClick={onClickWallet} {...props} />
      ))}
    </div>
  );
};
