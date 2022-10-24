import {ContractInterface} from "@ethersproject/contracts";
import {USDT_ABI, OMDAO_ABI, OMDAO_STAKE_ABI} from "./contracts-abi";

export enum TOKEN_SYMBOLS {
  USDT='USDT',
  OMD='OMD',
  STOMD='STOMD'
}

export const TOKEN_ADDRESS: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: '0xfE09A8E5127232899fd0403D29Bff9a9c1cA0BdD',
  [TOKEN_SYMBOLS.OMD]: '0x53ef682b4BB9f21E7d38318ee00A8e2C1AB02d21',
  [TOKEN_SYMBOLS.STOMD]: '0x64ED6E7882BABFfA78F11FD79ED874922d93c906',
}

export const TOKEN_ABI: { [key in TOKEN_SYMBOLS]: ContractInterface } = {
  [TOKEN_SYMBOLS.USDT]: USDT_ABI,
  [TOKEN_SYMBOLS.OMD]: OMDAO_ABI,
  [TOKEN_SYMBOLS.STOMD]: OMDAO_STAKE_ABI,
}


export const TOKEN_NAME: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: 'Tether USD',
  [TOKEN_SYMBOLS.OMD]: 'OM DAO',
  [TOKEN_SYMBOLS.STOMD]: 'OM DAO (Staked)',
}

export const TOKEN_DECIMAL: { [key in TOKEN_SYMBOLS]: string } = {
  [TOKEN_SYMBOLS.USDT]: '6',
  [TOKEN_SYMBOLS.OMD]: '6',
  [TOKEN_SYMBOLS.STOMD]: '6',
}

