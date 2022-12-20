import { createContext } from "react";
import { RootStore } from "./root-store";

export const RootStoreContext = createContext<RootStore | undefined>(undefined);

