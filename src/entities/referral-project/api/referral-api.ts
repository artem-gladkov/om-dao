import { httpInstance } from "../../../shared/api";

export interface IReferralProject {
  symbol: string;
  amount: string;
}
class ReferralApi {
  fetchReferralProjects = (
    referral_code: string
  ): Promise<IReferralProject[]> =>
    httpInstance
      .get("tokens/sold_tokens", { params: { referal_code: referral_code } })
      .then((response) => response.data);
}

export const referralApi = new ReferralApi();
