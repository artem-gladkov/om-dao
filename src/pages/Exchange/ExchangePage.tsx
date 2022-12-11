import React, { FC, useEffect } from "react";

import { SwapForm } from "../../features/swap-tokens";
import { TokenAddButtons } from "../../features/add-token-to-metamask";
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useSigner,
} from "wagmi";
import { OMDAO_ABI } from "../../entities";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { Loader } from "../../shared/ui";
import {JsonRpcSigner} from "@ethersproject/providers";

export const ExchangePage: FC = () => {
  const { data, isLoading, isSuccess } = useSigner();

  return (
    <div className="flex flex-col h-full mx-auto max-w-2xl">
      <div className="flex grow">
        <SwapForm />
      </div>
      <TokenAddButtons className="pb-4" />
    </div>
  );
};
