import {FC, HTMLProps, useState} from 'react'

import {EthereumStore, EthereumStoreProvider} from "./entities";
import {RouterProvider} from "react-router";
import {appRouter} from "./router";

export interface AppProps extends HTMLProps<any> {
}

export const App: FC<AppProps> = ({className, children, ...otherProps}) => {
  const [ethereumStore] = useState(() => new EthereumStore())

  return (
    <EthereumStoreProvider ethereumStore={ethereumStore}>
      <RouterProvider router={appRouter}/>
    </EthereumStoreProvider>
  )
}

