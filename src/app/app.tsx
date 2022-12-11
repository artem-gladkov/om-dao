import {FC, useEffect, useState} from "react";

import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { appRouter } from "../router";
import { RouterProvider } from "react-router";
import { Web3Modal } from "@web3modal/react";

import { isProd, WALLET_CONNECT_PROJECT_ID } from "../shared/config";
import { EthereumStore, EthereumStoreProvider } from "../entities";

const AVAILABLE_CHAINS = [isProd() ? mainnet : goerli];

export const App: FC = () => {
  const [{ ethereumClient, wagmiClient }] = useState(createClients);
  const [ethereumStore] = useState(() => new EthereumStore());

  return (
    <EthereumStoreProvider ethereumStore={ethereumStore}>
      <>
        <WagmiConfig client={wagmiClient}>
          <RouterProvider router={appRouter} />
        </WagmiConfig>
        <Web3Modal
          projectId={WALLET_CONNECT_PROJECT_ID}
          ethereumClient={ethereumClient}
          themeMode="dark"
          themeColor="magenta"
          themeBackground="themeColor"
        />
      </>
    </EthereumStoreProvider>
  );
};

function createClients() {
  const { provider } = configureChains(AVAILABLE_CHAINS, [
    walletConnectProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      appName: "web3Modal",
      chains: AVAILABLE_CHAINS,
    }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, AVAILABLE_CHAINS);

  return { ethereumClient, wagmiClient };
}
