import React, { FC } from "react";
import { TokenAddButton } from "../../../features/add-token-to-metamask";
import { TOKEN_SYMBOLS } from "../../../entities";
import { useTranslation } from "react-i18next";

export const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container mx-auto w-full p-4 max-w-2xl">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
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
      </div>
    </footer>
  );
};
