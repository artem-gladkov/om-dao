import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS } from "../../../entities";
import { formatUnits } from "@ethersproject/units";
import { format } from "date-fns";
import { makeAutoObservable } from "mobx";
import { OperationStatus } from "../../../shared/types";
import { UNSTAKE_STATUS_LABELS } from "../constants";

export class UnstakeFormStore {
  private _inStake: string = "";

  private _dividends: string = "";

  private _unstakeDate: Date = new Date();

  private _isLoading: boolean = true;

  private _stakeContract: Contract;

  private _unStakeContract: Contract;

  private _status: OperationStatus = OperationStatus.READY;

  constructor(
    private _signer: JsonRpcSigner,
    private _stakeTokenSymbol: TOKEN_SYMBOLS = TOKEN_SYMBOLS.STOMD,
    private _unstakeTokenSymbol: TOKEN_SYMBOLS = TOKEN_SYMBOLS.OMD
  ) {
    makeAutoObservable(this);

    this._stakeContract = new Contract(
      TOKEN_ADDRESS[_stakeTokenSymbol],
      TOKEN_ABI[_stakeTokenSymbol],
      _signer
    );
    this._unStakeContract = new Contract(
      TOKEN_ADDRESS[_unstakeTokenSymbol],
      TOKEN_ABI[_unstakeTokenSymbol],
      _signer
    );

    this.fetchUnStakeInfo();
  }

  private fetchUnStakeInfo = async (): Promise<void> => {
    try {
      await this.fetchBalance();
      await this.fetchUnStakeDate();
      await this.fetchDividends();
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  private fetchBalance = async (): Promise<void> => {
    try {
      const decimals = await this._stakeContract.decimals();
      const signerAddress = await this._signer.getAddress();
      const balance = await this._stakeContract.balanceOf(signerAddress);

      this.inStake = formatUnits(balance, decimals);
    } catch (e) {
      console.log(e);
    }
  };

  private fetchDividends = async (): Promise<void> => {
    try {
      const address = await this._signer.getAddress();
      const decimals = await this._unStakeContract.decimals();

      this.dividends = formatUnits(
        await this._stakeContract.myDivs(address),
        decimals
      );
    } catch (e) {
      console.log(e);
      this.dividends = "0";
    }
  };

  private fetchUnStakeDate = async (): Promise<void> => {
    try {
      const timestamp =
        Number(formatUnits(await this._stakeContract.divDate(), 0)) * 1000;
      this.unstakeDate = new Date(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  public onUnStake = async (): Promise<void> => {
    this.isLoading = true;

    try {
      const symbol = await this._stakeContract.symbol();

      this.status = OperationStatus.AWAITING_CONFIRM;
      const unStakeTransaction = await this._stakeContract.unstake();

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await unStakeTransaction.wait();

      const event = new CustomEvent(`need-update-${symbol}`);
      document.dispatchEvent(event);

      await this.fetchUnStakeInfo();
      this.status = OperationStatus.SUCCESS;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  public get totalAmount(): string {
    return (+this._inStake + +this._dividends).toString();
  }

  public get dividends(): string {
    return this._dividends.toString();
  }

  public get inStake(): string {
    return this._inStake;
  }

  public get formattedUnstakeDate(): string {
    return format(this._unstakeDate, "dd.MM.yyyy в  HH:mm");
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public get status(): OperationStatus {
    return this._status;
  }

  public get loadingText(): string {
    return UNSTAKE_STATUS_LABELS[this.status];
  }

  public get isUnStakeDisabled(): boolean {
    return this._unstakeDate && Date.now() < this._unstakeDate.getTime();
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set inStake(value: string) {
    this._inStake = value;
  }

  private set dividends(value: string) {
    this._dividends = value;
  }

  private set unstakeDate(value: Date) {
    this._unstakeDate = value;
  }

  private set status(value: OperationStatus) {
    this._status = value;
  }
}
