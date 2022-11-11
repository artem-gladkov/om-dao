import { Contract } from "@ethersproject/contracts";
import { BaseTokenInfo } from "../../../entities/token/types";

export interface BaseContractInfo extends Omit<BaseTokenInfo, "address"> {
  balance: string;
  image?: string;
}

export interface FullContractInfo extends BaseContractInfo {
  contract: Contract;
}

export interface BaseTokensFormSubmitData {
  isRearranged: boolean;
  sourceAmount: string;
  destinationAmount: string;
}
