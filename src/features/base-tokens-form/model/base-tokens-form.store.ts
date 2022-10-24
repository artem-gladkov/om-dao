import {Contract} from "@ethersproject/contracts";
import {JsonRpcSigner} from "@ethersproject/providers";
import {makeAutoObservable} from "mobx";
import {BaseContractInfo, FullContractInfo} from "../types";

import {formatUnits} from "@ethersproject/units";
import {DEFAULT_TOKEN_INFO} from "../constants";

export class BaseTokensFormStore {
  private _sourceAmount: string = '0'

  private _sourceContract: Contract

  private _sourceContractData: BaseContractInfo = DEFAULT_TOKEN_INFO

  private _destinationContract: Contract

  private _destinationContractData: BaseContractInfo = DEFAULT_TOKEN_INFO

  private _isRearranged: boolean = false;

  private _isInitialized: boolean = false;

  constructor(
    private _signer: JsonRpcSigner,
    sourceContract: Contract,
    destinationContract: Contract,
    private calculateDestinationAmount?: (sourceAmount: string, isRearranged: boolean) => string)
  {
    makeAutoObservable(this)
    this._sourceContract = sourceContract
    this._destinationContract = destinationContract

    this.init()
  }

  protected init = async (): Promise<void> => {
    try {
      this.sourceContractData = {
        ...await this.fetchContractData(this._sourceContract),
      }

      this.destinationContractData = await this.fetchContractData(this._destinationContract)

      this.isInitialized = true
    } catch (e) {
      console.log(e)
    }
  }

  private fetchContractData = async (contract: Contract): Promise<BaseContractInfo> => {
    try {
      const decimals = await contract.decimals()
      const signerAddress = await this._signer.getAddress()
      const balance = formatUnits(await contract.balanceOf(signerAddress), decimals)

      return {
        name: await contract.name(),
        symbol: await contract.symbol(),
        decimals,
        balance
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  public onChangeSwapAmount = (value: string): void => {
    this.sourceAmount = value
  }

  public onRearrangeContracts = (): void => {
    const temp = this._sourceContract
    this.sourceContract = this._destinationContract
    this.destinationContract = temp

    const tempData = this._sourceContractData
    this.sourceContractData = this._destinationContractData
    this.destinationContractData = tempData

    this.isRearranged = !this.isRearranged
  }


  private set sourceContract(value: Contract) {
    this._sourceContract = value
  }

  private set destinationContract(value: Contract) {
    this._destinationContract = value
  }

  public get fullSourceContractInfo(): FullContractInfo {
    return {
      ...this._sourceContractData,
      contract: this._sourceContract
    }
  }

  public get fullDestinationContractInfo(): FullContractInfo {
    return {
      ...this._destinationContractData,
      contract: this._destinationContract
    }
  }

  public get sourceAmount(): string {
    return this._sourceAmount.toString()
  }

  private set sourceAmount(value: string) {
    this._sourceAmount = value
  }

  public get isDisabledSubmitButton(): boolean {
    return !this.sourceAmount || Number(this.sourceAmount) <= 0
  }

  private set sourceContractData(value: BaseContractInfo) {
    this._sourceContractData = value
  }

  private set destinationContractData(value: BaseContractInfo) {
    this._destinationContractData = value
  }

  public get isRearranged() {
    return this._isRearranged
  }

  private set isRearranged(value: boolean) {
    this._isRearranged = value
  }

  public get destinationAmount() {
    return this.calculateDestinationAmount ? this.calculateDestinationAmount(this.sourceAmount, this.isRearranged) : this.sourceAmount
  }

  private set isInitialized(value: boolean) {
    this._isInitialized = value
  }

  public get isInitialized(): boolean {
    return this._isInitialized
  }
}
