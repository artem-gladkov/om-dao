import { makeAutoObservable } from "mobx";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { JsonRpcSigner } from "@ethersproject/providers";
import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS } from "../../../entities";

export class BalanceStore {
  private _balance: string = "";

  private _decimals: string = "18";

  private _signerAddress: string = "";

  private _contract: Contract;

  constructor(
    private _data: { tokenSymbol: TOKEN_SYMBOLS; signer: JsonRpcSigner }
  ) {
    makeAutoObservable(this);

    this._contract = new Contract(
      TOKEN_ADDRESS[_data.tokenSymbol],
      TOKEN_ABI[_data.tokenSymbol],
      _data.signer
    );

    this.init();
  }

  init = async () => {
    try {
      this._decimals = await this.contract.decimals();
      this._signerAddress = await this.signer.getAddress();

      await this.updateBalance();
    } catch (e) {
      console.log(e);
    }
  };

  public updateBalance = async (): Promise<void> => {
    try {
      const balance = await this.contract.balanceOf(this._signerAddress);
      this.balance = formatUnits(balance, this._decimals);
    } catch (e) {
      console.log(e);
    }
  };

  get signer(): JsonRpcSigner {
    return this._data.signer;
  }

  get contract(): Contract {
    return this._contract;
  }

  set contract(value: Contract) {
    this._contract = value;
  }

  set balance(value: string) {
    this._balance = value;
  }

  get balance(): string {
    return this._balance;
  }
}
