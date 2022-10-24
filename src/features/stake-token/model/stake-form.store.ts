import {Contract} from "@ethersproject/contracts";
import {TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS} from "../../../entities";
import {JsonRpcSigner} from "@ethersproject/providers";
import {BaseTokensFormSubmitData} from "../../base-tokens-form/types";
import {formatUnits, parseUnits} from "@ethersproject/units";
import {OperationStatus} from "../types";
import {makeAutoObservable} from "mobx";
import {log} from "util";

export class StakeFormStore {
  private _sourceContract: Contract

  private _destinationContract: Contract

  private _status: OperationStatus = OperationStatus.READY;

  constructor(private _signer: JsonRpcSigner) {
    makeAutoObservable(this)
    this._sourceContract = new Contract(TOKEN_ADDRESS[TOKEN_SYMBOLS.OMD], TOKEN_ABI[TOKEN_SYMBOLS.OMD], _signer)
    this._destinationContract = new Contract(TOKEN_ADDRESS[TOKEN_SYMBOLS.STOMD], TOKEN_ABI[TOKEN_SYMBOLS.STOMD], _signer)
    this._destinationContract.myDivs().then((resp: any) => console.log(formatUnits(resp, 6)))
  }

  public onStake = async ({destinationAmount, sourceAmount, isRearranged}: BaseTokensFormSubmitData): Promise<void> => {
    this.status = OperationStatus.STARTING

    if (isRearranged) {
      await this.unstakeToken()
    } else {
      await this.stakeToken(sourceAmount)
    }
  }

  private stakeToken = async (amount: string): Promise<void> => {
    try {
      const decimals = await this.destinationContract.decimals()
      const unit256Amount = parseUnits(amount, decimals)

      this.status = OperationStatus.AWAITING_CONFIRM
      const approveTransaction = await this.sourceContract.approve(this.destinationContract.address, unit256Amount)

      this.status = OperationStatus.AWAITING_BLOCK_MINING
      await approveTransaction.wait()

      this.status = OperationStatus.AWAITING_CONFIRM
      const stakeTransaction = await this.destinationContract.stake(unit256Amount)

      this.status = OperationStatus.AWAITING_BLOCK_MINING
      await stakeTransaction.wait()

      this.status = OperationStatus.SUCCESS
    } catch (e) {
      this.status = OperationStatus.ERROR
      console.log(e)
    }
  }

  private unstakeToken = async (): Promise<void> => {
    try {
      this.status = OperationStatus.AWAITING_CONFIRM
      const unstakeTransaction = await this.destinationContract.unstake()
      this.status = OperationStatus.AWAITING_BLOCK_MINING
      await unstakeTransaction.wait()
      this.status = OperationStatus.SUCCESS
    } catch (e) {
      console.log(e)
    }
  }

  public calculateDestinationAmount = (sourceAmount: string, isRearranged: boolean): string => {
    if (isRearranged) {
      return this.calculateUnstakeDestinationAmount(sourceAmount)
    } else {
      return this.calculateStakeDestinationAmount(sourceAmount)
    }
  }

  public calculateStakeDestinationAmount = (sourceAmount: string): string => {
    return sourceAmount
  }

  public calculateUnstakeDestinationAmount = (sourceAmount: string): string => {
    return sourceAmount
  }

  private set sourceContract(value: Contract) {
    this._sourceContract = value
  }

  public get sourceContract(): Contract {
    return this._sourceContract
  }

  private set destinationContract(value: Contract) {
    this._destinationContract = value
  }

  public get destinationContract(): Contract {
    return this._destinationContract
  }


  public get status(): OperationStatus {
    return this._status
  }

  private set status(value: OperationStatus) {
    this._status = value
  }

  public get isStaking(): boolean {
    return [
      OperationStatus.STARTING,
      OperationStatus.AWAITING_CONFIRM,
      OperationStatus.AWAITING_BLOCK_MINING
    ].includes(this._status)
  }
}
