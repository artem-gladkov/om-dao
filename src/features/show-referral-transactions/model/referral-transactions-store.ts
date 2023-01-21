import {
  IFetchProjectTransactionsRequest,
  IProjectTransaction,
  referralApi,
} from "../../../entities/referral-project";
import { makeAutoObservable } from "mobx";

export class ReferralTransactionsStore {
  private _transactions: IProjectTransaction[] = [];
  private _isFetchingTransactions = false;
  private _lastScannedBlock: number = -1;

  constructor(requestParams: IFetchProjectTransactionsRequest) {
    makeAutoObservable(this);

    this.init(requestParams);
  }

  init = (requestParams: IFetchProjectTransactionsRequest) => {
    this.fetchTransactions(requestParams);
    this.fetchLastScannedBlock();
  };

  fetchTransactions = async (
    requestParams: IFetchProjectTransactionsRequest
  ) => {
    try {
      this._isFetchingTransactions = true;
      const data = await referralApi.fetchProjectTransactions(requestParams);
      this._transactions = data;
    } catch (e) {
      console.log(e);
    } finally {
      this._isFetchingTransactions = false;
    }
  };

  fetchLastScannedBlock = async () => {
    try {
      const { lastScannedBlock } = await referralApi.fetchLastScannedBlock();
      this._lastScannedBlock = lastScannedBlock;
    } catch (e) {
      console.log(e);
    }
  };

  get transactions(): IProjectTransaction[] {
    return this._transactions;
  }

  get lastScannedBlockId(): number {
    return this._lastScannedBlock;
  }

  get isFetchingTransactions(): boolean {
    return this._isFetchingTransactions;
  }
}
