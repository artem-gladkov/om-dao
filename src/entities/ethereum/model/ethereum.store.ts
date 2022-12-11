import { makeAutoObservable } from "mobx";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import {Signer} from "ethers";

export class EthereumStore {
  private _provider: Web3Provider | undefined;

  private _signer: Signer | undefined;

  private _initialized: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  private init = async () => {
    try {

      this._initialized = true;
    } catch (e) {
      console.log(e);
    }
  };

  public setSigner = (signer: Signer): void => {
    this._signer = signer;
    console.log(this._signer)
  }

  public get signer(): JsonRpcSigner {
    return this._signer as JsonRpcSigner;
  }

  public get provider(): Web3Provider {
    if (!this._provider) {
      throw Error("EthereumProvider не существует");
    }

    return this._provider;
  }

  public get initialized(): boolean {
    return this._initialized;
  }
}
