import { Contract } from "@ethersproject/contracts";
import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS } from "../../../entities";
import { JsonRpcSigner } from "@ethersproject/providers";
import { BaseTokensFormSubmitData } from "../../base-tokens-form/types";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { makeAutoObservable } from "mobx";
import { OperationStatus } from "../../../shared/types";

export class StakeFormStore {
  private readonly _sourceContract: Contract;

  private readonly _destinationContract: Contract;

  private _unStakeDate: Date | undefined;

  private _status: OperationStatus = OperationStatus.READY;

  constructor(private _signer: JsonRpcSigner) {
    makeAutoObservable(this);

    this._sourceContract = new Contract(
      TOKEN_ADDRESS[TOKEN_SYMBOLS.OMD],
      TOKEN_ABI[TOKEN_SYMBOLS.OMD],
      _signer
    );

    this._destinationContract = new Contract(
      TOKEN_ADDRESS[TOKEN_SYMBOLS.STOMD],
      TOKEN_ABI[TOKEN_SYMBOLS.STOMD],
      _signer
    );

    this.fetchUnStakeDate();
  }

  public onStake = async ({
    sourceAmount,
  }: BaseTokensFormSubmitData): Promise<void> => {
    if (this.isStakeDisabled) {
      return;
    }

    this.status = OperationStatus.STARTING;
    await this.stakeToken(sourceAmount);
  };

  private fetchUnStakeDate = async (): Promise<void> => {
    try {
      const timestamp =
        Number(formatUnits(await this.destinationContract.divDate(), 0)) * 1000;
      this.unStakeDate = new Date(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  private stakeToken = async (amount: string): Promise<void> => {
    try {
      const symbol = await this.destinationContract.symbol();
      const decimals = await this.destinationContract.decimals();
      const unit256Amount = parseUnits(amount, decimals);

      this.status = OperationStatus.AWAITING_CONFIRM;
      const approveTransaction = await this.sourceContract.approve(
        this.destinationContract.address,
        unit256Amount
      );

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await approveTransaction.wait();

      this.status = OperationStatus.AWAITING_CONFIRM;
      const stakeTransaction = await this.destinationContract.stake(
        unit256Amount
      );

      this.status = OperationStatus.AWAITING_BLOCK_MINING;
      await stakeTransaction.wait();

      const event = new CustomEvent(`need-update-${symbol}`);
      document.dispatchEvent(event);

      this.status = OperationStatus.SUCCESS;
    } catch (e) {
      this.status = OperationStatus.ERROR;
      console.log(e);
    }
  };

  public get sourceContract(): Contract {
    return this._sourceContract;
  }

  public get destinationContract(): Contract {
    return this._destinationContract;
  }

  public get status(): OperationStatus {
    return this._status;
  }

  public get unStakeDate(): Date | undefined {
    return this._unStakeDate;
  }

  private set status(value: OperationStatus) {
    this._status = value;
  }

  private set unStakeDate(value: Date | undefined) {
    this._unStakeDate = value;
  }

  public get isStakeDisabled(): boolean {
    return this.unStakeDate ? Date.now() > this.unStakeDate.getTime() : true;
  }

  public get isStaking(): boolean {
    return [
      OperationStatus.STARTING,
      OperationStatus.AWAITING_CONFIRM,
      OperationStatus.AWAITING_BLOCK_MINING,
    ].includes(this._status);
  }
}
