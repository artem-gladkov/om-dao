import { FC } from "react";
import classNames from "classnames";
import { TokenIcon } from "./TokenIcon";

export interface ITokenProps {
  symbol: string;
  className?: string;
  title?: string;
}

export const Token: FC<ITokenProps> = ({ className, symbol, title }) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      <TokenIcon tokenSymbol={symbol} />
      <div className="">{title ? title : symbol}</div>
    </div>
  );
};
