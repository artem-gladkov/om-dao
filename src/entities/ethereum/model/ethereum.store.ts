import {makeAutoObservable} from 'mobx'
import {JsonRpcSigner, Web3Provider} from "@ethersproject/providers";
import { Ethereum } from '..';

export class EthereumStore {
  private _ethereum: Ethereum | undefined;

  private _provider: Web3Provider | undefined;

  private _signer: JsonRpcSigner | undefined;

  private _initialized: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  private init = async () => {
    if(window.ethereum && window.ethereum.isMetaMask) {
      this.ethereum = window.ethereum
    } else {
      alert('Установите MetaMask')
      return
    }

    await this.createEthereumProvider()
    await this.checkSigner()
    this.initialized = true
  }

  private createEthereumProvider = async (): Promise<void> => {
    try {
      this.provider = new Web3Provider(window.ethereum, 'goerli')
    } catch (e) {
      console.log(e)
    }
  }

  private checkSigner = async (): Promise<void> => {
    try {
      const [account]: string[] = await this.provider.listAccounts()

      if(account !== undefined) {
        this.signer = this.provider.getSigner()
      }
    } catch (e) {
      console.log(e)
    }
  }

  public get hasSigner(): boolean {
    return !!this._signer
  }

  public setSigner(signer: JsonRpcSigner): void {
    this.signer = signer
  }

  private set signer(value: JsonRpcSigner) {
    this._signer = value
  }

  public get signer(): JsonRpcSigner {
    if(!this._signer) {
      throw Error('Signer не существует')
    }

    return this._signer
  }

  private set provider(value: Web3Provider) {
    this._provider = value
  }

  public get provider(): Web3Provider {
    if(!this._provider) {
      throw Error('EthereumProvider не существует')
    }

    return this._provider
  }

  private set initialized(value: boolean) {
    this._initialized = value
  }

  public get initialized(): boolean {
    return this._initialized
  }

  public get ethereum(): Ethereum {
    if(!this._ethereum) {
      throw Error('Ethereum не существует')
    }

    return this._ethereum
  }

  private set ethereum(value: Ethereum) {
    this._ethereum = value
  }
}
