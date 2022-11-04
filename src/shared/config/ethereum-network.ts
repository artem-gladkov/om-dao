import {isProd} from "./env";

export enum EChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const AVAILABLE_NETWORK = isProd() ? EChainId["MAINNET"] : EChainId["GOERLI"]
