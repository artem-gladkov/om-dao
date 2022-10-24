import {createContext, useContext} from "react";
import {EthereumStore} from "../model";

export interface EthereumStoreContextValue {
  ethereumStore: EthereumStore;
}

export const EthereumStoreContext = createContext<EthereumStoreContextValue | undefined>(undefined)

export const useEthereumStore = () => {
  const context = useContext(EthereumStoreContext)
  if (context === undefined) {
    throw new Error('useEthereumStore должен вызываться в EthereumStoreContext');
  }
  return context
}

