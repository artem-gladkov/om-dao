import React, { FC } from "react";
import classNames from "classnames";
import { TokenAddButton } from "./TokenAddButton";
import { TOKEN_SYMBOLS } from "../../../entities";
import { useTranslation } from "react-i18next";

export interface ITokenAddButtonsProps {
  className?: string;
}

export const TokenAddButtons: FC<ITokenAddButtonsProps> = ({ className }) => {
  const { t } = useTranslation();
  const isShowButtons = window.ethereum?.isMetaMask;

  return isShowButtons ? (
    <div
      className={classNames(
        "grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4",
        className
      )}
    >
      <TokenAddButton
        className="w-full"
        text={t("common.addToken", {
          symbol: TOKEN_SYMBOLS.OMD,
          walletName: "MetaMask",
        })}
        tokenSymbol={TOKEN_SYMBOLS.OMD}
      />
      <TokenAddButton
        className="w-full"
        text={t("common.addToken", {
          symbol: TOKEN_SYMBOLS.STOMD,
          walletName: "MetaMask",
        })}
        tokenSymbol={TOKEN_SYMBOLS.STOMD}
      />
    </div>
  ) : (
    <></>
  );
};
