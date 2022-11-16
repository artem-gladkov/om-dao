import { Contract } from "@ethersproject/contracts";
import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS } from "../../../entities";
import { JsonRpcSigner } from "@ethersproject/providers";
import { BaseTokensFormSubmitData } from "../../base-tokens-form/types";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { makeAutoObservable } from "mobx";
import { OperationStatus } from "../../../shared/types";

export class StakeFormStore {
  private _sourceContract: Contract;

  private _destinationContract: Contract;

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
  }

  public onStake = async ({
    sourceAmount,
  }: BaseTokensFormSubmitData): Promise<void> => {
    this.status = OperationStatus.STARTING;
    await this.stakeToken(sourceAmount);
  };

  private stakeToken = async (amount: string): Promise<void> => {
    try {
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

  private set status(value: OperationStatus) {
    this._status = value;
  }

  public get isStaking(): boolean {
    return [
      OperationStatus.STARTING,
      OperationStatus.AWAITING_CONFIRM,
      OperationStatus.AWAITING_BLOCK_MINING,
    ].includes(this._status);
  }
}
