import { makeAutoObservable } from "mobx";
import { watchSigner, FetchSignerResult} from "@wagmi/core";
import { AVAILABLE_NETWORK } from "../../../shared/config";
import { JsonRpcSigner } from "@ethersproject/providers";

export class SignerStore {
  private _signer: FetchSignerResult<JsonRpcSigner> = null;

  private _isInitialized = false;
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  protected init = () => {
    try {
      watchSigner({ chainId: AVAILABLE_NETWORK }, this.onChangeSigner);
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private onChangeSigner = (data: FetchSignerResult<JsonRpcSigner>) => {
    this._signer = data;
  };

  get signer(): JsonRpcSigner {
    if (!this._signer) {
      throw Error("Signer не существует");
    }

    return this._signer;
  }

  get hasSigner(): boolean {
    return !!this._signer;
  }
}
