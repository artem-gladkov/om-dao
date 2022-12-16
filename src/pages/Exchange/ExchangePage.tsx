import React, { FC } from "react";

import { SwapForm } from "../../features/swap-tokens";
import { TokenAddButtons } from "../../features/add-token-to-metamask";

export const ExchangePage: FC = () => {
  return (
    <div className="flex flex-col h-full mx-auto max-w-2xl">
      <div className="flex grow">
        <SwapForm />
      </div>
      <TokenAddButtons className="pb-4" />
    </div>
  );
};
