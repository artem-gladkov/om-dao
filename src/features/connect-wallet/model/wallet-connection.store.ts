import { makeAutoObservable } from "mobx";
import { Web3Provider } from "@ethersproject/providers";
import { EthereumStore } from "../../../entities";

export class WalletConnectionStore {
  constructor(private _ethereumStore: EthereumStore) {
    makeAutoObservable(this);
  }

  public connectWallet = async (): Promise<void> => {
    try {
      await this.provider.send("eth_requestAccounts", []);
      const signer = await this.provider.getSigner();
      this.ethereumStore.setSigner(signer);
    } catch (e) {
      console.log(e);
    }
  };

  private get ethereumStore(): EthereumStore {
    return this._ethereumStore;
  }

  private get provider(): Web3Provider {
    return this._ethereumStore.provider;
  }
}
