import { makeAutoObservable } from "mobx";
import { JsonRpcSigner } from "@ethersproject/providers";
import { formatAddress } from "../lib";

export class WalletStore {
  private _address: string = "";

  constructor(private _signer: JsonRpcSigner) {
    makeAutoObservable(this);
    this.init();
  }

  init = async () => {
    try {
      const address = await this.signer.getAddress();
      this.address = formatAddress(address);
    } catch (e) {
      console.log(e);
    }
  };

  private get signer(): JsonRpcSigner {
    return this._signer;
  }

  public get address(): string {
    return this._address;
  }

  private set address(value: string) {
    this._address = value;
  }
}
