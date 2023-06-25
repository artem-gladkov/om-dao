import {
  arbitrum,
  arbitrumGoerli,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { isProd } from "./env";

export const PROD_CHAINS = [mainnet, polygon, bsc, arbitrum];
export const DEV_CHAINS = [goerli, polygonMumbai, bscTestnet, arbitrumGoerli];
export const AVAILABLE_CHAINS = isProd() ? PROD_CHAINS : DEV_CHAINS;
