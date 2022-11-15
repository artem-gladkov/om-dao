import { makeAutoObservable } from "mobx";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Ethereum } from "..";
import { AVAILABLE_NETWORK } from "../../../shared/config";

export class EthereumStore {
  private _ethereum: Ethereum | undefined;

  private _provider: Web3Provider | undefined;

  private _signer: JsonRpcSigner | undefined;

  private _initialized: boolean = false;

  private _currentNetwork: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        this.ethereum = window.ethereum;
      } else {
        alert(
          "Установите MetaMask https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ru"
        );
        return;
      }
      await this.createEthereumProvider();
      await this.checkNetwork();
      await this.checkSigner();
      this.initialized = true;
    } catch (e) {
      console.log(e);
    }
  };

  private checkNetwork = async (): Promise<void> => {
    try {
      const { chainId } = await this.provider.getNetwork();
      this._currentNetwork = chainId;

      if (chainId !== AVAILABLE_NETWORK) {
        await this.changeToAvailableNetwork();
      }
    } catch (e) {
      console.log(e);
    }
  };

  public changeToAvailableNetwork = async (): Promise<void> => {
    try {
      const result = await this.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${AVAILABLE_NETWORK.toString(16)}` }],
      });

      if (!result) {
        const { chainId } = await this.provider.getNetwork();
        this.currentNetwork = chainId;
      }
    } catch (e) {
      console.log(e);
    }
  };

  private createEthereumProvider = async (): Promise<void> => {
    try {
      this.provider = new Web3Provider(window.ethereum, "any");
    } catch (e) {
      console.log(e);
    }
  };

  private checkSigner = async (): Promise<void> => {
    try {
      const [account]: string[] = await this.provider.listAccounts();

      if (account !== undefined) {
        await this.updateSigner(this.provider.getSigner());
      }
    } catch (e) {
      console.log(e);
    }
  };

  public get hasSigner(): boolean {
    return !!this._signer;
  }

  public updateSigner = async (signer: JsonRpcSigner): Promise<void> => {
    try {
      this.signer = signer;
    } catch (e) {
      console.log(e);
    }
  };

  public setSigner(signer: JsonRpcSigner): void {
    this.signer = signer;
  }

  private set signer(value: JsonRpcSigner) {
    this._signer = value;
  }

  public get signer(): JsonRpcSigner {
    if (!this._signer) {
      throw Error("Signer не существует");
    }

    return this._signer;
  }

  private set provider(value: Web3Provider) {
    this._provider = value;
  }

  public get provider(): Web3Provider {
    if (!this._provider) {
      throw Error("EthereumProvider не существует");
    }

    return this._provider;
  }

  private set initialized(value: boolean) {
    this._initialized = value;
  }

  public get initialized(): boolean {
    return this._initialized;
  }

  public get ethereum(): Ethereum {
    if (!this._ethereum) {
      throw Error("Ethereum не существует");
    }

    return this._ethereum;
  }

  private set ethereum(value: Ethereum) {
    this._ethereum = value;
  }

  private set currentNetwork(value: number) {
    this._currentNetwork = value;
  }

  public get isCorrectNetwork(): boolean {
    return this._currentNetwork === AVAILABLE_NETWORK;
  }
}
