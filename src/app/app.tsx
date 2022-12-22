import { FC, useState } from "react";

import { WagmiConfig } from "wagmi";

import { appRouter } from "../router";
import { RouterProvider } from "react-router";
import { Web3Modal } from "@web3modal/react";

import { WALLET_CONNECT_PROJECT_ID } from "../shared/config";
import { RootStore } from "./root-store";
import { RootStoreProvider } from "./root-store-provider";
import { Loader } from "../shared/ui";
import { observer } from "mobx-react-lite";

export const App: FC = observer(() => {
  const [rootStore] = useState(() => new RootStore());
  const { isAppInitialized, ethereumClient, wagmiClient } = rootStore;

  return (
    <RootStoreProvider rootStore={rootStore}>
      {isAppInitialized ? (
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
      ) : (
        <Loader />
      )}
    </RootStoreProvider>
  );
});
