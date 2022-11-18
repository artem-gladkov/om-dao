import { EChainId } from "../config";

export const NETWORK_NAMES: { [key in EChainId]: string } = {
  [EChainId.GOERLI]: "Goerli",
  [EChainId.MAINNET]: "Mainnet",
};
