import {FC, ReactElement} from "react";
import {EthereumStoreContext} from "../hooks";
import {EthereumStore} from "../model";

export interface EthereumStoreProviderProps {
  ethereumStore: EthereumStore
  children: ReactElement
}

export const EthereumStoreProvider: FC<EthereumStoreProviderProps> = ({children, ethereumStore}) => {
  return (
    <EthereumStoreContext.Provider value={{ethereumStore}}>
      {children}
    </EthereumStoreContext.Provider>
  )
}
