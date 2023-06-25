import { makeAutoObservable } from "mobx";
import {
  watchNetwork,
  FetchSignerResult,
  getNetwork,
  watchSigner,
} from "@wagmi/core";
import { JsonRpcSigner } from "@ethersproject/providers";

export class SignerStore {
  private _signer: FetchSignerResult<JsonRpcSigner> = null;

  private _isInitialized = false;

  private _unWatchSigner: (() => void) | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  protected init = () => {
    try {
      const network = getNetwork();
      if (network.chain?.id) {
        this.reInitSignerWatcher(network.chain?.id);
      }

      watchNetwork((network) => {
        if (network.chain?.id) {
          this.reInitSignerWatcher(network.chain?.id);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private reInitSignerWatcher = (chainId: number) => {
    if (this._unWatchSigner) {
      this._unWatchSigner();
    }

    this._unWatchSigner = watchSigner({ chainId }, this.onChangeSigner);
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
