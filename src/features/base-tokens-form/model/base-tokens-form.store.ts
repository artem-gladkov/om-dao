import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner } from "@ethersproject/providers";
import { makeAutoObservable } from "mobx";
import { BaseContractInfo, FullContractInfo } from "../types";

import { formatUnits } from "@ethersproject/units";
import { DEFAULT_TOKEN_INFO } from "../constants";

export class BaseTokensFormStore {
  private _sourceAmount: string = "0";

  private _sourceContract: Contract;

  private _sourceContractData: BaseContractInfo = DEFAULT_TOKEN_INFO;

  private _destinationContract: Contract;

  private _destinationContractData: BaseContractInfo = DEFAULT_TOKEN_INFO;

  private _isRearranged: boolean = false;

  private _isInitialized: boolean = false;

  constructor(
    private _signer: JsonRpcSigner,
    sourceContract: Contract,
    destinationContract: Contract,
    private calculateDestinationAmount?: (
      sourceAmount: string,
      isRearranged: boolean
    ) => string
  ) {
    makeAutoObservable(this);

    this._sourceContract = sourceContract;
    this._destinationContract = destinationContract;

    this.init();
  }

  protected init = async (): Promise<void> => {
    try {
      this.sourceContractData = await this.fetchContractData(
        this._sourceContract
      );

      this.destinationContractData = await this.fetchContractData(
        this._destinationContract
      );

      this.isInitialized = true;
    } catch (e) {
      console.log(e);
    }
  };

  private fetchContractData = async (
    contract: Contract
  ): Promise<BaseContractInfo> => {
    try {
      const symbol = await contract.symbol();
      const image = await import(
        `/src/app/images/tokens/${symbol.toLowerCase()}.webp`
      )
        .then((module) => module.default)
        .catch(() => "");

      const decimals = await contract.decimals();
      const signerAddress = await this._signer.getAddress();
      const balance = formatUnits(
        await contract.balanceOf(signerAddress),
        decimals
      );

      return {
        name: await contract.name(),
        symbol,
        decimals,
        balance,
        image,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  public onRearrangeContracts = (): void => {
    const temp = this._sourceContract;
    this.sourceContract = this._destinationContract;
    this.destinationContract = temp;

    const tempData = this._sourceContractData;
    this.sourceContractData = this._destinationContractData;
    this.destinationContractData = tempData;

    this.isRearranged = !this.isRearranged;
  };

  public updateBalances = async (): Promise<void> => {
    try {
      await this.updateSourceBalance();
      await this.updateDestinationBalance();
    } catch (e) {
      console.log(e);
    }
  };

  public updateSourceBalance = async (): Promise<void> => {
    try {
      const signerAddress = await this._signer.getAddress();

      const decimals = await this._sourceContract.decimals();
      const balance = formatUnits(
        await this._sourceContract.balanceOf(signerAddress),
        decimals
      );
      this.sourceContractData = {
        ...this._sourceContractData,
        balance,
      };
    } catch (e) {
      console.log(e);
    }
  };

  public updateDestinationBalance = async (): Promise<void> => {
    try {
      const signerAddress = await this._signer.getAddress();
      const decimals = await this._destinationContract.decimals();
      const balance = formatUnits(
        await this._destinationContract.balanceOf(signerAddress),
        decimals
      );
      this.destinationContractData = {
        ...this._destinationContractData,
        balance,
      };
    } catch (e) {
      console.log(e);
    }
  };

  private set sourceContract(value: Contract) {
    this._sourceContract = value;
  }

  private set destinationContract(value: Contract) {
    this._destinationContract = value;
  }

  public get fullSourceContractInfo(): FullContractInfo {
    return {
      ...this._sourceContractData,
      contract: this._sourceContract,
    };
  }

  public get fullDestinationContractInfo(): FullContractInfo {
    return {
      ...this._destinationContractData,
      contract: this._destinationContract,
    };
  }

  public get sourceAmount(): string {
    return this._sourceAmount.toString();
  }

  private set sourceAmount(value: string) {
    this._sourceAmount = value;
  }

  public get isDisabledSubmitButton(): boolean {
    return !this.sourceAmount || Number(this.sourceAmount) < 1;
  }

  private set sourceContractData(value: BaseContractInfo) {
    this._sourceContractData = value;
  }

  private set destinationContractData(value: BaseContractInfo) {
    this._destinationContractData = value;
  }

  public get isRearranged() {
    return this._isRearranged;
  }

  private set isRearranged(value: boolean) {
    this._isRearranged = value;
  }

  public get destinationAmount() {
    return this.calculateDestinationAmount
      ? this.calculateDestinationAmount(this.sourceAmount, this.isRearranged)
      : this.sourceAmount;
  }

  private set isInitialized(value: boolean) {
    this._isInitialized = value;
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }
}
