import {Address} from "wagmi";

export interface BaseTokenInfo {
  name: string;
  symbol: string;
  decimals: string;
  address: Address;
}
