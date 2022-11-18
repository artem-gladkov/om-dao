import { FC, HTMLProps, useState } from "react";

import { EthereumStore, EthereumStoreProvider } from "../entities";
import { RouterProvider } from "react-router";
import { appRouter } from "../router";
import { Loader } from "../shared/ui";
import { observer } from "mobx-react-lite";
import { WrongNetworkOverlay } from "../widgets/wrong-network-overlay";

export interface AppProps extends HTMLProps<any> {}

export const App: FC<AppProps> = observer(({ className, children }) => {
  const [ethereumStore] = useState(() => new EthereumStore());
  const { initialized, isCorrectNetwork } = ethereumStore;

  if (!initialized) {
    return <Loader />;
  }

  return (
    <EthereumStoreProvider ethereumStore={ethereumStore}>
      {isCorrectNetwork ? (
        <RouterProvider router={appRouter} />
      ) : (
        <WrongNetworkOverlay />
      )}
    </EthereumStoreProvider>
  );
});
