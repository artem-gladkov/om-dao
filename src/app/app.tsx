import { FC, HTMLProps, useState } from "react";

import { EthereumStore, EthereumStoreProvider } from "../entities";
import { RouterProvider } from "react-router";
import { appRouter } from "../router";
import { Button, Container, Loader } from "../shared/ui";
import { observer } from "mobx-react-lite";
import { AVAILABLE_NETWORK } from "../shared/config";

export interface AppProps extends HTMLProps<any> {}

export const App: FC<AppProps> = observer(
  ({ className, children, ...otherProps }) => {
    const [ethereumStore] = useState(() => new EthereumStore());
    const { initialized, isCorrectNetwork, changeToAvailableNetwork } =
      ethereumStore;

    return (
      <EthereumStoreProvider ethereumStore={ethereumStore}>
        {initialized ? (
          <>
            {isCorrectNetwork ? (
              <RouterProvider router={appRouter} />
            ) : (
              /*TODO Вынести в компонент*/
              <div className={"appNetworkAlert"}>
                <Container>
                  <div>
                    <h1>
                      Для работы приложения необходима сеть {AVAILABLE_NETWORK}
                    </h1>
                    <Button onClick={changeToAvailableNetwork}>
                      Сменить сеть на {AVAILABLE_NETWORK}
                    </Button>
                  </div>
                </Container>
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </EthereumStoreProvider>
    );
  }
);
