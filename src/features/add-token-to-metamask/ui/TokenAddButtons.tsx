import React, { FC } from "react";
import classNames from "classnames";
import { TokenAddButton } from "./TokenAddButton";
import { TOKEN_SYMBOLS } from "../../../entities";

export interface ITokenAddButtonsProps {
  className?: string;
}

export const TokenAddButtons: FC<ITokenAddButtonsProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        "grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4",
        className
      )}
    >
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.OMD} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.OMD}
      />
      <TokenAddButton
        className="w-full"
        text={`Добавить токен ${TOKEN_SYMBOLS.STOMD} в MetaMask`}
        tokenSymbol={TOKEN_SYMBOLS.STOMD}
      />
    </div>
  );
};
