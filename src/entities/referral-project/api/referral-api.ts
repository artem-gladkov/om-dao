import { httpInstance } from "../../../shared/api";
import {
  IFetchProjectTransactionsRequest, ILastScannedBlock,
  IProjectTransaction,
  IReferralProject,
} from "../types";

class ReferralApi {
  fetchReferralProjects = (
    referral_code: string
  ): Promise<IReferralProject[]> =>
    httpInstance
      .get("tokens/sold_tokens", { params: { referal_code: referral_code } })
      .then((response) => response.data);

  fetchProjectTransactions = (
    params: IFetchProjectTransactionsRequest
  ): Promise<IProjectTransaction[]> =>
    httpInstance
      .get("tokens/transactions", { params })
      .then((response) => response.data);

  fetchLastScannedBlock= (
  ): Promise<ILastScannedBlock> =>
    httpInstance
      .get("tokens/last_scanned_block")
      .then((response) => response.data);
}

export const referralApi = new ReferralApi();
