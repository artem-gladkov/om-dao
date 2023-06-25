import { makeAutoObservable } from "mobx";
import { getNetwork, GetProviderResult, watchNetwork, watchProvider, watchSigner } from '@wagmi/core';
import {BaseProvider, Provider} from "@ethersproject/providers";

export class ProviderStore {
  private _provider: null | GetProviderResult = null;

  private _isInitialized = false;

  private _unWatchProvider: (() => void) | undefined = undefined;

  constructor(defaultProvider: BaseProvider) {
    makeAutoObservable(this);
    this._provider = defaultProvider;
    this.init();
  }

  protected init = () => {
    try {

      const network = getNetwork();
      if (network.chain?.id) {
        this.reInitProviderWatcher(network.chain.id);
      }

      watchNetwork((network) => {
        if (network.chain?.id) {
          this.reInitProviderWatcher(network.chain?.id);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private reInitProviderWatcher = (chainId: number) => {
    if (this._unWatchProvider) {
      this._unWatchProvider();
    }

    this._unWatchProvider = watchProvider({ chainId }, this.onChangeProvider);
  };


  private onChangeProvider = (data: GetProviderResult) => {
    this._provider = data;
  };

  get provider(): Provider {
    if (!this._provider) {
      throw Error("Provider не существует");
    }

    return this._provider;
  }

  get hasProvider(): boolean {
    return !!this._provider;
  }
}
