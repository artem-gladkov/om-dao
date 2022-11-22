import React, { FC } from "react";
import { TokenAddButton } from "../../../features/add-token-to-metamask";
import { TOKEN_SYMBOLS } from "../../../entities";

export interface IFooterProps {}

export const Footer: FC<IFooterProps> = () => {
  return (
    <footer className="p-4">
      <div className="container mx-auto w-full">
        <div className="flex flex-col w-full gap-4 max-w-xl mx-auto">
          <TokenAddButton
            className="w-max mx-auto w-full"
            text={`Добавить токен ${TOKEN_SYMBOLS.OMD} в MetaMask`}
            tokenSymbol={TOKEN_SYMBOLS.OMD}
          />
          <TokenAddButton
            className="w-max mx-auto w-full"
            text={`Добавить токен ${TOKEN_SYMBOLS.STOMD} в MetaMask`}
            tokenSymbol={TOKEN_SYMBOLS.STOMD}
          />
        </div>
      </div>
    </footer>
  );
};
