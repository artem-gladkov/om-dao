import { ContractInterface } from "@ethersproject/contracts";
import {
  USDT_ABI,
  OMDAO_ABI,
  OMDAO_STAKE_ABI,
  TIGR_ABI,
} from "./contracts-abi";
import { isProd } from "../../../shared/config";

export enum TOKEN_SYMBOLS {
  USDT = "USDT",
  OMD = "OMD",
  STOMD = "stOMD",
  TIGR = "omdwTigr",
}

export const TOKEN_ADDRESS: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: isProd()
    ? "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    : "0x8B31e3910f59A0975253D3f2f6C6e7D8F7caC144",
  [TOKEN_SYMBOLS.OMD]: isProd()
    ? "0xA4282798c2199a1C58843088297265acD748168c"
    : "0x2d3F3Bf3997b5601D7f4f3E932912886C4c15F29",
  [TOKEN_SYMBOLS.STOMD]: isProd()
    ? "0x497bdbA917430E72d09993a55cdBBD411763168B"
    : "0xD9e8F04c685b2C12027f08b71e8f3fEF6a9A6668",
  [TOKEN_SYMBOLS.TIGR]: isProd()
    ? ""
    : "0x9a4d39F46044400Aa48Ab528f8EC3DD3B793f885",
};

export const TOKEN_ABI: { [key in TOKEN_SYMBOLS]: ContractInterface } = {
  [TOKEN_SYMBOLS.USDT]: USDT_ABI,
  [TOKEN_SYMBOLS.OMD]: OMDAO_ABI,
  [TOKEN_SYMBOLS.STOMD]: OMDAO_STAKE_ABI,
  [TOKEN_SYMBOLS.TIGR]: TIGR_ABI,
};

export const TOKEN_NAME: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: "Tether USD",
  [TOKEN_SYMBOLS.OMD]: "OM DAO",
  [TOKEN_SYMBOLS.STOMD]: "OM DAO (Staked)",
  [TOKEN_SYMBOLS.TIGR]: "OM DAO Wrapped Tigr",
};

export const TOKEN_DECIMAL: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: "6",
  [TOKEN_SYMBOLS.OMD]: "6",
  [TOKEN_SYMBOLS.STOMD]: "6",
  [TOKEN_SYMBOLS.TIGR]: "6",
};
